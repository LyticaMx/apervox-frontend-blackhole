import { ReactElement, useEffect } from 'react'
import { Switch, Redirect, Route } from 'react-router-dom'

import { useAuth } from 'context/Auth'

import { pathRoute, routes } from './routes'
import { useSocket } from 'hooks/useSocket'
import { getItem } from 'utils/persistentStorage'

const Navigator = (): ReactElement => {
  const { auth, actions: authActions } = useAuth()

  const { socket, isSocketConnected } = useSocket({
    namespace: 'sessions',
    query: {
      token: getItem('token')
    }
  })

  useEffect(() => {
    if (!isSocketConnected) return
    if (!auth.profile.id) return
    socket?.on('close_session', (data) => {
      const ids: string[] = data.ids
      const logout = ids.some((id) => auth.profile.id === id)
      if (logout) authActions?.killSession(true)
    })

    return () => {
      socket?.off('close_session')
    }
  }, [isSocketConnected, auth.profile.id])

  useEffect(() => {
    if (!isSocketConnected) return
    if (auth.token) {
      socket?.emit('refresh_token', auth.token)
    }
  }, [auth.token, isSocketConnected])

  return (
    <Switch>
      {routes.map((route) => {
        if (route.modules.length) {
          return [
            <Route exact key={route.id} path={route.path}>
              {route.private && !auth.isLogguedIn ? (
                <Redirect to={pathRoute.auth.signIn} />
              ) : (
                <route.layout>
                  <route.component />
                </route.layout>
              )}
            </Route>,
            ...route.modules.map((subRoute) => (
              <Route exact key={subRoute.id} path={subRoute.path}>
                {subRoute.private && !auth.isLogguedIn ? (
                  <Redirect to={pathRoute.auth.signIn} />
                ) : (
                  <subRoute.layout>
                    <subRoute.component />
                  </subRoute.layout>
                )}
              </Route>
            ))
          ]
        }

        return (
          <Route exact key={route.id} path={route.path}>
            {route.private && !auth.isLogguedIn ? (
              <Redirect to={pathRoute.auth.signIn} />
            ) : (
              <route.layout>
                <route.component />
              </route.layout>
            )}
          </Route>
        )
      })}
      <Redirect to={pathRoute.auth.userAccount} />
    </Switch>
  )
}

export default Navigator

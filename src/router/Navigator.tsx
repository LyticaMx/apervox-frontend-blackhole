import { ReactElement, useEffect, useRef } from 'react'
import { Switch, Redirect, Route } from 'react-router-dom'

import { useAuth } from 'context/Auth'

import { pathRoute, routes } from './routes'
import { useSocket } from 'hooks/useSocket'
import { getItem } from 'utils/persistentStorage'
import { useSettings } from 'context/Settings'

const Navigator = (): ReactElement => {
  const { auth, actions: authActions } = useAuth()
  const { actions: settingsActions } = useSettings()
  // Se declara el ref para que quede el valor correcto en el socket
  const settingsActionsRef = useRef(settingsActions)

  const { socket, isSocketConnected } = useSocket({
    namespace: 'sessions',
    query: {
      token: getItem('token')
    }
  })

  useEffect(() => {
    if (!isSocketConnected) return
    socket?.on('close_session', (data) => {
      const ids: string[] = data.ids
      const logout = ids.some((id) => auth.profile.id === id)
      if (logout) authActions?.killSession(true)
    })

    socket?.on('settings', (data) => {
      settingsActionsRef.current?.update({
        inactivityTime: data.inactivity_time,
        doubleValidation: data.double_validation
      })
    })

    return () => {
      socket?.off('close_session')
    }
  }, [isSocketConnected])

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

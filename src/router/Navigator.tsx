import { ReactElement, useEffect } from 'react'
import { Switch, Redirect, Route } from 'react-router-dom'

import { useAuth } from 'context/Auth'

import { pathRoute, routes } from './routes'
import { useSocket } from 'hooks/useSocket'
import { getItem } from 'utils/persistentStorage'
import { useAbility } from 'context/Ability'

const Navigator = (): ReactElement => {
  const { auth, actions: authActions } = useAuth()
  const ability = useAbility()
  const { socket, isSocketConnected } = useSocket({
    namespace: 'sessions',
    query: {
      token: getItem('token')
    },
    transports: ['websocket']
  })

  useEffect(() => {
    if (!isSocketConnected) return
    if (!auth.profile.id) return

    const closeSession = (data): void => {
      const ids: string[] = data.ids
      const logout = ids.some((id) => auth.profile.id === id)
      if (logout) authActions?.killSession(true)
    }

    socket?.on('close_session', closeSession)

    return () => {
      socket?.off('close_session', closeSession)
    }
  }, [isSocketConnected, auth.profile.id])

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
            ...route.modules.map((subRoute) => {
              if (
                route.scopes.every((scope) =>
                  ability.can(scope.action, scope.subject)
                )
              ) {
                return (
                  <Route exact key={subRoute.id} path={subRoute.path}>
                    {subRoute.private && !auth.isLogguedIn ? (
                      <Redirect to={pathRoute.auth.signIn} />
                    ) : (
                      <subRoute.layout>
                        <subRoute.component />
                      </subRoute.layout>
                    )}
                  </Route>
                )
              }
              return null
            })
          ]
        }

        if (
          route.scopes.every((scope) =>
            ability.can(scope.action, scope.subject)
          )
        ) {
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
        }

        return null
      })}
      <Redirect
        to={
          auth.isLogguedIn ? pathRoute.auth.userAccount : pathRoute.auth.signIn
        }
      />
    </Switch>
  )
}

export default Navigator

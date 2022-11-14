import { ReactElement } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route
} from 'react-router-dom'

import { useAuth } from 'context/Auth'

import { pathRoute, routes } from './routes'

const Navigator = (): ReactElement => {
  const { auth } = useAuth()

  return (
    <Router>
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
        <Redirect to="/" />
      </Switch>
    </Router>
  )
}

export default Navigator

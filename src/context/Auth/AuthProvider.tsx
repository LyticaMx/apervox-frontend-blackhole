import { useState, useMemo, ReactNode, ReactElement } from 'react'
import useApi from 'hooks/useApi'
import { getItem, removeItem, setItem } from 'utils/persistentStorage'
import { Auth, SignIn, SignUp } from 'types/auth'
import { AuthContext, initialState } from './AuthContext'

interface Props {
  children: ReactNode
}

const AuthProvider = ({ children }: Props): ReactElement => {
  const token = getItem('token') ?? null
  const session = token ? getItem('session') : initialState
  const [auth, setAuth] = useState<Auth | any>(session)

  const signInService = useApi({
    endpoint: 'sign-in',
    method: 'post'
  })

  const signUpService = useApi({
    endpoint: 'sign-up',
    method: 'post'
  })

  const signOutService = useApi({
    endpoint: 'log-out',
    method: 'post'
  })

  const getUserService = useApi({
    endpoint: 'user',
    method: 'get'
  })

  const signIn = async (params: SignIn): Promise<boolean> => {
    try {
      const responseDataSignIn = await signInService({
        body: params
      })

      const id = responseDataSignIn.payload.userId

      if (id) {
        const responseDataUSer = await getUserService({
          urlParams: { id }
        })

        const authData: Auth = {
          isLogguedIn: true,
          token: responseDataSignIn?.payload?.token,
          user: responseDataUSer?.payload
        }

        setItem('token', authData.token)
        setAuth(authData)
        setItem('session', authData)

        return true
      }

      return false
    } catch (error) {
      return false
    }
  }

  const signUp = async (params: SignUp): Promise<boolean> => {
    try {
      const responseDataSignIn = await signUpService({
        body: params
      })

      if (responseDataSignIn.id) {
        return true
      } else {
        return false
      }
    } catch (error) {
      return false
    }
  }

  const signOut = async (): Promise<boolean> => {
    try {
      await signOutService()

      setAuth({ ...initialState, isLogguedIn: false })
      removeItem('token')
      removeItem('session')

      return true
    } catch (error) {
      return false
    }
  }

  const contextValue = useMemo(
    () => ({
      auth,
      actions: {
        signIn,
        signUp,
        signOut
      }
    }),
    [auth]
  )

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  )
}

export { AuthProvider }

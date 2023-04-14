import { useState, useMemo, ReactNode, ReactElement } from 'react'
import { useHistory } from 'react-router-dom'
import { useIntl } from 'react-intl'
import jwtDecode from 'jwt-decode'
import { toast } from 'react-toastify'

import { Auth, RestorePassword, SignIn, SignUp } from 'types/auth'
import { FormProfile } from 'types/profile'

import { getItem, removeItem, setItem } from 'utils/persistentStorage'
import { getDateDiferenceInMinutes } from 'utils/formatTime'
import useApi from 'hooks/useApi'
import { pathRoute } from 'router/routes'
import { apiMessages } from 'globalMessages'

import { useLoader } from 'context/Loader'
import { AuthContext, initialState } from './context'
import { format } from 'date-fns'

interface Props {
  children: ReactNode
}

const AuthProvider = ({ children }: Props): ReactElement => {
  const history = useHistory()
  const { actions: loaderActions } = useLoader()
  const intl = useIntl()

  const [auth, setAuth] = useState<Auth>(initialState)

  const signInService = useApi({
    endpoint: 'auth/login',
    method: 'post'
  })

  const signUpService = useApi({
    endpoint: 'register',
    method: 'post'
  })

  const forgotPasswordService = useApi({
    endpoint: '/auth/forgot-password',
    method: 'post'
  })

  const signOutService = useApi({
    endpoint: 'auth/logout',
    method: 'post'
  })

  const getProfileService = useApi({
    endpoint: 'me',
    method: 'get'
  })

  const restorePasswordService = useApi({
    endpoint: '/auth/reset-password',
    method: 'post'
  })

  const refreshTokenService = useApi({
    endpoint: '/auth/refresh-token',
    method: 'post'
  })

  const updateProfileService = useApi({ endpoint: '/profile', method: 'put' })

  const signIn = async (params: SignIn): Promise<boolean> => {
    try {
      setItem('errorsAuthRegistered', 0)

      const res = await signInService({
        body: params
      })

      const token: string = res.data.token
      const rToken: string = res.data.refresh_token

      const session: any = jwtDecode(token) // decode your token here

      const id = session?.id

      if (id) {
        setItem('token', token)
        setItem('rToken', rToken)

        const resProfile = await getProfileService({})

        const authData: Auth = {
          isLogguedIn: true,
          token,
          rToken,
          profile: {
            id,
            names: resProfile.data?.profile?.names ?? '',
            lastName: resProfile.data?.profile?.last_names ?? '',
            username: resProfile.data?.username ?? '',
            since: `${String(
              format(
                new Date(resProfile.data?.created_at ?? '1970-01-01T00:00:00Z'),
                'dd-MM-yyyy HH:mm:ss'
              )
            )}`,
            email: resProfile.data?.email ?? '',
            phone: resProfile.data?.company.phone_extension ?? '',
            position: resProfile.data?.company.position ?? '',
            groups: resProfile.data?.groups ?? [],
            role: resProfile.data?.role ?? ''
          }
        }

        setAuth(authData)
        setItem('profile', authData.profile)

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

      if (responseDataSignIn.data) {
        return true
      } else {
        return false
      }
    } catch (error) {
      return false
    }
  }

  const forgotPassword = async (email: string): Promise<boolean> => {
    try {
      const responseDataSignIn = await forgotPasswordService({
        body: { email }
      })

      if (responseDataSignIn.data) {
        return true
      } else {
        return false
      }
    } catch (error) {
      return false
    }
  }

  const restorePassword = async (params: RestorePassword): Promise<boolean> => {
    try {
      const { password, confirmPassword, secureCode, token } = params
      const response = await restorePasswordService({
        body: {
          password,
          token,
          confirm_password: confirmPassword,
          code: secureCode
        }
      })

      return !!response.data
    } catch {
      return false
    }
  }

  const signOut = async (): Promise<boolean> => {
    try {
      const token = getItem('token')
      const logoutRes = await signOutService({ body: { token } })

      if (logoutRes) {
        return true
      }

      return false
    } catch (error) {
      return false
    }
  }

  const refreshToken = async (): Promise<boolean> => {
    try {
      const res = await refreshTokenService()
      if (res.data) {
        const token: string = res.data.access_token
        const rToken: string = res.data.refresh_token

        setAuth((prev) => ({ ...prev, token, rToken }))

        setItem('token', token)
        setItem('rToken', rToken)

        return true
      }

      return false
    } catch (error) {
      return false
    }
  }

  const updateProfile = async (newProfile: FormProfile): Promise<void> => {
    try {
      const res: any = await updateProfileService({
        queryString: `?id=${String(auth.profile.id)}`,
        body: {
          first_name: newProfile.name,
          fathers_name: newProfile.fathersName,
          mothers_name: newProfile.mothersName
        }
      })

      if (res.data) {
        const profile = {
          ...auth.profile,
          name: res.data.first_name,
          fathers_name: res.data.fathers_name,
          mothers_name: res.data.mothers_name
        }

        const newAuth = { ...auth, profile }

        setAuth(newAuth)
        setItem('profile', profile)
      }
    } catch {}
  }

  const killSession = (hideNotification?: boolean): void => {
    try {
      loaderActions?.showLoader()
      removeItem('token')
      removeItem('user')
      removeItem('session')
      setAuth(initialState)

      if (!hideNotification && Number(getItem('errorsAuthRegistered')) === 0) {
        if (tokenHasExpired()) {
          toast.error(intl.formatMessage(apiMessages.sessionExpired))
        } else {
          toast.error(intl.formatMessage(apiMessages.loginElsewhere))
        }
      }

      loaderActions?.hideLoader()
      history.push(pathRoute.auth.signIn)
    } catch (error) {
      console.error('Error')
    }
  }

  const tokenHasExpired = (): boolean => {
    const { token } = auth
    const session: any = jwtDecode(token) // decode your token here
    const exp = session.exp

    const diffMin = getDateDiferenceInMinutes(new Date(), new Date(exp * 1000))

    if (diffMin <= 0) {
      return true
    }
    return false
  }

  const contextValue = useMemo(
    () => ({
      auth,
      actions: {
        signIn,
        signUp,
        forgotPassword,
        signOut,
        restorePassword,
        updateProfile,
        refreshToken,
        killSession
      }
    }),
    [auth]
  )

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  )
}

export { AuthProvider }

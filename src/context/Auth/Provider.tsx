import { useState, useMemo, ReactNode, ReactElement } from 'react'
import { useHistory } from 'react-router-dom'
import { useIntl } from 'react-intl'
import jwtDecode from 'jwt-decode'
import useToast from 'hooks/useToast'

import { Auth, SignIn, SignUp, SignedIn } from 'types/auth'
import { FormProfile, Profile } from 'types/profile'

import { getItem, removeItem, setItem } from 'utils/persistentStorage'
import { getDateDiferenceInMinutes } from 'utils/formatTime'
import useApi from 'hooks/useApi'
import { pathRoute } from 'router/routes'
import { apiMessages } from 'globalMessages'

import { useLoader } from 'context/Loader'
import { AuthContext, initialState } from './context'
import { format } from 'date-fns'
import { ResponseData } from 'types/api'

interface Props {
  children: ReactNode
}

const AuthProvider = ({ children }: Props): ReactElement => {
  const history = useHistory()
  const { actions: loaderActions } = useLoader()
  const intl = useIntl()

  const [auth, setAuth] = useState<Auth>(initialState)
  const toast = useToast()

  const signInService = useApi({
    endpoint: 'auth/login',
    method: 'post'
  })

  const signUpService = useApi({
    endpoint: 'register',
    method: 'post'
  })

  const updateProfileService = useApi({
    endpoint: 'me',
    method: 'put'
  })

  const verifyPasswordService = useApi({
    endpoint: 'auth/verify-password',
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

  const signIn = async (params: SignIn): Promise<SignedIn> => {
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

        const authData: Auth = {
          isLogguedIn: true,
          token,
          rToken,
          profile: {
            ...initialState.profile,
            username: params.user
          }
        }

        setAuth(authData)
        setItem('profile', authData.profile)

        return {
          successLogin: true,
          firstLogin: !res.data.has_logged
        }
      }

      return {
        successLogin: false,
        firstLogin: true
      }
    } catch (error) {
      return {
        successLogin: false,
        firstLogin: true
      }
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

  const verifyPassword = async (password: string): Promise<boolean> => {
    try {
      const response: ResponseData = await verifyPasswordService({
        body: { password }
      })

      return response.data.success
    } catch {
      return false
    }
  }

  const changePassword = async (
    oldPassword: string,
    newPassword: string
  ): Promise<boolean> => {
    try {
      const isActualPassword = await verifyPassword(oldPassword)

      if (!isActualPassword) return false

      const profile = JSON.parse(localStorage.getItem('profile') ?? '')

      const id = (auth.profile.id || profile?.id) ?? ''

      if (!id) return false

      await updateProfileService({
        body: {
          password: newPassword,
          has_logged: true
        }
      })

      return true
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

  const refreshToken = (token: string, rToken: string): void => {
    setItem('token', token)
    setItem('rToken', rToken)

    setAuth((prev) => ({ ...prev, token, rToken }))
  }

  const getProfile = async (): Promise<void> => {
    try {
      const res: ResponseData = await getProfileService()

      const profile: Profile = {
        id: res.data?.id ?? '',
        names: res.data?.profile?.names ?? '',
        lastName: res.data?.profile?.last_name ?? '',
        username: res.data?.username ?? '',
        since: `${String(
          format(
            new Date(res.data?.created_at ?? '1970-01-01T00:00:00Z'),
            'dd-MM-yyyy HH:mm:ss'
          )
        )}`,
        email: res.data?.email ?? '',
        phone: res.data?.company?.phone_extension ?? '',
        position: res.data?.company?.position ?? '',
        groups: res.data?.groups ?? [],
        role: res.data?.role ?? ''
      }

      setAuth((auth) => ({ ...auth, profile }))
    } catch {}
  }

  const updateProfile = async (newProfile: FormProfile): Promise<boolean> => {
    try {
      const res: any = await updateProfileService({
        body: {
          company: {
            position: newProfile.position,
            phone_extension: newProfile.phoneExtension
          },
          email: newProfile.email
        }
      })

      if (res.data) {
        const profile = {
          ...auth.profile,
          position: res.data.company.position,
          phone: res.data.company.phone_extension,
          email: res.data.email
        }

        const newAuth = { ...auth, profile }

        setAuth(newAuth)
        setItem('profile', profile)
        return true
      }
      return false
    } catch {
      return false
    }
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
          toast.danger(intl.formatMessage(apiMessages.sessionExpired))
        } else {
          toast.danger(intl.formatMessage(apiMessages.loginElsewhere))
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
        changePassword,
        verifyPassword,
        signOut,
        getProfile,
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

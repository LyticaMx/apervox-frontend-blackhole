import { useState, useMemo, ReactNode, ReactElement } from 'react'
import axios from 'axios'
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
import { format, isAfter, isBefore } from 'date-fns'
import { ResponseData } from 'types/api'
import { AbilityBuilder, createMongoAbility } from '@casl/ability'
import { ACTION, useAbility } from 'context/Ability'

interface Props {
  children: ReactNode
}

const AuthProvider = ({ children }: Props): ReactElement => {
  const history = useHistory()
  const ability = useAbility()
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

  const userSessionsService = useApi({
    endpoint: 'auth/user-sessions',
    method: 'delete'
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

        try {
          const { can, rules } = new AbilityBuilder(createMongoAbility)
          const { scopes } = jwtDecode<any>(token)
          for (const scope of scopes) {
            if (scope.create) can(ACTION.CREATE, scope.name)
            if (scope.read) can(ACTION.READ, scope.name)
            if (scope.update) can(ACTION.UPDATE, scope.name)
            if (scope.delete) can(ACTION.DELETE, scope.name)
            if (scope.export) can(ACTION.EXPORT, scope.name)
          }
          ability.update(rules)
        } catch (e) {
          console.error(e)
        }

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
    } catch (error: any) {
      const signedIn: SignedIn = {
        successLogin: false,
        firstLogin: true
      }

      if (error.response.status === 429) {
        signedIn.lockLogin = true
      } else if (error.response.status === 418) {
        signedIn.maximumSessionsOpened = true
      }

      return signedIn
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

      let id = auth.profile.id

      if (!id) {
        const token = localStorage.getItem('token')
        if (!token) return false
        const decodedToken: any = jwtDecode(token)
        id = decodedToken?.id ?? ''
      }

      await updateProfileService({
        body: {
          password: newPassword,
          has_logged: true
        }
      })

      return true
    } catch (e) {
      return false
    }
  }

  const closeAllSessions = async (params: SignIn): Promise<SignedIn> => {
    try {
      const response = await userSessionsService({
        body: params
      })

      if (response.data.success) {
        return await signIn(params)
      }

      return {
        firstLogin: false,
        successLogin: false
      }
    } catch {
      return {
        firstLogin: false,
        successLogin: false
      }
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

  const refreshToken = async (): Promise<void> => {
    try {
      loaderActions?.addPendingActions()
      const token: string = getItem('token')
      const rToken: string = getItem('rToken')
      if (token && rToken) {
        const session: any = jwtDecode(token)
        const decodedRToken: any = jwtDecode(rToken)
        const sessionTime = session.exp * 1000 - 60000
        const rTokenTime = decodedRToken.exp * 1000 - 60000
        if (
          isAfter(new Date(), new Date(sessionTime)) &&
          isBefore(new Date(), new Date(rTokenTime))
        ) {
          const response: ResponseData = (
            await axios.post(
              `${process.env.REACT_APP_MAIN_BACKEND_URL}${
                process.env.REACT_APP_REFRESH_TOKEN_ENDPOINT ?? ''
              }`,
              {},
              {
                headers: {
                  'refresh-token': getItem('rToken'),
                  Authorization: `Bearer ${getItem('token')}`
                }
              } as any
            )
          ).data
          if (response.data) {
            const newToken: string = response.data.token
            const newRToken: string = response.data.refresh_token
            setItem('token', newToken)
            setItem('rToken', newRToken)

            setAuth((prev) => ({ ...prev, token: newToken, newRToken: rToken }))
          }
        }
      }
    } catch (e) {
      console.error(e)
    } finally {
      loaderActions?.removePendingActions()
    }
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
        role: res.data?.role ?? '',
        closeByInactivity: res.data?.close_session ?? true
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
      loaderActions?.addPendingActions()
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

      loaderActions?.removePendingActions()
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
        closeAllSessions,
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

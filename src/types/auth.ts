import { FormProfile, Profile } from './profile'

export interface Role {
  id: number
  name: string
  description: string
}

export interface UserAuth {
  email: string
  id: string
  name: string
  fathers_name: string
  mothers_name: string
  dependency: string
  activated: boolean
}

export interface Auth {
  isLogguedIn: boolean
  token: string
  rToken: string
  profile: Profile
}

export interface SignIn {
  user: string
  password: string
}

export interface SignUp {
  email: string
  name: string
  fathers_name: string
  mothers_name: string
}

export interface RestorePassword {
  password: string
  confirmPassword: string
  secureCode: number
  token: string
}

export interface AuthContextType {
  auth: Auth
  actions?: {
    signIn: (params: SignIn) => Promise<boolean>
    signUp: (params: SignUp) => Promise<boolean>
    forgotPassword: (email: string) => Promise<boolean>
    restorePassword: (params: RestorePassword) => Promise<boolean>
    signOut: () => Promise<boolean>
    updateProfile: (profile: FormProfile) => Promise<void>
    refreshToken: () => Promise<boolean>
    killSession: (hideNotification?: boolean) => void
  }
}

import { FormProfile, Profile } from './profile'

export interface SignedIn {
  successLogin: boolean
  firstLogin: boolean
}
export interface Role {
  id: string
  name: string
  description: string
  users?: any[]
  status: boolean
  created_by: string
  created_at: string
  updated_by: string
  updated_at: string
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
    signIn: (params: SignIn) => Promise<SignedIn>
    signUp: (params: SignUp) => Promise<boolean>
    verifyPassword: (password: string) => Promise<boolean>
    changePassword: (
      oldPassword: string,
      newPassword: string
    ) => Promise<boolean>
    signOut: () => Promise<boolean>
    updateProfile: (profile: FormProfile) => Promise<boolean>
    refreshToken: () => Promise<boolean>
    killSession: (hideNotification?: boolean) => void
  }
}

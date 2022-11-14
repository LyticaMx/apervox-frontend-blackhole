export interface Role {
  id: number
  name: string
  description: string
}

export interface UserAuth {
  id: number
  name: string
  email: string
  role: Role
}

export interface Auth {
  isLogguedIn: boolean
  token: string
  user: UserAuth
}

export interface SignIn {
  email: string
  password: string
}

export interface SignUp {
  email: string
  name: string
  lastname: string
  secondLastname: string
}

export interface AuthContextType {
  auth: Auth
  actions?: {
    signIn: (params: SignIn) => Promise<boolean>
    signUp: (params: SignUp) => Promise<boolean>
    signOut: () => Promise<boolean>
  }
}

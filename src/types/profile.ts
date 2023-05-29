export interface FormProfile {
  phoneExtension: string
  position: string
  email: string
}

export interface ProfileGroup {
  id: string
  name: string
}

export interface Profile {
  id: string
  names: string
  lastName: string
  username: string
  since: string
  email: string
  phone: string
  position: string
  groups: ProfileGroup[]
  role: string
  closeByInactivity: boolean
}

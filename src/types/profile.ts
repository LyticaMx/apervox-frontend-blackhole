export interface FormProfile {
  name: string
  fathersName: string
  mothersName: string
  since: string
}

export interface Profile {
  email: string
  profile_id: string
  name: string
  fathers_name: string
  mothers_name: string
  since: string
  activated: string
  dependency?: string
  pic?: string
}


export enum CodeCountry {
  USA,
  MEX,
  COL,
  BRZ
}

export interface Country {
  id: string
  code_country: CodeCountry
}

export interface State {
  id: string
  name: string
  country: Country
  country_id: string
}

export interface Location {
  id: string
  name: string
  state: State
  state_id: string
}
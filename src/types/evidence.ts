export interface Evidence {
  id: number
  objective: string
  event: number
  classification:
    | 'No visto'
    | 'Trabajando'
    | 'Relevante'
    | 'No relevante'
    | 'Descartado'
  type: 'audio' | 'video' | 'image' | 'doc' | 'navigation' | 'data'
  workingOn: boolean
}

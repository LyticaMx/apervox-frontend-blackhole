export type DocType = 'pdf' | 'excel' | 'word' | 'csv'

export interface Letterhead {
  id: string
  name: string
  doc_type: DocType
  image: string
  organization_name: string

  file?: File | null
  status?: boolean
  created_by?: string
  created_at?: string
}

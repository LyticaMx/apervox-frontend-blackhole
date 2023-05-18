export type DocType = 'pdf' | 'excel' | 'word' | 'csv'

export interface Letterhead {
  id: string
  name: string
  doc_type: DocType
  image: string
  organization_name: string

  status?: boolean
  created_by?: string
  created_at?: string
  updated_at?: string
}

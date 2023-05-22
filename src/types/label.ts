export type LabelType = 'audio' | 'video' | 'image' | 'document'

export interface Label {
  id: string
  name: string
  label_type: LabelType
  color: string
  created_at: string
}

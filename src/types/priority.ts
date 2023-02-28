export enum Priority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  URGENT = 'urgent'
}

export const colorByPriority = {
  [Priority.LOW]: 'sky-500',
  [Priority.MEDIUM]: 'yellow-500',
  [Priority.HIGH]: 'orange-500',
  [Priority.URGENT]: 'red-500'
}

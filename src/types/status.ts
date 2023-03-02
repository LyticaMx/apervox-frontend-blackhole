export enum Status {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  LOCKED = 'locked',
  TO_COMPLETE = 'toComplete',
  COMPLETED = 'completed',
  CURRENT = 'current'
}

export const colorByStatus = {
  [Status.ACTIVE]: 'green-500',
  [Status.INACTIVE]: 'red-500',
  [Status.LOCKED]: 'gray-500',
  [Status.CURRENT]: 'green-500',
  [Status.COMPLETED]: 'purple-500',
  [Status.TO_COMPLETE]: 'orange-500'
}

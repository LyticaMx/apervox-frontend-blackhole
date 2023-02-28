export enum Status {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  LOCKED = 'locked'
}

export const colorByStatus = {
  [Status.ACTIVE]: 'green-500',
  [Status.INACTIVE]: 'red-500',
  [Status.LOCKED]: 'gray-500'
}

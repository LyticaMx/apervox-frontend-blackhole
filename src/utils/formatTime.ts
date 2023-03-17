type D1 = 0 | 1
type D3 = D1 | 2 | 3
type D5 = D3 | 4 | 5
type D9 = D5 | 6 | 7 | 8 | 9

export type Hours = `0${D9}` | `${D1}${D9}` | `${2}${D3}`
export type Minutes = `${D5}${D9}`
export type Seconds = `${D5}${D9}`
export type Time = `${Hours}:${Minutes}`
export type TimeSeconds = `${Hours}:${Minutes}:${Seconds}`

export const formatSeconds = (
  seconds: number,
  includeHours: boolean = false
): string => {
  const getHour = Math.floor(seconds / 3600)
  const getMinute = Math.floor((seconds / 60) % 60)
  const getSecond = seconds % 60

  const hour = `0${Math.trunc(getHour)}`.slice(-2)
  const minute = `0${Math.trunc(getMinute)}`.slice(-2)
  const second = `0${Math.trunc(getSecond)}`.slice(-2)

  if (includeHours) return `${hour}:${minute}:${second}`

  return hour === '0' ? `${hour}:${minute}:${second}` : `${minute}:${second}`
}

export const getDateDiferenceInMinutes = (
  startDate: Date,
  endDate: Date
): number => {
  const diference = endDate.getTime() - startDate.getTime()

  return diference / 60000
}

export const getSecondsFromTime = (time: Time | TimeSeconds): number => {
  const length = time.split(':').length
  const seconds = length === 3 ? [3600, 60, 1] : [60, 1]

  const timeArray = time.split(':').map(Number)
  const total = timeArray.reduce((pv, cv, index) => {
    return pv + cv * seconds[index]
  }, 0)

  return total
}

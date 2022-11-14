export const formatSeconds = (seconds: number): string => {
  const getHour = Math.floor(seconds / 3600)
  const getMinute = Math.floor((seconds / 60) % 60)
  const getSecond = seconds % 60

  const hour = getHour < 10 ? `0${getHour}` : getHour
  const minute = getMinute < 10 ? `0${getMinute}` : getMinute
  const second = getSecond < 10 ? `0${getSecond}` : getSecond

  return hour === '0' ? `${hour}:${minute}:${second}` : `${minute}:${second}`
}

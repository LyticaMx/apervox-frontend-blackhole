import { get } from 'lodash'

export const processAPIMarkers = (markers: any): any =>
  markers.map((item) => ({
    interval: item.time_marker,
    text: item.label
  }))

export const processStateMarkers = (markers: any): any => {
  const apiMarkers: any = []

  markers.forEach((marker) => {
    if (marker.text) {
      const m = {
        label: marker.text,
        time_marker: marker.interval
      }

      apiMarkers.push(m)
    }
  })

  return apiMarkers
}

export const isInInterval = (n: any, [a, b]: [number, number]): boolean =>
  n >= a && n <= b

export const randomColor = (alpha: any): string => {
  const colors = [
    `rgba(0, 0, 200, ${alpha})`,
    `rgba(100, 0, 255, ${alpha})`,
    `rgba(0, 0, 150, ${alpha})`,
    `rgba(90, 0, 255, ${alpha})`
  ]

  return colors[Math.floor(Math.random() * 100) % colors.length]
}

export const getTimeInSeconds = (timeWithFormat: any): [number, number] => {
  // "00:01:00 - 01:10:08"
  const [start, end] = timeWithFormat.split('-')

  const startSplit = start.trim().split(':')
  const endSplit = end.trim().split(':')

  const sHours = parseInt(startSplit[0]) * 3600
  const sMinutes = parseInt(startSplit[1]) * 60
  const sSeconds = parseInt(startSplit[2]) * 1
  const eHours = parseInt(endSplit[0]) * 3600
  const eMinutes = parseInt(endSplit[1]) * 60
  const eSeconds = parseInt(endSplit[2]) * 1

  const nStart = sHours + sMinutes + sSeconds
  const nEnd = eHours + eMinutes + eSeconds

  return [nStart, nEnd]
}

interface SecToStrConfig {
  milis?: boolean
  separator?: string
}
export const secondsToString = (
  seconds: number,
  config?: SecToStrConfig
): string => {
  const milis = get(config, 'milis', false)
  const separator = get(config, 'separator', ':')

  const hour = Math.floor(seconds / 3600)
  const sHour = `0${hour}`.slice(-2)

  const minute = Math.floor((seconds / 60) % 60)
  const sMinute = `0${minute}`.slice(-2)

  const second = milis ? (seconds % 60).toFixed(3) : Math.floor(seconds % 60)
  const sSecond = `0${second}`.slice(-2)

  return `${sHour}${separator}${sMinute}${separator}${sSecond}`
}

import { get } from 'lodash'

interface secondsToStringConfig {
  withHours?: boolean
  milis?: boolean
  separator?: string
}

export const secondsToString = (
  seconds: number,
  config: secondsToStringConfig = {
    withHours: true,
    milis: false,
    separator: ':'
  }
): string => {
  const withHours = get(config, 'withHours', true)
  const milis = get(config, 'milis', false)
  const separator = get(config, 'separator', ':')
  const hour = Math.floor(seconds / 3600)
  const minute = withHours
    ? Math.floor((seconds / 60) % 60)
    : Math.floor(seconds / 60)
  const second = milis ? (seconds % 60).toFixed(3) : Math.floor(seconds % 60)
  return `${withHours ? `${hour < 10 ? `0${hour}` : hour}${separator}` : ''}${
    minute < 10 ? `0${minute}` : minute
  }${separator}${second < 10 ? `0${second}` : second}`
}

export const videoDurationToString = (
  seconds: number,
  config: secondsToStringConfig = {
    withHours: true,
    milis: false,
    separator: ':'
  }
): string => {
  const withHours = get(config, 'withHours', true)
  const milis = get(config, 'milis', false)
  const separator = get(config, 'separator', ':')
  const hour = Math.floor(seconds / 3600)
  const minute = withHours
    ? Math.floor((seconds / 60) % 60)
    : Math.floor(seconds / 60)
  const second = milis ? (seconds % 60).toFixed(3) : Math.floor(seconds % 60)
  return `${
    withHours && hour !== 0
      ? `${hour < 10 ? `0${hour}` : hour}${separator}`
      : ''
  }${minute < 10 ? `0${minute}` : minute}${separator}${
    second < 10 ? `0${second}` : second
  }`
}

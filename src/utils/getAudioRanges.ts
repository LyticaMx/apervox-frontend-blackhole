import { config } from 'providers/config'
import { formatSeconds } from './formatTime'

export const getAudioIntervals = (duration: number): string[] => {
  const defaultTime = config.appConfig.timePerTranscriptionPage
  const numberOfIntervals = Math.floor(duration / defaultTime)
  const extraInterval = duration % defaultTime !== 0
  const ranges: string[] = []

  for (let i = 0; i < numberOfIntervals; i++) {
    if (i === 0) {
      ranges.push(`${formatSeconds(0)} - ${formatSeconds(defaultTime)}`)
    } else {
      ranges.push(
        `${formatSeconds(defaultTime * i + 1)} - ${formatSeconds(
          defaultTime * (i + 1)
        )}`
      )
    }
  }

  if (extraInterval) {
    ranges.push(
      `${formatSeconds(defaultTime * ranges.length + 1)} - ${formatSeconds(
        duration
      )}`
    )
  }

  return ranges
}

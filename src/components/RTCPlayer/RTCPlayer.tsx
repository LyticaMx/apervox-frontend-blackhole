import {
  PauseCircleIcon,
  PlayCircleIcon,
  SpeakerWaveIcon,
  XCircleIcon
} from '@heroicons/react/24/outline'
import Typography from 'components/Typography'
import useProgress from 'hooks/useProgress'
import { ReactElement, useMemo, useRef, useState } from 'react'
import useRTC from './hooks/useRTC'
import useAudioCall from './hooks/useAudioCall'
import { secondsToString } from 'utils/timeToString'
import clsx from 'clsx'
import { useIntl } from 'react-intl'
import { messages } from './messages'
import { useRTCPlayer } from 'context/RTCPlayer'
import ProgressBar from './ProgressBar'

const RTCPlayer = (): ReactElement => {
  const [play, setPlay] = useState<boolean>(true)
  const [volume, setVolume] = useState<number>(100)
  const [currentPlayed, setCurrentPlayed] = useState<number>(0)
  const [duration, setDuration] = useState<number>(0)
  const volumeRef = useRef<HTMLInputElement>(null)
  const { formatMessage } = useIntl()
  const audioRef = useRef<HTMLAudioElement>(null)
  useProgress(volumeRef, [volume])
  const {
    roomName,
    phoneNumber,
    evidenceID,
    actions: playerActions,
    target
  } = useRTCPlayer()
  // TODO: Falta definir como se obtendrá la conexión
  useRTC(audioRef, roomName)
  useAudioCall(audioRef, evidenceID)

  const openPlayer = useMemo<boolean>(
    () => Boolean(roomName || evidenceID),
    [roomName, evidenceID]
  )

  const togglePlay = (): void =>
    setPlay((val) => {
      if (!audioRef.current) return val
      if (val) audioRef.current.pause()
      else audioRef.current.play()

      return !val
    })

  const handleVolumeChange = (volume: number): void => {
    if (!audioRef.current) return
    setVolume(volume)
    audioRef.current.volume = volume / 100
  }

  return (
    <div
      className={clsx(
        // eslint-disable-next-line no-constant-condition
        openPlayer ? 'bottom-0' : '-bottom-[5.5rem]',
        'flex justify-between transition-all items-center h-[5.5rem] absolute right-0 left-0 ml-14 py-4 px-10 bg-secondary text-white'
      )}
    >
      <audio
        className="hidden"
        autoPlay
        controls
        ref={audioRef}
        onTimeUpdate={() =>
          setCurrentPlayed(audioRef.current?.currentTime ?? 0)
        }
        onLoadedMetadata={() => setDuration(audioRef.current?.duration ?? 0)}
      />
      <div>
        <Typography variant="subtitle" style="bold" className="uppercase">
          {target
            ? formatMessage(messages.name, { name: target })
            : formatMessage(messages.target, { phone: phoneNumber })}
        </Typography>
        {target && (
          <Typography variant="caption" className="text-neutral-300">
            {formatMessage(messages.target, { phone: phoneNumber })}
          </Typography>
        )}
      </div>
      <div>
        <div className="flex justify-center items-center">
          <button
            onClick={togglePlay}
            className="text-muted transition-colors hover:enabled:text-white"
          >
            {play ? (
              <PauseCircleIcon className="w-8" />
            ) : (
              <PlayCircleIcon className="w-8" />
            )}
          </button>
        </div>
        <div className="flex items-center justify-between gap-2">
          {roomName !== '' && (
            <>
              {/* <p>{secondsToString(0)}</p> */}
              <div className="h-1 w-96 bg-primary" />
              <p>{secondsToString(currentPlayed)}</p>
            </>
          )}
          {evidenceID !== '' && (
            <>
              <p>{secondsToString(currentPlayed)}</p>
              <ProgressBar
                audioRef={audioRef}
                currentTime={currentPlayed}
                duration={duration}
              />
              <p>{secondsToString(duration)}</p>
            </>
          )}
        </div>
      </div>
      <div className="flex flex-col justify-between items-end">
        <div>
          <button
            onClick={() => playerActions?.hidePlayer()}
            className="text-muted transition-colors hover:enabled:text-white"
          >
            <XCircleIcon className="w-5" />
          </button>
        </div>
        <div className="flex items-center gap-2">
          <SpeakerWaveIcon className="w-4" />
          <input
            type="range"
            min={0}
            max={100}
            step={1}
            value={volume}
            onChange={(e) => handleVolumeChange(+e.target.value)}
            className="player-slider slider-progress h-1 rounded-lg bg-white cursor-pointer w-48"
            ref={volumeRef}
          />
        </div>
      </div>
    </div>
  )
}

export { RTCPlayer }

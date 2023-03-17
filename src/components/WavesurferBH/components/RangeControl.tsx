/* eslint-disable @typescript-eslint/no-unused-vars */
import { ReactElement, useEffect, useRef, useState } from 'react'
import { useIMask, IMask } from 'react-imask'
import {
  formatSeconds,
  getSecondsFromTime,
  TimeSeconds
} from 'utils/formatTime'

interface Props {
  start: number
  end: number
  onChange?: ([start, end]: [number, number]) => void
}
const REGEX = /([01]?[0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])/
// const REGEX2 = /([01]?[0-9]|2[0-3])([0-5][0-9])([0-5][0-9])/

const RangeControl = (props: Props): ReactElement => {
  const waitUpdate = useRef(true)
  const [start, setStart] = useState(0)
  const [end, setEnd] = useState(0)

  const [opts] = useState({
    overwrite: true,
    autofix: true,
    mask: 'HH:MM:SS',
    blocks: {
      HH: {
        mask: IMask.MaskedRange,
        placeholderChar: 'HH',
        from: 0,
        to: 23,
        maxLength: 2
      },
      MM: {
        mask: IMask.MaskedRange,
        placeholderChar: 'MM',
        from: 0,
        to: 59,
        maxLength: 2
      },
      SS: {
        mask: IMask.MaskedRange,
        placeholderChar: 'SS',
        from: 0,
        to: 59,
        maxLength: 2
      }
    }
  })

  const startMask = useIMask(opts, {
    onComplete: (value) => {
      if (REGEX.test(value)) {
        const total = getSecondsFromTime(value as TimeSeconds)
        setStart(total)
      }
    }
  })
  const endMask = useIMask(opts, {
    onComplete: (value) => {
      if (REGEX.test(value)) {
        const total = getSecondsFromTime(value as TimeSeconds)
        setEnd(total)
      }
    }
  })

  useEffect(() => {
    startMask.setValue(formatSeconds(props.start, true))
    endMask.setValue(formatSeconds(props.end, true))
  }, [props.start, props.end])

  useEffect(() => {
    if (waitUpdate.current) {
      waitUpdate.current = false
      return
    }
    if (props.onChange) {
      props.onChange([start, end])
    }
  }, [start, end])

  return (
    <div className="flex gap-2">
      <div>
        <span className="text-sm text-white">Iniciar en</span>
        <input
          ref={startMask.ref}
          className="w-full bg-transparent border border-black text-white text-sm px-2 rounded-lg"
          value={startMask.value}
        />
      </div>
      <div>
        <span className="text-sm text-white">Terminar en</span>
        <input
          ref={endMask.ref}
          className="w-full bg-transparent border border-black text-white text-sm px-2 rounded-lg"
          value={endMask.value}
        />
      </div>
    </div>
  )
}

export default RangeControl
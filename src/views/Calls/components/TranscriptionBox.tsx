import clsx from 'clsx'
import { ReactElement } from 'react'
import { SegmentVM } from 'types/call'

import { textColorClassNames } from 'utils/classes'

interface Props {
  segments: SegmentVM[]
}

const TranscriptionBox = ({ segments }: Props): ReactElement => {
  const getColorClassName = (position): string => {
    const colorClass =
      textColorClassNamesArray[
        position -
          textColorClassNamesArray.length *
            parseInt(String(position / textColorClassNamesArray.length))
      ]

    return colorClass
  }

  const textColorClassNamesArray = Object.values(textColorClassNames)

  return (
    <div className="w-full">
      <p className="text-sm text-slate-500">
        {segments.map((segment, index) => (
          <span
            key={segment.id}
            className={clsx(getColorClassName(index))}
          >{`${segment.transcription} `}</span>
        ))}
      </p>
    </div>
  )
}

export default TranscriptionBox

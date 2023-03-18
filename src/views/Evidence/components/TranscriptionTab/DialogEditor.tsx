import { CellContext } from '@tanstack/react-table'
import useAutosizeTextarea from 'hooks/useAutosizeTextarea'
import { ChangeEvent, ReactElement, useRef } from 'react'
import { TranscriptionSegment } from '.'

interface Props {
  cellContext: CellContext<TranscriptionSegment, unknown>
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void
}

const DialogEditor = (props: Props): ReactElement => {
  const {
    cellContext: { getValue, row },
    onChange
  } = props
  const ref = useRef<HTMLTextAreaElement>(null)
  const value = getValue<string>()
  useAutosizeTextarea(ref.current, value)
  const { interval, speaker } = row.original

  return (
    <textarea
      name={`${interval}-${speaker}`}
      ref={ref}
      value={value}
      onChange={onChange}
      className="w-full border-none p-0 font-normal !outline-none focus:shadow-none focus:ring-0 max-h-52 resize-none"
    />
  )
}

export default DialogEditor

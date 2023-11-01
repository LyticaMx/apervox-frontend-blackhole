import { CellContext } from '@tanstack/react-table'
import useAutosizeTextarea from 'hooks/useAutosizeTextarea'
import { ChangeEvent, ReactElement, useRef } from 'react'
import { RegionInterface } from 'components/WaveSurferContext/types'

interface Props {
  cellContext: CellContext<RegionInterface, unknown>
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void
  disabled: boolean
}

const DialogEditor = (props: Props): ReactElement => {
  const {
    cellContext: { getValue, row },
    onChange,
    disabled
  } = props
  const ref = useRef<HTMLTextAreaElement>(null)
  const value = getValue<string>()
  useAutosizeTextarea(ref.current, value)
  const { id, data } = row.original

  return (
    <textarea
      name={id}
      ref={ref}
      disabled={disabled}
      value={data?.text ?? ''}
      onChange={onChange}
      className="w-full border-none p-0 font-normal !outline-none focus:shadow-none focus:ring-0 max-h-52 resize-none"
    />
  )
}

export default DialogEditor

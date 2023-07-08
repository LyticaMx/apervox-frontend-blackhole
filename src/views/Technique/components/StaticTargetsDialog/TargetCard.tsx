import { UserIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import Checkbox from 'components/Form/Checkbox'
import Typography from 'components/Typography'
import { ReactElement } from 'react'

interface Props {
  id: string
  alias: string
  phone: string
  line: string
  selected?: boolean
  onChange?: () => void
  disabled?: boolean
}

const TargetCard = (props: Props): ReactElement => {
  return (
    <div className="py-1">
      <div
        className={clsx(
          'flex items-center justify-between border rounded-md px-1',
          props.selected ? 'border-primary-500' : ' border-secondary-400'
        )}
      >
        <div className="flex items-center gap-2">
          <UserIcon className="w-5 h-5" />
          <div>
            <Typography style="semibold">{props.alias}</Typography>
            <div className="flex gap-2">
              <Typography variant="body2">
                <span className="font-semibold mr-1">Número:</span>
                {props.phone}
              </Typography>
              <Typography variant="body2">
                <span className="font-semibold mr-1">Línea:</span>
                {props.line}
              </Typography>
            </div>
          </div>
        </div>
        <Checkbox
          checked={props.selected}
          disabled={props.disabled}
          onChange={props.onChange}
        />
      </div>
    </div>
  )
}

export default TargetCard

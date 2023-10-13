import { XCircleIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import Dialog from 'components/Dialog'
import Typography from 'components/Typography'
import { ReactElement, useMemo, useState } from 'react'
import { useIntl } from 'react-intl'
import { multiValueContainerMessages } from '../messages'
import Button from 'components/Button'
import { actionsMessages } from 'globalMessages'

interface Props {
  values: any[]
  onChange: (value: any[]) => void
  maxItems: number
  selectedItemsTitle?: string
  disabled?: boolean
}

const MultiValueContainer = (props: Props): ReactElement | null => {
  const [seeAll, setSeeAll] = useState<boolean>(false)
  const { formatMessage } = useIntl()
  const maxItems = props.maxItems > 0 ? props.maxItems : 5

  const printableItems = useMemo<ReactElement[]>(() => {
    const items = (
      props.values.length > maxItems
        ? props.values.slice(0, maxItems)
        : props.values
    ).map((current) => (
      <Item
        key={current.value}
        label={current.label}
        value={current.value}
        disabled={props.disabled}
        onClick={() =>
          props.onChange(
            props.values.filter((item) => item.value !== current.value)
          )
        }
      />
    ))

    if (props.values.length > maxItems) {
      items.push(
        <button
          type="button"
          className="border border-gray-300 px-2 rounded-md hover:enabled:bg-primary hover:enabled:bg-opacity-25  transition-colors"
          onClick={() => setSeeAll(true)}
        >{`+${props.values.length - maxItems}`}</button>
      )
    }

    return items
  }, [props.values.length])

  return (
    <div
      className={clsx(props.values.length && 'mt-2', 'flex gap-2 flex-wrap')}
    >
      <Dialog open={seeAll} onClose={() => setSeeAll(false)}>
        <Typography
          variant="title"
          className="text-center text-primary"
          style="medium"
        >
          {props.selectedItemsTitle ??
            formatMessage(multiValueContainerMessages.selectedElements)}
        </Typography>
        <div className="flex items-center gap-1 flex-wrap mt-2">
          {props.values.map((current) => (
            <Item
              key={current.value}
              label={current.label}
              value={current.value}
              disabled={props.disabled}
              onClick={() =>
                props.onChange(
                  props.values.filter((item) => item.value !== current.value)
                )
              }
            />
          ))}
        </div>
        <div className="text-right mt-2">
          <Button
            color="primary"
            variant="contained"
            size="md"
            type="button"
            onClick={() => setSeeAll(false)}
          >
            {formatMessage(actionsMessages.accept)}
          </Button>
        </div>
      </Dialog>
      {printableItems}
    </div>
  )
}

interface ItemProps {
  label: string
  value: string
  onClick: () => void
  disabled?: boolean
}

const Item = (props: ItemProps): ReactElement => (
  <div className="flex items-center gap-1 border border-gray-300 px-2 rounded-lg hover:bg-gray-120">
    <p>{props.label}</p>
    <button
      disabled={props.disabled}
      type="button"
      className="text-muted hover:enabled:bg-opacity-30 rounded-full hover:enabled:text-red-600"
      onClick={props.onClick}
    >
      <XCircleIcon className="w-5 h-5" />
    </button>
  </div>
)

export default MultiValueContainer

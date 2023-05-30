import { ReactElement, useState, useMemo } from 'react'
import { useIntl } from 'react-intl'
import { PlusCircleIcon } from '@heroicons/react/24/outline'

// import Button from 'components/Button'
import TextField from 'components/Form/Textfield'
import Typography from 'components/Typography'
import Scroller from 'components/Scroller'
import IconButton from 'components/Button/IconButton'

import { Target } from 'types/technique'
import { actionsMessages } from 'globalMessages'

import TargetCard from './TargetCard'
import CreateTargetDialog from './CreateTargetDialog'
import { targetListMessages } from '../messages'

interface Props {
  onSelectItem: (item: Target) => void
  data: Target[]
}

const TargetList = ({ data, onSelectItem }: Props): ReactElement => {
  let timer

  const [searchValue, setSearchValue] = useState<string>('')
  const [targetsChecked, setTargetsChecked] = useState<string[]>([]) // Multi selección de objetivos
  const [openTargetForm, setOpenTargetForm] = useState(false)
  const { formatMessage } = useIntl()

  const filteredSpeakers = useMemo(() => {
    const matches = data.filter(
      (target) =>
        target.name.toUpperCase().includes(searchValue.toLocaleUpperCase()) ||
        target.phone_number.toUpperCase().includes(searchValue.toUpperCase())
    )

    return matches
  }, [searchValue, data])

  const handleCheckTarget = (target: Target): void => {
    let newList: string[] = []
    const alreadyChecked = targetsChecked.some((id) => id === target.id)

    if (alreadyChecked) {
      newList = targetsChecked.filter((id) => id !== target.id)
    } else {
      newList = [...targetsChecked, target.id ?? '']
    }

    setTargetsChecked(newList)
  }

  return (
    <div className="flex flex-col h-full">
      <Typography variant="body2" style="semibold" className="uppercase">
        {formatMessage(targetListMessages.totalTargets, {
          total: data.length
        })}
      </Typography>
      <div className="flex gap-2 items-center">
        <TextField
          placeholder={`${formatMessage(actionsMessages.search)}...`}
          className="flex-1"
          onChange={(e) => {
            clearTimeout(timer)
            const value = e.target.value

            timer = setTimeout(() => {
              setSearchValue(value)
            }, 1000)
          }}
        />
        <IconButton
          variant="contained"
          color="indigo"
          tooltip={formatMessage(targetListMessages.addTarget)}
        >
          <PlusCircleIcon className="h-5 w-5" />
        </IconButton>
        {/* <Button
          variant="contained"
          color="indigo"
          className="w-5/12"
          onClick={() => setOpenTargetForm(true)}
        >
          {formatMessage(targetListMessages.addTarget)}
        </Button> */}
      </div>
      <Scroller className="flex flex-col gap-2 py-2">
        {filteredSpeakers.map((target) => (
          <TargetCard
            key={target.id}
            data={target}
            isChecked={targetsChecked.some((id) => target.id === id)}
            onClick={onSelectItem}
            onCheck={handleCheckTarget}
          />
        ))}
      </Scroller>
      <CreateTargetDialog
        open={openTargetForm}
        onClose={() => setOpenTargetForm(false)}
        onAccept={() => {
          setOpenTargetForm(false)
        }}
      />
    </div>
  )
}

export default TargetList

import { ReactElement, useState, useMemo } from 'react'

// import Button from 'components/Button'
import TextField from 'components/Form/Textfield'
import Typography from 'components/Typography'

import { Target } from 'types/technique'

import ObjectiveCard from './ObjectiveCard'
import CreateObjectiveDialog from './CreateObjectiveDialog'
import { useIntl } from 'react-intl'
import { actionsMessages } from 'globalMessages'
import { objectiveListMessages } from '../messages'
import Scroller from 'components/Scroller'
import IconButton from 'components/Button/IconButton'
import { PlusCircleIcon } from '@heroicons/react/24/outline'

interface Props {
  onSelectItem: (item: Target) => void
  data: Target[]
}

const ObjectiveList = ({ data, onSelectItem }: Props): ReactElement => {
  let timer

  const [searchValue, setSearchValue] = useState<string>('')
  const [objectivesChecked, setObjectivesChecked] = useState<string[]>([]) // Multi selección de objetivos
  const [openObjectiveForm, setOpenObjectiveForm] = useState(false)
  const { formatMessage } = useIntl()

  const filteredSpeakers = useMemo(() => {
    const matches = data.filter(
      (objective) =>
        objective.name
          .toUpperCase()
          .includes(searchValue.toLocaleUpperCase()) ||
        objective.phone_number.toUpperCase().includes(searchValue.toUpperCase())
    )

    return matches
  }, [searchValue, data])

  const handleCheckObjective = (objective: Target): void => {
    let newList: string[] = []
    const alreadyChecked = objectivesChecked.some((id) => id === objective.id)

    if (alreadyChecked) {
      newList = objectivesChecked.filter((id) => id !== objective.id)
    } else {
      newList = [...objectivesChecked, objective.id]
    }

    setObjectivesChecked(newList)
  }

  return (
    <div className="flex flex-col h-full">
      <Typography variant="body2" style="semibold" className="uppercase">
        {formatMessage(objectiveListMessages.totalObjectives, {
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
          tooltip={formatMessage(objectiveListMessages.addObjective)}
        >
          <PlusCircleIcon className="h-5 w-5" />
        </IconButton>
        {/* <Button
          variant="contained"
          color="indigo"
          className="w-5/12"
          onClick={() => setOpenObjectiveForm(true)}
        >
          {formatMessage(objectiveListMessages.addObjective)}
        </Button> */}
      </div>
      <Scroller className="flex flex-col gap-2 py-2">
        {filteredSpeakers.map((objective) => (
          <ObjectiveCard
            key={objective.id}
            data={objective}
            isChecked={objectivesChecked.some((id) => objective.id === id)}
            onClick={onSelectItem}
            onCheck={handleCheckObjective}
          />
        ))}
      </Scroller>
      <CreateObjectiveDialog
        open={openObjectiveForm}
        onClose={() => setOpenObjectiveForm(false)}
        onAccept={(objective: Target) => {
          console.log(objective)
          setOpenObjectiveForm(false)
        }}
      />
    </div>
  )
}

export default ObjectiveList

import { ReactElement, useState, useMemo } from 'react'

import Button from 'components/Button'
import TextField from 'components/Form/Textfield'
import Typography from 'components/Typography'

import { Objective } from 'types/technique'

import ObjectiveCard from './ObjectiveCard'
import CreateObjectiveDialog from './CreateObjectiveDialog'

interface Props {
  onSelectItem: (item: Objective) => void
  data: Objective[]
}

const ObjectiveList = ({ data, onSelectItem }: Props): ReactElement => {
  let timer

  const [searchValue, setSearchValue] = useState<string>('')
  const [objectivesChecked, setObjectivesChecked] = useState<string[]>([]) // Multi selección de objetivos
  const [openObjectiveForm, setOpenObjectiveForm] = useState(false)

  const filteredSpeakers = useMemo(() => {
    const matches = data.filter(
      (objective) =>
        objective.name
          .toUpperCase()
          .includes(searchValue.toLocaleUpperCase()) ||
        objective.phone_number.toUpperCase().includes(searchValue.toUpperCase())
    )

    return matches
  }, [searchValue])

  const handleCheckObjective = (objective: Objective): void => {
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
    <div className="grid grid-cols-1 gap-3">
      <Typography
        variant="body2"
        style="semibold"
        className="uppercase"
      >{`${data.length} Objetivos existentes en la técnica de investigación`}</Typography>
      <div className="flex gap-2">
        <TextField
          placeholder="Buscar..."
          className="w-8/12"
          onChange={(e) => {
            clearTimeout(timer)
            const value = e.target.value

            timer = setTimeout(() => {
              setSearchValue(value)
            }, 1000)
          }}
        />
        <Button
          variant="contained"
          color="indigo"
          className="w-4/12"
          onClick={() => setOpenObjectiveForm(true)}
        >
          Agregar objetivo
        </Button>
      </div>
      {filteredSpeakers.map((objective) => (
        <ObjectiveCard
          key={objective.id}
          data={objective}
          isChecked={objectivesChecked.some((id) => objective.id === id)}
          onClick={onSelectItem}
          onCheck={handleCheckObjective}
        />
      ))}
      <CreateObjectiveDialog
        open={openObjectiveForm}
        onClose={() => setOpenObjectiveForm(false)}
        onAccept={(objective: Objective) => {
          console.log(objective)
          setOpenObjectiveForm(false)
        }}
      />
    </div>
  )
}

export default ObjectiveList

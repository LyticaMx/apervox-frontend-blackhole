import { ReactElement, useState } from 'react'
import { useToggle } from 'usehooks-ts'

import Title from 'components/Title'
import GoBackButton from 'components/GoBackButton'

import { useFormatMessage } from 'hooks/useIntl'
import { Objective, Technique } from 'types/technique'

import TechniqueFilter from './components/TechniqueFilter'
import TechniqueList from './components/TechniqueList'
import FormSection from './components/FormSection'
import TechniqueInfo from './components/TechinqueInfo'
import { techniquesMessages } from './messages'

// TODO: replace this with context data
import { techniquesData, objectiveData } from './mocks'
import CreateTechniqueDrawer from './components/CreateTechniqueDrawer'

const Techniques = (): ReactElement => {
  const getMessage = useFormatMessage(techniquesMessages)

  const [openCreateDrawer, toggleOpenCreateDrawer] = useToggle(false)
  const [techinqueSelected, setTechinqueSelected] = useState<Technique | null>(
    null
  )
  const [objectiveSelected, setObjectiveSelected] = useState<Objective | null>(
    null
  )

  // const toggleMode = (): void => setTechinqueSelected((prev) => !prev)

  return (
    <>
      <div className="flex justify-between">
        <div className="flex justify-start items-center">
          {techinqueSelected && (
            <GoBackButton onClick={() => setTechinqueSelected(null)} />
          )}

          <div className="ml-2">
            <Title className="uppercase">{getMessage('title')}</Title>
            <p className="uppercase">04 {getMessage('subtitle')}</p>
          </div>
        </div>

        <TechniqueFilter toggleOpen={toggleOpenCreateDrawer} />
      </div>

      <div className="flex gap-4 mt-2 mb-4">
        <TechniqueList
          data={techniquesData}
          shortMode={Boolean(techinqueSelected)}
          onSelectItem={(techinque) => {
            setTechinqueSelected(techinque)
          }}
        />
        <FormSection
          show={Boolean(techinqueSelected)}
          objective={objectiveSelected as Objective}
          technique={techinqueSelected as Technique}
        />
        <TechniqueInfo
          technique={techinqueSelected as Technique}
          objectiveList={objectiveData}
          show={Boolean(techinqueSelected)}
          onSelectItem={setObjectiveSelected}
        />
      </div>
      <CreateTechniqueDrawer
        open={openCreateDrawer}
        onClose={toggleOpenCreateDrawer}
      />
    </>
  )
}

export default Techniques

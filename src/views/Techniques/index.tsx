import { ReactElement, useState, useEffect } from 'react'
import { useFormatMessage } from 'hooks/useIntl'
import { useToggle } from 'usehooks-ts'
import Title from 'components/Title'
// import { useWorkGroups } from 'context/WorkGroups'
import GoBackButton from 'components/GoBackButton'
import TechniqueFilter from './components/TechniqueFilter'
import DeleteDialog from './components/DeleteDialog'
import TechniqueList from './components/TechniqueList'
// import CreateWorkGroupDrawer from './components/CreateWorkGroupDrawer'
// import EditWorkGroupDrawer from './components/EditWorkGroupDrawer'
import { techniquesMessages } from './messages'

// TODO: replace this with context data
import { techniquesData } from './mocks'

const Techniques = (): ReactElement => {
  const getMessage = useFormatMessage(techniquesMessages)
  const [openDeleteDialog, toggleDeleteDialog] = useToggle(false)
  const [openFilters, toggleOpenFilters] = useToggle(false)
  const [shortMode, setShortMode] = useState(false)

  console.log(openFilters)

  const toggleMode = (): void => setShortMode((prev) => !prev)

  useEffect(() => {
    setTimeout(() => toggleMode(), 2000)
  }, [])

  return (
    <>
      <div className="flex justify-between">
        <div className="flex justify-start items-center">
          {shortMode && <GoBackButton onClick={toggleMode} />}

          <div className="ml-2">
            <Title className="uppercase">{getMessage('title')}</Title>
            <p className="uppercase">04 {getMessage('subtitle')}</p>
          </div>
        </div>

        <TechniqueFilter toggleOpen={toggleOpenFilters} />

        {/* <CreateWorkGroupDrawer
          open={openCreateDrawer}
          onClose={toggleOpenCreateDrawer}
        /> */}

        <DeleteDialog open={openDeleteDialog} onClose={toggleDeleteDialog} />

        {/* <EditWorkGroupDrawer
          open={openEditDrawer}
          onClose={toggleOpenEditDrawer}
        /> */}
      </div>

      <div className="flex gap-4 mt-2 mb-4">
        <TechniqueList
          data={techniquesData}
          shortMode={shortMode}
          onSelectItem={toggleMode}
        />
      </div>
    </>
  )
}

export default Techniques

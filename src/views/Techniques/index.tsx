/* eslint-disable @typescript-eslint/no-unused-vars */
import { ReactElement, useEffect } from 'react'
import { useToggle } from 'usehooks-ts'

import Title from 'components/Title'

import { useFormatMessage } from 'hooks/useIntl'

import TechniqueFilter from './components/TechniqueFilter'
import TechniqueList from './components/TechniqueList'

import { techniquesMessages } from './messages'

import CreateTechniqueDrawer from './components/CreateTechniqueDrawer'
import { useTechniques } from 'context/Techniques'
import { formatTotal } from 'utils/formatTotal'

const Techniques = (): ReactElement => {
  const getMessage = useFormatMessage(techniquesMessages)
  const { actions, total } = useTechniques()

  const [openCreateDrawer, toggleOpenCreateDrawer] = useToggle(false)

  useEffect(() => {
    actions?.get({}, true)
  }, [])

  return (
    <>
      <div className="flex justify-between mb-4">
        <div className="flex justify-start items-center">
          <div className="ml-2">
            <Title className="uppercase">{getMessage('title')}</Title>
            <p className="uppercase">
              {formatTotal(total, getMessage('subtitle'))}
            </p>
          </div>
        </div>

        <TechniqueFilter toggleOpen={toggleOpenCreateDrawer} />
      </div>

      <TechniqueList />

      <CreateTechniqueDrawer
        open={openCreateDrawer}
        onClose={toggleOpenCreateDrawer}
      />
    </>
  )
}

export default Techniques

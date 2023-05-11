/* eslint-disable @typescript-eslint/no-unused-vars */
import { ReactElement, useEffect, useState } from 'react'
import { useToggle } from 'usehooks-ts'

import Title from 'components/Title'

import { useFormatMessage } from 'hooks/useIntl'
import { Target, Technique } from 'types/technique'

import TechniqueFilter from './components/TechniqueFilter'
import TechniqueList from './components/TechniqueList'

import { techniquesMessages } from './messages'

import CreateTechniqueDrawer from './components/CreateTechniqueDrawer'
import { useTechniques } from 'context/Techniques'

const Techniques = (): ReactElement => {
  const getMessage = useFormatMessage(techniquesMessages)
  const { actions } = useTechniques()

  const [openCreateDrawer, toggleOpenCreateDrawer] = useToggle(false)

  useEffect(() => {
    actions?.getTechniques()
  }, [])

  return (
    <>
      <div className="flex justify-between mb-4">
        <div className="flex justify-start items-center">
          <div className="ml-2">
            <Title className="uppercase">{getMessage('title')}</Title>
            <p className="uppercase">04 {getMessage('subtitle')}</p>
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

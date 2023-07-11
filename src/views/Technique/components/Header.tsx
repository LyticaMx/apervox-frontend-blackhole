import { useTechnique } from 'context/Technique'
import { ReactElement } from 'react'
import { pathRoute } from 'router/routes'

import GoBackButton from 'components/GoBackButton'
import Title from 'components/Title'

import TechniqueFilter from './TechniqueFilter'
import { ChevronRightIcon } from '@heroicons/react/24/outline'

const Header = (): ReactElement => {
  const { technique, target } = useTechnique()

  return (
    <div className="flex justify-between">
      <div className="flex justify-start items-center">
        <GoBackButton route={pathRoute.techniques} className="self-center" />

        <div className="ml-2 flex justify-center items-center gap-3">
          <Title className="uppercase">{technique?.name}</Title>
          {target && (
            <>
              <ChevronRightIcon className="w-4 h-4" />
              <Title className="uppercase">{target?.alias}</Title>
            </>
          )}
        </div>
      </div>

      <TechniqueFilter />
    </div>
  )
}

export default Header

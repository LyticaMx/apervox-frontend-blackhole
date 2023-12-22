import { useTechnique } from 'context/Technique'
import { ReactElement } from 'react'
import { pathRoute } from 'router/routes'

import GoBackButton from 'components/GoBackButton'
import Title from 'components/Title'

import TechniqueFilter from './TechniqueFilter'
import { ChevronRightIcon, XMarkIcon } from '@heroicons/react/24/outline'
import IconButton from 'components/Button/IconButton'

const Header = (): ReactElement => {
  const { technique, target, actions } = useTechnique()

  return (
    <div className="flex justify-between">
      <div className="flex justify-start items-center">
        <GoBackButton
          route={pathRoute.techniques.many}
          className="self-center"
        />

        <div className="ml-2 flex justify-center items-center gap-3">
          <Title className="uppercase">{technique?.name}</Title>
          {target && (
            <>
              <ChevronRightIcon className="w-4 h-4" />
              <Title className="uppercase">{target?.alias}</Title>
              <IconButton
                className="bg-primary-400 enabled:hover:bg-primary-500 cursor-pointer p-0.5 text-white rounded-full"
                onClick={() => actions?.setTarget(undefined)}
              >
                <XMarkIcon className="w-3 h-3" />
              </IconButton>
            </>
          )}
        </div>
      </div>

      <TechniqueFilter />
    </div>
  )
}

export default Header

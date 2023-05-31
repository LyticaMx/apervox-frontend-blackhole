import { useTechnique } from 'context/Technique'
import { ReactElement } from 'react'
import { pathRoute } from 'router/routes'

import GoBackButton from 'components/GoBackButton'
import Title from 'components/Title'

import TechniqueFilter from './TechniqueFilter'

const Header = (): ReactElement => {
  const { technique } = useTechnique()

  return (
    <div className="flex justify-between">
      <div className="flex justify-start items-center">
        <GoBackButton route={pathRoute.techniques} className="self-center" />

        <div className="ml-2 flex flex-col justify-center">
          <Title className="uppercase">{technique?.name}</Title>
        </div>
      </div>

      <TechniqueFilter />
    </div>
  )
}

export default Header

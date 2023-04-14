import GoBackButton from 'components/GoBackButton'
import Title from 'components/Title'
import { useTechnique } from 'context/Technique'
import { ReactElement } from 'react'
import { useHistory } from 'react-router-dom'
import { pathRoute } from 'router/routes'

import TechniqueFilter from './TechniqueFilter'

const Header = (): ReactElement => {
  const history = useHistory()
  const { technique } = useTechnique()

  return (
    <div className="flex justify-between">
      <div className="flex justify-start items-center">
        <GoBackButton onClick={() => history.push(pathRoute.techniques)} />

        <div className="ml-2 flex flex-col justify-center">
          <Title className="uppercase">{technique?.name}</Title>
        </div>
      </div>

      <TechniqueFilter />
    </div>
  )
}

export default Header

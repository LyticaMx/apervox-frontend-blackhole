import { ReactElement } from 'react'
import { Route } from 'router/routes'
import LinkButton from './LinkButton'

interface Props {
  route: Route
}

const Item = ({ route }: Props): ReactElement => {
  const submodules = route.modules.filter((item) => item.sidebar)

  if (submodules.length) {
    return (
      <div className="flex flex-col space-y-2 items-center !mb-2">
        {submodules.map((item, index) => (
          <LinkButton key={index} routeModule={item} />
        ))}
      </div>
    )
  }

  return <LinkButton routeModule={route} />
}

export default Item

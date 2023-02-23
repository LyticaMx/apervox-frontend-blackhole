import { ReactElement } from 'react'
import { NavLink } from 'react-router-dom'
import { pathRoute } from 'router/routes'

const NavOptions = (): ReactElement => {
  return (
    <div className="absolute top-2">
      <NavLink
        exact
        to={pathRoute.config.general}
        className="text-secondary-gray mr-5 font-medium px-2 py-1 rounded-md hover:bg-[#F4F9FF] hover:text-primary"
        activeClassName="bg-[#F4F9FF] !text-primary"
      >
        General
      </NavLink>
      <NavLink
        to={pathRoute.config.media}
        exact
        className="text-secondary-gray mr-5 font-medium px-2 py-1 rounded-md hover:bg-[#F4F9FF] hover:text-primary"
        activeClassName="bg-[#F4F9FF] !text-primary"
      >
        Medios y compañias
      </NavLink>
      <NavLink
        exact
        to={pathRoute.config.telecom}
        className="text-secondary-gray font-medium px-2 py-1 rounded-md hover:bg-[#F4F9FF] hover:text-primary"
        activeClassName="bg-[#F4F9FF] !text-primary"
      >
        Estaciones de telecomunicaciones
      </NavLink>
    </div>
  )
}

export default NavOptions

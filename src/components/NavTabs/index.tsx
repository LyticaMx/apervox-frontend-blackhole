import { ReactElement } from 'react'
import { NavLink } from 'react-router-dom'

interface Tab {
  to: string
  name: string
  exact?: boolean
}

interface Props {
  tabs: Tab[]
}

const NavTabs = (props: Props): ReactElement => {
  const { tabs } = props

  return (
    <div className="absolute top-2">
      {tabs.map((tab, index) => (
        <NavLink
          key={`${tab.name}-${index}`}
          exact={tab.exact ?? true}
          to={tab.to}
          className="text-secondary-gray mr-5 font-medium px-2 py-1 rounded-md hover:bg-[#F4F9FF] hover:text-primary"
          activeClassName="bg-[#F4F9FF] !text-primary"
        >
          {tab.name}
        </NavLink>
      ))}
    </div>
  )
}

export default NavTabs

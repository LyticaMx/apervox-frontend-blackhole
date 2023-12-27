import { ReactElement } from 'react'
import { useIntl } from 'react-intl'
import { NavLink } from 'react-router-dom'
import { pathRoute } from 'router/routes'
import { messages } from '../messages'
import GoBackButton from 'components/GoBackButton'

interface Props {
  canGoBack?: boolean
}

const NavLinks = (props: Props): ReactElement => {
  const { formatMessage } = useIntl()

  return (
    <nav className="flex gap-3">
      {props.canGoBack && (
        <GoBackButton className="self-center" route={pathRoute.audit.general} />
      )}
      <NavLink
        to={pathRoute.audit.failedLoginAttemps}
        className="font-semibold text-secondary uppercase px-1 text-base hover:bg-gray-100 hover:text-primary transition-colors duration-200"
        activeClassName="bg-gray-100 !text-primary"
      >
        {formatMessage(messages.loginFailedAttemps)}
      </NavLink>
      <NavLink
        to={pathRoute.audit.blockedUsers}
        className="font-semibold text-secondary uppercase px-1 text-base hover:bg-gray-100 hover:text-primary transition-colors duration-200"
        activeClassName="bg-gray-100 !text-primary"
      >
        {formatMessage(messages.blockedUsers)}
      </NavLink>
    </nav>
  )
}

export default NavLinks

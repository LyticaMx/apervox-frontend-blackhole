import NavTabs from 'components/NavTabs'
import { platformMessages } from 'globalMessages'
import { ReactElement, useMemo } from 'react'
import { useIntl } from 'react-intl'
import { pathRoute } from 'router/routes'
import { messages } from '../messages'
import { ACTION, SUBJECT, useAbility } from 'context/Ability'
import { useLanguage } from 'context/Language'

const NavOptions = (): ReactElement => {
  const { formatMessage } = useIntl()
  const ability = useAbility()
  const { localeI18n } = useLanguage()

  const tabs = useMemo(() => {
    const tabs = [
      {
        to: pathRoute.config.general,
        name: formatMessage(platformMessages.main)
      }
    ]

    if (
      ability.can(ACTION.READ, SUBJECT.DEVICES) ||
      ability.can(ACTION.READ, SUBJECT.CARRIERS) ||
      ability.can(ACTION.READ, SUBJECT.ACQUISITION_MEDIUMS)
    ) {
      tabs.push({
        to: pathRoute.config.media,
        name: formatMessage(messages.mediaAndDevices)
      })
    }

    // TO BE DEFINED
    /*
    tabs.push({
      to: pathRoute.config.telecom,
      name: formatMessage(messages.telecomStations)
    })
    */

    return tabs
  }, [ability.rules, localeI18n])

  return <NavTabs tabs={tabs} />
}

export default NavOptions

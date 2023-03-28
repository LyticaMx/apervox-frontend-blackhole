import clsx from 'clsx'
import { useState, ReactElement } from 'react'
import { objectiveFormsTabs, OBJECTIVE_FORMS_TABS } from '../../constants'
import CustomTabs from '../CustomTabs'
import LanguagesForm from './LanguagesForm'
import SocialMediaForm from './SocialMediaForm'
import AccountBankForm from './AccountBankForm'

const ObjectiveForms = (): ReactElement => {
  const [activeForm, setActiveForm] = useState(
    OBJECTIVE_FORMS_TABS.PERSONAL_DATA
  )

  return (
    <>
      <CustomTabs
        classNames={{ container: 'my-4' }}
        items={objectiveFormsTabs}
        onChange={(tabClicked) => {
          setActiveForm(tabClicked as OBJECTIVE_FORMS_TABS)
        }}
        active={activeForm}
      />

      <div
        className={clsx(
          activeForm !== OBJECTIVE_FORMS_TABS.LANGUAGE && 'hidden'
        )}
      >
        <LanguagesForm />
      </div>

      <div
        className={clsx(
          activeForm !== OBJECTIVE_FORMS_TABS.SOCIAL_MEDIA && 'hidden'
        )}
      >
        <SocialMediaForm />
      </div>

      <div
        className={clsx(
          activeForm !== OBJECTIVE_FORMS_TABS.ACCOUNT_BANK && 'hidden'
        )}
      >
        <AccountBankForm />
      </div>
    </>
  )
}

export default ObjectiveForms

import clsx from 'clsx'
import { useState, ReactElement } from 'react'
import { objectiveFormsTabs, OBJECTIVE_FORMS_TABS } from '../../constants'
import CustomTabs from '../CustomTabs'
import LanguagesForm from './LanguagesForm'
import SocialMediaForm from './SocialMediaForm'
import AccountBankForm from './AccountBankForm'
import VehiclesForm from './VehiclesForm'
import CompaniesForm from './CompaniesForm'
import PropertiesForm from './PropertiesForm'
import ScheduleForm from './ScheduleForm'
import FrequentPlacesForm from './FrequentPlacesForm'
import OrganizationsForm from './OrganizationsForm'
import LaborForm from './LaborForm'
import AcademicForm from './AcademicForm'
import PhysicalDescriptionForm from './PhysicalDescriptionForm'
import PersonalDataForm from './PersonalDataForm'

const ObjectiveForms = (): ReactElement => {
  const [activeForm, setActiveForm] = useState(
    OBJECTIVE_FORMS_TABS.PERSONAL_DATA
  )

  return (
    <div>
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
        {activeForm === OBJECTIVE_FORMS_TABS.LANGUAGE && <LanguagesForm />}
      </div>

      <div
        className={clsx(
          activeForm !== OBJECTIVE_FORMS_TABS.SOCIAL_MEDIA && 'hidden'
        )}
      >
        {activeForm === OBJECTIVE_FORMS_TABS.SOCIAL_MEDIA && (
          <SocialMediaForm />
        )}
      </div>

      <div
        className={clsx(
          activeForm !== OBJECTIVE_FORMS_TABS.ACCOUNT_BANK && 'hidden'
        )}
      >
        {activeForm === OBJECTIVE_FORMS_TABS.ACCOUNT_BANK && (
          <AccountBankForm />
        )}
      </div>

      <div
        className={clsx(activeForm !== OBJECTIVE_FORMS_TABS.CARS && 'hidden')}
      >
        {activeForm === OBJECTIVE_FORMS_TABS.CARS && <VehiclesForm />}
      </div>

      <div
        className={clsx(
          activeForm !== OBJECTIVE_FORMS_TABS.COMPANIES && 'hidden'
        )}
      >
        {activeForm === OBJECTIVE_FORMS_TABS.COMPANIES && <CompaniesForm />}
      </div>

      <div
        className={clsx(
          activeForm !== OBJECTIVE_FORMS_TABS.PROPERTIES && 'hidden'
        )}
      >
        {activeForm === OBJECTIVE_FORMS_TABS.PROPERTIES && <PropertiesForm />}
      </div>

      <div
        className={clsx(
          activeForm !== OBJECTIVE_FORMS_TABS.SCHEDULE_DATA && 'hidden'
        )}
      >
        {activeForm === OBJECTIVE_FORMS_TABS.SCHEDULE_DATA && <ScheduleForm />}
      </div>

      <div
        className={clsx(
          activeForm !== OBJECTIVE_FORMS_TABS.FREQUENT_PLACES && 'hidden'
        )}
      >
        {activeForm === OBJECTIVE_FORMS_TABS.FREQUENT_PLACES && (
          <FrequentPlacesForm />
        )}
      </div>

      <div
        className={clsx(
          activeForm !== OBJECTIVE_FORMS_TABS.ORGANIZATION_DATA && 'hidden'
        )}
      >
        {activeForm === OBJECTIVE_FORMS_TABS.ORGANIZATION_DATA && (
          <OrganizationsForm />
        )}
      </div>

      <div
        className={clsx(
          activeForm !== OBJECTIVE_FORMS_TABS.ACADEMIC_DATA && 'hidden'
        )}
      >
        {activeForm === OBJECTIVE_FORMS_TABS.ACADEMIC_DATA && <AcademicForm />}
      </div>

      <div
        className={clsx(
          activeForm !== OBJECTIVE_FORMS_TABS.LABOR_DATA && 'hidden'
        )}
      >
        {activeForm === OBJECTIVE_FORMS_TABS.LABOR_DATA && <LaborForm />}
      </div>

      <div
        className={clsx(
          activeForm !== OBJECTIVE_FORMS_TABS.PHYSICAL_DESCRIPTION && 'hidden'
        )}
      >
        {activeForm === OBJECTIVE_FORMS_TABS.PHYSICAL_DESCRIPTION && (
          <PhysicalDescriptionForm />
        )}
      </div>

      <div
        className={clsx(
          activeForm !== OBJECTIVE_FORMS_TABS.PERSONAL_DATA && 'hidden'
        )}
      >
        {activeForm === OBJECTIVE_FORMS_TABS.PERSONAL_DATA && (
          <PersonalDataForm />
        )}
      </div>
    </div>
  )
}

export default ObjectiveForms

import { ReactElement } from 'react'
import { targetFormsTabs, TARGET_FORMS_TABS } from '../../constants'
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
import SocialCircleForm from './SocialCircleForm'
import BiometricForm from './BiometricForm'
import { useTabs } from 'hooks/useTabs'
import ScrollableTabs from 'components/ScrollableTabs'
import ScTab from 'components/ScrollableTabs/Tab'
import { useIntl } from 'react-intl'

const TargetForms = (): ReactElement => {
  const [active, setActive, Tab] = useTabs(TARGET_FORMS_TABS.PERSONAL_DATA)
  const { formatMessage } = useIntl()

  return (
    <>
      <ScrollableTabs
        activeTab={active}
        onTabClick={(e, newTab) => setActive(newTab)}
      >
        {targetFormsTabs.map((tab) => (
          <ScTab key={tab.id}>{formatMessage(tab.label)}</ScTab>
        ))}
      </ScrollableTabs>
      <Tab value={TARGET_FORMS_TABS.LANGUAGE}>
        <LanguagesForm />
      </Tab>

      <Tab value={TARGET_FORMS_TABS.SOCIAL_MEDIA}>
        <SocialMediaForm />
      </Tab>

      <Tab value={TARGET_FORMS_TABS.SOCIAL_CIRCLE}>
        <SocialCircleForm />
      </Tab>

      <Tab value={TARGET_FORMS_TABS.BIOMETRIC_DATA}>
        <BiometricForm />
      </Tab>

      <Tab value={TARGET_FORMS_TABS.ACCOUNT_BANK}>
        <AccountBankForm />
      </Tab>

      <Tab value={TARGET_FORMS_TABS.CARS}>
        <VehiclesForm />
      </Tab>

      <Tab value={TARGET_FORMS_TABS.COMPANIES}>
        <CompaniesForm />
      </Tab>

      <Tab value={TARGET_FORMS_TABS.PROPERTIES}>
        <PropertiesForm />
      </Tab>

      <Tab value={TARGET_FORMS_TABS.SCHEDULE_DATA}>
        <ScheduleForm />
      </Tab>

      <Tab value={TARGET_FORMS_TABS.FREQUENT_PLACES}>
        <FrequentPlacesForm />
      </Tab>

      <Tab value={TARGET_FORMS_TABS.ORGANIZATION_DATA}>
        <OrganizationsForm />
      </Tab>

      <Tab value={TARGET_FORMS_TABS.ACADEMIC_DATA}>
        <AcademicForm />
      </Tab>

      <Tab value={TARGET_FORMS_TABS.LABOR_DATA}>
        <LaborForm />
      </Tab>

      <Tab value={TARGET_FORMS_TABS.PHYSICAL_DESCRIPTION}>
        <PhysicalDescriptionForm />
      </Tab>

      <Tab value={TARGET_FORMS_TABS.PERSONAL_DATA}>
        <PersonalDataForm />
      </Tab>
    </>
  )
}

export default TargetForms

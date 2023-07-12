import { generalMessages, platformMessages } from 'globalMessages'
import { techniqueInfoTabsMessages } from './messages'
import { TechniqueTabs } from 'types/technique'

export enum TECHNIQUE_INFO_TABS {
  TARGET = 'TARGET',
  DESCRIPTION = 'DESCRIPTION',
  CONFIG = 'CONFIG'
}

export enum TARGET_FORMS_TABS {
  PERSONAL_DATA = 0,
  BIOMETRIC_DATA = 1,
  PHYSICAL_DESCRIPTION = 2,
  LABOR_DATA = 3,
  ACADEMIC_DATA = 4,
  ORGANIZATION_DATA = 5,
  SOCIAL_CIRCLE = 6,
  FREQUENT_PLACES = 7,
  SOCIAL_MEDIA = 8,
  LANGUAGE = 9,
  ACCOUNT_BANK = 10,
  CARS = 11,
  PROPERTIES = 12,
  COMPANIES = 13,
  SCHEDULE_DATA = 14
}

export const techiniqueInfoTabs = [
  { id: TECHNIQUE_INFO_TABS.TARGET, label: platformMessages.target },
  { id: TECHNIQUE_INFO_TABS.DESCRIPTION, label: generalMessages.description },
  { id: TECHNIQUE_INFO_TABS.CONFIG, label: generalMessages.configuration }
]

export const targetInfoTabs = [
  { id: TechniqueTabs.EVIDENCE, label: platformMessages.evidences },
  {
    id: TechniqueTabs.GENERAL_DATA,
    label: techniqueInfoTabsMessages.generalData
  },
  { id: TechniqueTabs.FORMS, label: generalMessages.forms }
]

export const targetFormsTabs = [
  {
    id: TARGET_FORMS_TABS.PERSONAL_DATA,
    label: techniqueInfoTabsMessages.personalData
  },
  {
    id: TARGET_FORMS_TABS.BIOMETRIC_DATA,
    label: techniqueInfoTabsMessages.biometricData
  },
  {
    id: TARGET_FORMS_TABS.PHYSICAL_DESCRIPTION,
    label: techniqueInfoTabsMessages.physicalDescription
  },
  {
    id: TARGET_FORMS_TABS.LABOR_DATA,
    label: techniqueInfoTabsMessages.laboralData
  },
  {
    id: TARGET_FORMS_TABS.ACADEMIC_DATA,
    label: techniqueInfoTabsMessages.academicData
  },
  {
    id: TARGET_FORMS_TABS.ORGANIZATION_DATA,
    label: techniqueInfoTabsMessages.organizationData
  },
  {
    id: TARGET_FORMS_TABS.SOCIAL_CIRCLE,
    label: techniqueInfoTabsMessages.socialCircle
  },
  {
    id: TARGET_FORMS_TABS.FREQUENT_PLACES,
    label: techniqueInfoTabsMessages.frequentPlaces
  },
  {
    id: TARGET_FORMS_TABS.SOCIAL_MEDIA,
    label: techniqueInfoTabsMessages.socialMedia
  },
  {
    id: TARGET_FORMS_TABS.LANGUAGE,
    label: techniqueInfoTabsMessages.language
  },
  {
    id: TARGET_FORMS_TABS.ACCOUNT_BANK,
    label: techniqueInfoTabsMessages.bankAccount
  },
  { id: TARGET_FORMS_TABS.CARS, label: techniqueInfoTabsMessages.cars },
  {
    id: TARGET_FORMS_TABS.PROPERTIES,
    label: techniqueInfoTabsMessages.properties
  },
  {
    id: TARGET_FORMS_TABS.COMPANIES,
    label: techniqueInfoTabsMessages.companies
  },
  {
    id: TARGET_FORMS_TABS.SCHEDULE_DATA,
    label: techniqueInfoTabsMessages.scheduleData
  }
]

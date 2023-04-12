import { generalMessages, platformMessages } from 'globalMessages'
import { techniqueInfoTabsMessages } from './messages'

export enum TECHNIQUE_INFO_TABS {
  OBJECTIVE = 'OBJECTIVE',
  DESCRIPTION = 'DESCRIPTION',
  CONFIG = 'CONFIG'
}

export enum OBJECTIVE_INFO_TABS {
  EVIDENCE = 'EVIDENCE',
  GENERAL_DATA = 'GENERAL_DATA',
  FORMS = 'FORMS'
}

export enum OBJECTIVE_FORMS_TABS {
  PERSONAL_DATA = 'PERSONAL_DATA',
  BIOMETRIC_DATA = 'BIOMETRIC_DATA',
  PHYSICAL_DESCRIPTION = 'PHYSICAL_DESCRIPTION',
  LABOR_DATA = 'LABOR_DATA',
  ACADEMIC_DATA = 'ACADEMIC_DATA',
  ORGANIZATION_DATA = 'ORGANIZATION_DATA',
  SOCIAL_CIRCLE = 'SOCIAL_CIRCLE',
  FREQUENT_PLACES = 'FREQUENT_PLACES',
  SOCIAL_MEDIA = 'SOCIAL_MEDIA',
  LANGUAGE = 'LANGUAGE',
  ACCOUNT_BANK = 'ACCOUNT_BANK',
  CARS = 'CARS',
  PROPERTIES = 'PROPERTIES',
  COMPANIES = 'COMPANIES',
  SCHEDULE_DATA = 'SCHEDULE_DATA'
}

export const techiniqueInfoTabs = [
  { id: TECHNIQUE_INFO_TABS.OBJECTIVE, label: platformMessages.target },
  { id: TECHNIQUE_INFO_TABS.DESCRIPTION, label: generalMessages.description },
  { id: TECHNIQUE_INFO_TABS.CONFIG, label: generalMessages.configuration }
]

export const objectiveInfoTabs = [
  { id: OBJECTIVE_INFO_TABS.EVIDENCE, label: platformMessages.evidences },
  {
    id: OBJECTIVE_INFO_TABS.GENERAL_DATA,
    label: techniqueInfoTabsMessages.generalData
  },
  { id: OBJECTIVE_INFO_TABS.FORMS, label: generalMessages.forms }
]

export const objectiveFormsTabs = [
  {
    id: OBJECTIVE_FORMS_TABS.PERSONAL_DATA,
    label: techniqueInfoTabsMessages.personalData
  },
  {
    id: OBJECTIVE_FORMS_TABS.BIOMETRIC_DATA,
    label: techniqueInfoTabsMessages.biometricData
  },
  {
    id: OBJECTIVE_FORMS_TABS.PHYSICAL_DESCRIPTION,
    label: techniqueInfoTabsMessages.physicalDescription
  },
  {
    id: OBJECTIVE_FORMS_TABS.LABOR_DATA,
    label: techniqueInfoTabsMessages.laboralData
  },
  {
    id: OBJECTIVE_FORMS_TABS.ACADEMIC_DATA,
    label: techniqueInfoTabsMessages.academicData
  },
  {
    id: OBJECTIVE_FORMS_TABS.ORGANIZATION_DATA,
    label: techniqueInfoTabsMessages.organizationData
  },
  {
    id: OBJECTIVE_FORMS_TABS.SOCIAL_CIRCLE,
    label: techniqueInfoTabsMessages.socialCircle
  },
  {
    id: OBJECTIVE_FORMS_TABS.FREQUENT_PLACES,
    label: techniqueInfoTabsMessages.frequentPlaces
  },
  {
    id: OBJECTIVE_FORMS_TABS.SOCIAL_MEDIA,
    label: techniqueInfoTabsMessages.socialMedia
  },
  {
    id: OBJECTIVE_FORMS_TABS.LANGUAGE,
    label: techniqueInfoTabsMessages.language
  },
  {
    id: OBJECTIVE_FORMS_TABS.ACCOUNT_BANK,
    label: techniqueInfoTabsMessages.bankAccount
  },
  { id: OBJECTIVE_FORMS_TABS.CARS, label: techniqueInfoTabsMessages.cars },
  {
    id: OBJECTIVE_FORMS_TABS.PROPERTIES,
    label: techniqueInfoTabsMessages.properties
  },
  {
    id: OBJECTIVE_FORMS_TABS.COMPANIES,
    label: techniqueInfoTabsMessages.companies
  },
  {
    id: OBJECTIVE_FORMS_TABS.SCHEDULE_DATA,
    label: techniqueInfoTabsMessages.scheduleData
  }
]

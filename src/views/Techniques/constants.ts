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
  { id: TECHNIQUE_INFO_TABS.OBJECTIVE, label: 'Objetivo' },
  { id: TECHNIQUE_INFO_TABS.DESCRIPTION, label: 'Descripción' },
  { id: TECHNIQUE_INFO_TABS.CONFIG, label: 'Configuración' }
]

export const objectiveInfoTabs = [
  { id: OBJECTIVE_INFO_TABS.EVIDENCE, label: 'Evidencias' },
  { id: OBJECTIVE_INFO_TABS.GENERAL_DATA, label: 'Datos generales' },
  { id: OBJECTIVE_INFO_TABS.FORMS, label: 'Formularios' }
]

export const objectiveFormsTabs = [
  { id: OBJECTIVE_FORMS_TABS.PERSONAL_DATA, label: 'Datos personales' },
  {
    id: OBJECTIVE_FORMS_TABS.PHYSICAL_DESCRIPTION,
    label: 'Descripción fisíca'
  },
  { id: OBJECTIVE_FORMS_TABS.LABOR_DATA, label: 'Datos laborales' },
  { id: OBJECTIVE_FORMS_TABS.ACADEMIC_DATA, label: 'Datos académicos' },
  { id: OBJECTIVE_FORMS_TABS.ORGANIZATION_DATA, label: 'Datos organizaciones' },
  { id: OBJECTIVE_FORMS_TABS.SOCIAL_CIRCLE, label: 'Circulo social' },
  { id: OBJECTIVE_FORMS_TABS.FREQUENT_PLACES, label: 'Lugares frecuentes' },
  { id: OBJECTIVE_FORMS_TABS.SOCIAL_MEDIA, label: 'Redes sociales' },
  { id: OBJECTIVE_FORMS_TABS.LANGUAGE, label: 'Idiomas' },
  { id: OBJECTIVE_FORMS_TABS.ACCOUNT_BANK, label: 'Cuentas bancarias' },
  { id: OBJECTIVE_FORMS_TABS.CARS, label: 'Vehículos' },
  { id: OBJECTIVE_FORMS_TABS.PROPERTIES, label: 'Propiedades' },
  { id: OBJECTIVE_FORMS_TABS.COMPANIES, label: 'Empresas' },
  { id: OBJECTIVE_FORMS_TABS.SCHEDULE_DATA, label: 'Datos de agenda' }
]

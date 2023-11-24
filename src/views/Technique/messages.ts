import { defineMessages } from 'react-intl'

export const createTargetDialogMessages = defineMessages({
  addTarget: {
    id: 'views.techniques.CreateTargetDialog.addTarget',
    defaultMessage: 'Agregar objetivo'
  },
  selectTargetType: {
    id: 'views.techniques.CreateTargetDialog.selectTargetType',
    defaultMessage:
      'Selecciona el tipo de objetivo que será agregado a la técnica y completa los datos del formulario.'
  }
})

export const deleteTargetDialogMessages = defineMessages({
  title: {
    id: 'views.techniques.DeleteTargetDialog.title',
    defaultMessage:
      'Eliminar {selected, plural, one {objetivo} other {objetivos}}'
  },
  message: {
    id: 'views.techniques.DeleteTargetDialog.message',
    defaultMessage:
      '¿Estás seguro de querer eliminar {selected, plural, one {el objetivo seleccionado} other {los # objetivos seleccionados}}?'
  },
  confirm: {
    id: 'views.techniques.DeleteTargetDialog.confirm',
    defaultMessage: '¿Estás seguro de querer eliminar el objetivo seleccionado?'
  }
})

export const evidenceListMessages = defineMessages({
  eventNumber: {
    id: 'views.techniques.EvidenceList.eventNumber',
    defaultMessage: 'No. evento'
  },
  targetNumber: {
    id: 'views.techniques.EvidenceList.targetNumber',
    defaultMessage: 'No. objetivo'
  },
  sourceNumber: {
    id: 'views.techniques.EvidenceList.sourceNumber',
    defaultMessage: 'No. origen'
  },
  startDateTime: {
    id: 'views.techniques.EvidenceList.startDateTime',
    defaultMessage: 'Fecha / Hora inicio'
  },
  endDateTime: {
    id: 'views.techniques.EvidenceList.endDateTime',
    defaultMessage: 'Fecha / Hora fin'
  },
  carrier: {
    id: 'views.techniques.EvidenceList.carrier',
    defaultMessage: 'Operadora'
  },
  codeCellStart: {
    id: 'views.techniques.EvidenceList.codeCellStart',
    defaultMessage: 'Código cell inicio'
  },
  directionCellStart: {
    id: 'views.techniques.EvidenceList.directionCellStart',
    defaultMessage: 'Dirección cell inicio'
  },
  townhallCellStart: {
    id: 'views.techniques.EvidenceList.townhallCellStart',
    defaultMessage: 'Alcaldía cell inicio'
  },
  auditedBy: {
    id: 'views.techniques.EvidenceList.auditedBy',
    defaultMessage: 'Auditado por'
  },
  followUp: {
    id: 'views.techniques.EvidenceList.followUp',
    defaultMessage: 'Seguimiento'
  },
  obtainedFrom: {
    id: 'views.techniques.EvidenceList.obtainedFrom',
    defaultMessage: 'Obtenido desde'
  },
  tag: {
    id: 'views.techniques.EvidenceList.tag',
    defaultMessage: 'Rótulo'
  },
  clasification: {
    id: 'views.techniques.EvidenceList.clasification',
    defaultMessage: 'Clasificación'
  },
  type: {
    id: 'views.techniques.EvidenceList.type',
    defaultMessage: 'Tipo'
  },
  workingBy: {
    id: 'views.techniques.EvidenceList.workingBy',
    defaultMessage: 'Trabajando por'
  },
  trackedBy: {
    id: 'views.techniques.EvidenceList.trackedBy',
    defaultMessage: 'En seguimiento por'
  },
  withFollow: {
    id: 'views.techniques.EvidenceList.withFollow',
    defaultMessage: 'Con seguimiento'
  },
  withoutFollow: {
    id: 'views.techniques.EvidenceList.withoutFollow',
    defaultMessage: 'Sin seguimiento'
  }
})

export const targetCardMessages = defineMessages({
  creation: {
    id: 'views.techniques.TargetCard.creation',
    defaultMessage: 'Creación'
  },
  finalization: {
    id: 'views.techniques.TargetCard.finalization',
    defaultMessage: 'Finalización'
  },
  activity: {
    id: 'views.techniques.TargetCard.activity',
    defaultMessage: 'Actividad del objetivo'
  },
  forms: {
    id: 'views.techniques.TargetCard.forms',
    defaultMessage: 'Formularios'
  },
  history: {
    id: 'views.techniques.TargetCard.history',
    defaultMessage: 'Historial'
  }
})

export const targetFormMessages = defineMessages({
  etsiTargets: {
    id: 'views.techniques.TargetForm.etsiTargets',
    defaultMessage: 'Objetivos ETSI'
  },
  conventionalTargets: {
    id: 'views.techniques.TargetForm.conventionalTargets',
    defaultMessage: 'Objetivos convencionales'
  },
  targetName: {
    id: 'views.techniques.TargetForm.targetName',
    defaultMessage: 'Alias / Nombre del objetivo'
  },
  targetNamePlaceholder: {
    id: 'views.techniques.TargetForm.targetNamePlaceholder',
    defaultMessage: 'Ej. El chapo'
  },
  targetNumber: {
    id: 'views.techniques.TargetForm.targetNumber',
    defaultMessage: 'Número del objetivo'
  },
  targetNumberPlaceholder: {
    id: 'views.techniques.TargetForm.targetNumberPlaceholder',
    defaultMessage: 'Ej. número a 10 dígitos'
  },
  endDate: {
    id: 'views.techniques.TargetForm.endDate',
    defaultMessage: 'Fecha de finalización'
  },
  endDateWarning: {
    id: 'views.techniques.TargetForm.endDateWarning',
    defaultMessage:
      'Si habilitas este campo deberás ingresar una fecha de finalización diferente y anterior a la fecha de vigencia de la técnica.'
  },
  carrier: {
    id: 'views.techniques.TargetForm.carrier',
    defaultMessage: 'Compañia telefónica'
  },
  derivationLine: {
    id: 'views.techniques.TargetForm.derivationLine',
    defaultMessage: 'Línea de derivación'
  },
  phoneExample: {
    id: 'views.techniques.TargetForm.phoneExample',
    defaultMessage: 'Ej. 0000000000'
  }
})

export const targetHistoryMessages = defineMessages({
  title: {
    id: 'views.technique.target.history.title',
    defaultMessage: 'Auditoría'
  },
  subtitle: {
    id: 'views.technique.target.history.subtitle',
    defaultMessage: 'Historial de movimientos auditados'
  },
  message: {
    id: 'views.technique.target.history.message',
    defaultMessage:
      'Puedes visualizar los movimientos más recientes que han sido registrados en el grupo de trabajo.'
  },
  search: {
    id: 'views.technique.target.history.search',
    defaultMessage: 'Busqueda'
  },
  view: {
    id: 'views.technique.target.history.view',
    defaultMessage: 'Se ha visualizado'
  },
  created: {
    id: 'views.technique.target.history.created',
    defaultMessage: 'Creación'
  },
  updated: {
    id: 'views.technique.target.history.updated',
    defaultMessage: 'Actualización'
  },
  deleted: {
    id: 'views.technique.target.history.deleted',
    defaultMessage: 'Eliminación'
  }
})

export const targetMetaFormMessages = defineMessages({
  updatedSuccessfully: {
    id: 'views.techniques.TargetMetaForm.updatedSuccessfully',
    defaultMessage: 'Formulario actualizado correctamente'
  },
  aboutToDelete: {
    id: 'views.techniques.TargetMetaForm.aboutToDelete',
    defaultMessage: 'Estás a punto de eliminar un formulario'
  },
  deleteForm: {
    id: 'views.techniques.TargetMetaForm.deleteForm',
    defaultMessage: 'Eliminar formulario'
  },
  aboutToDeleteBody: {
    id: 'views.techniques.TargetMetaForm.aboutToDeleteBody',
    defaultMessage:
      'El formulario que estás intentando eliminar ya está registrado en la base de datos. ¿Estás seguro de que deseas continuar?'
  },
  deletedForm: {
    id: 'views.techniques.TargetMetaForm.deletedForm',
    defaultMessage: 'Formulario eliminado correctamente'
  },
  formNotDeleted: {
    id: 'views.techniques.TargetMetaForm.formNotDeleted',
    defaultMessage: 'El formulario no ha sido eliminado'
  }
})

export const targetFormsGeneralMessages = defineMessages({
  comments: {
    id: 'views.techniques.TargetForms.generalMessages.comments',
    defaultMessage: 'Comentarios'
  },
  commentsPlaceholder: {
    id: 'views.techniques.TargetForms.generalMessages.commentsPlaceholder',
    defaultMessage: 'Escribe un comentario aquí'
  },
  emailPlaceholder: {
    id: 'views.techniques.LaborForm.emailPlaceholder',
    defaultMessage: 'Ej. correo@dominio.com'
  },
  phone: {
    id: 'views.techniques.LaborForm.phone',
    defaultMessage: 'Número telefónico'
  },
  phonePlaceholder: {
    id: 'views.techniques.LaborForm.phonePlaceholder',
    defaultMessage: 'Ej. número a 10 dígitos'
  }
})

export const academicFormMessages = defineMessages({
  title: {
    id: 'views.techniques.AcademicForm.title',
    defaultMessage: 'Datos académicos'
  },
  itemTitle: {
    id: 'views.techniques.AcademicForm.itemTitle',
    defaultMessage: 'Institución Educativa'
  },
  academicName: {
    id: 'views.techniques.AcademicForm.academicName',
    defaultMessage: 'Nombre de la institución'
  },
  academicNamePlaceholder: {
    id: 'views.techniques.AcademicForm.academicNamePlaceholder',
    defaultMessage: 'Ej. Institución XXXXX'
  },
  academicEmailPlaceholder: {
    id: 'views.techniques.AcademicForm.academicEmailPlaceholder',
    defaultMessage: 'Ej. correo@dominio.com'
  },
  academicPhone: {
    id: 'views.techniques.AcademicForm.academicPhone',
    defaultMessage: 'Número teléfonico'
  },
  specialty: {
    id: 'views.techniques.AcademicForm.specialty',
    defaultMessage: 'Especialidad'
  },
  specialtyPlaceholder: {
    id: 'views.techniques.AcademicForm.specialtyPlaceholder',
    defaultMessage: 'Ej. Astrofísica'
  },
  academicPhonePlaceholder: {
    id: 'views.techniques.AcademicForm.academicPhonePlaceholder',
    defaultMessage: 'Ej. número a 10 dígitos'
  },
  institutionAddress: {
    id: 'views.techniques.AcademicForm.institutionAddress',
    defaultMessage: 'Domicilio de la institución'
  }
})

export const accountBankFormMessages = defineMessages({
  title: {
    id: 'views.techniques.AccountBankForm.title',
    defaultMessage: 'Cuentas bancarias'
  },
  itemTitle: {
    id: 'views.techniques.AccountBankForm.itemTitle',
    defaultMessage: 'Cuenta bancaria'
  },
  bank: {
    id: 'views.techniques.AccountBankForm.bank',
    defaultMessage: 'Institución bancaria'
  },
  bankPlaceholder: {
    id: 'views.techniques.AccountBankForm.bankPlaceholder',
    defaultMessage: 'Ej. Banorte'
  },
  accountNumber: {
    id: 'views.techniques.AccountBankForm.accountNumber',
    defaultMessage: 'Número de cuenta'
  },
  accountNumberPlaceholder: {
    id: 'views.techniques.AccountBankForm.accountNumberPlaceholder',
    defaultMessage: 'Ej. 1111222233334444'
  },
  ammount: {
    id: 'views.techniques.AccountBankForm.ammount',
    defaultMessage: 'Monto'
  },
  ammountPlaceholder: {
    id: 'views.techniques.AccountBankForm.ammountPlaceholder',
    defaultMessage: 'Ej. $999,999'
  },
  accountType: {
    id: 'views.techniques.AccountBankForm.accountType',
    defaultMessage: 'Tipo de cuenta'
  },
  accountTypePlaceholder: {
    id: 'views.techniques.AccountBankForm.accountTypePlaceholder',
    defaultMessage: 'Ej. Cuenta de ahorros'
  },
  otherAccountType: {
    id: 'views.techniques.AccountBankForm.otherAccountType',
    defaultMessage: 'Otro tipo de cuenta'
  },
  otherAccountTypePlaceholder: {
    id: 'views.techniques.AccountBankForm.otherAccountTypePlaceholder',
    defaultMessage: 'Ej. Cuenta con chequera'
  },
  savings: {
    id: 'views.techniques.AccountBankForm.accountTypes.savings',
    defaultMessage: 'Cuenta de ahorros'
  },
  creditCard: {
    id: 'views.techniques.AccountBankForm.accountTypes.creditCard',
    defaultMessage: 'Tarjeta de crédito'
  },
  debitCard: {
    id: 'views.techniques.AccountBankForm.debitCard',
    defaultMessage: 'Tarjeta de débito'
  },
  checking: {
    id: 'views.techniques.AccountBankForm.accountTypes.checking',
    defaultMessage: 'Cuenta corriente'
  },
  payroll: {
    id: 'views.techniques.AccountBankForm.accountTypes.payroll',
    defaultMessage: 'Cuenta de nómina'
  },
  investment: {
    id: 'views.techniques.AccountBankForm.accountTypes.investment',
    defaultMessage: 'Inversión'
  },
  loan: {
    id: 'views.techniques.AccountBankForm.accountTypes.loan',
    defaultMessage: 'Préstamo'
  },
  currency: {
    id: 'views.techniques.AccountBankForm.currency',
    defaultMessage: 'Divisa'
  },
  currencyPlaceholder: {
    id: 'views.techniques.AccountBankForm.currencyPlaceholder',
    defaultMessage: 'Ej. Dólar estadounidense'
  },
  otherCurrency: {
    id: 'views.techniques.AccountBankForm.otherCurrency',
    defaultMessage: 'Otra divisa'
  },
  otherCurrencyPlaceholder: {
    id: 'views.techniques.AccountBankForm.otherCurrencyPlaceholder',
    defaultMessage: 'Ej. Sol peruano'
  },
  usd: {
    id: 'views.techniques.AccountBankForm.currencies.usd',
    defaultMessage: 'Dólar estadounidense'
  },
  mxn: {
    id: 'views.techniques.AccountBankForm.currencies.mxn',
    defaultMessage: 'Peso mexicano'
  },
  eur: {
    id: 'views.techniques.AccountBankForm.currencies.eur',
    defaultMessage: 'Euro'
  },
  jpy: {
    id: 'views.techniques.AccountBankForm.currencies.jpy',
    defaultMessage: 'Yen japonés'
  },
  gbp: {
    id: 'views.techniques.AccountBankForm.currencies.gbp',
    defaultMessage: 'Libra esterlina'
  },
  aud: {
    id: 'views.techniques.AccountBankForm.currencies.aud',
    defaultMessage: 'Dólar australiano'
  },
  cad: {
    id: 'views.techniques.AccountBankForm.currencies.cad',
    defaultMessage: 'Dólar canadiense'
  },
  chf: {
    id: 'views.techniques.AccountBankForm.currencies.chf',
    defaultMessage: 'Franco suizo'
  },
  cny: {
    id: 'views.techniques.AccountBankForm.currencies.cny',
    defaultMessage: 'Yuan chino'
  },
  brl: {
    id: 'views.techniques.AccountBankForm.currencies.brl',
    defaultMessage: 'Real brasileño'
  },
  balance: {
    id: 'views.techniques.AccountBankForm.balance',
    defaultMessage: 'Balance'
  },
  balancePlaceholder: {
    id: 'views.techniques.AccountBankForm.balancePlaceholder',
    defaultMessage: 'Ej. 254,000'
  }
})

export const companiesFormMessages = defineMessages({
  title: {
    id: 'views.techniques.CompaniesForm.title',
    defaultMessage: 'Empresas'
  },
  itemTitle: {
    id: 'views.techniques.CompaniesForm.itemTitle',
    defaultMessage: 'Empresa'
  },
  companyName: {
    id: 'views.techniques.CompaniesForm.companyName',
    defaultMessage: 'Nombre o razón social'
  },
  companyNamePlaceholder: {
    id: 'views.techniques.CompaniesForm.companyNamePlaceholder',
    defaultMessage: 'Ej. Empresa Audi'
  },
  sector: {
    id: 'views.techniques.CompaniesForm.sector',
    defaultMessage: 'Giro de la empresa'
  },
  sectorPlaceholder: {
    id: 'views.techniques.CompaniesForm.sectorPlaceholder',
    defaultMessage: 'Ej. Agricultura'
  },
  otherSector: {
    id: 'views.techniques.CompaniesForm.otherSector',
    defaultMessage: 'Otro giro de la empresa'
  },
  otherSectorPlaceholder: {
    id: 'views.techniques.CompaniesForm.otherSectorPlaceholder',
    defaultMessage: 'Ej. Agricultura'
  },
  companyAddress: {
    id: 'views.techniques.CompaniesForm.companyAddress',
    defaultMessage: 'Domicilio de la empresa'
  },

  agriculture: {
    id: 'views.techniques.CompaniesForm.agriculture',
    defaultMessage: 'Agricultura'
  },
  commerce: {
    id: 'views.techniques.CompaniesForm.commerce',
    defaultMessage: 'Comercio'
  },
  construction: {
    id: 'views.techniques.CompaniesForm.construction',
    defaultMessage: 'Construcción'
  },
  education: {
    id: 'views.techniques.CompaniesForm.education',
    defaultMessage: 'Educación'
  },
  finance: {
    id: 'views.techniques.CompaniesForm.finance',
    defaultMessage: 'Finanzas'
  },
  manufacturing: {
    id: 'views.techniques.CompaniesForm.manufacturing',
    defaultMessage: 'Manufactura'
  },
  health: {
    id: 'views.techniques.CompaniesForm.health',
    defaultMessage: 'Salud'
  },
  services: {
    id: 'views.techniques.CompaniesForm.services',
    defaultMessage: 'Servicios'
  },
  technology: {
    id: 'views.techniques.CompaniesForm.technology',
    defaultMessage: 'Tecnología'
  },
  transportation: {
    id: 'views.techniques.CompaniesForm.transportation',
    defaultMessage: 'Transporte'
  }
})

export const frequentPlacesFormMessages = defineMessages({
  title: {
    id: 'views.techniques.FrequentPlacesForm.title',
    defaultMessage: 'Lugares frecuentes'
  },
  itemTitle: {
    id: 'views.techniques.FrequentPlacesForm.itemTitle',
    defaultMessage: 'Lugar'
  },
  placeName: {
    id: 'views.techniques.FrequentPlacesForm.placeName',
    defaultMessage: 'Nombre del sitio que visita'
  },
  placeNamePlaceholder: {
    id: 'views.techniques.FrequentPlacesForm.placeNamePlaceholder',
    defaultMessage: 'Ej. Lugar AAAA'
  },
  placeActivity: {
    id: 'views.techniques.FrequentPlacesForm.placeActivity',
    defaultMessage: 'Actividad que realiza'
  },
  placeActivityPlaceholder: {
    id: 'views.techniques.FrequentPlacesForm.placeActivityPlaceholder',
    defaultMessage: 'Ej. correr'
  },
  placeAddress: {
    id: 'views.techniques.FrequentPlacesForm.placeAddress',
    defaultMessage: 'Domicilio del lugar'
  },
  frequency: {
    id: 'views.techniques.FrequentPlacesForm.frequency',
    defaultMessage: 'Frecuencia'
  },
  frequencyPlaceholder: {
    id: 'views.techniques.FrequentPlacesForm.frequencyPlaceholder',
    defaultMessage: 'Ej. Diario'
  },

  daily: {
    id: 'views.techniques.FrequentPlacesForm.daily',
    defaultMessage: 'Diario'
  },
  almostDaily: {
    id: 'views.techniques.FrequentPlacesForm.almostDaily',
    defaultMessage: 'Casi diario'
  },
  twiceWeekly: {
    id: 'views.techniques.FrequentPlacesForm.twiceWeekly',
    defaultMessage: 'Dos veces por semana'
  },
  weekly: {
    id: 'views.techniques.FrequentPlacesForm.weekly',
    defaultMessage: 'Semanal'
  },
  biweekly: {
    id: 'views.techniques.FrequentPlacesForm.biweekly',
    defaultMessage: 'Quincenal'
  },
  monthly: {
    id: 'views.techniques.FrequentPlacesForm.monthly',
    defaultMessage: 'Mensual'
  }
})

export const generalDataFormMessages = defineMessages({
  name: {
    id: 'views.techniques.GeneralDataForm.name',
    defaultMessage: 'Alias / Nombre del objetivo'
  },
  namePlaceholder: {
    id: 'views.techniques.GeneralDataForm.namePlaceholder',
    defaultMessage: 'Ej. José Mendez'
  },
  phone: {
    id: 'views.techniques.GeneralDataForm.phone',
    defaultMessage: 'Número del objetivo'
  },
  phonePlaceholder: {
    id: 'views.techniques.GeneralDataForm.phonePlaceholder',
    defaultMessage: 'Ej. 5533445566'
  },
  overflowLine: {
    id: 'views.techniques.GeneralDataForm.overflowLine',
    defaultMessage: 'Línea de derivación'
  },
  carrier: {
    id: 'views.techniques.GeneralDataForm.carrier',
    defaultMessage: 'Compañía teléfonica'
  },
  carrierPlaceholder: {
    id: 'views.techniques.GeneralDataForm.carrierPlaceholder',
    defaultMessage: 'Ej. Telcel'
  },
  endDate: {
    id: 'views.techniques.GeneralDataForm.endDate',
    defaultMessage: 'Fecha de finalización'
  },
  endDatePlaceholder: {
    id: 'views.techniques.GeneralDataForm.endDatePlaceholder',
    defaultMessage: 'Ej. 12/12/2022 - 13:00:00'
  }
})

export const laborFormMessages = defineMessages({
  title: {
    id: 'views.techniques.LaborForm.title',
    defaultMessage: 'Datos laborales'
  },
  itemTitle: {
    id: 'views.techniques.LaborForm.itemTitle',
    defaultMessage: 'Organización'
  },
  organizationName: {
    id: 'views.techniques.LaborForm.organizationName',
    defaultMessage: 'Nombre de la organización'
  },
  organizationNamePlaceholder: {
    id: 'views.techniques.LaborForm.organizationNamePlaceholder',
    defaultMessage: 'Ej. Empresa XXXX'
  },
  job: {
    id: 'views.techniques.LaborForm.job',
    defaultMessage: 'Cargo / Puesto'
  },
  jobPlaceholder: {
    id: 'views.techniques.LaborForm.jobPlaceholder',
    defaultMessage: 'Ej. Operador Técnico'
  },
  organizationAddress: {
    id: 'views.techniques.LaborForm.organizationAddress',
    defaultMessage: 'Domicilio de la organización'
  }
})

export const languagesFormMessages = defineMessages({
  title: {
    id: 'views.techniques.LanguagesForm.title',
    defaultMessage: 'Idiomas y dialectos'
  },
  itemTitle: {
    id: 'views.techniques.LanguagesForm.itemTitle',
    defaultMessage: 'Idioma o dialecto'
  },
  language: {
    id: 'views.techniques.LanguagesForm.language',
    defaultMessage: 'Nombre del idioma o dialecto'
  },
  english: {
    id: 'views.techniques.LanguagesForm.language.english',
    defaultMessage: 'Inglés'
  },
  spanish: {
    id: 'views.techniques.LanguagesForm.language.spanish',
    defaultMessage: 'Español'
  },
  french: {
    id: 'views.techniques.LanguagesForm.language.french',
    defaultMessage: 'Francés'
  },
  german: {
    id: 'views.techniques.LanguagesForm.language.german',
    defaultMessage: 'Alemán'
  },
  italian: {
    id: 'views.techniques.LanguagesForm.language.italian',
    defaultMessage: 'Italiano'
  },
  portuguese: {
    id: 'views.techniques.LanguagesForm.language.portuguese',
    defaultMessage: 'Portugués'
  },
  chinese: {
    id: 'views.techniques.LanguagesForm.language.chinese',
    defaultMessage: 'Chino'
  },
  japanese: {
    id: 'views.techniques.LanguagesForm.language.japanese',
    defaultMessage: 'Japonés'
  },
  korean: {
    id: 'views.techniques.LanguagesForm.language.korean',
    defaultMessage: 'Coreano'
  },
  arabic: {
    id: 'views.techniques.LanguagesForm.language.arabic',
    defaultMessage: 'Árabe'
  },
  russian: {
    id: 'views.techniques.LanguagesForm.language.russian',
    defaultMessage: 'Ruso'
  },
  dutch: {
    id: 'views.techniques.LanguagesForm.language.dutch',
    defaultMessage: 'Neerlandés'
  },
  swedish: {
    id: 'views.techniques.LanguagesForm.language.swedish',
    defaultMessage: 'Sueco'
  },
  greek: {
    id: 'views.techniques.LanguagesForm.language.greek',
    defaultMessage: 'Griego'
  },
  hindi: {
    id: 'views.techniques.LanguagesForm.language.hindi',
    defaultMessage: 'Hindi'
  },
  languagePlaceholder: {
    id: 'views.techniques.LanguagesForm.languagePlaceholder',
    defaultMessage: 'Ej. Inglés'
  },
  otherLanguage: {
    id: 'views.techniques.LanguagesForm.otherLanguage',
    defaultMessage: 'Otro idioma o dialecto'
  },
  otherLanguagePlaceholder: {
    id: 'views.techniques.LanguagesForm.otherLanguagePlaceholder',
    defaultMessage: 'Ej. Náhuatl'
  },
  level: {
    id: 'views.techniques.LanguagesForm.level',
    defaultMessage: 'Nivel de dominio'
  },
  levelPlaceholder: {
    id: 'views.techniques.LanguagesForm.levelPlaceholder',
    defaultMessage: 'Ej. nativo'
  },
  basic: {
    id: 'views.techniques.LanguagesForm.level.basic',
    defaultMessage: 'Básico'
  },
  intermediate: {
    id: 'views.techniques.LanguagesForm.level.intermediate',
    defaultMessage: 'Intermedio'
  },
  advanced: {
    id: 'views.techniques.LanguagesForm.level.advanced',
    defaultMessage: 'Avanzado'
  },
  fluent: {
    id: 'views.techniques.LanguagesForm.level.fluent',
    defaultMessage: 'Fluido'
  },
  native: {
    id: 'views.techniques.LanguagesForm.level.native',
    defaultMessage: 'Nativo'
  }
})

export const organizationFormMessages = defineMessages({
  title: {
    id: 'views.techniques.OrganizationForm.title',
    defaultMessage: 'Organizaciones'
  },
  itemTitle: {
    id: 'views.techniques.OrganizationForm.itemTitle',
    defaultMessage: 'Organización'
  },
  organizationName: {
    id: 'views.techniques.OrganizationForm.organizationName',
    defaultMessage: 'Nombre de la organización'
  },
  organizationNamePlaceholder: {
    id: 'views.techniques.OrganizationForm.organizationNamePlaceholder',
    defaultMessage: 'Ej. Organización XXXX'
  },
  organizationAddress: {
    id: 'views.techniques.OrganizationForm.organizationAddress',
    defaultMessage: 'Domicilio de la organización'
  }
})

export const personalDataFormMessages = defineMessages({
  title: {
    id: 'views.techniques.PersonalDataForm.title',
    defaultMessage: 'Datos personales y domicilio'
  },
  targetAlias: {
    id: 'views.techniques.PersonalDataForm.targetAlias',
    defaultMessage: 'Alias'
  },
  targetAliasPlaceholder: {
    id: 'views.techniques.PersonalDataForm.targetAliasPlaceholder',
    defaultMessage: 'Ej. El chapo'
  },
  targetName: {
    id: 'views.techniques.PersonalDataForm.targetName',
    defaultMessage: 'Nombre del objetivo'
  },
  targetNamePlaceholder: {
    id: 'views.techniques.PersonalDataForm.targetNamePlaceholder',
    defaultMessage: 'Ej. José Mendez'
  },
  targetPhone: {
    id: 'views.techniques.PersonalDataForm.targetPhone',
    defaultMessage: 'Número del objetivo'
  },
  genderPlaceholder: {
    id: 'views.techniques.PersonalDataForm.genderPlaceholder',
    defaultMessage: 'Ej. Masculino'
  },
  birthDate: {
    id: 'views.techniques.PersonalDataForm.birthDate',
    defaultMessage: 'Fecha de nacimiento'
  },
  birthDatePlaceholder: {
    id: 'views.techniques.PersonalDataForm.birthDatePlaceholder',
    defaultMessage: 'Ej. 12/12/2022 - 13:00:00'
  },
  birthCountry: {
    id: 'views.techniques.PersonalDataForm.birthCountry',
    defaultMessage: 'País de nacimiento'
  },
  birthCountryPlaceholder: {
    id: 'views.techniques.PersonalDataForm.birthCountryPlaceholder',
    defaultMessage: 'Ej. México'
  },
  birthState: {
    id: 'views.techniques.PersonalDataForm.birthState',
    defaultMessage: 'Estado de nacimiento'
  },
  birthStatePlaceholder: {
    id: 'views.techniques.PersonalDataForm.birthStatePlaceholder',
    defaultMessage: 'Ej. CDMX'
  },
  birthCity: {
    id: 'views.techniques.PersonalDataForm.birthCity',
    defaultMessage: 'Ciudad de nacimiento'
  },
  birthCityPlaceholder: {
    id: 'views.techniques.PersonalDataForm.birthCityPlaceholder',
    defaultMessage: 'Ej. Iztapalapa'
  },
  age: {
    id: 'views.techniques.PersonalDataForm.age',
    defaultMessage: 'Edad'
  },
  agePlaceholder: {
    id: 'views.techniques.PersonalDataForm.agePlaceholder',
    defaultMessage: 'Ej. 30 años'
  },
  curpPlaceholder: {
    id: 'views.techniques.PersonalDataForm.curpPlaceholder',
    defaultMessage: 'Ej. AAAA0000MAAAAAA00'
  },
  rfcPlaceholder: {
    id: 'views.techniques.PersonalDataForm.rfcPlaceholder',
    defaultMessage: 'Ej. AAAA0000XXXX'
  },
  nationality: {
    id: 'views.techniques.PersonalDataForm.nationality',
    defaultMessage: 'Nacionalidad'
  },
  nationalityPlaceholder: {
    id: 'views.techniques.PersonalDataForm.nationalityPlaceholder',
    defaultMessage: 'Ej. Mexicana'
  },
  actualAddress: {
    id: 'views.techniques.PersonalDataForm.actualAddress',
    defaultMessage: 'Domicilio actual'
  }
})

export const physicalDescriptionFormMessages = defineMessages({
  title: {
    id: 'views.techniques.PhysicalDescriptionForm.title',
    defaultMessage: 'Descripción física'
  },
  height: {
    id: 'views.techniques.PhysicalDescriptionForm.height',
    defaultMessage: 'Altura (cm)'
  },
  heightPlaceholder: {
    id: 'views.techniques.PhysicalDescriptionForm.heightPlaceholder',
    defaultMessage: 'Ej. 170'
  },
  weight: {
    id: 'views.techniques.PhysicalDescriptionForm.weight',
    defaultMessage: 'Peso (kg)'
  },
  weightPlaceholder: {
    id: 'views.techniques.PhysicalDescriptionForm.weightPlaceholder',
    defaultMessage: 'Ej. 70'
  },
  bodyType: {
    id: 'views.techniques.PhysicalDescriptionForm.bodyType',
    defaultMessage: 'Tipo de cuerpo'
  },
  bodyTypePlaceholder: {
    id: 'views.techniques.PhysicalDescriptionForm.bodyTypePlaceholder',
    defaultMessage: 'Ej. Delgado'
  },
  thin: {
    id: 'views.techniques.PhysicalDescriptionForm.bodyType.thin',
    defaultMessage: 'Delgado'
  },
  slim: {
    id: 'views.techniques.PhysicalDescriptionForm.bodyType.slim',
    defaultMessage: 'Esbelto'
  },
  athletic: {
    id: 'views.techniques.PhysicalDescriptionForm.bodyType.athletic',
    defaultMessage: 'Atlético'
  },
  muscular: {
    id: 'views.techniques.PhysicalDescriptionForm.bodyType.muscular',
    defaultMessage: 'Musculoso'
  },
  curvy: {
    id: 'views.techniques.PhysicalDescriptionForm.bodyType.curvy',
    defaultMessage: 'Con curvas'
  },
  average: {
    id: 'views.techniques.PhysicalDescriptionForm.bodyType.average',
    defaultMessage: 'Promedio'
  },
  chubby: {
    id: 'views.techniques.PhysicalDescriptionForm.bodyType.chubby',
    defaultMessage: 'Rellenito'
  },
  overweight: {
    id: 'views.techniques.PhysicalDescriptionForm.bodyType.overweight',
    defaultMessage: 'Con sobrepeso'
  },
  obese: {
    id: 'views.techniques.PhysicalDescriptionForm.bodyType.obese',
    defaultMessage: 'Obeso'
  },
  otherBody: {
    id: 'views.techniques.PhysicalDescriptionForm.otherBody',
    defaultMessage: 'Otro tipo de cuerpo'
  },
  otherBodyPlaceholder: {
    id: 'views.techniques.PhysicalDescriptionForm.otherBodyPlaceholder',
    defaultMessage: 'Ej. Otro tipo'
  },
  skinColor: {
    id: 'views.techniques.PhysicalDescriptionForm.skinColor',
    defaultMessage: 'Color de piel'
  },
  skinColorPlaceholder: {
    id: 'views.techniques.PhysicalDescriptionForm.skinColorPlaceholder',
    defaultMessage: 'Ej. Piel clara'
  },
  lighter: {
    id: 'views.techniques.PhysicalDescriptionForm.skinType.lighter',
    defaultMessage: 'Muy clara'
  },
  light: {
    id: 'views.techniques.PhysicalDescriptionForm.skinType.light',
    defaultMessage: 'Clara'
  },
  lightBrown: {
    id: 'views.techniques.PhysicalDescriptionForm.skinType.light_brown',
    defaultMessage: 'Morena clara'
  },
  darkBrown: {
    id: 'views.techniques.PhysicalDescriptionForm.skinType.dark_brown',
    defaultMessage: 'Morena oscura'
  },
  dark: {
    id: 'views.techniques.PhysicalDescriptionForm.skinType.dark',
    defaultMessage: 'Oscura'
  },
  darker: {
    id: 'views.techniques.PhysicalDescriptionForm.skinType.darker',
    defaultMessage: 'Muy oscura'
  },
  hairLength: {
    id: 'views.techniques.PhysicalDescriptionForm.hairLength',
    defaultMessage: 'Largo del cabello'
  },
  hairLengthPlaceholder: {
    id: 'views.techniques.PhysicalDescriptionForm.hairLengthPlaceholder',
    defaultMessage: 'Ej. Corto'
  },
  bald: {
    id: 'views.techniques.PhysicalDescriptionForm.hairLength.bald',
    defaultMessage: 'Calvo'
  },
  short: {
    id: 'views.techniques.PhysicalDescriptionForm.hairLength.short',
    defaultMessage: 'Corto'
  },
  medium: {
    id: 'views.techniques.PhysicalDescriptionForm.hairLength.medium',
    defaultMessage: 'Mediano'
  },
  long: {
    id: 'views.techniques.PhysicalDescriptionForm.hairLength.long',
    defaultMessage: 'Largo'
  },
  extraLong: {
    id: 'views.techniques.PhysicalDescriptionForm.hairLength.extraLong',
    defaultMessage: 'Muy largo'
  },
  hairType: {
    id: 'views.techniques.PhysicalDescriptionForm.hairType',
    defaultMessage: 'Tipo de cabello'
  },
  hairTypePlaceholder: {
    id: 'views.techniques.PhysicalDescriptionForm.hairTypePlaceholder',
    defaultMessage: 'Ej. Corto, ondulado'
  },
  straight: {
    id: 'views.techniques.PhysicalDescriptionForm.hairType.straight',
    defaultMessage: 'Liso'
  },
  wavy: {
    id: 'views.techniques.PhysicalDescriptionForm.hairType.wavy',
    defaultMessage: 'Ondulado'
  },
  curly: {
    id: 'views.techniques.PhysicalDescriptionForm.hairType.curly',
    defaultMessage: 'Ondulado'
  },
  kinky: {
    id: 'views.techniques.PhysicalDescriptionForm.hairType.kinky',
    defaultMessage: 'Afro'
  },
  shortCurly: {
    id: 'views.techniques.PhysicalDescriptionForm.shortCurly',
    defaultMessage: 'Corto, ondulado'
  },
  longCurly: {
    id: 'views.techniques.PhysicalDescriptionForm.shortCurly',
    defaultMessage: 'Corto, ondulado'
  },
  shortWavy: {
    id: 'views.techniques.PhysicalDescriptionForm.shortWavy',
    defaultMessage: 'Corto, quebrado'
  },
  longWavy: {
    id: 'views.techniques.PhysicalDescriptionForm.longWavy',
    defaultMessage: 'Largo, quebrado'
  },
  hairColor: {
    id: 'views.techniques.PhysicalDescriptionForm.hairColor',
    defaultMessage: 'Color de cabello'
  },
  hairColorPlaceholder: {
    id: 'views.techniques.PhysicalDescriptionForm.hairColorPlaceholder',
    defaultMessage: 'Ej. Castaño'
  },
  white: {
    id: 'views.techniques.PhysicalDescriptionForm.hairColor.white',
    defaultMessage: 'Blanco'
  },
  lightBlonde: {
    id: 'views.techniques.PhysicalDescriptionForm.hairColor.lightBlonde',
    defaultMessage: 'Rubio claro'
  },
  darkBlonde: {
    id: 'views.techniques.PhysicalDescriptionForm.hairColor.darkBlonde',
    defaultMessage: 'Rubio oscuro'
  },
  auburn: {
    id: 'views.techniques.PhysicalDescriptionForm.hairColor.auburn',
    defaultMessage: 'Marrón rojizo'
  },
  chestnut: {
    id: 'views.techniques.PhysicalDescriptionForm.hairColor.chestnut',
    defaultMessage: 'Castaño'
  },
  brown: {
    id: 'views.techniques.PhysicalDescriptionForm.hairColor.brown',
    defaultMessage: 'Marrón'
  },
  red: {
    id: 'views.techniques.PhysicalDescriptionForm.hairColor.red',
    defaultMessage: 'Rojo'
  },
  gray: {
    id: 'views.techniques.PhysicalDescriptionForm.hairColor.gray',
    defaultMessage: 'Gris'
  },
  black: {
    id: 'views.techniques.PhysicalDescriptionForm.hairColor.black',
    defaultMessage: 'Negro'
  },
  otherHairColor: {
    id: 'views.techniques.PhysicalDescriptionForm.otherHairColor',
    defaultMessage: 'Otro color de cabello'
  },
  otherHairColorPlaceholder: {
    id: 'views.techniques.PhysicalDescriptionForm.otherHairColorPlaceholder',
    defaultMessage: 'Ej. Morado'
  }
})

export const propertiesFormMessages = defineMessages({
  title: {
    id: 'views.techniques.PropertiesForm.title',
    defaultMessage: 'Propiedades'
  },
  itemTitle: {
    id: 'views.techniques.PropertiesForm.itemTitle',
    defaultMessage: 'Propiedades'
  },
  propertyAddress: {
    id: 'views.techniques.PropertiesForm.propertyAddress',
    defaultMessage: 'Domicilio de la propiedad'
  },
  type: {
    id: 'views.techniques.PropertiesForm.type',
    defaultMessage: 'Tipo del inmueble'
  },
  typePlaceholder: {
    id: 'views.techniques.PropertiesForm.typePlaceholder',
    defaultMessage: 'Ej. Departamento'
  },
  otherType: {
    id: 'views.techniques.PropertiesForm.otherType',
    defaultMessage: 'Otro tipo de inmueble'
  },
  otherTypePlaceholder: {
    id: 'views.techniques.PropertiesForm.otherTypePlaceholder',
    defaultMessage: 'Ej. Departamento'
  },

  house: {
    id: 'views.techniques.PropertiesForm.house',
    defaultMessage: 'Casa'
  },
  apartment: {
    id: 'views.techniques.PropertiesForm.apartment',
    defaultMessage: 'Apartamento'
  },
  office: {
    id: 'views.techniques.PropertiesForm.office',
    defaultMessage: 'Oficina'
  },
  retail: {
    id: 'views.techniques.PropertiesForm.retail',
    defaultMessage: 'Local comercial'
  },
  condominium: {
    id: 'views.techniques.PropertiesForm.condominium',
    defaultMessage: 'Condominio'
  },
  building: {
    id: 'views.techniques.PropertiesForm.building',
    defaultMessage: 'Edificio'
  },
  land: {
    id: 'views.techniques.PropertiesForm.land',
    defaultMessage: 'Terreno'
  }
})

export const socialMediaFormMessages = defineMessages({
  title: {
    id: 'views.techniques.SocialMediaForm.title',
    defaultMessage: 'Redes sociales'
  },
  itemTitle: {
    id: 'views.techniques.SocialMediaForm.itemTitle',
    defaultMessage: 'Red social'
  },
  name: {
    id: 'views.techniques.SocialMediaForm.name',
    defaultMessage: 'Nombre de la red social'
  },
  namePlaceholder: {
    id: 'views.techniques.SocialMediaForm.namePlaceholder',
    defaultMessage: 'Ej. Facebook'
  },
  urlPlaceholder: {
    id: 'views.techniques.SocialMediaForm.urlPlaceholder',
    defaultMessage: 'Ej. https://facebook.com/user123456'
  },
  username: {
    id: 'views.techniques.SocialMediaForm.username',
    defaultMessage: 'Nombre de usuario'
  },
  usernamePlaceholder: {
    id: 'views.techniques.SocialMediaForm.usernamePlaceholder',
    defaultMessage: 'Ej. FooBar'
  },
  otherSocialMedia: {
    id: 'views.techniques.SocialMediaForm.otherSocialMedia',
    defaultMessage: 'Otra red social'
  },
  otherSocialMediaPlaceholder: {
    id: 'views.techniques.SocialMediaForm.otherSocialMediaPlaceholder',
    defaultMessage: 'Ej. Facebook'
  }
})

export const scheduleFormMessages = defineMessages({
  title: {
    id: 'views.techniques.ScheduleForm.title',
    defaultMessage: 'Datos de agenda'
  },
  itemTitle: {
    id: 'views.techniques.ScheduleForm.itemTitle',
    defaultMessage: 'Contacto'
  },
  address: {
    id: 'views.techniques.ScheduleForm.address',
    defaultMessage: 'Domicilio del contacto'
  },
  name: {
    id: 'views.techniques.ScheduleForm.name',
    defaultMessage: 'Nombre del contacto'
  },
  namePlaceholder: {
    id: 'views.techniques.ScheduleForm.namePlaceholder',
    defaultMessage: 'Ej. El chapo'
  }
})

export const vehiclesFormMessages = defineMessages({
  title: {
    id: 'views.techniques.VehiclesForm.title',
    defaultMessage: 'Vehículos'
  },
  itemTitle: {
    id: 'views.techniques.VehiclesForm.itemTitle',
    defaultMessage: 'Vehículo'
  },
  brand: {
    id: 'views.techniques.VehiclesForm.brand',
    defaultMessage: 'Marca del vehículo'
  },
  brandPlaceholder: {
    id: 'views.techniques.VehiclesForm.brandPlaceholder',
    defaultMessage: 'Ej. Chevrolet'
  },
  otherBrand: {
    id: 'views.techniques.VehiclesForm.otherBrand',
    defaultMessage: 'Otra marca'
  },
  otherBrandPlaceholder: {
    id: 'views.techniques.VehiclesForm.otherBrandPlaceholder',
    defaultMessage: 'Ej. Chevrolet'
  },
  model: {
    id: 'views.techniques.VehiclesForm.model',
    defaultMessage: 'Módelo'
  },
  modelPlaceholder: {
    id: 'views.techniques.VehiclesForm.modelPlaceholder',
    defaultMessage: 'Ej. Corvette'
  },
  year: {
    id: 'views.techniques.VehiclesForm.year',
    defaultMessage: 'Año'
  },
  yearPlaceholder: {
    id: 'views.techniques.VehiclesForm.yearPlaceholder',
    defaultMessage: 'Ej. 2023'
  },
  vehicleType: {
    id: 'views.techniques.VehiclesForm.vehicleType',
    defaultMessage: 'Tipo de vehículo'
  },
  vehicleTypePlaceholder: {
    id: 'views.techniques.VehiclesForm.vehicleTypePlaceholder',
    defaultMessage: 'Ej. Deportivo'
  },
  otherType: {
    id: 'views.techniques.VehiclesForm.otherType',
    defaultMessage: 'Otro tipo de vehículo'
  },
  otherTypePlaceholder: {
    id: 'views.techniques.VehiclesForm.otherTypePlaceholder',
    defaultMessage: 'Ej. Deportivo'
  },
  plates: {
    id: 'views.techniques.VehiclesForm.plates',
    defaultMessage: 'Placas'
  },
  platesPlaceholder: {
    id: 'views.techniques.VehiclesForm.platesPlaceholder',
    defaultMessage: 'Ej. XA12BC'
  },
  color: {
    id: 'views.techniques.VehiclesForm.color',
    defaultMessage: 'Color'
  },
  colorPlaceholder: {
    id: 'views.techniques.VehiclesForm.colorPlaceholder',
    defaultMessage: 'Ej. Azul'
  },
  otherColor: {
    id: 'views.techniques.VehiclesForm.otherColor',
    defaultMessage: 'Otro color'
  },
  otherColorPlaceholder: {
    id: 'views.techniques.VehiclesForm.otherColorPlaceholder',
    defaultMessage: 'Ej. Azul'
  },
  motorcycle: {
    id: 'views.techniques.VehiclesForm.motorcycle',
    defaultMessage: 'Motocicleta'
  },
  subcompact: {
    id: 'views.techniques.VehiclesForm.subcompact',
    defaultMessage: 'Subcompacto'
  },
  compact: {
    id: 'views.techniques.VehiclesForm.compact',
    defaultMessage: 'Compacto'
  },
  coupe: { id: 'views.techniques.VehiclesForm.coupe', defaultMessage: 'Coupé' },
  sedan: { id: 'views.techniques.VehiclesForm.sedan', defaultMessage: 'Sedán' },
  hatchback: {
    id: 'views.techniques.VehiclesForm.hatchback',
    defaultMessage: 'Hatchback'
  },
  sport: {
    id: 'views.techniques.VehiclesForm.sport',
    defaultMessage: 'Deportivo'
  },
  convertible: {
    id: 'views.techniques.VehiclesForm.convertible',
    defaultMessage: 'Convertible'
  },
  suv: { id: 'views.techniques.VehiclesForm.suv', defaultMessage: 'suv' },
  wagon: {
    id: 'views.techniques.VehiclesForm.wagon',
    defaultMessage: 'Station Wagon'
  },
  minivan: {
    id: 'views.techniques.VehiclesForm.minivan',
    defaultMessage: 'Minivan'
  },
  van: { id: 'views.techniques.VehiclesForm.van', defaultMessage: 'Furgoneta' },
  pickup: {
    id: 'views.techniques.VehiclesForm.pickup',
    defaultMessage: 'Camioneta'
  },
  bus: { id: 'views.techniques.VehiclesForm.bus', defaultMessage: 'Autobús' },
  truck: {
    id: 'views.techniques.VehiclesForm.truck',
    defaultMessage: 'Camión'
  },
  trailer: {
    id: 'views.techniques.VehiclesForm.trailer',
    defaultMessage: 'Tráiler'
  },
  silver: {
    id: 'views.techniques.VehiclesForm.silver',
    defaultMessage: 'Plateado'
  },
  black: {
    id: 'views.techniques.VehiclesForm.black',
    defaultMessage: 'Negro'
  },
  white: {
    id: 'views.techniques.VehiclesForm.white',
    defaultMessage: 'Blanco'
  },
  gray: {
    id: 'views.techniques.VehiclesForm.gray',
    defaultMessage: 'Gris'
  },
  red: {
    id: 'views.techniques.VehiclesForm.red',
    defaultMessage: 'Rojo'
  },
  blue: {
    id: 'views.techniques.VehiclesForm.blue',
    defaultMessage: 'Azul'
  },
  green: {
    id: 'views.techniques.VehiclesForm.green',
    defaultMessage: 'Verde'
  },
  brown: {
    id: 'views.techniques.VehiclesForm.brown',
    defaultMessage: 'Café'
  },
  yellow: {
    id: 'views.techniques.VehiclesForm.yellow',
    defaultMessage: 'Amarillo'
  },
  orange: {
    id: 'views.techniques.VehiclesForm.orange',
    defaultMessage: 'Naranja'
  },
  purple: {
    id: 'views.techniques.VehiclesForm.purple',
    defaultMessage: 'Morado'
  },
  invalidYear: {
    id: 'views.techniques.VehiclesForm.invalidYear',
    defaultMessage: 'No es un año valido'
  }
})

export const biometricFormMessages = defineMessages({
  title: {
    id: 'views.techniques.BiometricForm.title',
    defaultMessage: 'Datos biométricos'
  },
  photos: {
    id: 'views.techniques.BiometricForm.photos',
    defaultMessage: 'Fotografías'
  },
  fingerprints: {
    id: 'views.techniques.BiometricForm.fingerprints',
    defaultMessage: 'Huellas dactilares'
  },
  voiceprints: {
    id: 'views.techniques.BiometricForm.voiceprints',
    defaultMessage: 'Huellas de voz'
  },
  savedSuccessfully: {
    id: 'views.techniques.BiometricForm.savedSuccessfully',
    defaultMessage: 'Datos biométricos guardados correctamente'
  },
  waitForDelete: {
    id: 'views.techniques.BiometricForm.waitForDelete',
    defaultMessage: 'Eliminar biometrico'
  },
  waitForDeleteDescription: {
    id: 'views.techniques.BiometricForm.waitForDeleteDescription',
    defaultMessage:
      'Estás intentando eliminar un registro biométrico que ya se encuentra almacenado en nuestros servidores. ¿Estás seguro de que deseas continuar con esta acción?'
  },
  biometricNotDeleted: {
    id: 'views.techniques.BiometricForm.biometricNotDeleted',
    defaultMessage: 'No se eliminó el biométrico'
  },
  biometricDeleted: {
    id: 'views.techniques.BiometricForm.biometricDeleted',
    defaultMessage: 'Biométrico eliminado correctamente'
  }
})

export const socialCircleFormMessages = defineMessages({
  title: {
    id: 'views.techniques.SocialCircleForm.title',
    defaultMessage: 'Circulo social'
  },
  itemTitle: {
    id: 'views.techniques.SocialCircleForm.itemTitle',
    defaultMessage: 'Persona'
  },
  name: {
    id: 'views.techniques.SocialCircleForm.name',
    defaultMessage: 'Nombre'
  },
  namePlaceholder: {
    id: 'views.techniques.SocialCircleForm.namePlaceholder',
    defaultMessage: 'Ej. Pedro Picapiedra'
  },
  activity: {
    id: 'views.techniques.SocialCircleForm.activity',
    defaultMessage: 'Actividad'
  },
  activityPlaceholder: {
    id: 'views.techniques.SocialCircleForm.activityPlaceholder',
    defaultMessage: 'Ej. Extracción de cantera'
  },
  address: {
    id: 'views.techniques.SocialCircleForm.address',
    defaultMessage: 'Dirección'
  }
})

export const useAddressMessages = defineMessages({
  country: {
    id: 'views.techniques.useAddress.country',
    defaultMessage: 'País'
  },
  countryPlaceholder: {
    id: 'views.techniques.useAddress.countryPlaceholder',
    defaultMessage: 'Ej. México'
  },
  state: {
    id: 'views.techniques.useAddress.state',
    defaultMessage: 'Estado'
  },
  statePlaceholder: {
    id: 'views.techniques.useAddress.statePlaceholder',
    defaultMessage: 'Ej. CDMX'
  },
  city: {
    id: 'views.techniques.useAddress.city',
    defaultMessage: 'Ciudad'
  },
  cityPlaceholder: {
    id: 'views.techniques.useAddress.cityPlaceholder',
    defaultMessage: 'Ej. Iztapalapa'
  },
  zipCode: {
    id: 'views.techniques.useAddress.zipCode',
    defaultMessage: 'Código postal'
  },
  zipCodePlaceholder: {
    id: 'views.techniques.useAddress.zipCodePlaceholder',
    defaultMessage: 'Ej. 12345'
  },
  line1: {
    id: 'views.techniques.useAddress.line1',
    defaultMessage: 'Dirección línea 1'
  },
  line1Placeholder: {
    id: 'views.techniques.useAddress.line1Placeholder',
    defaultMessage: 'Ej. Héroes de Tec 123'
  },
  line2: {
    id: 'views.techniques.useAddress.line2',
    defaultMessage: 'Dirección línea 2'
  },
  line2Placeholder: {
    id: 'views.techniques.useAddress.line2Placeholder',
    defaultMessage: 'Ej. Departamento, suite, casa'
  }
})

export const targetListMessages = defineMessages({
  totalTargets: {
    id: 'views.techniques.TargetList.totalTargets',
    defaultMessage: '{total} Objetivos existentes en la ténica de investigación'
  },
  addTarget: {
    id: 'views.techniques.TargetList.addTarget',
    defaultMessage: 'Agregar objetivo'
  }
})

export const techniqueInfoMessages = defineMessages({
  title: {
    id: 'views.techniques.TechniqueInfo.title',
    defaultMessage: 'Descripción de la técnica'
  },
  subtitle: {
    id: 'views.techniques.TechniqueInfo.subtitle',
    defaultMessage: 'Espacio que indica de que trata la técnica en curso.'
  },
  saveDescription: {
    id: 'views.techniques.TechniqueInfo.saveDescription',
    defaultMessage: 'Guardar'
  },
  configuration: {
    id: 'views.techniques.TechniqueInfo.configuration',
    defaultMessage: 'Configuración de la técnica'
  },
  techniqueData: {
    id: 'views.techniques.TechniqueInfo.techniqueData',
    defaultMessage: 'Datos de la técnica'
  },
  updatedSummary: {
    id: 'views.techniques.UpdatedTechnique.techniqueData',
    defaultMessage: 'Descripción actualizada correctamente'
  }
})

export const techniqueFormMessages = defineMessages({
  name: {
    id: 'views.techniques.TechniqueForm.name',
    defaultMessage: 'Nombre de la técnica'
  },
  namePlaceholder: {
    id: 'views.techniques.TechniqueForm.namePlaceholder',
    defaultMessage: 'Ej. T.I.000/2022-0'
  },
  groupDescription: {
    id: 'views.techniques.TechniqueForm.groupdDescription',
    defaultMessage: 'Escribe aquí la descripción del grupo.'
  },
  date: {
    id: 'views.techniques.TechniqueForm.date',
    defaultMessage: 'Fecha de inicio y finalización'
  },
  notification: {
    id: 'views.techniques.TechniqueForm.notification',
    defaultMessage: 'Notificación de caducidad'
  },
  notificationTime: {
    id: 'views.techniques.TechniqueForm.notificationTime',
    defaultMessage: 'Configura el tiempo de antelación en días u horas'
  },
  daysPlaceholder: {
    id: 'views.techniques.TechniqueForm.daysPlaceholder',
    defaultMessage: 'Ej. 3 días'
  },
  hoursPlaceholder: {
    id: 'views.techniques.TechniqueForm.hoursPlaceholder',
    defaultMessage: 'Ej. 3 horas'
  },
  cutSubtitle: {
    id: 'views.techniques.TechniqueForm.cutSubtitle',
    defaultMessage:
      'Establece si la técnica debe enviarse a ciertos turnos de trabajo o cortes'
  },
  shift: {
    id: 'views.techniques.TechniqueForm.shift',
    defaultMessage: 'Turno'
  },
  shiftPlaceholder: {
    id: 'views.techniques.TechniqueForm.shiftPlaceholder',
    defaultMessage: 'Ej. Matutino'
  },
  court: {
    id: 'views.techniques.TechniqueForm.court',
    defaultMessage: 'Corte'
  },
  courtPlaceholder: {
    id: 'views.techniques.TechniqueForm.courtPlaceholder',
    defaultMessage: 'Ej. Cada 2 horas'
  },
  associatedTargets: {
    id: 'views.techniques.TechniqueForm.associatedTargets',
    defaultMessage: 'Objetivos asociados'
  },
  addTargets: {
    id: 'views.techniques.TechniqueForm.addTargets',
    defaultMessage: 'Agregar objetivos'
  },
  startEndDate: {
    id: 'views.techniques.TechniqueForm.startEndDate',
    defaultMessage: 'Fecha de inicio y finalización'
  }
})

export const techniqueInfoTabsMessages = defineMessages({
  generalData: {
    id: 'views.techniques.constants.generalData',
    defaultMessage: 'Datos generales'
  },
  personalData: {
    id: 'views.techniques.constants.personalData',
    defaultMessage: 'Datos personales'
  },
  physicalDescription: {
    id: 'views.techniques.constants.physicalDescription',
    defaultMessage: 'Descripción física'
  },
  laboralData: {
    id: 'views.techniques.constants.laboralData',
    defaultMessage: 'Datos laborales'
  },
  academicData: {
    id: 'views.techniques.constants.academicData',
    defaultMessage: 'Datos académicos'
  },
  organizationData: {
    id: 'views.techniques.constants.organizationData',
    defaultMessage: 'Datos organizaciones'
  },
  socialCircle: {
    id: 'views.techniques.constants.socialCircle',
    defaultMessage: 'Círculo social'
  },
  frequentPlaces: {
    id: 'views.techniques.constants.frequentPlaces',
    defaultMessage: 'Lugares frecuentes'
  },
  socialMedia: {
    id: 'views.techniques.constants.socialMedia',
    defaultMessage: 'Redes sociales'
  },
  language: {
    id: 'views.techniques.constants.language',
    defaultMessage: 'Idiomas'
  },
  bankAccount: {
    id: 'views.techniques.constants.bankAccount',
    defaultMessage: 'Cuentas bancarias'
  },
  cars: {
    id: 'views.techniques.constants.cars',
    defaultMessage: 'Vehículos'
  },
  properties: {
    id: 'views.techniques.constants.properties',
    defaultMessage: 'Propiedades'
  },
  companies: {
    id: 'views.techniques.constants.companies',
    defaultMessage: 'Empresas'
  },
  scheduleData: {
    id: 'views.techniques.constants.scheduleData',
    defaultMessage: 'Datos de agenda'
  },
  biometricData: {
    id: 'views.techniques.constants.biometricData',
    defaultMessage: 'Datos biométricos'
  }
})

export const techniqueUpdateMessages = defineMessages({
  extendTechnique: {
    id: 'views.techniques.update.extendTechnique',
    defaultMessage: 'Extender técnica'
  },
  targetsFoundOnExtension: {
    id: 'views.techniques.update.targetsFoundOnExtension',
    defaultMessage:
      'Se encontraron objetivos que están vinculados a la fecha de finalización de la técnica. Seleccione aquellos que desea que permanezcan con esta fecha para evitar que sean actualizados a la nueva fecha.'
  },
  selectedTargets: {
    id: 'views.techniques.update.selectedTargets',
    defaultMessage: '{selected} objetivos seleccionados'
  },
  updateNotDone: {
    id: 'views.techniques.update.updateNotDone',
    defaultMessage: 'No se realizó la actualización'
  },
  success: {
    id: 'views.techniques.update.success',
    defaultMessage: 'Datos actualizados correctamente'
  },
  anticipateTechnique: {
    id: 'views.techniques.update.anticipateTechnique',
    defaultMessage: 'Anticipar técnica'
  },
  targetsFoundOnAnticipation: {
    id: 'views.techniques.update.targetsFoundOnAnticipation',
    defaultMessage:
      'Los objetivos sin fecha de finalización definida o con fecha posterior a la nueva fecha se limitarán a esta última. ¿Desea continuar?'
  }
})

export const createMetadataDialogMessages = defineMessages({
  title: {
    id: 'views.techniques.createMetadataDialog.title',
    defaultMessage: 'El objetivo no cuenta con formularios'
  },
  message: {
    id: 'views.techniques.createMetadataDialog.message',
    defaultMessage:
      'Selecciona formularios ya existente o crear formularios vacios.'
  }
})

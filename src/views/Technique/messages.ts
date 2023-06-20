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
  deleteTarget: {
    id: 'views.techniques.DeleteTargetDialog.deleteTarget',
    defaultMessage: 'Quitar objetivo'
  },
  wantToRemove: {
    id: 'views.techniques.DeleteTargetDialog.wantToRemove',
    defaultMessage:
      '¿Quieres remover el objetivo {targetPhone} asignado a esta técnica?'
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
  ammount: {
    id: 'views.techniques.AccountBankForm.ammount',
    defaultMessage: 'Monto'
  },
  ammountPlaceholder: {
    id: 'views.techniques.AccountBankForm.ammountPlaceholder',
    defaultMessage: 'Ej. $999,999'
  },
  cardType: {
    id: 'views.techniques.AccountBankForm.cardType',
    defaultMessage: 'Tipo de tarjetas'
  },
  cardTypePlaceholder: {
    id: 'views.techniques.AccountBankForm.cardTypePlaceholder',
    defaultMessage: 'Ej. Crédito'
  },
  creditType: {
    id: 'views.techniques.AccountBankForm.creditType',
    defaultMessage: 'Crédito'
  },
  debitType: {
    id: 'views.techniques.AccountBankForm.debitType',
    defaultMessage: 'Débito'
  },
  payrollType: {
    id: 'views.techniques.AccountBankForm.payrollType',
    defaultMessage: 'Nómina'
  },
  creditBank: {
    id: 'views.techniques.AccountBankForm.creditBank',
    defaultMessage: 'Crédito bancario'
  },
  creditBankPlaceholder: {
    id: 'views.techniques.AccountBankForm.creditBankPlaceholder',
    defaultMessage: 'Ej. Auto $254,000'
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
  companyAddress: {
    id: 'views.techniques.CompaniesForm.companyAddress',
    defaultMessage: 'Domicilio de la empresa'
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
  languagePlaceholder: {
    id: 'views.techniques.LanguagesForm.languagePlaceholder',
    defaultMessage: 'Ej. Náhuatl'
  },
  level: {
    id: 'views.techniques.LanguagesForm.level',
    defaultMessage: 'Nivel de dominio'
  },
  levelPlaceholder: {
    id: 'views.techniques.LanguagesForm.levelPlaceholder',
    defaultMessage: 'Ej. nativo'
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
    defaultMessage: 'Altura'
  },
  heightPlaceholder: {
    id: 'views.techniques.PhysicalDescriptionForm.heightPlaceholder',
    defaultMessage: 'Ej. 170 cm'
  },
  weight: {
    id: 'views.techniques.PhysicalDescriptionForm.weight',
    defaultMessage: 'Peso'
  },
  weightPlaceholder: {
    id: 'views.techniques.PhysicalDescriptionForm.weightPlaceholder',
    defaultMessage: 'Ej. 70 kg'
  },
  bodyType: {
    id: 'views.techniques.PhysicalDescriptionForm.bodyType',
    defaultMessage: 'Tipo de cuerpo'
  },
  bodyTypePlaceholder: {
    id: 'views.techniques.PhysicalDescriptionForm.bodyTypePlaceholder',
    defaultMessage: 'Ej. Ectomorfo'
  },
  skinColor: {
    id: 'views.techniques.PhysicalDescriptionForm.skinColor',
    defaultMessage: 'Color de piel'
  },
  skinColorPlaceholder: {
    id: 'views.techniques.PhysicalDescriptionForm.skinColorPlaceholder',
    defaultMessage: 'Ej. Piel clara'
  },
  whiteSkin: {
    id: 'views.techniques.PhysicalDescriptionForm.whiteSkin',
    defaultMessage: 'Piel blanca'
  },
  darkSkin: {
    id: 'views.techniques.PhysicalDescriptionForm.darkSkin',
    defaultMessage: 'Piel oscura'
  },
  lightSkin: {
    id: 'views.techniques.PhysicalDescriptionForm.lightSkin',
    defaultMessage: 'Piel clara'
  },
  hairType: {
    id: 'views.techniques.PhysicalDescriptionForm.hairType',
    defaultMessage: 'Tipo de cabello'
  },
  hairTypePlaceholder: {
    id: 'views.techniques.PhysicalDescriptionForm.hairTypePlaceholder',
    defaultMessage: 'Ej. Corto, ondulado'
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
  apartment: {
    id: 'views.techniques.PropertiesForm.apartment',
    defaultMessage: 'Departamento'
  },
  house: {
    id: 'views.techniques.PropertiesForm.house',
    defaultMessage: 'Casa'
  },
  office: {
    id: 'views.techniques.PropertiesForm.office',
    defaultMessage: 'Oficina'
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
  sport: {
    id: 'views.techniques.VehiclesForm.sport',
    defaultMessage: 'Deportivo'
  },
  sedan: {
    id: 'views.techniques.VehiclesForm.sedan',
    defaultMessage: 'Sedán'
  },
  motorcycle: {
    id: 'views.techniques.VehiclesForm.motorcycle',
    defaultMessage: 'Motocicleta'
  },
  pickup: {
    id: 'views.techniques.VehiclesForm.Pickup',
    defaultMessage: 'Camioneta'
  },
  plates: {
    id: 'views.techniques.VehiclesForm.plates',
    defaultMessage: 'Placas'
  },
  platesPlaceholder: {
    id: 'views.techniques.VehiclesForm.platesPlaceholder',
    defaultMessage: 'Ej. XA12BC'
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

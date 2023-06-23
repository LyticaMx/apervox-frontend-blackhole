import { defineMessages } from 'react-intl'

export const techniquesMessages = defineMessages({
  title: {
    id: 'views.Techniques.title',
    defaultMessage: 'Técnicas'
  },
  subtitle: {
    id: 'views.Techniques.subtitle',
    defaultMessage: 'Técnicas existentes en la plataforma'
  },
  button: {
    id: 'views.Techniques.button',
    defaultMessage: 'Agregar técnica'
  },
  totalTargets: {
    id: 'views.Techniques.totalTargets',
    defaultMessage: 'Total de objetivos'
  },
  withTargets: {
    id: 'views.Techniques.withTargets',
    defaultMessage: 'Con objetivos'
  },
  withoutTargets: {
    id: 'views.Techniques.withoutTargets',
    defaultMessage: 'Sin objetivos'
  }
})

export const techniquesDeleteDialogMessages = defineMessages({
  title: {
    id: 'views.techniques.deleteDialog.title',
    defaultMessage: 'Eliminar {selected, plural, one{técnica} other={técnicas}}'
  },
  message: {
    id: 'views.techniques.deleteDialog.message',
    defaultMessage:
      '¿Estás seguro de querer eliminar {selected, plural, one{la técnica seleccionada} other{las # técnicas sleccionadas}}?'
  },
  passwordConfirm: {
    id: 'views.techniques.deleteDialog.passwordConfirm',
    defaultMessage:
      'Ingresa tu contraseña para validar la eliminación {selected, plural, one{de la técnica seleccionada} other{de las # técnicas seleccionadas}}'
  },
  success: {
    id: 'views.techniques.deleteDialog.success',
    defaultMessage:
      '{selected, plural, one{Técnica eliminada} other{Técnicas eliminadas}} correctamente'
  }
})

export const createTechniqueDrawerMessages = defineMessages({
  addTechnique: {
    id: 'views.techniques.CreateTechniqueDrawer.addTechnique',
    defaultMessage: 'Agregar técnica'
  },
  completeFields: {
    id: 'views.techniques.CreateTechniqueDrawer.completeFields',
    defaultMessage:
      'Completa los siguientes campos para crear una nueva técnica.'
  },
  success: {
    id: 'views.techniques.CreateTechniqueDrawer.success',
    defaultMessage: 'T.I. creada correctamente'
  }
})

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
  startDate: {
    id: 'views.techniques.TechniqueForm.startDate',
    defaultMessage: 'Fecha de inicio'
  },
  endDate: {
    id: 'views.techniques.TechniqueForm.endDate',
    defaultMessage: 'Fecha de finalización'
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
  },
  loadingGroups: {
    id: 'views.techniques.CreateTechniqueDrawer.loadingGroups',
    defaultMessage: 'Cargando grupos'
  },
  noGroupsFound: {
    id: 'views.techniques.CreateTechniqueDrawer.noGroupsFound',
    defaultMessage: 'No se encontraron grupos'
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

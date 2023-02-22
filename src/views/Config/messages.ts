import { defineMessages } from 'react-intl'

export const messages = defineMessages({
  title: {
    id: 'views.Config.title',
    defaultMessage: 'Configuración general de la plataforma'
  },
  generalPreferences: {
    id: 'views.Config.generalPreferences',
    defaultMessage: 'Preferencias generales de la plataforma Black Hole'
  },
  audioEvidences: {
    id: 'views.Config.audioEvidences',
    defaultMessage: 'Evidencias de audio - Ventana de trabajo'
  },
  selectAudioEvidenceViewType: {
    id: 'views.Config.selectAudioEvidenceViewType',
    defaultMessage: 'Selecciona el tipo de vista para las evidencias de audio'
  },
  summarizedView: {
    id: 'views.Config.summarizedView',
    defaultMessage: 'Vista resumida'
  },
  fullView: {
    id: 'views.Config.fullView',
    defaultMessage: 'Vista completa'
  },
  authenticationPolicy: {
    id: 'views.Config.authenticationPolicy',
    defaultMessage: 'Políticas de autenticación e inicio de sesión'
  },
  maximumSessionNumberPolicy: {
    id: 'views.Config.maximumSessionNumberPolicy',
    defaultMessage:
      'Establece la cantidad de intentos fallidos de inicio de sesión para que ocurra el bloqueo temporal de la cuenta:'
  },
  failedLoginAttemps: {
    id: 'views.Config.failedLoginAttemps',
    defaultMessage: 'Intentos fallidos de inicio de sesión'
  },
  timeUntilSessionUnlockPolicy: {
    id: 'views.Config.timeUntilSessionUnlockPolicy',
    defaultMessage:
      'Establece el tiempo de espera en minutos para desbloque de cuenta de usuario por intentos de inicio de sesión fallidos.'
  },
  waitTime: {
    id: 'views.Config.waitTime',
    defaultMessage: 'Tiempo de espera para desbloqueo de cuenta (min)'
  },
  waitTimeUntilInactivityClosePolicy: {
    id: 'views.Config.waitTimeUntilInactivityClosePolicy',
    defaultMessage:
      'Establece el tiempo de espera en minutos para el cierre automático de sesión por inactividad.'
  },
  waitTimeUntilClose: {
    id: 'views.Config.waitTimeUntilClose',
    defaultMessage: 'Tiempo de espera para cierre de sesión (min)'
  },
  openSessions: {
    id: 'views.Config.openSessions',
    defaultMessage: 'Sesiones abiertas'
  },
  openSessionsPolicy: {
    id: 'views.Config.openSessionsPolicy',
    defaultMessage:
      'Establece la cantidad máxima de sesiones abiertas en diferentes ventanas.'
  },
  maximunOpenSessions: {
    id: 'views.Config.maximunOpenSessions',
    defaultMessage: 'Cantidad de sesiones abiertas'
  },
  downloadRoute: {
    id: 'views.Config.downloadRoute',
    defaultMessage: 'Ruta de descargas'
  },
  selectRoutePath: {
    id: 'views.Config.selectRoutePath',
    defaultMessage: 'Establece donde se guardan las descargas de evidencias.'
  },
  doubleStepDelete: {
    id: 'views.Config.doubleStepDelete',
    defaultMessage: 'Eliminado - Doble validación'
  },
  doubleStepDeletePolicy: {
    id: 'views.Config.doubleStepDeletePolicy',
    defaultMessage:
      'Selecciona si quieres activar la doble validación al momento de eliminar algún registro.'
  },
  activateDoubleStepDelete: {
    id: 'views.Config.activateDoubleStepDelete',
    defaultMessage: 'Activar doble validacion al eliminar registros.'
  },
  itemsSelected: {
    id: 'views.Config.itemsSelected',
    defaultMessage:
      '{selected, plural, one {1 elemento seleccionado} other {{selected} elementos seleccionados}}'
  }
})

export const labelsAdministrationMessages = defineMessages({
  createLabel: {
    id: 'views.Config.LabelsAdministration.createLabel',
    defaultMessage: 'Crear rótulo'
  },
  createLabelSubtitle: {
    id: 'views.Config.LabelsAdministration.createLabelSubtitle',
    defaultMessage:
      'Completa los siguientes campos para crear una plantilla de rótulo y utilizarla en alguna evidencia.'
  },
  evidenceType: {
    id: 'views.Config.LabelsAdministration.evidenceType',
    defaultMessage: 'Tipo de evidencia'
  },
  labelName: {
    id: 'views.Config.LabelsAdministration.labelName',
    defaultMessage: 'Nombre del rótulo'
  },
  labelNamePlaceholder: {
    id: 'views.Config.LabelsAdministration.labelNamePlaceholder',
    defaultMessage: 'Ej. encuentro'
  },
  backgroundColor: {
    id: 'views.Config.LabelsAdministration.backgroundColor',
    defaultMessage: 'Color de fondo'
  },
  selectBackgroundColor: {
    id: 'views.Config.LabelsAdministration.selectBackgroundColor',
    defaultMessage: 'Selecciona un color de fondo para identificar el rótulo.'
  },
  labelData: {
    id: 'views.Config.LabelsAdministration.labelData',
    defaultMessage: 'Datos del rótulo'
  },
  editLabelSubtitle: {
    id: 'views.Config.LabelsAdministration.editLabelSubtitle',
    defaultMessage:
      'Estos son los datos actuales del rótulo seleccionado. Si deseas editar algún campo simplemente has click sobre él y guarda los cambios.'
  },
  deleteLabel: {
    id: 'views.Config.LabelsAdministration.deleteLabel',
    defaultMessage: 'Eliminar rótulo'
  },
  firstDeleteStep: {
    id: 'views.Config.LabelsAdministration.firstDeleteStep',
    defaultMessage:
      '¿Estás seguro de querer eliminar el (los) rótulo(s) seleccionado(s)?'
  },
  secondDeleteStep: {
    id: 'views.Config.LabelsAdministration.secondDeleteStep',
    defaultMessage:
      'Ingresa tu contraseña para validar la eliminación del(los) rótulo(s) seleccionado(s).'
  }
})

export const letterheadAdministrationMessages = defineMessages({
  createLetterhead: {
    id: 'views.Config.LetterheadAdministration.createLetterhead',
    defaultMessage: 'Crear membrete'
  },
  createLetterheadSubtitle: {
    id: 'views.Config.LetterheadAdministration.createLetterheadSubtitle',
    defaultMessage:
      'Asignale un nombre a la plantilla, selecciona el tipo de documento y completa los campos para generar el template que será utilizado en los archivos de exportación.'
  },
  letterheadData: {
    id: 'views.Config.LetterheadAdministration.letterheadData',
    defaultMessage: 'Datos del membrete'
  },
  letterheadDataSubtitle: {
    id: 'views.Config.LetterheadAdministration.letterheadDataSubtitle',
    defaultMessage:
      'Estos son los datos actuales del membrete seleccionado. Si deseas editar algún campo simplemente has click sobre él y guarda los cambios.'
  },
  letterheadName: {
    id: 'views.Config.LetterheadAdministration.letterheadName',
    defaultMessage: 'Nombre del membrete'
  },
  letterheadNamePlaceholder: {
    id: 'views.Config.LetterheadAdministration.letterheadNamePlaceholder',
    defaultMessage: 'Ej. nombre de la institución'
  },
  documentType: {
    id: 'views.Config.LetterheadAdministration.documentType',
    defaultMessage: 'Tipo de documento'
  },
  templateData: {
    id: 'views.Config.LetterheadAdministration.templateData',
    defaultMessage: 'Datos de plantilla'
  },
  organizationName: {
    id: 'views.Config.LetterheadAdministration.organizationName',
    defaultMessage: 'Nombre de la organización'
  },
  organizationNamePlaceholder: {
    id: 'views.Config.LetterheadAdministration.organizationNamePlaceholder',
    defaultMessage: 'Ej. nombre de la institución'
  },
  previewTemplate: {
    id: 'views.Config.LetterheadAdministration.previewTemplate',
    defaultMessage: 'Previsualizar plantilla'
  },
  uploadFile: {
    id: 'views.Config.LetterheadAdministration.uploadFile',
    defaultMessage:
      'Haz {clickHere} para seleccionar el logotipo que deaseas cargar.'
  },
  deleteLetterhead: {
    id: 'views.Config.LetterheadAdministration.deleteLetterhead',
    defaultMessage: 'Eliminar membrete'
  },
  firstDeleteStep: {
    id: 'views.Config.LetterheadAdministration.firstDeleteStep',
    defaultMessage:
      '¿Estás seguro de querer eliminar el(los) membrete(s) seleccionado(s)?'
  },
  secondDeleteStep: {
    id: 'views.Config.LetterheadAdministration.secondDeleteStep',
    defaultMessage:
      'Ingresa tu contraseña para validar la eliminación de(los) membrete(s) seleccionado(s).'
  }
})

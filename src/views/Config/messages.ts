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
  },
  mediaAndDevices: {
    id: 'views.Config.mediaAndDevices',
    defaultMessage: 'Medios y compañias'
  },
  telecomStations: {
    id: 'views.Config.telecomStations',
    defaultMessage: 'Estaciones de telecomunicaciones'
  },
  updatedSuccessfully: {
    id: 'views.Config.updatedSuccessfully',
    defaultMessage: 'Configuración actualizada correctamente'
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
  evidenceTypeAll: {
    id: 'views.Config.LabelsAdministration.evidenceTypeAll',
    defaultMessage: 'Todas las evidencias'
  },
  evidenceTypeAudio: {
    id: 'views.Config.LabelsAdministration.evidenceTypeAudio',
    defaultMessage: 'Evidencia de audio'
  },
  evidenceTypeImage: {
    id: 'views.Config.LabelsAdministration.evidenceTypeImage',
    defaultMessage: 'Evidencia de imagen'
  },
  evidenceTypeVideo: {
    id: 'views.Config.LabelsAdministration.evidenceTypeVideo',
    defaultMessage: 'Evidencia de video'
  },
  evidenceTypeDocument: {
    id: 'views.Config.LabelsAdministration.evidenceTypeDocument',
    defaultMessage: 'Evidencia de documento'
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

export const mediaMessages = defineMessages({
  title: {
    id: 'views.Config.Media.title',
    defaultMessage: 'Medios y compañias para medios de adquisición'
  },
  media: { id: 'views.Config.Media.media', defaultMessage: 'Medios' },
  carriers: {
    id: 'views.Config.Media.carriers',
    defaultMessage: 'Compañías telefónicas'
  },
  devices: { id: 'views.Config.Media.devices', defaultMessage: 'Equipos' },
  mediaCounter: {
    id: 'views.Config.Media.mediaCounter',
    defaultMessage: '{counter} medios'
  },
  deviceCounter: {
    id: 'views.Config.Media.deviceCounter',
    defaultMessage: '{counter} equipos'
  },
  carrierCounter: {
    id: 'views.Config.media.carrierCounter',
    defaultMessage: '{counter} compañias existentes en el sistema'
  },
  carrierCaption: {
    id: 'views.Config.Media.carrierCaption',
    defaultMessage: 'Compañia / Operador de telefonía'
  },
  deviceCaption: {
    id: 'views.Config.Media.deviceCaption',
    defaultMessage: 'Equipo - {device}'
  },
  deleteMedia: {
    id: 'views.Config.Media.deleteMedia',
    defaultMessage: 'Eliminar Medio'
  },
  deleteQuestion: {
    id: 'views.Config.Media.deleteQuestion',
    defaultMessage:
      '¿Estás seguro de querer eliminar el(los) medio(s) seleccionado(s)?'
  },
  deleteConfirmation: {
    id: 'views.Config.Media.deleteConfirmation',
    defaultMessage:
      'Ingresa tu contraseña para validar la eliminación de(los) medio(s) seleccionado(s)'
  },
  createCarrier: {
    id: 'views.Config.Media.createCarrier',
    defaultMessage: 'Agregar compañia telefónica'
  },
  createCarrierSubtitle: {
    id: 'views.Config.Media.createCarrierSubtitle',
    defaultMessage:
      'Completa los siguientes campos para agregar una compañía de telefonía que se utilizará en el módulo medios de adquisición'
  },
  carrierName: {
    id: 'views.Config.Media.carrierName',
    defaultMessage: 'Nombre de la compañia u operador telefónico'
  },
  carrierNamePlaceholder: {
    id: 'views.Config.Media.carrierNamePlaceholder',
    defaultMessage: 'Ej. Compañia X'
  },
  carrierData: {
    id: 'views.Config.Media.carrierData',
    defaultMessage: 'Datos de la compañia'
  },
  actualCarrierData: {
    id: 'views.Config.Media.actualCarrierData',
    defaultMessage: 'Datos actuales de la compañia seleccionada'
  },
  mediaName: {
    id: 'views.Config.Media.mediaName',
    defaultMessage: 'Nombre del medio'
  },
  mediaNamePlaceholder: {
    id: 'views.Config.Media.mediaNamePlaceholder',
    defaultMessage: 'Ej. FXS'
  },
  deviceName: {
    id: 'views.Config.Media.deviceName',
    defaultMessage: 'Nombre del equipo'
  },
  deviceNamePlaceholder: {
    id: 'views.Config.Media.deviceNamePlaceholder',
    defaultMessage: 'Ej. marca y modelo'
  },
  addMedia: {
    id: 'views.Config.Media.addMedia',
    defaultMessage: 'Agregar medio'
  },
  addDevice: {
    id: 'views.Config.Media.addDevice',
    defaultMessage: 'Agregar equipo'
  },
  addMediaOrDevice: {
    id: 'views.Config.Media.addMediaOrDevice',
    defaultMessage: 'Agregar medio o equipo'
  },
  completeToAddMediaOrDevice: {
    id: 'views.Config.Media.completeToAddMediaOrDevice',
    defaultMessage:
      'Completa los siguientes campos para agregar un {type, select, media {medio} other {equipo}} al sistema'
  },
  selectMediaOrDevice: {
    id: 'views.Config.Media.selectMediaorDevice',
    defaultMessage: 'Selecciona si quieres agregar un medio o un equipo.'
  },
  mediaData: {
    id: 'views.Config.Media.mediaData',
    defaultMessage: 'Datos del medio'
  },
  actualMediaData: {
    id: 'views.Config.Media.actualMediaData',
    defaultMessage: 'Datos actuales del medio seleccionado.'
  },
  deviceData: {
    id: 'views.Config.Media.deviceData',
    defaultMessage: 'Datos del equipo'
  },
  actualDeviceData: {
    id: 'views.Config.Media.actualDeviceData',
    defaultMessage: 'Datos actuales del equipo seleccionado.'
  }
})

export const telecomMessages = defineMessages({
  title: {
    id: 'views.Config.Telecom.title',
    defaultMessage: 'Georeferencias estaciones telecomunicaciones'
  },
  actualTelecomStations: {
    id: 'views.Config.Telecom.actualTelecomStations',
    defaultMessage: '{total} estaciones telecom existentes en la plataforma'
  },
  downloadFormat: {
    id: 'views.Config.Telecom.downloadFormat',
    defaultMessage: 'Descargar formato geo'
  },
  addGeoreference: {
    id: 'views.Config.Telecom.addGeoreference',
    defaultMessage: 'Agregar georeferencia'
  },
  geoPlaceholder: {
    id: 'views.Config.Telecom.geoPlaceholder',
    defaultMessage: 'Ej. 1112223334'
  },
  massiveLoad: {
    id: 'views.Config.Telecom.massiveLoad',
    defaultMessage: 'Carga masiva de georeferencias'
  },
  uploadFile: {
    id: 'views.Config.Telecom.uploadFile',
    defaultMessage:
      'Haz {clickHere} para seleccionar el logotipo que deaseas cargar.'
  },
  addGeoSubtitle: {
    id: 'views.Config.Telecom.addGeoSubtitle',
    defaultMessage:
      'Completa los siguientes campos para agregar una georeferencia de una estación de telecomunicaciones.'
  },
  geoData: {
    id: 'views.Config.Telecom.geoData',
    defaultMessage: 'Datos de la georeferencia'
  },
  actualGeoData: {
    id: 'views.Config.Telecom.actualGeoData',
    defaultMessage: 'Datos actuales de la georeferencia seleccionada'
  },
  deleteGeo: {
    id: 'views.Config.Telecom.deleteGeo',
    defaultMessage: 'Eliminar Georeferencia'
  },
  deleteQuestion: {
    id: 'views.Config.Telecom.deleteQuestion',
    defaultMessage:
      '¿Estás seguro de querer eliminar la(s) georeferencia(s) seleccionada(s)?'
  },
  deleteConfirmation: {
    id: 'views.Config.Telecom.deleteConfirmation',
    defaultMessage:
      'Ingresa tu contraseña para validar la eliminación de la(s) georeferencia(s) seleccionada(s)'
  }
})

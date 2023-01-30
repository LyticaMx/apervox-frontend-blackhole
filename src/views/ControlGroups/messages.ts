import { defineMessages } from 'react-intl'

export const messages = defineMessages({
  title: {
    id: 'views.ControlGroups.title',
    defaultMessage: 'Grupos de control'
  },
  divider: {
    id: 'views.ControlGroups.divider',
    defaultMessage: 'Grupo control'
  },
  message: {
    id: 'views.ControlGroups.message',
    defaultMessage: 'Seleccionar un grupo de control para ver su información'
  }
})

export const groupsMessages = defineMessages({
  title: {
    id: 'views.ControlGroups.components.groups.title',
    defaultMessage: 'Grupos de control registrados'
  },
  buttonCreate: {
    id: 'views.ControlGroups.components.groups.buttonCreate',
    defaultMessage: 'Crear grupo'
  },
  tableAudios: {
    id: 'views.ControlGroups.components.groups.tableAudios',
    defaultMessage: '# Audios asociados'
  },
  tableVector: {
    id: 'views.ControlGroups.components.groups.tableVector',
    defaultMessage: 'Huella de voz generada'
  }
})

export const audiosMessages = defineMessages({
  title: {
    id: 'views.ControlGroups.components.audios.title',
    defaultMessage: 'Audios asociados al grupo de control'
  },
  hasEmbedding: {
    id: 'views.ControlGroups.components.audios.hasEmbedding',
    defaultMessage: 'Con huella de voz'
  },
  noEmbedding: {
    id: 'views.ControlGroups.components.audios.noEmbedding',
    defaultMessage: 'Sin huella de voz'
  },

  buttonAddAudio: {
    id: 'views.ControlGroups.components.audios.buttonAddAudio',
    defaultMessage: 'Agregar audio'
  },
  buttonCreateEmbedding: {
    id: 'views.ControlGroups.components.audios.buttonCreateEmbedding',
    defaultMessage: 'Crear huella de voz'
  },

  tableAudio: {
    id: 'views.ControlGroups.components.audios.tableAudio',
    defaultMessage: 'Audio'
  },
  tableLoadingDate: {
    id: 'views.ControlGroups.components.audios.tableLoadingDate',
    defaultMessage: 'Fecha de carga'
  },
  tableActions: {
    id: 'views.ControlGroups.components.audios.tableActions',
    defaultMessage: 'Acciones'
  }
})

export const callsMessages = defineMessages({
  title: {
    id: 'views.ControlGroups.components.calls.title',
    defaultMessage: 'Llamadas con alta similitud con huella de control'
  },
  subtitle: {
    id: 'views.ControlGroups.components.calls.subtitle',
    defaultMessage:
      'Considerando alta similitud un valor superior o igual a 85%'
  },

  tableHour: {
    id: 'views.ControlGroups.components.calls.tableHour',
    defaultMessage: 'Hora'
  },
  tableReceptor: {
    id: 'views.ControlGroups.components.calls.tableReceptor',
    defaultMessage: 'Receptor'
  },
  tableDuration: {
    id: 'views.ControlGroups.components.calls.tableDuration',
    defaultMessage: 'Duración [s]'
  },
  tableSimilarity: {
    id: 'views.ControlGroups.components.calls.tableSimilarity',
    defaultMessage: 'Similitud'
  },
  tableDetails: {
    id: 'views.ControlGroups.components.calls.tableDetails',
    defaultMessage: 'Detalles'
  }
})

export const formDialogMessages = defineMessages({
  title: {
    id: 'views.ControlGroups.components.formDialog.title',
    defaultMessage: 'Grupo de control'
  },
  pinplaceholder: {
    id: 'views.ControlGroups.components.formDialog.pinplaceholder',
    defaultMessage: 'Seleccionar pin'
  },
  current: {
    id: 'views.ControlGroups.components.formDialog.current',
    defaultMessage: 'Establecer como grupo principal'
  },
  embedding: {
    id: 'views.ControlGroups.components.formDialog.embedding',
    defaultMessage: 'Generar huella de voz'
  },
  removeAll: {
    id: 'views.ControlGroups.components.formDialog.removeAll',
    defaultMessage: 'Eliminar todo'
  }
})

export const deleteMessages = defineMessages({
  title: {
    id: 'views.ControlGroups.components.deleteDialog.title',
    defaultMessage: 'Remover {audio} del grupo {controlgroup}'
  }
})

export const addAudiosMessages = defineMessages({
  title: {
    id: 'views.ControlGroups.components.addAudiosDialog.title',
    defaultMessage: 'Añadir audios al grupo {groupId}'
  },
  removeAll: {
    id: 'views.ControlGroups.components.formDialog.removeAll',
    defaultMessage: 'Eliminar todo'
  }
})

export const embeddingDialogMessages = defineMessages({
  createVoiceprint: {
    id: 'views.ControlGroups.components.EmbeddingDialog.createVoiceprint',
    defaultMessage: 'Crear huella de voz'
  },
  description: {
    id: 'views.ControlGroups.components.EmbeddingDialog.description',
    defaultMessage: 'Descripcion de la creacion'
  }
})

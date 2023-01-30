import { defineMessages } from 'react-intl'

export const messages = defineMessages({
  title: {
    id: 'views.bondingNetwork.title',
    defaultMessage: 'Redes de vinculación'
  },
  subtitle: {
    id: 'views.bondingNetwork.subtitle',
    defaultMessage:
      'Las redes de vinculación permiten simplificar el espacio de búsqueda para realizar comparaciones'
  }
})

export const networkMessages = defineMessages({
  title: {
    id: 'views.bondingNetwork.components.network.title',
    defaultMessage: 'Red generada apartir de la muestra'
  },
  subtitle: {
    id: 'views.bondingNetwork.components.network.subtitle',
    defaultMessage:
      'La red creada asocia a los audios y los hablantes detectados'
  },
  controls: {
    id: 'views.bondingNetwork.components.network.controls',
    defaultMessage: 'Controles'
  },
  zoom: {
    id: 'views.bondingNetwork.components.network.zoom',
    defaultMessage: 'Zoom'
  }
})

export const callsMessages = defineMessages({
  title: {
    id: 'views.bondingNetwork.components.calls.title',
    defaultMessage: 'Llamadas asociadas a la red'
  }
})

export const filtersMessages = defineMessages({
  title: {
    id: 'views.bondingNetwork.components.filters.title',
    defaultMessage: 'Seleccion de muestra'
  },
  subtitle: {
    id: 'views.bondingNetwork.components.filters.subtitle',
    defaultMessage: 'Filtrar muestras por pin y rango de fechas'
  },
  pickEmbedding: {
    id: 'views.bondingNetwork.components.filters.pickEmbedding',
    defaultMessage: 'Seleccione muestra base'
  },
  pickEmbeddingPlaceholder: {
    id: 'views.bondingNetwork.components.filters.pickEmbeddingPlaceholder',
    defaultMessage: 'Muestra base'
  },
  generate: {
    id: 'views.bondingNetwork.components.filters.generate',
    defaultMessage: 'Generar red'
  },
  selectPinPlaceholder: {
    id: 'views.bondingNetwork.components.filters.selectPinPlaceholder',
    defaultMessage: 'Seleccione un PIN'
  },
  resultsPin: {
    id: 'views.bondingNetwork.components.filters.resultsPin',
    defaultMessage: '{total} resultados para el PIN <pin></pin>'
  },
  fromDate: {
    id: 'views.bondingNetwork.components.filters.fromDate',
    defaultMessage: ' y fecha a partir de <date></date>'
  },
  fromDates: {
    id: 'views.bondingNetwork.components.filters.fromDates',
    defaultMessage: ' y fecha del <from></from> al <to></to>'
  }
})

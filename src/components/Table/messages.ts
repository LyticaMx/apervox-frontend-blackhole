import { defineMessages } from 'react-intl'

export const messages = defineMessages({
  selectedElements: {
    id: 'components.Table.selectedElements',
    defaultMessage:
      '{selectedItems, select , all{Todos los elementos seleccionados} one {Un elemento seleccionado} other {{selectedItems} elementos seleccionados}}'
  },
  action: {
    id: 'components.Table.action',
    defaultMessage: 'Acción'
  }
})

export const paginationMessages = defineMessages({
  paginationResults: {
    id: 'components.Table.Pagination.paginationResults',
    defaultMessage: '{from} a {to} de {of} resultados.'
  },
  rowsPerPage: {
    id: 'components.Table.Pagination.rowsPerPage',
    defaultMessage: 'Filas por página'
  }
})

export const tableConfigurationMessages = defineMessages({
  title: {
    id: 'components.Table.TableConfiguration.title',
    defaultMessage: 'Configuración de tabla'
  }
})

import { defineMessages } from 'react-intl'

export const messages = defineMessages({
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

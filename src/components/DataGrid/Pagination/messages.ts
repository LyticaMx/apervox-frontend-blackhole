import { defineMessages } from 'react-intl'

export const messages = defineMessages({
  totalCount: {
    id: 'components.DataGrid.Pagination.totalCount',
    defaultMessage: '{from} a {to} de {of} resultados.'
  },
  noResults: {
    id: 'components.DataGrid.Pagination.noResults',
    defaultMessage: 'Sin resultados.'
  },
  paginationOption: {
    id: 'components.DataGrid.Pagination.paginationOption',
    defaultMessage: '{option} / pág'
  }
})

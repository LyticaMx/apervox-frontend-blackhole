import { defineMessages } from 'react-intl'

export const auditMessages = defineMessages({
  title: {
    id: 'views.Audit.title',
    defaultMessage: 'Auditoría de usuarios'
  },
  subtitle: {
    id: 'views.Audit.subtitle',
    defaultMessage: 'Certificar las acciones del uso y manejo de {bold}'
  },
  actionDetails: {
    id: 'views.Audit.actionDetails',
    defaultMessage: 'Detalles de las acciones'
  },
  selectUserAndDate: {
    id: 'views.Audit.selectUserAndDate',
    defaultMessage: 'Selección de usuario y fecha'
  },
  helperText: {
    id: 'views.Audit.helperText',
    defaultMessage:
      'Para facilitar tu elección puedes filtrar por usuario y rango de fechas'
  },
  actionsOf: {
    id: 'views.Audit.actionsOf',
    defaultMessage: '{actions} acciones de {of}'
  },
  fromDate: {
    id: 'views.Audit.actionsOf.fromDate',
    defaultMessage: ' y fecha a partir de {date}'
  },
  fromDates: {
    id: 'views.Audit.actionsOf.fromDates',
    defaultMessage: ' y fecha del {from} al {to}'
  },
  useFilters: {
    id: 'views.Audit.actionsOf.useFilters',
    defaultMessage:
      'Utiliza los filtros y consulta para poder visualizar el detalle de las acciones'
  },
  selectPlaceholder: {
    id: 'views.Audit.actionsOf.selectPlaceholder',
    defaultMessage: 'Seleccione un usuario'
  },
  withoutParams: {
    id: 'views.Audit.actionsOf.withoutParams',
    defaultMessage: 'Sin parámetros'
  }
})

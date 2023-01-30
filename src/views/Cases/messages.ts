import { defineMessages } from 'react-intl'

export const casesMessages = defineMessages({
  newCases: {
    id: 'views.Cases.newCases',
    defaultMessage: 'Nuevos casos'
  },
  pinsInCases: {
    id: 'views.Cases.pinsInCases',
    defaultMessage: 'PINs en casos'
  },
  alertsInCases: {
    id: 'views.Cases.alertsInCases',
    defaultMessage: 'Alertas en casos'
  },
  addCase: { id: 'views.Cases.addCase', defaultMessage: 'Añadir caso' },
  caseDetails: {
    id: 'views.Cases.caseDetails',
    defaultMessage: 'Haz click en un caso para obtener más detalles'
  },
  linkUser: {
    id: 'views.Cases.linkUser',
    defaultMessage: 'Vincular usuarios'
  },
  linkPins: {
    id: 'views.Cases.linkPins',
    defaultMessage: 'Vincular PINs'
  },
  linkUsersPlaceholder: {
    id: 'views.Cases.linkUsersPlaceholder',
    defaultMessage: 'Seleccione los usuarios...'
  },
  linkPinsPlaceholder: {
    id: 'views.Cases.linkPinsPlaceholder',
    defaultMessage: 'Seleccione los PINs...'
  }
})

export const callsTabMessages = defineMessages({
  title: {
    id: 'views.Cases.CallsTab.title',
    defaultMessage: 'Lista de llamadas de los PINs asociados al caso'
  },
  withAlert: {
    id: 'views.Cases.CallsTab.withAlert',
    defaultMessage: 'Llamadas con alertas'
  },
  withoutAlert: {
    id: 'views.Cases.CallsTab.withoutAlert',
    defaultMessage: 'Llamadas sin alertas'
  },
  all: {
    id: 'views.Cases.CallsTab.all',
    defaultMessage: 'Todas las llamadas'
  }
})

export const createCaseDialogMessages = defineMessages({
  createCase: {
    id: 'views.Cases.CreateCaseDialog.createCase',
    defaultMessage: 'Crear caso'
  },
  linkedCreate: {
    id: 'views.Cases.CreateCaseDialog.linkedCreate',
    defaultMessage:
      'La creación de nuevos casos quedaran vinculadas a tu usuario'
  }
})

export const caseCardMessages = defineMessages({
  frequentNumbers: {
    id: 'views.Cases.CaseCard.frequentNumbers',
    defaultMessage: 'Números frecuentes'
  }
})

export const casesCardMessages = defineMessages({
  noCaseSelected: {
    id: 'views.Cases.CasesCard.noCaseSelected',
    defaultMessage: 'Seleccione un caso para ver mas detalles'
  }
})

export const editCaseDialogMessages = defineMessages({
  editCase: {
    id: 'views.Cases.editCaseDialog.editCase',
    defaultMessage: 'Editar caso'
  },
  linkedEdit: {
    id: 'views.Cases.editCaseDialog.linkedEdit',
    defaultMessage: 'La edición del caso quedará vinculada a tu usuario'
  },
  archiveCase: {
    id: 'views.Cases.editCaseDialog.archiveCase',
    defaultMessage: 'Archivar caso '
  }
})

export const ejectPinDialogMessages = defineMessages({
  unlinkPin: {
    id: 'views.Cases.ejectPinDialog.unlinkPin',
    defaultMessage: 'Dejar de seguir PIN {pin}'
  }
})

export const kickOutUserDialogMessages = defineMessages({
  kickOut: {
    id: 'views.Cases.kickOutUserDialog.kickOut',
    defaultMessage: 'Expulsar a {user}'
  }
})

export const linkPinDialogMessages = defineMessages({
  linkPin: {
    id: 'views.Cases.LinkPinDialog.linkPin',
    defaultMessage: 'Vincular PIN'
  },
  addPin: {
    id: 'views.Cases.LinkPinDialog.addPin',
    defaultMessage: 'Añadir PIN al caso {caseName}'
  },
  linkPinPlaceholder: {
    id: 'views.Cases.LinkPinDialog.linkPinPlaceholder',
    defaultMessage: 'Seleccionar PIN...'
  }
})

export const linkUserDialogMessages = defineMessages({
  linkUser: {
    id: 'views.Cases.LinkUserDialog.linkUser',
    defaultMessage: 'Añadir usuario al caso {caseName}'
  },
  linkUserPlaceholder: {
    id: 'views.Cases.LinkUserDialog.linkUserPlaceholder',
    defaultMessage: 'Seleccionar usuario...'
  }
})

export const pinsTabMessages = defineMessages({
  title: {
    id: 'views.Cases.pinsTab.title',
    defaultMessage: 'Añadir un PIN al caso para dar seguimiento más cercano.'
  },
  addPin: {
    id: 'views.Cases.pinsTab.addPin',
    defaultMessage: 'Añadir PIN'
  }
})

export const reactivateCaseDialogMessages = defineMessages({
  reactivateCase: {
    id: 'views.Cases.reactivateCaseDialog.reactivateCase',
    defaultMessage: 'Desea reactivar el caso {caseName}'
  }
})

export const usersTabMessages = defineMessages({
  onlyLinkedUsers: {
    id: 'views.Cases.usersTab.onlyLinkedUsers',
    defaultMessage:
      'Sólo los usuarios vinculados a un caso podran ver esta información.'
  },
  addUser: {
    id: 'views.Cases.usersTab.addUser',
    defaultMessage: 'Añadir usuario'
  }
})

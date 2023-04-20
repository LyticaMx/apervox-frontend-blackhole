import { defineMessages } from 'react-intl'

export const usersMessages = defineMessages({
  title: {
    id: 'views.users.title',
    defaultMessage: 'Control de usuarios'
  },
  subtitle: {
    id: 'views.users.subtitle',
    defaultMessage: 'Usuarios existentes en el sistema'
  },
  button: {
    id: 'views.users.button',
    defaultMessage: 'Crear usario'
  }
})

export const usersDeleteMessages = defineMessages({
  title: {
    id: 'views.users.delete.title',
    defaultMessage:
      'Eliminar {selectedUsers, plural, one {usuario} other {usuarios}}'
  },
  message: {
    id: 'views.users.delete.message',
    defaultMessage:
      '¿Estas seguro de querer eliminar {selectedUsers, plural, one {el usuario seleccionado} other {los # usuarios seleccionados}}?'
  },
  confirm: {
    id: 'views.users.delete.confirm',
    defaultMessage: '¿Estas seguro de querer eliminar el usuario seleccionado?'
  },
  passwordConfirm: {
    id: 'views.users.delete.passwordConfirm',
    defaultMessage:
      'Ingresa tu contraseña para validar la eliminación {selectedUsers, plural, one {del usuario seleccionado} other {de los # usuarios seleccionados}}'
  },
  success: {
    id: 'views.users.delete.success',
    defaultMessage:
      '{users, plural, one {Usuario eliminado} other {Usuarios eliminados}} correctamente'
  },
  incorrectPassword: {
    id: 'views.users.delete.incorrectPassword',
    defaultMessage: 'Contraseña incorrecta'
  }
})

export const usersDisableMessages = defineMessages({
  title: {
    id: 'views.users.disable.title',
    defaultMessage:
      'Deshabilitar {selectedUsers, plural, one {usuario} other {usuarios}}'
  },
  message: {
    id: 'views.users.disable.message',
    defaultMessage:
      '{selectedUsers, plural, one {El usuario seleccionado se encuentra habilitado} other {Los # usuarios seleccionados se encuentran habilitados}}'
  },
  success: {
    id: 'views.users.disable.success',
    defaultMessage:
      '{users, plural, one{Usuario {enabled, select, true{habilitado} other{deshabilitado}} correctamente} other {Usuarios {enabled, select, true{habilitados} other{deshabilitados}} correctamente}}'
  }
})

export const usersRemoteLogOffMessages = defineMessages({
  title: {
    id: 'views.users.remoteLogOff.title',
    defaultMessage: 'Cierre de sesión remoto'
  },
  message: {
    id: 'views.users.remoteLogOff.message',
    defaultMessage:
      'Se procederá al cierre de sesión {selectedUsers, plural, one {del usuario seleccionado} other {de los # usuarios seleccionados}}'
  },
  success: {
    id: 'views.users.remoteLogOff.success',
    defaultMessage: 'Sesiones cerradas correctamente'
  }
})

export const usersResetPasswordMessages = defineMessages({
  title: {
    id: 'views.users.resetPassword.title',
    defaultMessage: 'Restablecer contraseña del usuario'
  },
  message: {
    id: 'views.users.resetPassword.message',
    defaultMessage:
      'Se generará una contraseña temporal para el usuario seleccionado. ¿estás de acuerdo?'
  }
})

export const usersUnlockMessages = defineMessages({
  title: {
    id: 'views.users.unlock.title',
    defaultMessage: 'Desbloquear cuenta'
  },
  message: {
    id: 'views.users.unlock.message',
    defaultMessage:
      'El usuario ha sido bloqueado por realizar varios intentos fallidos de inicio de sesión. ¿Seguro que quieres desbloquearlo?'
  }
})

export const usersCreateMessages = defineMessages({
  title: {
    id: 'views.users.create.title',
    defaultMessage: 'Crear usuario'
  },
  message: {
    id: 'views.users.create.message',
    defaultMessage:
      'Completa los siguientes campos para agregar un nuevo usuario.'
  },
  success: {
    id: 'views.users.create.success',
    defaultMessage: 'Usuario registrado correctamente'
  }
})

export const usersEditMessages = defineMessages({
  title: {
    id: 'views.users.edit.title',
    defaultMessage: 'Datos del usuario'
  },
  message: {
    id: 'views.users.edit.message',
    defaultMessage: 'Datos actuales del usuario'
  },
  success: {
    id: 'views.users.edit.success',
    defaultMessage: 'Usuario editado correctamente'
  }
})

export const newPasswordMessages = defineMessages({
  title: {
    id: 'views.users.newPassword.title',
    defaultMessage: 'Nueva contraseña'
  },
  message: {
    id: 'views.users.newPassword.message',
    defaultMessage: 'La nueva contraseña para el usuario es: {password}'
  }
})

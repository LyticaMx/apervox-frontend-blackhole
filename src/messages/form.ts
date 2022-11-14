import { defineMessages } from 'react-intl'

export const formMessages = defineMessages({
  /* Labels */
  email: {
    id: 'global.form.email',
    defaultMessage: 'Correo electrónico'
  },
  password: {
    id: 'global.form.password',
    defaultMessage: 'Contraseña'
  },
  name: {
    id: 'global.form.name',
    defaultMessage: 'Nombre(s)'
  },
  lastname: {
    id: 'global.form.lastname',
    defaultMessage: 'Apellido paterno'
  },
  secondLastname: {
    id: 'global.form.secondLastname',
    defaultMessage: 'Apellido materno'
  },
  startDate: {
    id: 'global.form.startDate',
    defaultMessage: 'Fecha inicial'
  },
  endDate: {
    id: 'global.form.endDate',
    defaultMessage: 'Fecha final'
  },
  time: {
    id: 'global.form.time',
    defaultMessage: 'Tiempo'
  },

  /* Errors */
  required: {
    id: 'global.form.required',
    defaultMessage: 'Requerido'
  },
  invalidEmail: {
    id: 'global.form.invalidEmail',
    defaultMessage: 'Correo electrónico invalido'
  }
})

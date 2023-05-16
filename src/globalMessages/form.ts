import { defineMessages } from 'react-intl'

export const formMessages = defineMessages({
  /* Labels */
  username: {
    id: 'global.form.username',
    defaultMessage: 'Nombre de usuario'
  },
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
    defaultMessage: 'Nombre'
  },
  names: {
    id: 'global.form.names',
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
  surnames: {
    id: 'global.form.surnames',
    defaultMessage: 'Apellidos'
  },
  startDate: {
    id: 'global.form.startDate',
    defaultMessage: 'Fecha inicial'
  },
  endDate: {
    id: 'global.form.endDate',
    defaultMessage: 'Fecha final'
  },
  age: {
    id: 'global.form.age',
    defaultMessage: 'Edad'
  },
  location: {
    id: 'global.form.location',
    defaultMessage: 'Localidad'
  },
  gender: {
    id: 'global.form.gender',
    defaultMessage: 'Genero'
  },
  male: {
    id: 'global.form.male',
    defaultMessage: 'Masculino'
  },
  female: {
    id: 'global.form.female',
    defaultMessage: 'Femenino'
  },
  extension: {
    id: 'global.form.extension',
    defaultMessage: 'Extensión'
  },
  role: {
    id: 'global.form.role',
    defaultMessage: 'Rol'
  },
  position: {
    id: 'global.form.position',
    defaultMessage: 'Posición'
  },
  automaticSessionExpiration: {
    id: 'global.form.automaticSessionExpiration',
    defaultMessage: 'Vencimiento de sesión automático'
  },
  /* Placeholders */
  phonePlaceholder: {
    id: 'global.form.phonePlaceholder',
    defaultMessage: 'Ej. 1112223444'
  },

  /* Errors */
  required: {
    id: 'global.form.required',
    defaultMessage: 'Requerido'
  },
  invalidEmail: {
    id: 'global.form.invalidEmail',
    defaultMessage: 'Correo electrónico invalido'
  },
  search: {
    id: 'global.form.search',
    defaultMessage: 'Busqueda'
  },
  mustBeNumber: {
    id: 'global.form.mustBeNumber',
    defaultMessage: 'Debe ser un valor númerico'
  },
  minLength: {
    id: 'global.form.minLength',
    defaultMessage: 'El campo debe tener al menos {length} caracteres'
  },
  length: {
    id: 'global.form.length',
    defaultMessage: 'El campo debe tener {length} caracteres'
  },
  minValue: {
    id: 'global.form.minValue',
    defaultMessage: 'El valor debe ser mayor o igual a {value}'
  },
  maxValue: {
    id: 'global.form.maxValue',
    defaultMessage: 'El valor debe ser menor o igual a {value}'
  },
  hourFormat: {
    id: 'global.form.hourFormat',
    defaultMessage: 'El valor debe estar en formato HH:mm:ss'
  },
  passwordsNotMatches: {
    id: 'global.form.passwordsNotMatches',
    defaultMessage: 'Las contraseñas no coinciden'
  }
})

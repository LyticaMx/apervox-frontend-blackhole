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
  mustBeInteger: {
    id: 'global.form.mustBeInteger',
    defaultMessage: 'Debe ser un número entero'
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
  oldPasswordCantMatchNewPassword: {
    id: 'global.form.oldPasswordCantMatchNewPassword',
    defaultMessage: 'La nueva contraseña no puede ser igual a la anterior'
  },
  passwordsNotMatches: {
    id: 'global.form.passwordsNotMatches',
    defaultMessage: 'Las contraseñas no coinciden'
  },
  chooseAtLeastOneField: {
    id: 'global.form.chooseAtLeastOneField',
    defaultMessage: 'Debes escoger al menos un campo'
  },
  invalidPhoneNumber: {
    id: 'global.form.invalidPhoneNumber',
    defaultMessage: 'Número telefónico no valido'
  },
  onlyLetters: {
    id: 'global.form.onlyLetters',
    defaultMessage: 'El campo sólo debe contener letras'
  },
  onlyLettersAndNumbers: {
    id: 'global.form.onlyLettersAndNumbers',
    defaultMessage: 'El campo sólo debe contener letras y/o números'
  },
  invalidUsername: {
    id: 'global.form.invalidUsername',
    defaultMessage: 'Nombre de usuario no valido'
  },
  invalidSimpleText: {
    id: 'global.form.invalidSimpleText',
    defaultMessage: 'El campo contiene simbolos o caracteres invalidos'
  },
  invalidZipCode: {
    id: 'global.form.invalidZipCode',
    defaultMessage: 'Código postal no valido'
  },
  invalidCURP: {
    id: 'global.form.invalidCURP',
    defaultMessage: 'CURP no valido'
  },
  invalidRFC: {
    id: 'global.form.invalidRFC',
    defaultMessage: 'RFC no valido'
  },
  invalidURL: {
    id: 'global.form.invalidURL',
    defaultMessage: 'No es una URL valida'
  },
  invalidMetricNumber: {
    id: 'global.form.invalidMetricNumber',
    defaultMessage:
      'Ingrese un número válido en formato decimal con hasta 2 decimales, por ejemplo, 65.5, 75, 100.25, etc.'
  }
})

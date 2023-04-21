export const scopes = [
  {
    id: 'config',
    label: 'Configuración de plataforma',
    checked: true,
    permissions: { create: true, edit: false, delete: false, export: false },
    submodules: [
      { id: 'config-general', checked: true, label: 'Config. general' },
      { id: '', checked: false, label: 'Medios y compañías' },
      { id: '', checked: true, label: 'Estaciones de telecomunicaciones' }
    ]
  },
  {
    id: '',
    label: 'Mi Cuenta',
    checked: false,
    permissions: { create: false, edit: false, delete: false, export: false }
  },
  {
    id: '',
    label: 'Estadísticas',
    checked: false,
    permissions: { create: false, edit: false, delete: false, export: false }
  },
  {
    id: '',
    label: 'Roles de usuario',
    checked: false,
    permissions: { create: false, edit: false, delete: false, export: false }
  },
  {
    id: '',
    label: 'Control de usuarios',
    checked: false,
    permissions: { create: false, edit: false, delete: false, export: false }
  },
  {
    id: '',
    label: 'Grupos de trabajo',
    checked: false,
    permissions: { create: false, edit: false, delete: false, export: false }
  },
  {
    id: '',
    label: 'Medios de adquisición',
    checked: false,
    permissions: { create: false, edit: false, delete: false, export: false }
  },
  {
    id: '',
    label: 'Técnicas',
    checked: false,
    permissions: { create: false, edit: false, delete: false, export: false }
  },
  {
    id: '',
    label: 'Monitoreo',
    checked: false,
    permissions: { create: false, edit: false, delete: false, export: false }
  },
  {
    id: '',
    label: 'Auditoría',
    checked: false,
    permissions: { create: false, edit: false, delete: false, export: false }
  },
  {
    id: '',
    label: 'Redes de vinculación',
    checked: false,
    permissions: { create: false, edit: false, delete: false, export: false }
  },
  {
    id: '',
    label: 'Importe y certificación',
    checked: false,
    permissions: { create: false, edit: false, delete: false, export: false }
  },
  {
    id: '',
    label: 'Huella de voz',
    checked: false,
    permissions: { create: false, edit: false, delete: false, export: false }
  },
  {
    id: '',
    label: 'Evidencias archivadas',
    checked: false,
    permissions: { create: false, edit: false, delete: false, export: false }
  },
  {
    id: '',
    label: 'Redes de vinculación',
    checked: false,
    permissions: { create: false, edit: false, delete: false, export: false }
  },
  {
    id: '',
    label: 'Redes de vinculación',
    checked: false,
    permissions: { create: false, edit: false, delete: false, export: false }
  }
]

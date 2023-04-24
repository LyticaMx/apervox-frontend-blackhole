import { Resource } from 'types/scope'

export type Permission = 'read' | 'create' | 'update' | 'delete' | 'export'
export type Permissions = {
  [P in Permission]: boolean
}

export type ResourcePermission = `${Resource}.${keyof Permissions}`
export type ResourcesPermissions = {
  [K in ResourcePermission]?: boolean
}
export type Action = {
  [P in keyof Permissions]?: ResourcesPermissions
}

export interface Module {
  id: Resource
  label: string
  permissions: Permissions
  actions?: Action
}
export const scopes: Module[] = [
  {
    id: 'me',
    label: 'Mi Cuenta',
    permissions: {
      read: false,
      create: false,
      update: false,
      delete: false,
      export: false
    }
  },
  {
    id: 'users',
    label: 'Control de usuarios',
    permissions: {
      read: false,
      create: false,
      update: false,
      delete: false,
      export: false
    },
    actions: {
      create: {
        'roles.read': true,
        'groups.read': true
      },
      update: {
        'roles.read': true,
        'groups.read': true
      }
    }
  },
  {
    id: 'roles',
    label: 'Roles de usuarios',
    permissions: {
      read: false,
      create: false,
      update: false,
      delete: false,
      export: false
    }
  },
  {
    id: 'groups',
    label: 'Grupos de trabajo',
    permissions: {
      read: false,
      create: false,
      update: false,
      delete: false,
      export: false
    }
  }
]

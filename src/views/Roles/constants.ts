import { Resource } from 'types/scope'

export type Permission = 'read' | 'create' | 'update' | 'delete' | 'export'
export type Permissions = {
  [P in Permission]?: boolean
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
  permissions: Permissions
  actions?: Action
}
export const scopes: Module[] = [
  {
    id: 'me',
    permissions: {
      read: true,
      update: true,
      delete: true
    }
  },
  {
    id: 'users',
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
    id: 'sessions',
    permissions: {
      read: true,
      delete: true
    }
  },
  {
    id: 'roles',
    permissions: {
      read: false,
      create: false,
      update: false,
      delete: false,
      export: false
    },
    actions: {
      create: {
        'users.read': true
      },
      update: {
        'users.read': true
      }
    }
  },
  {
    id: 'groups',
    permissions: {
      read: false,
      create: false,
      update: false,
      delete: false,
      export: false
    },
    actions: {
      create: {
        'users.read': true
      },
      update: {
        'users.read': true
      }
    }
  },
  {
    id: 'techniques',
    permissions: {
      read: false,
      create: false,
      update: false,
      delete: false,
      export: false
    },
    actions: {
      create: {
        'groups.read': true
      },
      update: {
        'groups.read': true
      }
    }
  },
  {
    id: 'carriers',
    permissions: {
      read: false,
      create: false,
      update: false,
      delete: false,
      export: false
    }
  },
  {
    id: 'acquisition_mediums',
    permissions: {
      read: false,
      create: false,
      update: false,
      delete: false,
      export: false
    }
  },
  {
    id: 'devices',
    permissions: {
      read: false,
      create: false,
      update: false,
      delete: false,
      export: false
    },
    actions: {
      create: {
        'acquisition_mediums.read': true
      },
      update: {
        'acquisition_mediums.read': true
      }
    }
  },
  {
    id: 'settings',
    permissions: {
      read: false,
      update: false
    }
  },
  {
    id: 'labels',
    permissions: {
      read: false,
      create: false,
      update: false,
      delete: false
    }
  },
  {
    id: 'letterheads',
    permissions: {
      read: false,
      create: false,
      update: false,
      delete: false
    }
  },
  {
    id: 'overflow_lines',
    permissions: {
      read: false,
      create: false,
      update: false,
      delete: false,
      export: false
    }
  },
  {
    id: 'verification_lines',
    permissions: {
      read: false,
      create: false,
      update: false,
      delete: false,
      export: false
    }
  },
  {
    id: 'targets',
    permissions: {
      read: false,
      create: false,
      update: false,
      delete: false,
      export: false
    },
    actions: {
      create: { 'overflow_lines.read': true },
      update: { 'overflow_lines.read': true }
    }
  },
  {
    id: 'target_metadatas',
    permissions: {
      read: false,
      create: false,
      update: false,
      delete: false,
      export: false
    },
    actions: {
      read: { 'targets.read': true },
      create: { 'targets.read': true },
      update: { 'targets.read': true },
      delete: { 'targets.read': true },
      export: { 'targets.read': true }
    }
  }
]

import { ReactElement, useCallback, useEffect } from 'react'
import clsx from 'clsx'

import { useFormatMessage } from 'hooks/useIntl'

import Accordion from 'components/Accordion'
import Checkbox from 'components/Form/Checkbox'
import Switch from 'components/Form/Switch'

import {
  Module,
  Permission,
  Permissions,
  ResourcesPermissions
} from '../constants'
import { rolesPermissionsMessages, scopeNamesMessages } from '../messages'

interface Props {
  items: Module[]
  onChange: (items: Module[]) => void
}

const AccordionModules = ({ items, onChange }: Props): ReactElement => {
  const getMessage = useFormatMessage(rolesPermissionsMessages)
  const getScopeName = useFormatMessage(scopeNamesMessages)

  const classes = {
    button: 'bg-white',
    container: 'bg-white mb-1 rounded-sm overflow-hidden',
    children: 'p-2',
    chevronIcon:
      'text-primary hover:bg-background-secondary p-0.5 rounded-md h-6 w-6'
  }

  const validateActions = (
    actions: ResourcesPermissions,
    modules: Module[]
  ): void => {
    Object.entries(actions).forEach(([action, value]) => {
      const [module, permission] = action.split('.')

      const { permissions, actions } =
        modules.find((item) => item.id === module) ?? {}

      if (permissions) {
        permissions[permission] = value
      }

      if (value && actions && permission in actions) {
        validateActions(actions[permission] as ResourcesPermissions, modules)
      }
    })
  }

  const togglePerimssion = (
    module: Module,
    permission: keyof Permissions
  ): void => {
    const value = !module.permissions[permission]

    const aux = [...items].map((item) => {
      if (item.id === module.id) {
        return {
          ...item,
          permissions: {
            ...item.permissions,
            [permission]: value
          }
        }
      }
      return item
    })

    if (value && module.actions && permission in module.actions) {
      validateActions(module.actions[permission] as ResourcesPermissions, aux)
    }

    onChange(aux)
  }

  const Item = useCallback(
    ({ children, checked, onChange, className = '' }) => (
      <div className={clsx('flex items-center gap-2', className)}>
        <Switch size="sm" value={checked} color="primary" onChange={onChange} />{' '}
        {children}
      </div>
    ),
    []
  )

  return (
    <div>
      {items.map((item, index) => [
        <Accordion
          key={index}
          title={
            <Item
              checked={item.permissions.read}
              onChange={() => {
                togglePerimssion(item, 'read')
              }}
            >
              {getScopeName(item.id)}
            </Item>
          }
          classNames={classes}
        >
          <div className="text-center space-x-3">
            <h5 className="text-primary mb-1 text-sm">
              {getMessage('general')}
            </h5>
            {Object.keys(item.permissions).map((permission, index) =>
              permission !== 'read' ? (
                <Checkbox
                  key={index}
                  label={getMessage(permission)}
                  disabled={!item.permissions.read}
                  checked={item.permissions[permission]}
                  onChange={() => {
                    togglePerimssion(item, permission as Permission)
                  }}
                />
              ) : null
            )}
          </div>
        </Accordion>
      ])}
    </div>
  )
}

export default AccordionModules

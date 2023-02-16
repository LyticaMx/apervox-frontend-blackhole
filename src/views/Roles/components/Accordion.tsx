// import { Disclosure } from '@headlessui/react'
import clsx from 'clsx'
import Accordion from 'components/Accordion'
import Checkbox from 'components/Form/Checkbox'
import Switch from 'components/Form/Switch'
import { ReactElement, useCallback, useState } from 'react'

interface Permissions {
  create: boolean
  edit: boolean
  delete: boolean
  export: boolean
}

interface Item {
  id: string
  checked: boolean
  label: string
}
interface Module extends Item {
  permissions: Permissions
  submodules?: Item[]
}
interface Props {
  items: Module[]
}

const AccordionModules = (props: Props): ReactElement => {
  const [modules, setModules] = useState(props.items)
  const classes = {
    button: 'bg-white',
    container: 'bg-white mb-1 rounded-sm overflow-hidden',
    children: 'p-2',
    chevronIcon:
      'text-primary hover:bg-background-secondary p-0.5 rounded-md h-6 w-6'
  }

  const handleChangeItem = (id: string, value: boolean): void => {
    const aux = [...modules].map((item) => {
      if (item.id === id) {
        return { ...item, checked: value }
      }
      return item
    })

    setModules(aux)
  }
  const handleChangePerimssion = (
    id: string,
    perission: keyof Permissions,
    value: boolean
  ): void => {
    const aux = [...modules].map((item) => {
      if (item.id === id) {
        return {
          ...item,
          permissions: {
            ...item.permissions,
            [perission]: value
          }
        }
      }
      return item
    })

    setModules(aux)
  }
  const handleChangeSubItem = (
    id: string,
    subid: string,
    value: boolean
  ): void => {
    const aux = [...modules].map((item) => {
      if (item.id === id) {
        return {
          ...item,
          submodules: item.submodules?.map((subitem) => {
            if (subitem.id === subid) {
              return { ...subitem, checked: value }
            }
            return subitem
          })
        }
      }
      return item
    })

    setModules(aux)
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
      {modules.map((item, index) => [
        <Accordion
          key={index}
          title={
            <Item
              checked={item.checked}
              onChange={(value) => handleChangeItem(item.id, value)}
            >
              {item.label}
            </Item>
          }
          classNames={classes}
        >
          <div className="text-center space-x-3">
            <h5 className="text-primary mb-1 text-sm">Permisos generales</h5>
            <Checkbox
              label="Creación"
              checked={item.permissions.create}
              onChange={() => {
                handleChangePerimssion(
                  item.id,
                  'create',
                  !item.permissions.create
                )
              }}
            />
            <Checkbox
              label="Edición"
              checked={item.permissions.edit}
              onChange={() => {
                handleChangePerimssion(item.id, 'edit', !item.permissions.edit)
              }}
            />
            <Checkbox
              label="Eliminación"
              checked={item.permissions.delete}
              onChange={() => {
                handleChangePerimssion(
                  item.id,
                  'delete',
                  !item.permissions.delete
                )
              }}
            />
            <Checkbox
              label="Exportación"
              checked={item.permissions.export}
              onChange={() => {
                handleChangePerimssion(
                  item.id,
                  'export',
                  !item.permissions.export
                )
              }}
            />
          </div>
          {(item.submodules ?? []).map((subitem, subindex) => (
            <Item
              key={subindex}
              checked={subitem.checked}
              className="text-sm"
              onChange={(value) =>
                handleChangeSubItem(item.id, subitem.id, value)
              }
            >
              {subitem.label}
            </Item>
          ))}
        </Accordion>
      ])}
    </div>
  )
}

export default AccordionModules

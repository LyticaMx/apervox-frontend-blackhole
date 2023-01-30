import { ReactElement, useEffect, useMemo, useState } from 'react'
import { PlusIcon } from '@heroicons/react/24/outline'

import Button from 'components/Button'
import Dialog from 'components/Dialog'
import Selectmultiple from 'components/Form/Selectmultiple'

import { useFormatMessage } from 'hooks/useIntl'

import { linkMessages } from '../messages'
import { Dependency } from 'types/dependency'
import { useDependencies } from 'context/Dependencies'

interface Props {
  open?: boolean
  dependency?: Dependency
  onClose?: (event?: any) => void
  onSubmit?: (values?: Array<string | number>) => void
}

const LinkUserDialog = ({
  open = true,
  dependency,
  onClose = () => {},
  onSubmit = () => {}
}: Props): ReactElement => {
  const { users, actions } = useDependencies()
  const getMessage = useFormatMessage(linkMessages)
  const [selected, setSelected] = useState<string[]>([])

  const valid = useMemo(() => {
    return selected.length
  }, [selected])

  const handleSubmit = (): void => {
    onSubmit(selected)
  }

  useEffect(() => {
    actions?.getUsers()
  }, [])

  useEffect(() => {
    if (open) {
      setSelected(dependency?.users?.map(user => user.id) ?? [])
    }
  }, [open])

  const items = useMemo(() => {
    return users.map(user => {
      return {
        value: user.id,
        text: Object.values(user.profile ?? {}).join(' ')
      }
    })
  }, [users])

  return (
    <Dialog open={open} onClose={onClose} size="sm" overflow="visible">
      <div className="px-5">
        <div className="mb-5 px-5 flex flex-col items-center text-center">
          <div className="mx-auto mb-2 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
            <PlusIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
          </div>
          <h1 className="mb-3 font-medium text-black">{dependency?.name}</h1>
          <p className="text-sm text-gray-400">{getMessage('subtitle')}</p>
        </div>
        <div className="space-y-5">
          <Selectmultiple
            label={getMessage('linkUsers')}
            selected={selected}
            onChange={setSelected}
            items={items}
          />

          <Button
            variant="contained"
            className="text-center w-full"
            margin="none"
            color="blue"
            disabled={!valid}
            fullwidth
            onClick={handleSubmit}
          >
            {getMessage('link')}
          </Button>
        </div>
      </div>
    </Dialog>
  )
}

export default LinkUserDialog

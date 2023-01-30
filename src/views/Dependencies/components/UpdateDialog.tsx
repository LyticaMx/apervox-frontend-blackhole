import { ReactElement, useEffect, useMemo, useState } from 'react'
import { useFormik } from 'formik'
import { PencilIcon } from '@heroicons/react/24/outline'

import Button from 'components/Button'
import Dialog from 'components/Dialog'
import TextField from 'components/Form/Textfield'

import { useFormatMessage } from 'hooks/useIntl'

import { updateMessages } from '../messages'
import Divider from 'components/Divider'
import { Dependency } from 'types/dependency'
import Selectmultiple from 'components/Form/Selectmultiple'
import { useDependencies } from 'context/Dependencies'

interface FormValues {
  name: string
}
interface SubmitValues {
  name: string
  ids: string[]
}

interface Props {
  open?: boolean
  data?: Dependency
  onClose?: (event?: any) => void
  onSubmit?: (values?: SubmitValues) => void
}

const UpdateDependencyDialog = ({
  open = true,
  data,
  onClose = () => {},
  onSubmit = () => {}
}: Props): ReactElement => {
  const { users, actions } = useDependencies()
  const getMessage = useFormatMessage(updateMessages)
  const [selected, setSelected] = useState<string[]>([])

  const formik = useFormik<FormValues>({
    initialValues: {
      name: ''
    },
    onSubmit: values => {
      onSubmit({
        ...values,
        ids: selected
      })
    }
  })

  const valid = useMemo(() => {
    return Object.values(formik.values).every(value => value)
  }, [formik.values])

  useEffect(() => {
    if (open) {
      if (data) {
        formik.resetForm({
          values: {
            name: data.name
          }
        })

        setSelected(data?.users?.map(user => user.id) ?? [])
      } else {
        formik.resetForm()
      }
    }
  }, [open, data])

  useEffect(() => {
    actions?.getUsers()
  }, [])

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
          <div className="mx-auto mb-2 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-yellow-100 sm:mx-0 sm:h-10 sm:w-10">
            <PencilIcon
              className="h-5 w-5 text-yellow-600"
              aria-hidden="true"
            />
          </div>
          <h1 className="mb-3 font-medium text-black">{getMessage('title')}</h1>
          <p className="text-sm text-gray-400">{getMessage('subtitle')}</p>
        </div>
        <form className="space-y-5" onSubmit={formik.handleSubmit}>
          <TextField
            id="name"
            name="name"
            label={getMessage('name')}
            value={formik.values.name}
            onChange={formik.handleChange}
          />
          <Divider title="+" margin="none" />
          <Selectmultiple
            label={getMessage('linkUsers')}
            selected={selected}
            onChange={setSelected}
            items={items}
          />

          <Button
            type="submit"
            variant="contained"
            className="text-center w-full"
            margin="none"
            color="blue"
            disabled={!valid}
            fullwidth
          >
            {getMessage('edit')}
          </Button>
        </form>
      </div>
    </Dialog>
  )
}

export default UpdateDependencyDialog

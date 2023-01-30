import { ReactElement, useEffect, useMemo } from 'react'

import Button from 'components/Button'
import Dialog from 'components/Dialog'
import TextField from 'components/Form/Textfield'

import { useFormatMessage } from 'hooks/useIntl'

import { messages } from './messages'
import { useFormik } from 'formik'

interface FormValues {
  name: string
  lastname: string
  secondLastname: string
}

interface Props {
  open?: boolean
  onClose?: (event?: any) => void
  onSubmit?: (values?: FormValues) => void
}

const CompleteProfileDialog = ({
  open = true,
  onClose = () => {},
  onSubmit = () => {}
}: Props): ReactElement => {
  const getMessage = useFormatMessage(messages)

  const formik = useFormik<FormValues>({
    initialValues: {
      name: '',
      lastname: '',
      secondLastname: ''
    },
    onSubmit
  })

  const valid = useMemo(() => {
    return Object.values(formik.values).every(value => value)
  }, [formik.values])

  useEffect(() => {
    if (open) {
      formik.resetForm()
    }
  }, [open])

  return (
    <Dialog open={open} onClose={onClose} size="sm">
      <div className="px-5">
        <div className="mb-5 px-5 text-center">
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
          <TextField
            id="lastname"
            name="lastname"
            label={getMessage('lastname')}
            value={formik.values.lastname}
            onChange={formik.handleChange}
          />
          <TextField
            id="secondLastname"
            name="secondLastname"
            label={getMessage('secondLastname')}
            value={formik.values.secondLastname}
            onChange={formik.handleChange}
          />
          <Button
            type="submit"
            variant="contained"
            className="text-center w-full"
            margin="none"
            color="blue"
            disabled={!valid}
          >
            {getMessage('continue')}
          </Button>
        </form>
      </div>
    </Dialog>
  )
}

export default CompleteProfileDialog

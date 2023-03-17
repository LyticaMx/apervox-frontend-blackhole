import Button from 'components/Button'
import Form from 'components/Form'
import Typography from 'components/Typography'
import { useLanguage } from 'context/Language'
import { FormikConfig, FormikContextType } from 'formik'
import { actionsMessages, generalMessages } from 'globalMessages'
import { ReactElement, useMemo, useRef } from 'react'
import { useIntl } from 'react-intl'
import { Field } from 'types/form'
import Comment from './Comment'

interface FormValues {
  message: string
}

const Comments = (): ReactElement => {
  const { formatMessage } = useIntl()
  const { localeI18n } = useLanguage()
  const formikRef = useRef<FormikContextType<FormValues>>()

  const fields = useMemo<Array<Field<FormValues>>>(
    () => [
      {
        name: 'message',
        type: 'text',
        options: {
          id: 'message'
        }
      }
    ],
    [localeI18n]
  )

  const formikConfig: FormikConfig<FormValues> = {
    initialValues: { message: '' },
    onSubmit: (values) => {
      console.log(values)
    }
  }

  const demoData = useMemo(
    () => [
      {
        id: '002',
        eventId: 'A001',
        target: '5563456789',
        date: '2022-11-28T16:00:00.000Z',
        user: 'g.garcia',
        message:
          'Vivamus quis viverra erat. Aenean ac ultricies velit, at semper dolor. Aenean ac ipsum mollis, efficitur ex et, malesuada est. Praesent massa leo, dapibus ac auctor sed, euismod et sem. Nam sed tortor quam. Nulla a sollicitudin ligula. Vivamus suscipit diam ut scelerisque finibus. Duis tincidunt sapien non urna bibendum vestibulum.'
      },
      {
        id: '001',
        eventId: 'A001',
        target: '5563456789',
        date: '2022-11-28T16:00:00.000Z',
        user: 'i.hinojosa',
        message:
          'In vitae sapien eget sapien convallis pretium. Duis placerat lacus at tellus hendrerit, sit amet condimentum quam vulputate. Suspendisse a magna lacus. Vivamus eget dapibus massa. Sed ut tristique mi, ac venenatis augue. Nulla ac diam non risus porta sollicitudin in at enim. Donec odio nisi, interdum in lorem quis, sagittis consectetur lectus.'
      }
    ],
    []
  )

  return (
    <div>
      <Typography
        variant="subtitle"
        style="bold"
        className="uppercase text-secondary"
      >
        {formatMessage(generalMessages.comments)}
      </Typography>
      <div className="flex gap-2 items-center mr-6">
        <Form
          fields={fields}
          formikConfig={formikConfig}
          submitButtonProps={{ className: 'hidden' }}
          formikRef={formikRef}
          className="flex-1"
        />

        <Button color="primary" variant="contained">
          {formatMessage(actionsMessages.comment)}
        </Button>
      </div>
      <div className="shadow rounded-md mt-3 px-10 py-5 bg-background">
        {demoData.map((comment) => (
          <Comment {...comment} key={comment.id} />
        ))}
      </div>
    </div>
  )
}

export default Comments

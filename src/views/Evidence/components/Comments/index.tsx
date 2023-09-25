import Button from 'components/Button'
import Form from 'components/Form'
import Typography from 'components/Typography'
import { useLanguage } from 'context/Language'
import { FormikConfig, FormikContextType, FormikHelpers } from 'formik'
import { actionsMessages, formMessages, generalMessages } from 'globalMessages'
import { ReactElement, useMemo, useRef } from 'react'
import { useIntl } from 'react-intl'
import { Field } from 'types/form'
import Comment from './Comment'
import * as yup from 'yup'
import { useCommentsContext } from 'views/Evidence/context'
import { useEvidenceSocket } from 'context/EvidenceSocket'

interface FormValues {
  message: string
}

const Comments = (): ReactElement => {
  const { formatMessage } = useIntl()
  const { localeI18n } = useLanguage()
  const formikRef = useRef<FormikContextType<FormValues>>()
  const { comments } = useCommentsContext()
  const socket = useEvidenceSocket()

  const handleNewComment = (
    values: FormValues,
    helpers: FormikHelpers<FormValues>
  ): void => {
    socket?.emit('new_comment', values.message)
    helpers.resetForm()
  }

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
    validationSchema: yup.object({
      message: yup.string().required(formatMessage(formMessages.required))
    }),
    validateOnBlur: false,
    onSubmit: handleNewComment
  }

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

        <Button
          color="primary"
          variant="contained"
          onClick={() => formikRef.current?.submitForm()}
        >
          {formatMessage(actionsMessages.comment)}
        </Button>
      </div>
      <div className="shadow rounded-md mt-3 px-10 py-5 bg-background">
        {comments.map((comment) => (
          <Comment
            key={comment.id}
            date={comment.createdAt}
            eventId={comment.evidenceNumber}
            message={comment.data}
            target={comment.targetPhone}
            user={comment.author}
          />
        ))}
      </div>
    </div>
  )
}

export default Comments

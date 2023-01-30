import { ReactElement, useEffect } from 'react'
import { useIntl } from 'react-intl'
import { useFormik } from 'formik'

import Button from 'components/Button'
import Dialog from 'components/Dialog'
import TextField from 'components/Form/Textfield'

import { actionsMessages, generalMessages } from 'globalMessages'

interface Props {
  open: boolean
  onClose: () => void
  onSuccess: (transcription: string) => void
  initialTranscription: string
}

const SegmentForm = ({
  open,
  onClose,
  onSuccess,
  initialTranscription
}: Props): ReactElement => {
  const intl = useIntl()

  const formik = useFormik({
    initialValues: {
      transcription: initialTranscription
    },
    onSubmit: async (values) => {
      onSuccess(values.transcription)
    }
  })

  useEffect(() => {
    formik.setFieldValue('transcription', initialTranscription)
  }, [initialTranscription])

  return (
    <Dialog open={open} onClose={onClose} size="sm" overflow="visible">
      <div className="px-5">
        <form className="space-y-5" onSubmit={formik.handleSubmit}>
          <TextField
            id="transcription"
            name="transcription"
            label={intl.formatMessage(generalMessages.transcription)}
            value={formik.values.transcription}
            onChange={formik.handleChange}
            labelSpacing="1"
            multiline
          />

          <Button
            type="submit"
            variant="contained"
            className="text-center w-full"
            margin="none"
            color="blue"
            disabled={initialTranscription === formik.values.transcription}
          >
            {intl.formatMessage(actionsMessages.update)}
          </Button>
        </form>
      </div>
    </Dialog>
  )
}

export default SegmentForm

import { ReactElement, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useFormik } from 'formik'
import { useIntl } from 'react-intl'

import Autocomplete from 'components/Form/Autocomplete'
import Button from 'components/Button'
import Dialog from 'components/Dialog'
import Radio from 'components/Form/Radio'
import TextField from 'components/Form/Textfield'
import Typography from 'components/Typography'

import { CallType } from 'types/call'
import { actionsMessages, apiMessages, generalMessages } from 'globalMessages'
import { useCallDetail } from 'context/CallDetail'

interface Props {
  open: boolean
  onClose: () => void
  onSuccess?: () => void
  type: CallType
}

const LinkTag = ({ open, onClose, onSuccess, type }: Props): ReactElement => {
  const intl = useIntl()
  const { actions, tagList } = useCallDetail()

  const {
    state: { id }
  } = useLocation<any>()

  const [tagAction, setTagAction] = useState('exist')

  const handleLinkTag = async (tagId: string): Promise<void> => {
    const res = await actions?.linkTag(id, tagId, type)

    if (res) {
      toast.success(intl.formatMessage(apiMessages.success))
      if (onSuccess) onSuccess()
    }
  }

  const formik = useFormik({
    initialValues: {
      tag: ''
    },
    onSubmit: async (values) => {
      let tagId = ''
      if (tagAction === 'new') {
        // const resPost = await actions?.createTag(values.tag)
        // if (resPost) {
        //   tagId = resPost?.id
        // }
      } else {
        tagId = values.tag
      }
      await handleLinkTag(tagId)
    }
  })

  const onChange = (type: string): void => {
    setTagAction(type)
    formik.setFieldValue('tag', '')
  }

  return (
    <Dialog open={open} onClose={onClose} size="sm" overflow="visible">
      <div className="px-5">
        <Typography className="mb-3" style="semibold">
          {intl.formatMessage(generalMessages.tags)}
        </Typography>
        <Radio
          label={intl.formatMessage(actionsMessages.search)}
          value="exist"
          name="call"
          checked={tagAction === 'exist'}
          onChange={() => onChange('exist')}
        />
        <Radio
          label={intl.formatMessage(generalMessages.new)}
          value="new"
          name="call"
          className="ml-5 mb-2"
          checked={tagAction === 'new'}
          onChange={() => onChange('new')}
        />
        <form className="space-y-5" onSubmit={formik.handleSubmit}>
          {tagAction === 'exist' ? (
            <Autocomplete
              label={intl.formatMessage(generalMessages.tag)}
              value={formik.values.tag}
              textField="label"
              valueField="id"
              onChange={(value) => {
                formik.setFieldValue('tag', value)
              }}
              items={tagList}
            />
          ) : (
            <TextField
              id="tag"
              name="tag"
              label={intl.formatMessage(generalMessages.tag)}
              value={formik.values.tag}
              onChange={formik.handleChange}
              labelSpacing="1"
            />
          )}
          <Button
            type="submit"
            variant="contained"
            className="text-center w-full"
            margin="none"
            color="blue"
          >
            {tagAction === 'exist'
              ? intl.formatMessage(actionsMessages.link)
              : intl.formatMessage(actionsMessages.createAndLink)}
          </Button>
        </form>
      </div>
    </Dialog>
  )
}

export default LinkTag

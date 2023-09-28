import Button from 'components/Button'
import Form from 'components/Form'
import Typography from 'components/Typography'
import { useLanguage } from 'context/Language'
import { FormikConfig, FormikContextType, FormikHelpers } from 'formik'
import { actionsMessages, formMessages, generalMessages } from 'globalMessages'
import {
  ReactElement,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react'
import { useIntl } from 'react-intl'
import { Field } from 'types/form'
import Comment from './Comment'
import * as yup from 'yup'
import { useCommentsContext } from 'views/Evidence/context'
import { useEvidenceSocket } from 'context/EvidenceSocket'
import { useVirtualizer } from '@tanstack/react-virtual'
import { useAuth } from 'context/Auth'

interface FormValues {
  message: string
}

const Comments = (): ReactElement => {
  const { formatMessage } = useIntl()
  const { localeI18n } = useLanguage()
  const {
    auth: { profile }
  } = useAuth()
  const [editingId, setEditingId] = useState<string>('')
  const { comments, pagination } = useCommentsContext()
  const socket = useEvidenceSocket()
  const formikRef = useRef<FormikContextType<FormValues>>()
  const parentRef = useRef<HTMLDivElement>(null)
  const fetchingRef = useRef<boolean>(false)

  const handleNewComment = useCallback(
    (values: FormValues, helpers: FormikHelpers<FormValues>): void => {
      socket?.emit('new_comment', values.message)
      helpers.resetForm()
    },
    [socket]
  )

  const handleEditComment = useCallback(
    (id: string, text: string) => {
      if (!socket) return
      socket.emit('update_comment', { id, text })
      setEditingId('')
    },
    [socket]
  )

  const rowVirtualizer = useVirtualizer({
    count: pagination.hasNextPage ? comments.length + 1 : comments.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 100,
    overscan: 10
  })

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
      message: yup
        .string()
        .trim()
        .required(formatMessage(formMessages.required))
    }),
    validateOnBlur: false,
    onSubmit: handleNewComment
  }

  const getNextComments = useCallback(() => {
    socket?.emit('get_comments', {
      page: pagination.page + 1,
      limit: pagination.limit
    })
  }, [socket, pagination.page])

  useEffect(() => {
    if (!socket) return

    const handleFetchRef = (): void => {
      fetchingRef.current = false
    }

    socket.on('comments', handleFetchRef)

    return () => {
      socket.off('comments', handleFetchRef)
    }
  }, [socket])

  useEffect(() => {
    const [lastItem] = [...rowVirtualizer.getVirtualItems()].reverse()

    if (!lastItem) return

    if (
      lastItem.index >= comments.length - 1 &&
      pagination.hasNextPage &&
      !fetchingRef.current
    ) {
      fetchingRef.current = true
      getNextComments()
    }
  }, [
    pagination.hasNextPage,
    getNextComments,
    comments.length,
    rowVirtualizer.getVirtualItems()
  ])

  return (
    <div>
      <Typography
        variant="subtitle"
        style="bold"
        className="uppercase text-secondary"
      >
        {formatMessage(generalMessages.comments)}
      </Typography>
      <div className="flex gap-2 items-start mr-6">
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
      <div
        className="shadow rounded-md mt-3 px-10 py-5 bg-background h-[350px] overflow-auto"
        ref={parentRef}
      >
        <div
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
            width: '100%',
            position: 'relative'
          }}
        >
          {rowVirtualizer.getVirtualItems().map((virtualRow) => {
            const isLoaderRow = virtualRow.index > comments.length - 1
            const comment = comments[virtualRow.index]
            return (
              <div
                key={virtualRow.index}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: `${virtualRow.size}px`,
                  transform: `translateY(${virtualRow.start}px)`
                }}
              >
                <div
                  key={virtualRow.key}
                  data-index={virtualRow.index}
                  ref={rowVirtualizer.measureElement}
                >
                  {isLoaderRow ? (
                    pagination.hasNextPage ? (
                      'Loading more...'
                    ) : (
                      'Nothing more to load'
                    )
                  ) : (
                    <Comment
                      date={comment.createdAt}
                      evidenceId={comment.evidenceId}
                      eventId={comment.evidenceNumber}
                      message={comment.data}
                      target={comment.targetPhone}
                      user={comment.author}
                      canBeEdited={comment.authorId === profile.id}
                      isEditing={comment.id === editingId}
                      onClickEdit={() => setEditingId(comment.id)}
                      onSave={(text: string) =>
                        handleEditComment(comment.id, text)
                      }
                    />
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Comments

import { ReactElement, useCallback, useEffect, useMemo, useState } from 'react'
import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline'

import Button from 'components/Button'
import Dialog from 'components/Dialog'
import SelectField from 'components/Form/Select'
import Typography from 'components/Typography'

import { useFormatMessage } from 'hooks/useIntl'

import { requestMessages } from '../messages'
import { Role, UserRequest } from 'types/user'
import { useUsers } from 'context/Users'
import Radio from 'components/Form/Radio'

type View = 'request' | 'assignment'

export interface SubmitParams {
  accept: boolean
  user_id: string
  dependency_id: string
  role: string
}

interface Props {
  data?: UserRequest
  open?: boolean
  onClose?: (event?: any) => void
  onSubmit?: (values: SubmitParams) => void
}

const RequestDialog = ({
  data,
  open = true,
  onClose = () => {},
  onSubmit = () => {}
}: Props): ReactElement => {
  const { dependencies, actions } = useUsers()
  const getMessage = useFormatMessage(requestMessages)
  const [view, setView] = useState<View>('request')

  const [dependencyId, setDependencyId] = useState<string>('')
  const [role, setRole] = useState<string>('')

  const userName = useMemo(() => Object.values(data?.profile ?? {}).join(' '), [
    data
  ])
  const items = useMemo(
    () => dependencies.map(item => ({ value: item.id, text: item.name })),
    [dependencies]
  )

  const Content = useCallback(
    ({ children, value }) => {
      if (value !== view) return <></>

      return children
    },
    [view]
  )

  const valid = useMemo(() => {
    return dependencyId && role
  }, [dependencyId, role])

  useEffect(() => {
    actions?.getDependencies()
  }, [])
  useEffect(() => {
    if (open) {
      setView('request')
      setDependencyId('')
      setRole('')
    }
  }, [open])

  const handleReject = (): void => {
    if (data) {
      onSubmit({
        user_id: data.id,
        accept: false,
        dependency_id: '',
        role: ''
      })
    }
  }
  const habdleAccept = (): void => {
    if (data) {
      onSubmit({
        dependency_id: dependencyId,
        user_id: data.id,
        accept: true,
        role
      })
    }
  }

  return (
    <Dialog open={open} onClose={onClose} size="sm" overflow="visible">
      <div className="px-2">
        <div className="mb-5 px-5 flex flex-col items-center text-center">
          <div className="mx-auto mb-2 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
            <QuestionMarkCircleIcon
              className="h-6 w-6 text-blue-600"
              aria-hidden="true"
            />
          </div>
          <h1 className="mb-2 font-medium text-black">{getMessage('title')}</h1>
          <Content value="request">
            <p className="text-sm text-gray-400">{getMessage('subtitle')}</p>
          </Content>
          <Content value="assignment">
            <p className="text-sm text-gray-400">
              {getMessage('subtitleAssignment')}
            </p>
          </Content>

          <div className="mt-5">
            <h1 className="font-medium text-black">{userName}</h1>
            <p className="text-sm text-gray-500">{data?.email}</p>
          </div>
        </div>
      </div>
      <Content value="request">
        <div className="flex justify-center gap-4 px-4">
          <Button
            variant="contained"
            className="text-center flex-grow"
            margin="none"
            color="red"
            onClick={handleReject}
          >
            {getMessage('reject')}
          </Button>
          <Button
            variant="contained"
            className="text-center flex-grow"
            margin="none"
            color="blue"
            onClick={() => {
              setView('assignment')
            }}
          >
            {getMessage('accept')}
          </Button>
        </div>
      </Content>
      <Content value="assignment">
        <div className="space-y-5">
          <SelectField
            label={getMessage('dependency')}
            value={dependencyId}
            items={items}
            onChange={setDependencyId}
          />
          <div>
            <Typography style="medium" variant="body2">
              {getMessage('permissions')}
            </Typography>
            <div className="flex gap-4 flex-wrap py-2">
              <Radio
                name="role"
                value={Role.READER}
                checked={Role.READER === role}
                onChange={() => setRole(Role.READER)}
                label={getMessage('read')}
              />
              <Radio
                name="role"
                value={Role.WRITER}
                checked={Role.WRITER === role}
                onChange={() => setRole(Role.WRITER)}
                label={getMessage('write')}
              />
              <Radio
                name="role"
                value={Role.ADMIN}
                checked={Role.ADMIN === role}
                onChange={() => setRole(Role.ADMIN)}
                label={getMessage('admin')}
              />
            </div>
          </div>
          <div className="flex justify-center gap-4 px-4">
            <Button
              variant="outlined"
              className="text-center flex-grow"
              margin="none"
              onClick={() => {
                setView('request')
              }}
            >
              {getMessage('back')}
            </Button>
            <Button
              variant="contained"
              className="text-center flex-grow"
              margin="none"
              color="blue"
              disabled={!valid}
              onClick={habdleAccept}
            >
              {getMessage('accept')}
            </Button>
          </div>
        </div>
      </Content>
    </Dialog>
  )
}

export default RequestDialog

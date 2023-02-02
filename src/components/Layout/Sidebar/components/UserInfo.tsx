import { Popover } from '@headlessui/react'
import { Float } from '@headlessui-float/react'
import { ReactElement, useMemo } from 'react'
import Button from 'components/Button'
import { useAuth } from 'context/Auth'
import { Link } from 'react-router-dom'
import { pathRoute } from 'router/routes'
import { useIntl } from 'react-intl'
import { userInfoMessages } from 'layout/messages'
import clsx from 'clsx'

interface Props {
  expanded?: boolean
}

const UserInfo = (props: Props): ReactElement => {
  const { expanded = true } = props
  const { auth, actions } = useAuth()
  const { formatMessage } = useIntl()

  const handleClick = async (): Promise<void> => {
    await actions?.signOut()
    actions?.killSession(true)
  }

  const fullName = useMemo(
    () =>
      `${String(auth.profile.name)} ${String(
        auth.profile.fathers_name
      )} ${String(auth.profile.mothers_name)}`,
    [auth.profile]
  )

  return (
    <Popover>
      <Float
        placement="bottom-start"
        offset={15}
        shift={6}
        flip={10}
        portal
        enter="transition duration-200 ease-out"
        enterFrom="opacity-0 -translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition duration-150 ease-in"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 -translate-y-1"
      >
        <Popover.Button className="flex-shrink-0 w-full block outline-none">
          <div
            className={clsx(
              'flex items-center relative group',
              expanded && 'overflow-hidden'
            )}
          >
            <div className="flex-shrink-0">
              <img
                className={clsx(
                  'inline-block h-9 w-9 rounded-full transition-all duration-500',
                  !expanded && 'scale-125 ml-3'
                )}
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              />
            </div>
            {!expanded && (
              <div className="absolute transition-all duration-500 ease-in left-full top-2 ml-1 max-w-0 overflow-hidden group-hover:max-w-xl bg-gray-200 rounded flex-shrink-0 whitespace-nowrap">
                <span className="px-2">{auth.profile.name}</span>
              </div>
            )}
            <div
              className={clsx(
                'ml-3 text-left transition-opacity duration-300',
                expanded ? 'opacity-1' : 'opacity-0'
              )}
            >
              <p className="text-sm font-medium text-black">
                {auth.profile.name}
              </p>
            </div>
          </div>
        </Popover.Button>

        <Popover.Panel className="w-52 p-3 bg-white border text-center border-gray-200 rounded-md shadow-lg focus:outline-none">
          <p className="text-sm font-medium text-gray-900">{fullName}</p>
          <Link to={pathRoute.profile} className="text-sm font-medium">
            {formatMessage(userInfoMessages.viewProfile)}
          </Link>
          <hr className="border-gray-300 my-2" />
          <Button
            onClick={handleClick}
            variant="contained"
            size="sm"
            className="inline-flex"
          >
            {formatMessage(userInfoMessages.signOut)}
          </Button>
        </Popover.Panel>
      </Float>
    </Popover>
  )
}

export default UserInfo

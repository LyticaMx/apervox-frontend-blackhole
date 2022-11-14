import { Popover } from '@headlessui/react'
import { Float } from '@headlessui-float/react'
import { ReactElement } from 'react'
import Button from 'components/Button'
import { useAuth } from 'context/Auth'

const UserInfo = (): ReactElement => {
  const { auth, actions } = useAuth()

  console.log('auth: ', auth)

  const handleClick = (): void => {
    actions?.signOut()
  }
  return (
    <Popover>
      <Float
        placement='bottom-start'
        offset={15}
        shift={6}
        flip={10}
        portal
        enter='transition duration-200 ease-out'
        enterFrom='opacity-0 -translate-y-1'
        enterTo='opacity-100 translate-y-0'
        leave='transition duration-150 ease-in'
        leaveFrom='opacity-100 translate-y-0'
        leaveTo='opacity-0 -translate-y-1'
      >
        <Popover.Button className='flex-shrink-0 w-full block'>
          <div className='flex items-center'>
            <div>
              <img
                className='inline-block h-9 w-9 rounded-full'
                src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
                alt=''
              />
            </div>
            <div className='ml-3 text-left'>
              <p className='text-sm font-medium text-white'>{auth.user.name}</p>
              <p className='text-xs font-medium text-blue-200'>
                {auth.user.role.name}
              </p>
            </div>
          </div>
        </Popover.Button>

        <Popover.Panel className='w-52 p-3 bg-white border text-center border-gray-200 rounded-md shadow-lg focus:outline-none'>
          <p className='text-sm font-medium text-gray-900'>{auth.user.name}</p>
          <p className='text-xs font-medium text-gray-700'>
            {auth.user.role.name}
          </p>
          <hr className='border-gray-300 my-2' />
          <Button
            onClick={handleClick}
            variant='contained'
            size='sm'
            className='inline-flex'
          >
            Cerrar sesión
          </Button>
        </Popover.Panel>
      </Float>
    </Popover>
  )
}

export default UserInfo

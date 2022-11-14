import { ReactElement } from 'react'
import { useIntl } from 'react-intl'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'

import { messages } from './messages'

interface Props {
  onChange?: (element: any) => any
}

const SearchField = (props: Props): ReactElement => {
  const intl = useIntl()

  return (
    <div className='relative rounded-md shadow-sm'>
      <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
        <MagnifyingGlassIcon
          className='h-5 w-5 text-gray-400'
          aria-hidden='true'
        />
      </div>
      <input
        {...props}
        type='search'
        className='block w-full rounded-md border-gray-300 pl-10 focus:border-blue-500 focus:ring-blue-500 sm:text-sm'
        placeholder={intl.formatMessage(messages.placeholder)}
      />
    </div>
  )
}

export default SearchField

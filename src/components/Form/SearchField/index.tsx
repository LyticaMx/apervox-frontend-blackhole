import { ReactElement } from 'react'
import { useIntl } from 'react-intl'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'

import { messages } from './messages'
import clsx from 'clsx'

interface Props {
  shadow?: boolean
  id?: string
  name?: string
  value?: string
  onChange?: (element: any) => any
}

const SearchField = ({ shadow, ...props }: Props): ReactElement => {
  const intl = useIntl()

  return (
    <div className="relative rounded-md shadow-sm">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <MagnifyingGlassIcon
          className="h-5 w-5 text-gray-400"
          aria-hidden="true"
        />
      </div>
      <input
        {...props}
        type="text"
        className={clsx('pl-10 text-field', {
          'shadow-blackhole-md': shadow
        })}
        placeholder={intl.formatMessage(messages.placeholder)}
      />
    </div>
  )
}

export default SearchField

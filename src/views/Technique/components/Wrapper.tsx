import { ReactElement, ReactNode } from 'react'
import clsx from 'clsx'

export enum ContentType {
  TECHNIQUE_LIST = 1,
  FORMS = 2,
  TECHNIQUE_INFO = 3
}

interface WrapperProps {
  contentType: ContentType
  expanded: boolean
  children?: ReactNode
}

const Wrapper = ({
  contentType,
  expanded,
  children
}: WrapperProps): ReactElement => {
  const classes = {
    1: { expanded: 'w-full', contracted: 'w-3/12' },
    2: { expanded: 'w-6/12', contracted: 'w-0' },
    3: { expanded: 'w-3/12', contracted: 'w-0' }
  }

  return (
    <div
      className={clsx(
        expanded
          ? classes[contentType].expanded
          : classes[contentType].contracted,
        'transition-all duration-3000 right-0 '
      )}
    >
      {children}
    </div>
  )
}
export default Wrapper

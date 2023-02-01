import { cloneElement, ReactElement, ReactNode, useCallback } from 'react'
import Typography, { Variant, Style } from 'components/Typography'
import { LightBulbIcon } from '@heroicons/react/24/outline'
import { textColorClassNames } from 'utils/classes'
import clsx from 'clsx'

interface Props {
  children: ReactNode
  color?: string
  variant?: Variant
  style?: Style
  icon?: ReactElement
  className?: string
}
const InfoMessage = ({
  children,
  color = 'gray',
  variant = 'caption',
  style = 'medium',
  icon,
  className
}: Props): ReactElement => {
  const infoClass = clsx(
    textColorClassNames[color] ?? textColorClassNames.black,
    className
  )
  const DisplayIcon = useCallback(() => {
    if (icon) {
      return cloneElement(icon, {
        className: 'w-5 h-5 inline',
        fontSize: 'small'
      })
    }

    return <LightBulbIcon className="w-5 h-4 inline" fontSize="small" />
  }, [icon])

  return (
    <div>
      <Typography variant={variant} style={style} className={infoClass}>
        <DisplayIcon />
        {children}
      </Typography>
    </div>
  )
}

export default InfoMessage

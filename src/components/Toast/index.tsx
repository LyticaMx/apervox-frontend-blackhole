import Typography from 'components/Typography'
import { useLanguage } from 'context/Language'
import { format } from 'date-fns'
import { ReactElement } from 'react'

interface Props {
  title: string
  body?: string
}

const Toast = (props: Props): ReactElement => {
  const { title, body } = props
  const { locale } = useLanguage()
  return (
    <div onClick={(e) => e.preventDefault()}>
      <Typography className="text-secondary" style="semibold" variant="body1">
        {title}
      </Typography>
      <Typography className="text-secondary">{body}</Typography>
      <Typography variant="caption" className="text-right text-secondary-gray">
        {format(new Date(), 'PPpp', { locale })}
      </Typography>
    </div>
  )
}

export default Toast

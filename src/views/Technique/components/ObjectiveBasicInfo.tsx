import Typography from 'components/Typography'
import { ReactElement } from 'react'

const defaultAvatar =
  'https://www.eventfulnigeria.com/wp-content/uploads/2021/04/Avatar-PNG-Free-Download.png'

interface BasicInfoProps {
  avatar?: string
  name: string
  phoneNumber: string
}

const BasicInfo = ({
  avatar,
  name,
  phoneNumber
}: BasicInfoProps): ReactElement => (
  <div className="flex">
    <img
      width={50}
      className="border border-slate-200 rounded-md p-1 bg-slate-100"
      src={avatar ?? defaultAvatar}
      alt={`objective_${name}_avatar`}
    />
    <div className="ml-2 flex flex-col items-start">
      <Typography style="semibold">{name}</Typography>
      <Typography variant="body2">{phoneNumber}</Typography>
    </div>
  </div>
)

export default BasicInfo

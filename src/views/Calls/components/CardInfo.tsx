import { ReactElement } from 'react'

interface Props {
  title: string
  value: string
  icon?: ({ className }: { className: string }) => ReactElement
}

const CardInfo = ({ title, value, icon: Icon }: Props): ReactElement => {
  return (
    <div className="w-full h-full md:p-2 lg:p-6 xl:p-10 border flex flex-col justify-center">
      <div className="flex items-center text-slate-500">
        {Icon && <Icon className="w-6 h-6 mr-2" />}
        <p className="md:text-sm lg:text-base xl:text-lg">{title}</p>
      </div>
      <p className="md:text-lg lg:text-xl xl:text-2xl font-bold mt-3">
        {value}
      </p>
    </div>
  )
}

export default CardInfo

import { ReactElement } from 'react'

interface Props {
  title: string
  value: string
}

const CardInfo = ({ title, value }: Props): ReactElement => {
  return (
    <div className="w-full h-full md:p-2 lg:p-6 xl:p-10 border rounded-xl flex flex-col justify-center">
      <p className="md:text-sm lg:text-base xl:text-lg text-slate-500">
        {title}
      </p>
      <p className="md:text-lg lg:text-xl xl:text-2xl font-bold mt-3">
        {value}
      </p>
    </div>
  )
}

export default CardInfo

import { ReactElement, ReactNode } from 'react'

interface Props {
  title: string
  children?: ReactNode
}
const UsersCard = ({ title, children }: Props): ReactElement => {
  return (
    <div className="w-full h-full md:px-3 md:py-4 xl:px-6 xl:py-8 border flex flex-col justify-center">
      <p className="md:text-base xl:text-lg text-slate-500">{title}</p>
      <div className="flex md:flex-col lg:flex-row justify-between items-center mt-2">
        <p className="md:text-xl xl:text-4xl font-bold">{children}</p>
      </div>
    </div>
  )
}

export default UsersCard

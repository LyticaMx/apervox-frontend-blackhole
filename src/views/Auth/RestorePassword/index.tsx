import { ReactElement, useState } from 'react'
import ConfirmationCard from './components/ConfirmationCard'
import RestoreCard from './components/RestoreCard'

const RestorePassword = (): ReactElement => {
  const [success, setSuccess] = useState(false)

  return (
    <div className="w-screen h-screen bg-gradient-to-r from-sky-400 to-sky-700 flex justify-center items-center">
      {success ? (
        <ConfirmationCard />
      ) : (
        <RestoreCard onSuccess={() => setSuccess(true)} />
      )}
    </div>
  )
}

export default RestorePassword

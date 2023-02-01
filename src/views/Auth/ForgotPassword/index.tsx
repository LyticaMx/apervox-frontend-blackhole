import { ReactElement, useState } from 'react'

import Loader from 'components/Loader'

import FormCard from './components/FormCard'
import ConfirmationCard from './components/ConfirmationCard'

const ForgotPassword = (): ReactElement => {
  const [success, setSuccess] = useState(false)

  return (
    <div className="w-screen h-screen bg-gradient-to-r from-sky-400 to-sky-700 flex justify-center items-center">
      {success ? (
        <ConfirmationCard />
      ) : (
        <FormCard onSuccess={() => setSuccess(true)} />
      )}
      <Loader />
    </div>
  )
}

export default ForgotPassword

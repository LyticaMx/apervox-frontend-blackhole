import { ReactElement, useState } from 'react'
import { useIntl } from 'react-intl'
import { useHistory } from 'react-router-dom'
import { useFormik } from 'formik'

import { useAuth } from 'context/Auth'

import { pathRoute } from 'router/routes'

import Steps from './components/Steps'
import Account from './components/Account'
import PersonalData from './components/PersonalData'
import Request from './components/Request'
import SubmitMessaje from './components/SubmitMessaje'

import { actionsMessages, formMessages } from 'globalMessages'
import { signUpMessages } from './messages'

export interface FormValues {
  email: string
  name: string
  fathers_name: string
  mothers_name: string
}

interface FormErrors {
  email?: string
  name?: string
  fathers_name?: string
  mothers_name?: string
}

const SignUp = (): ReactElement => {
  const intl = useIntl()
  const history = useHistory()
  const { actions } = useAuth()

  const [showSubmitMessage, setShowSubmitMessage] = useState(false)
  const [currentStep, setCurrentStep] = useState<
    'account' | 'personal-data' | 'verify'
  >('account')

  const [signUpSteps, setSignUpSteps] = useState([
    { id: 'account', name: 'Cuenta', status: 'current' },
    { id: 'personal-data', name: 'Datos personales', status: '' },
    { id: 'verify', name: 'Solicitar', status: '' }
  ])

  const validate = (values: FormValues): FormErrors => {
    const errors: FormErrors = {}
    if (!values.email) {
      errors.email = intl.formatMessage(formMessages.required)
    }

    if (currentStep === 'personal-data') {
      if (!values.name) {
        errors.name = intl.formatMessage(formMessages.required)
      }
      if (!values.fathers_name) {
        errors.fathers_name = intl.formatMessage(formMessages.required)
      }
      if (!values.mothers_name) {
        errors.mothers_name = intl.formatMessage(formMessages.required)
      }
    }
    return errors
  }

  const formik = useFormik({
    initialValues: {
      email: '',
      name: '',
      fathers_name: '',
      mothers_name: ''
    },
    validate,
    onSubmit: async (values) => {
      if (currentStep === 'account') {
        setSignUpSteps((prev) =>
          prev.map((step) =>
            step.id === 'account'
              ? { ...step, status: 'complete' }
              : step.id === 'personal-data'
              ? { ...step, status: 'current' }
              : step
          )
        )

        setCurrentStep('personal-data')
      } else if (currentStep === 'personal-data') {
        setSignUpSteps((prev) =>
          prev.map((step) =>
            step.id === 'personal-data'
              ? { ...step, status: 'complete' }
              : step.id === 'verify'
              ? { ...step, status: 'current' }
              : step
          )
        )

        setCurrentStep('verify')
      } else {
        const succesSignUp = await actions?.signUp(values)

        if (succesSignUp) {
          setShowSubmitMessage(true)
        }
      }
    }
  })

  return (
    <div>
      <Steps steps={signUpSteps} />
      {currentStep === 'account' && <Account formik={formik} />}
      {currentStep === 'personal-data' && <PersonalData formik={formik} />}
      {currentStep === 'verify' && <Request formik={formik} />}

      {showSubmitMessage && (
        <SubmitMessaje
          title={intl.formatMessage(signUpMessages.title)}
          description={intl.formatMessage(signUpMessages.description)}
          buttonText={intl.formatMessage(actionsMessages.backToHome)}
          onAccept={() => {
            history.push(pathRoute.auth.signIn)
            setShowSubmitMessage(false)
          }}
        />
      )}
    </div>
  )
}

export default SignUp

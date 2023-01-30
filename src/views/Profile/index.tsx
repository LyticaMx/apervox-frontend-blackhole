import Button from 'components/Button'
import TextField from 'components/Form/Textfield'
import Title from 'components/Title'
import { useAuth } from 'context/Auth'
// import { useProfile } from 'context/Profile'
import { useFormik } from 'formik'
import { actionsMessages, formMessages, generalMessages } from 'globalMessages'
import { ReactElement } from 'react'
import { useIntl } from 'react-intl'
import { FormProfile } from 'types/profile'
import ProfileCard from './components/ProfileCard'

const Profile = (): ReactElement => {
  const { auth, actions } = useAuth()
  const { formatMessage } = useIntl()

  const profile = auth.profile

  const formik = useFormik<FormProfile>({
    initialValues: {
      name: profile.name,
      fathersName: profile.fathers_name,
      mothersName: profile.mothers_name,
      since: ''
    },
    onSubmit: (values) => actions?.updateProfile(values),
    enableReinitialize: true
  })

  return (
    <div className="pr-24">
      <Title>{formatMessage(generalMessages.profile)}</Title>
      <ProfileCard />
      <form
        onSubmit={formik.handleSubmit}
        onReset={formik.handleReset}
        className="flex items-center justify-between flex-wrap mt-6"
      >
        <TextField
          label={formatMessage(formMessages.names)}
          id="name"
          name="name"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
          error={Boolean(formik.errors.name && formik.touched.name)}
          helperText={
            formik.errors.name && formik.touched.name ? formik.errors.name : ''
          }
        />
        <TextField
          label={formatMessage(formMessages.lastname)}
          id="fathersName"
          name="fathersName"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.fathersName}
          error={Boolean(
            formik.errors.fathersName && formik.touched.fathersName
          )}
          helperText={
            formik.errors.fathersName && formik.touched.fathersName
              ? formik.errors.fathersName
              : ''
          }
        />
        <TextField
          label={formatMessage(formMessages.secondLastname)}
          id="mothersName"
          name="mothersName"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.mothersName}
          error={Boolean(
            formik.errors.mothersName && formik.touched.mothersName
          )}
          helperText={
            formik.errors.mothersName && formik.touched.mothersName
              ? formik.errors.mothersName
              : ''
          }
        />
        <div className="w-full text-right mt-6">
          <Button
            variant="contained"
            color="indigo"
            type="submit"
            className="ml-auto w-36"
          >
            {formatMessage(actionsMessages.edit)}
          </Button>
        </div>
      </form>
    </div>
  )
}

export default Profile

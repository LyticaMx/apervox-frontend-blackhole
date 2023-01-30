import { useDirectory } from 'context/Directory'
import { formMessages, generalMessages } from 'globalMessages'
import { ReactElement } from 'react'
import { useIntl } from 'react-intl'

const Profile = (): ReactElement => {
  const intl = useIntl()
  const { speakerDashboard } = useDirectory()
  const { profile } = speakerDashboard

  const profileMessages = {
    pin: 'PIN',
    name: intl.formatMessage(formMessages.name),
    gender: intl.formatMessage(generalMessages.gender),
    age: intl.formatMessage(generalMessages.age),
    location: intl.formatMessage(generalMessages.location),
    penitentiary: intl.formatMessage(generalMessages.penitentiary)
  }

  return (
    <div className="mx-auto mt-6 max-w-5xl px-4 sm:px-6 lg:px-8">
      <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
        {Object.keys(profile).map((field) => (
          <div key={field} className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">
              {field === 'pin' ? 'PIN' : profileMessages[field]}
            </dt>
            <dd className="mt-1 text-sm text-gray-900">{profile[field]}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

export default Profile

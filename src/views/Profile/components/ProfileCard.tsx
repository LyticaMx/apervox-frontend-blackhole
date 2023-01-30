import { ReactElement } from 'react'
import Typography from 'components/Typography'
import { useIntl } from 'react-intl'
import { profileCardMessages } from '../messages'
// import { useProfile } from 'context/Profile'
import { format } from 'date-fns'
import { useLanguage } from 'context/Language'
import { useAuth } from 'context/Auth'

const ProfileCard = (): ReactElement => {
  const { formatMessage } = useIntl()
  const { locale } = useLanguage()
  const { auth } = useAuth()

  const { profile } = auth

  return (
    <div className="flex items-center mt-8">
      <img
        className="w-20 rounded-full mr-6"
        src={profile.pic}
        alt="profile-img"
      />
      <div>
        <Typography variant="body1" style="semibold">
          {profile.dependency}
        </Typography>
        <Typography variant="caption">
          {formatMessage(profileCardMessages.activeSince, {
            date: format(new Date(profile.since), 'PPP', { locale })
          })}
        </Typography>
      </div>
    </div>
  )
}

export default ProfileCard

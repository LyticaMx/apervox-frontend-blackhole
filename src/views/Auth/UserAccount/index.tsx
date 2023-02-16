import { ReactElement } from 'react'
import { useIntl } from 'react-intl'
import { userAccountMessages } from './messages'
import Grid from 'components/Grid'
import Title from 'components/Title'
import UserInfo from './components/UserInfo'
import ChangePassword from './components/ChangePassword'

const UserAccount = (): ReactElement => {
  const { formatMessage } = useIntl()

  return (
    <>
      <Title>{formatMessage(userAccountMessages.title)}</Title>

      <Grid className="mt-5" spacing={8}>
        <Grid item xs={12} sm={12} md={8}>
          <UserInfo />
        </Grid>

        <Grid item xs={12} sm={12} md={4}>
          <ChangePassword />
        </Grid>
      </Grid>
    </>
  )
}

export default UserAccount

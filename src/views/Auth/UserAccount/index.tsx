import { ReactElement, useEffect } from 'react'
import { useIntl } from 'react-intl'
import { userAccountMessages } from './messages'
import Grid from 'components/Grid'
import Title from 'components/Title'
import UserInfo from './components/UserInfo'
import ChangePassword from './components/ChangePassword'
import { useAuth } from 'context/Auth'
import { useModuleAudits } from 'context/Audit'
import { AuditableModules } from 'context/Audit/ModuleAudits/types'

const UserAccount = (): ReactElement => {
  const { formatMessage } = useIntl()
  const { actions } = useAuth()
  const { actions: auditActions } = useModuleAudits()

  useEffect(() => {
    actions?.getProfile()
    auditActions?.genAudit(AuditableModules.ME)
  }, [])

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

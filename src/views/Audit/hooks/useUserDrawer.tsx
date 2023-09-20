import { useDrawer } from 'context/Drawer'
import { useState } from 'react'
import UserDrawer from '../components/UserDrawer'
import { useModuleAudits } from 'context/Audit'

interface DrawerState {
  selectedUser: string | null
  openDrawer: (id: string) => Promise<void>
  clearUser: () => void
}

const useUserDrawer = (): DrawerState => {
  const { actions } = useDrawer()
  const { actions: auditActions } = useModuleAudits()
  const [selectedUser, setSelectedUser] = useState<string | null>(null)

  const openDrawer = async (id: string): Promise<void> => {
    const user = await auditActions?.getAuditedUser(id)

    if (!user) return

    actions?.handleOpenDrawer({
      body: <UserDrawer user={user} selectUser={setSelectedUser} />,
      type: 'aside',
      config: {
        withoutBackdrop: true
      }
    })
  }

  return {
    selectedUser,
    openDrawer,
    clearUser: () => setSelectedUser(null)
  }
}

export default useUserDrawer

export interface SidebarContextType {
  open: boolean
  mode: 'extended' | 'mini'
  actions?: {
    toggleSidebar: () => void
    setOpen: (open: boolean) => void
  }
}

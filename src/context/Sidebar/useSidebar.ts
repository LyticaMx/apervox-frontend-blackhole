import { useContext } from 'react'
import { SidebarContextType } from 'types/sidebar'
import { SidebarContext } from './context'

export const useSidebar = (): SidebarContextType => useContext(SidebarContext)

import { Context, createContext } from 'react'
import { SidebarContextType } from 'types/sidebar'

export const initialState: SidebarContextType = {
  open: true,
  mode: 'extended'
}

export const SidebarContext: Context<SidebarContextType> =
  createContext(initialState)

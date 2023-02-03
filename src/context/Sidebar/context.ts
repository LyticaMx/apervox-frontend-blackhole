import { Context, createContext } from 'react'
import { SidebarContextType } from 'types/sidebar'

export const initialState: SidebarContextType = {
  open: true,
  mode: 'mini'
}

export const SidebarContext: Context<SidebarContextType> =
  createContext(initialState)

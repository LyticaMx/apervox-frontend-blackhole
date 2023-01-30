import { useToggle } from 'hooks/useToggle'
import { ReactElement, ReactNode, useMemo, useState } from 'react'
import { SidebarContextType } from 'types/sidebar'
import { initialState, SidebarContext } from './context'

interface Props {
  children: ReactNode
}

const SidebarProvider = (props: Props): ReactElement => {
  const { children } = props
  const [state, toggle, setState] = useToggle(initialState.open)
  const [mode, setMode] = useState<'extended' | 'mini'>(initialState.mode)

  const toggleSidebar = (): void => {
    setMode(mode === 'mini' && !state ? 'extended' : 'mini')
    toggle()
  }

  const setOpen = (open: boolean): void => {
    if (mode === 'mini') setState(open)
  }

  const contextValue = useMemo<SidebarContextType>(
    () => ({
      open: state,
      mode,
      actions: { toggleSidebar, setOpen }
    }),
    [state, mode]
  )

  return (
    <SidebarContext.Provider value={contextValue}>
      {children}
    </SidebarContext.Provider>
  )
}

export { SidebarProvider }

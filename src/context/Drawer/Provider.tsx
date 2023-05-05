import { ReactElement, useMemo, useState } from 'react'
import { DrawerContextType } from 'types/drawer'
import { DrawerContext, initialState } from './contex'

interface Props {
  children: ReactElement
}

const DrawerProvider = (props: Props): ReactElement => {
  const { children } = props
  const [drawerState, setDrawerState] =
    useState<DrawerContextType>(initialState)

  const handleOpenDrawer = (
    newState: Exclude<DrawerContextType, 'actions' | 'show'>
  ): void =>
    setDrawerState((prevState) => ({ ...prevState, ...newState, show: true }))

  const handleCloseDrawer = (): void => {
    if (drawerState.config?.onClose) drawerState.config.onClose()
    setDrawerState((prev) => ({ ...prev, show: false }))

    setTimeout(() => {
      setDrawerState({ ...initialState, config: { ...initialState.config } })
    }, 500)
  }

  const contextValue = useMemo<DrawerContextType>(
    () =>
      Object.assign(drawerState, {
        actions: {
          handleOpenDrawer,
          handleCloseDrawer
        }
      }),
    [drawerState]
  )

  return (
    <DrawerContext.Provider value={contextValue}>
      {children}
    </DrawerContext.Provider>
  )
}

export default DrawerProvider

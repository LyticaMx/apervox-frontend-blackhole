import { useContext } from 'react'
import { DrawerContextType } from 'types/drawer'
import { DrawerContext } from './contex'

export const useDrawer = (): DrawerContextType => useContext(DrawerContext)

import AdminMenu from 'components/AdminMenu'
import { useDependencies } from 'context/Dependencies'
import { ReactElement, useEffect } from 'react'
import ListDependencies from './components/Dependencies'
import DependencyUsers from './components/DependencyUsers'

const Dependencies = (): ReactElement => {
  const { actions } = useDependencies()

  useEffect(() => {
    actions?.getDependencies()
  }, [])

  return (
    <div>
      <AdminMenu />

      <ListDependencies />
      <DependencyUsers />
    </div>
  )
}

export default Dependencies

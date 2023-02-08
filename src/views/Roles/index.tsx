import FilterByField from 'components/FilterByField'
import Daterangepicker from 'components/Form/Daterangepicker'
import Title from 'components/Title'
import { ReactElement } from 'react'

const Roles = (): ReactElement => {
  return (
    <div className="flex justify-between">
      <div>
        <Title>ROLES DE USUARIO</Title>
        <p>04 ROLES EXISTENTES EN EL SISTEMA</p>
      </div>
      <div>
        <Daterangepicker menu />
        <FilterByField />
      </div>
    </div>
  )
}

export default Roles

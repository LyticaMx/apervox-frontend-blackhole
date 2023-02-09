import Title from 'components/Title'
import ViewFilter from 'components/ViewFilter'
import { ReactElement } from 'react'

const Roles = (): ReactElement => {
  const items = [
    { label: 'Numero de usuarios', name: 'numero_usuarios' },
    { label: 'Usuario', name: 'usuario' }
  ]

  return (
    <div>
      <div className="flex justify-between">
        <div>
          <Title>ROLES DE USUARIO</Title>
          <p>04 ROLES EXISTENTES EN EL SISTEMA</p>
        </div>
        <ViewFilter fields={items} />
      </div>
    </div>
  )
}

export default Roles

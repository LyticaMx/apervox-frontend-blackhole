import Popover from 'components/Popover'
import { ReactElement, useCallback } from 'react'

const Notifications = (): ReactElement => {
  const Content = useCallback(() => {
    return (
      <div>
        <div className="px-4 pt-4 flex justify-between">
          <span>Notificaciones</span>
          <button className="text-sm text-blue-500">Borrar todo</button>
        </div>

        <div></div>
      </div>
    )
  }, [])

  return (
    <Popover content={<Content />}>
      <div className="ml-2 px-2 text-xs bg-amber-300 text-gray-800 rounded-full">
        2
      </div>
    </Popover>
  )
}

export default Notifications

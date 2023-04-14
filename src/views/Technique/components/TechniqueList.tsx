import { ReactElement, useEffect } from 'react'

import Typography from 'components/Typography'
import Scroller from 'components/Scroller'
import clsx from 'clsx'
import { useTechnique } from 'context/Technique'
import { useTechniques } from 'context/Techniques'

export enum Priority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  URGENT = 'urgent'
}

export const colorByPriority = {
  [Priority.LOW]: 'bg-sky-500',
  [Priority.MEDIUM]: 'bg-yellow-500',
  [Priority.HIGH]: 'bg-orange-500',
  [Priority.URGENT]: 'bg-red-500'
}

const TechniqueList = (): ReactElement => {
  const { technique, actions } = useTechnique()
  const { techniques, actions: actionsTechniques } = useTechniques()

  useEffect(() => {
    actionsTechniques?.getTechniques()
  }, [])

  return (
    <div className="h-full flex flex-col">
      <Typography variant="body2" style="semibold" className="uppercase mb-2">
        Tecnicas
      </Typography>
      <Scroller>
        {techniques?.map((item) => (
          <button
            onClick={() => actions?.setTechnique(item)}
            className={clsx(
              'inline-flex rounded-md items-center font-semibold px-3 py-1 text-sm w-full',
              {
                'text-primary bg-primary-100': item.id === technique?.id,
                'text-neutral-500': item.id !== technique?.id
              }
            )}
            key={item.id}
          >
            <div
              className={clsx(
                'w-3 h-3 rounded-full mr-2',
                colorByPriority[item.priority]
              )}
            />
            {item.name}
          </button>
        ))}
        <div></div>
      </Scroller>
    </div>
  )
}

export default TechniqueList

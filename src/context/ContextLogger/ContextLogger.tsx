import { ReactElement, useContext, useEffect } from 'react'
import { find, forEach, isEmpty, keys, map, size } from 'lodash'
import { usePrevious } from 'hooks/usePrevious'
import { getObjectDiff, logDiffs } from './helpers'

interface Props {
  contexts: {
    [x: string]: any
  }
  config: {
    objectDiffs: boolean
    arrayDiffs: boolean
  }
}

interface Context {
  name: string
  value: any
}

const ContextLogger = ({ contexts, config }: Props): ReactElement => {
  const contextList: string[] = keys(contexts)

  if (size(contextList) === 0) return <></>

  const allContexts: Context[] = map(contextList, (contextName: string) => ({
    name: contextName,
    value: useContext(contexts[contextName])
  }))

  const allPreviousContexts: any[] = map(allContexts, (contextData: any) =>
    usePrevious(contextData)
  )

  useEffect(() => {
    forEach(allContexts, (context: Context) => {
      const previousContext = find(
        allPreviousContexts,
        (prevContext: Context) => prevContext?.name === context.name
      )

      if (!previousContext) return

      const changes = getObjectDiff(previousContext.value, context.value)
      const hasChanges = !isEmpty(changes)

      if (hasChanges) {
        logDiffs({
          name: context.name,
          prevState: changes,
          newState: context.value,
          config
        })
      }
    })
  }, [allPreviousContexts])

  return <></>
}

export { ContextLogger }

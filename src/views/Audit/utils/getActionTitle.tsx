import { ReactNode } from 'react'
import {
  auditableActionOf,
  auditableActionTableOf,
  auditableActions,
  auditableModules
} from '../messages'

const getGetIn = (formatter: Function, moduleName: string): string =>
  `${formatter(auditableActions.get_in)} ${
    auditableModules[moduleName]
      ? formatter(auditableModules[moduleName])
      : moduleName
  }`

const getView = (
  formatter: Function,
  moduleName: string,
  name: string
): ReactNode => (
  <>
    {`${formatter(auditableActions.view)} ${
      auditableActionOf[moduleName]
        ? formatter(auditableActionOf[moduleName])
        : moduleName
    } `}
    <span className="text-primary">{name}</span>
  </>
)

const getSearch = (
  formatter: Function,
  moduleName: string,
  name: string
): ReactNode => (
  <>
    {`${formatter(auditableActions.search)} ${
      auditableActionOf[moduleName]
        ? formatter(auditableActionOf[moduleName])
        : moduleName
    } `}
    <span className="text-primary">{name.split(':')?.[1] ?? ''}</span>
  </>
)

const getCreated = (
  formatter: Function,
  moduleName: string,
  name: string
): ReactNode => (
  <>
    {`${formatter(auditableActions.created)} ${
      auditableActionOf[moduleName]
        ? formatter(auditableActionOf[moduleName])
        : moduleName
    } `}
    <span className="text-primary">{name}</span>
  </>
)

const getUpdated = (
  formatter: Function,
  moduleName: string,
  name: string
): ReactNode => (
  <>
    {`${formatter(auditableActions.updated)} ${
      auditableActionOf[moduleName]
        ? formatter(auditableActionOf[moduleName])
        : moduleName
    } `}
    <span className="text-primary">{name}</span>
  </>
)

const getDeleted = (
  formatter: Function,
  moduleName: string,
  name: string
): ReactNode => (
  <>
    {`${formatter(auditableActions.deleted)} ${
      auditableActionOf[moduleName]
        ? formatter(auditableActionOf[moduleName])
        : moduleName
    } `}
    <span className="text-primary">{name}</span>
  </>
)

const getAutomaticTranscription = (
  formatter: Function,
  moduleName: string
): string =>
  `${formatter(auditableActions.get_in)} ${
    auditableModules[moduleName]
      ? formatter(auditableModules[moduleName])
      : moduleName
  }`

const getStream = (formatter: Function, moduleName: string): string =>
  formatter(auditableActions.stream)

const getExported = (
  formatter: Function,
  moduleName: string,
  name: string
): ReactNode => (
  <>
    {`${formatter(auditableActions.exported)} ${
      auditableActionTableOf[moduleName]
        ? formatter(auditableActionTableOf[moduleName])
        : moduleName
    } `}
    <span className="text-primary">{name}</span>
  </>
)

const titles = {
  get_in: getGetIn,
  view: getView,
  search: getSearch,
  exported: getExported,
  created: getCreated,
  started_automatic_transcription: getAutomaticTranscription,
  stream: getStream,
  updated: getUpdated,
  deleted: getDeleted
}

export const getActionTitle = (
  formatter: Function,
  moduleName: string,
  action: string,
  name: string = ''
): ReactNode => titles[action]?.(formatter, moduleName, name) ?? ''

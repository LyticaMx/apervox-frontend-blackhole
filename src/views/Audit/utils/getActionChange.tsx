import { ReactNode } from 'react'
import { mapper } from 'utils/objectMapper'
import templates from './templates.json'
import { differenceParser } from 'utils/differenceParser'
import { format } from 'date-fns'
import { platformMessages, timeMessages } from 'globalMessages'
import { getItem } from 'utils/persistentStorage'
import { ArrowLongRightIcon } from '@heroicons/react/24/outline'

export const getActionChangeMessage = (
  formatter: Function,
  moduleName: string,
  action: string,
  oldData?: any,
  newData?: any
): ReactNode => {
  console.log(moduleName)
  switch (moduleName) {
    case 'users':
      return getUserMessage(formatter, action, oldData, newData)
    case 'groups':
      return getGroupMessage(formatter, action, oldData, newData)
    case 'roles':
      return getRolesMessage(formatter, action, oldData, newData)
    case 'targets':
      return getTargetsMessage(formatter, action, oldData, newData)
    case 'techniques':
      return getTechniquesMessage(formatter, action, oldData, newData)
    case 'overflow_lines':
      return getOverflowMessage(formatter, action, oldData, newData)
    case 'labels':
      return getLabelsMessage(formatter, action, oldData, newData)
    case 'letterheads':
      return getLetterheadMessage(formatter, action, oldData, newData)
    default:
      return ''
  }
}

const getUserMessage = (
  formatter: Function,
  action: string,
  oldData?: any,
  newData?: any
): ReactNode => {
  switch (action) {
    case 'created': {
      if (!newData) return ''
      const data = mapper({
        data: newData,
        template: templates.user
      })

      return <div>{differenceParser(formatter, data)}</div>
    }
    case 'updated': {
      if (!newData || !oldData) return ''
      const mappedNew = mapper({ data: newData, template: templates.user })
      const mappedOld = mapper({ data: oldData, template: templates.user })

      return <div>{differenceParser(formatter, mappedNew, mappedOld)}</div>
    }
    case 'exported':
      return 'exported'
    default:
      return ''
  }
}

const getGroupMessage = (
  formatter: Function,
  action: string,
  oldData?: any,
  newData?: any
): ReactNode => {
  switch (action) {
    case 'created': {
      if (!newData) return ''
      const data = mapper({
        data: newData,
        template: templates.group
      })

      return <div>{differenceParser(formatter, data)}</div>
    }
    case 'updated': {
      if (!newData) return ''

      const mappedNew = mapper({ data: newData, template: templates.group })
      const mappedOld = mapper({ data: oldData, template: templates.group })

      return <div>{differenceParser(formatter, mappedNew, mappedOld)}</div>
    }
    case 'exported':
      return 'exported'
    default:
      return ''
  }
}

const getRolesMessage = (
  formatter: Function,
  action: string,
  oldData?: any,
  newData?: any
): ReactNode => {
  switch (action) {
    case 'created': {
      if (!newData) return ''
      const data = mapper({ data: newData, template: templates.roles })
      return <div>{differenceParser(formatter, data)}</div>
    }
    case 'updated': {
      const mappedOld = mapper({ data: newData, template: templates.roles })
      const mappedNew = mapper({ data: oldData, template: templates.roles })
      return <div>{differenceParser(formatter, mappedOld, mappedNew)}</div>
    }
    case 'exported': {
      return ''
    }
    default:
      return ''
  }
}

const getTargetsMessage = (
  formatter: Function,
  action: string,
  oldData?: any,
  newData?: any
): ReactNode => {
  switch (action) {
    case 'created': {
      if (!newData) return ''
      const data = mapper({ data: newData, template: templates.targets })
      if (data.endDate) {
        data.endDate = format(new Date(data.endDate), 'dd/MM/yyyy - HH:mm:ss')
      }
      return <div>{differenceParser(formatter, data)}</div>
    }
    case 'updated': {
      if (!newData || !oldData) return ''
      const mappedNew = mapper({ data: newData, template: templates.targets })
      const mappedOld = mapper({ data: oldData, template: templates.targets })
      if (mappedNew.endDate) {
        mappedNew.endDate = format(
          new Date(mappedNew.endDate),
          'dd/MM/yyyy - HH:mm:ss'
        )
      }
      if (mappedOld.endDate) {
        mappedOld.endDate = format(
          new Date(mappedOld.endDate),
          'dd/MM/yyyy - HH:mm:ss'
        )
      }

      return <div>{differenceParser(formatter, mappedNew, mappedOld)}</div>
    }
    case 'exported': {
      return ''
    }
    default:
      return ''
  }
}

const getTechniquesMessage = (
  formatter: Function,
  action: string,
  oldData?: any,
  newData?: any
): ReactNode => {
  switch (action) {
    case 'created': {
      if (!newData) return ''
      const data = mapper({ data: newData, template: templates.techniques })
      data.startDate = format(new Date(data.startDate), 'dd/MM/yyyy - HH:mm:ss')
      data.endDate = format(new Date(data.endDate), 'dd/MM/yyyy - HH:mm:ss')
      if (platformMessages[`${data.status}Status`]) {
        data.status = formatter(platformMessages[`${data.status}Status`])
      }
      if (platformMessages[`${data.priority}Priority`]) {
        data.priority = formatter(platformMessages[`${data.priority}Priority`])
      }
      if (timeMessages[data.notificationTimeUnit]) {
        data.notificationTimeUnit = formatter(
          timeMessages[data.notificationTimeUnit]
        )
      }

      return <div>{differenceParser(formatter, data)}</div>
    }
    case 'updated': {
      if (!newData || !oldData) return ''
      const mappedNew = mapper({
        data: newData,
        template: templates.techniques
      })
      mappedNew.startDate = format(
        new Date(mappedNew.startDate),
        'dd/MM/yyyy - HH:mm:ss'
      )
      mappedNew.endDate = format(
        new Date(mappedNew.endDate),
        'dd/MM/yyyy - HH:mm:ss'
      )
      if (platformMessages[`${mappedNew.status}Status`]) {
        mappedNew.status = formatter(
          platformMessages[`${mappedNew.status}Status`]
        )
      }
      if (platformMessages[`${mappedNew.priority}Priority`]) {
        mappedNew.priority = formatter(
          platformMessages[`${mappedNew.priority}Priority`]
        )
      }
      if (timeMessages[mappedNew.notificationTimeUnit]) {
        mappedNew.notificationTimeUnit = formatter(
          timeMessages[mappedNew.notificationTimeUnit]
        )
      }
      const mappedOld = mapper({
        data: oldData,
        template: templates.techniques
      })
      mappedOld.startDate = format(
        new Date(mappedOld.startDate),
        'dd/MM/yyyy - HH:mm:ss'
      )
      mappedOld.endDate = format(
        new Date(mappedOld.endDate),
        'dd/MM/yyyy - HH:mm:ss'
      )
      if (platformMessages[`${oldData.status}Status`]) {
        oldData.status = formatter(platformMessages[`${oldData.status}Status`])
      }
      if (platformMessages[`${oldData.priority}Priority`]) {
        oldData.priority = formatter(
          platformMessages[`${oldData.priority}Priority`]
        )
      }
      if (timeMessages[oldData.notificationTimeUnit]) {
        oldData.notificationTimeUnit = formatter(
          timeMessages[oldData.notificationTimeUnit]
        )
      }

      return <div>{differenceParser(formatter, mappedNew, mappedOld)}</div>
    }
    case 'exported': {
      return ''
    }
    default:
      return ''
  }
}

const getOverflowMessage = (
  formatter: Function,
  action: string,
  oldData?: any,
  newData?: any
): ReactNode => {
  switch (action) {
    case 'created': {
      if (!newData) return ''
      const data = mapper({ data: newData, template: templates.overflow })

      return <div>{differenceParser(formatter, data)}</div>
    }
    case 'updated': {
      if (!newData || !oldData) return ''
      const mappedNew = mapper({
        data: newData,
        template: templates.overflow
      })
      const mappedOld = mapper({
        data: oldData,
        template: templates.overflow
      })

      return <div>{differenceParser(formatter, mappedNew, mappedOld)}</div>
    }
    case 'exported': {
      return ''
    }
    default:
      return ''
  }
}

const getLabelsMessage = (
  formatter: Function,
  action: string,
  oldData?: any,
  newData?: any
): ReactNode => {
  switch (action) {
    case 'created': {
      if (!newData) return ''
      const data = mapper({
        data: newData,
        template: templates.labels
      })

      data.color = (
        <span
          className="w-3 h-3 rounded-full inline-block"
          style={{ backgroundColor: data.color }}
        />
      )

      return <div>{differenceParser(formatter, data)}</div>
    }
    case 'updated': {
      if (!newData || !oldData) return ''
      const mappedNew = mapper({ data: newData, template: templates.labels })
      const mappedOld = mapper({ data: oldData, template: templates.labels })

      if (mappedNew.color === mappedOld.color) {
        mappedNew.color = mappedOld.color = (
          <span
            className="w-3 h-3 rounded-full inline-block"
            style={{ backgroundColor: mappedNew.color }}
          />
        )
      } else {
        mappedNew.color = (
          <span
            className="w-3 h-3 rounded-full inline-block"
            style={{ backgroundColor: mappedNew.color }}
          />
        )
        mappedOld.color = (
          <span
            className="w-3 h-3 rounded-full inline-block"
            style={{ backgroundColor: mappedOld.color }}
          />
        )
      }

      return <div>{differenceParser(formatter, mappedNew, mappedOld)}</div>
    }
    default:
      return ''
  }
}

const getLetterheadMessage = (
  formatter: Function,
  action: string,
  oldData?: any,
  newData?: any
): ReactNode => {
  const token = getItem('token')
  const getImageUrl = (id: string): string =>
    `${process.env.REACT_APP_MAIN_BACKEND_URL}letterheads/${id}/image?token=${token}`

  switch (action) {
    case 'created': {
      if (!newData) return ''
      const data = mapper({
        data: newData,
        template: templates.letterheads
      })
      const image = <img src={getImageUrl(data.id)} />

      delete data.id

      return (
        <div>
          {differenceParser(formatter, data)}
          <hr />
          <div className="mt-1">{image}</div>
        </div>
      )
    }
    case 'updated': {
      if (!newData || !oldData) return ''
      const mappedNew = mapper({
        data: newData,
        template: templates.letterheads
      })
      const mappedOld = mapper({
        data: oldData,
        template: templates.letterheads
      })

      const oldImage = <img src={getImageUrl(mappedOld.id)} />
      const newImage = <img src={getImageUrl(mappedNew.id)} />

      delete mappedOld.id
      delete mappedNew.id

      return (
        <div>
          {differenceParser(formatter, mappedNew, mappedOld)}
          <hr />
          <div className="flex justify-between items-center gap-2 mt-1">
            {oldImage}
            <ArrowLongRightIcon className="w-5 h-5" />
            {newImage}
          </div>
        </div>
      )
    }
    default:
      return ''
  }
}

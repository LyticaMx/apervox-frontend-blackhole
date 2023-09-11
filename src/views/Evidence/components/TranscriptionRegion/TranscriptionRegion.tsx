import { Float } from '@headlessui-float/react'
import { Cog6ToothIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import { RegionContentProps } from 'components/WaveSurferContext/types'
import { has } from 'lodash'
import {
  ReactElement,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState
} from 'react'
import { useIntl } from 'react-intl'
import { useOnClickOutside } from 'usehooks-ts'
import { messages } from './messages'
import { actionsMessages } from 'globalMessages'

interface Props extends RegionContentProps {
  transcript?: (
    regionId: string,
    start: number,
    end: number
  ) => Promise<string | null>
  deleteTranscript?: (regionId: string) => Promise<boolean>
}

enum RegionActions {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete'
}

const TranscriptionRegion = (props: Props): ReactElement => {
  const [width, setWidth] = useState(0)
  const [show, setShow] = useState(false)
  const $wrapper = useRef<HTMLDivElement>(null)
  const $menu = useRef<HTMLDivElement>(null)
  const { formatMessage } = useIntl()

  useOnClickOutside($menu, () => setShow(false))

  useLayoutEffect(() => {
    const myObserver = new ResizeObserver((entries: ResizeObserverEntry[]) => {
      for (const entry of entries) {
        setWidth(entry.target.clientWidth)
      }
    })

    if ($wrapper.current) myObserver.observe($wrapper.current)

    return () => {
      if ($wrapper.current) myObserver.unobserve($wrapper.current)
    }
  }, [])

  const handleAction = async (
    e: React.MouseEvent<HTMLLIElement> | null,
    type: RegionActions
  ): Promise<void> => {
    e?.stopPropagation()
    const {
      region: { id, start, end, data = {} }
    } = props
    switch (type) {
      case RegionActions.CREATE:
      case RegionActions.UPDATE: {
        const transcriptId =
          (await props.transcript?.((data?.id as string) ?? id, start, end)) ??
          ''

        props.region.update({
          id,
          start,
          end,
          data: { ...data, id: transcriptId }
        })

        break
      }
      case RegionActions.DELETE:
        {
          let remove = true

          if (data.id && !(data.id as string).startsWith('wavesurfer')) {
            remove =
              (await props.deleteTranscript?.(
                props.region.data.id as string
              )) ?? true
          }
          if (remove) props.region.remove()
        }
        break
    }
  }

  useEffect(() => {
    const updateRegion = (): void => {
      handleAction(null, RegionActions.UPDATE)
    }

    props.region.on('update-end', updateRegion)

    return () => {
      props.region.un('update-end', updateRegion)
    }
  }, [props.region])

  const transcripted = has(props.region, 'data.id')
  const bg = useMemo(
    () => (transcripted ? 'bg-blue-400' : 'bg-primary-500'),
    [transcripted]
  )

  return (
    <div
      className={clsx(
        'bg-opacity-40 w-full h-full',
        bg,
        width < 36 ? 'p-0' : 'p-2'
      )}
      ref={$wrapper}
      onClick={() => setShow(false)}
    >
      <div ref={$menu}>
        <Float
          offset={5}
          flip
          shift={6}
          enter="transition duration-200 ease-out"
          enterFrom="scale-95 opacity-0"
          enterTo="scale-100 opacity-100"
          leave="transition duration-150 ease-in"
          leaveFrom="scale-100 opacity-100"
          leaveTo="scale-95 opacity-0"
          tailwindcssOriginClass
          show={show}
        >
          <button
            onClick={(e) => {
              e.stopPropagation()
              setShow((prev) => !prev)
            }}
            className={clsx({ hidden: width < 36 }, 'text-white')}
          >
            <Cog6ToothIcon className="w-5 h-5" />
          </button>
          <div
            className="py-1 rounded-md shadow-md bg-white border border-gray-200 text-sm max-w-md cursor-auto"
            onClick={(e) => e.stopPropagation()}
            onMouseEnter={(e) => e.stopPropagation()}
            onMouseDown={(e) => e.stopPropagation()}
            onMouseLeave={(e) => e.stopPropagation()}
          >
            <ul>
              {!transcripted && (
                <li
                  className="px-2 py-1 whitespace-nowrap text-sm hover:text-primary hover:bg-background-secondary cursor-pointer"
                  onClick={async (e) =>
                    await handleAction(e, RegionActions.CREATE)
                  }
                >
                  {formatMessage(messages.generate)}
                </li>
              )}
              <li
                className="px-2 py-1 whitespace-nowrap text-sm hover:text-primary hover:bg-background-secondary cursor-pointer"
                onClick={async (e) =>
                  await handleAction(e, RegionActions.DELETE)
                }
              >
                {formatMessage(actionsMessages.delete)}
              </li>
            </ul>
          </div>
        </Float>
      </div>
    </div>
  )
}

export { TranscriptionRegion }

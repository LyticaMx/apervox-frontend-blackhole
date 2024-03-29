import {
  BookmarkIcon,
  CheckCircleIcon,
  XCircleIcon
} from '@heroicons/react/24/outline'
import {
  ReactElement,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState
} from 'react'
import { useOnClickOutside } from 'usehooks-ts'
import { Float } from '@headlessui-float/react'
import clsx from 'clsx'
import { has, pick } from 'lodash'
import { useIntl } from 'react-intl'
import { generalMessages } from 'globalMessages'
import { messages } from '../messages'
import { Region } from 'wavesurfer.js/src/plugin/regions'
import useWavesurferContext from '../hooks/useWavesurferContext'

interface Props {
  region: Region
}
const RegionContent = (props: Props): ReactElement => {
  const $wraper = useRef<HTMLDivElement>(null)
  const $menu = useRef<HTMLDivElement>(null)
  const [width, setWidth] = useState(0)
  const [show, setShow] = useState(false)
  const [name, setName] = useState<string>('')
  const [editing, setEditing] = useState<boolean>(false)
  const [showTooltip, setShowTooltip] = useState(false)
  const { controls } = useWavesurferContext()
  const { formatMessage } = useIntl()

  useOnClickOutside($menu, () => {
    setShow(false)
  })

  useLayoutEffect(() => {
    const myObserver = new ResizeObserver(
      (entries: ResizeObserverEntry[], observer: ResizeObserver) => {
        for (const entry of entries) {
          setWidth(entry.target.clientWidth)
        }
      }
    )
    if ($wraper.current) myObserver.observe($wraper.current) // Start watching

    return () => {
      if ($wraper.current) myObserver.unobserve($wraper.current) // Stop watching
    }
  }, [])

  useEffect(() => {
    if (props.region.data.name) {
      setName(props.region.data.name as string)
    }
  }, [props])

  const isNew = !has(props.region, 'data.name')
  const bg = useMemo(() => (isNew ? 'bg-primary-500' : 'bg-blue-400'), [isNew])

  const handleClick = (e, type: string): void => {
    switch (type) {
      case 'CREATE':
      case 'EDIT':
        setEditing(['CREATE', 'EDIT'].includes(type))
        break
      case 'DELETE':
        handleRemove()
        break
      case 'PLAY':
        props.region.playLoop()
        controls?.setIsPlaying(true)
        setShow(false)
        break
    }

    e.stopPropagation()
  }

  const handleChange = (e: any): void => {
    setName(e.target.value)
  }

  const handleSave = (): void => {
    if (!name) return

    const data = pick(props.region, [
      'id',
      'start',
      'end',
      'loop',
      'drag',
      'resize',
      'color',
      'minLength',
      'maxLength'
    ])

    props.region.update({
      ...data,
      data: {
        ...props.region.data,
        name
      }
    })

    setShow(false)
  }

  const handleRemove = (): void => {
    props.region.remove()
  }

  return (
    <div
      className={clsx(
        'bg-opacity-40 w-full h-full',
        bg,
        width < 36 ? 'p-0' : 'p-2'
      )}
      ref={$wraper}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
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
          <BookmarkIcon
            className={clsx('w-5 h-5 text-white cursor-pointer', {
              hidden: width < 36
            })}
            onClick={(e) => {
              setEditing(false)
              setShow((prev) => !prev)
              e.stopPropagation()
            }}
          />

          <div
            className="py-1 rounded-md shadow-md bg-white border border-gray-200 text-sm max-w-md cursor-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {editing && (
              <div className="flex gap-2 items-center p-2">
                <span>{`${formatMessage(generalMessages.tag)}:`}</span>
                <input
                  type="text"
                  placeholder={formatMessage(messages.tagName)}
                  className="text-sm px-2 py-1 border border-slate-200 rounded-md focus:ring-0"
                  value={name}
                  onChange={handleChange}
                />
                <div className="flex gap-2 items-center">
                  <CheckCircleIcon
                    className={clsx('h-5 w-5 text-muted ', {
                      'hover:text-primary cursor-pointer': !!name
                    })}
                    onClick={handleSave}
                  />
                  <XCircleIcon
                    className="h-5 w-5 text-muted hover:text-primary cursor-pointer"
                    onClick={() => {
                      setEditing(false)
                    }}
                  />
                </div>
              </div>
            )}
            {!editing && (
              <ul>
                {isNew ? (
                  <li
                    className="px-2 py-1 whitespace-nowrap text-sm hover:text-primary hover:bg-background-secondary cursor-pointer"
                    onClick={(e) => {
                      handleClick(e, 'CREATE')
                    }}
                  >
                    {formatMessage(messages.createTag)}
                  </li>
                ) : (
                  <li
                    className="px-2 py-1 whitespace-nowrap text-sm hover:text-primary hover:bg-background-secondary cursor-pointer"
                    onClick={(e) => {
                      handleClick(e, 'EDIT')
                    }}
                  >
                    {formatMessage(messages.editTag)}
                  </li>
                )}
                <li
                  className="px-2 py-1 whitespace-nowrap text-sm hover:text-primary hover:bg-background-secondary cursor-pointer"
                  onClick={(e) => {
                    handleClick(e, 'PLAY')
                  }}
                >
                  {formatMessage(messages.playInLoop)}
                </li>
                <li
                  className="px-2 py-1 whitespace-nowrap text-sm hover:text-primary hover:bg-background-secondary cursor-pointer"
                  onClick={(e) => {
                    handleClick(e, 'DELETE')
                  }}
                >
                  {formatMessage(
                    isNew ? messages.deleteRegion : messages.deleteTag
                  )}
                </li>
              </ul>
            )}
          </div>
        </Float>
      </div>
      {showTooltip && (
        <span className={clsx('break-words')}>
          {(props.region.data?.name as string) ?? ''}
        </span>
      )}
    </div>
  )
}

export default RegionContent

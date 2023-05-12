import {
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  ShieldCheckIcon,
  XCircleIcon
} from '@heroicons/react/24/outline'
import clsx from 'clsx'
import Toast from 'components/Toast'
import { useCallback } from 'react'
import { toast } from 'react-toastify'

interface Params {
  title: string
  body?: string
  type?: 'Info' | 'Danger' | 'Success' | 'Warning'
  iconOnTop?: boolean
  autoClose?: number | false | undefined
}

type ToastParams = Omit<Params, 'title' | 'type'>
interface ReturnType {
  launchToast: (params: Params) => void
  success: (title: string, params?: ToastParams) => void
  warning: (title: string, params?: ToastParams) => void
  danger: (title: string, params?: ToastParams) => void
  info: (title: string, params?: ToastParams) => void
}

const useToast = (): ReturnType => {
  const getToastType = useCallback((type) => {
    switch (type) {
      case 'Danger':
        return {
          className: 'text-red-500',
          icon: ExclamationTriangleIcon,
          progressClassName: '!bg-red-600'
        }
      case 'Warning':
        return {
          className: 'text-amber-500',
          icon: ExclamationCircleIcon,
          progressClassName: '!bg-amber-600'
        }
      case 'Success':
        return {
          className: 'text-green-500',
          icon: ShieldCheckIcon,
          progressClassName: '!bg-green-600'
        }
      case 'Info':
      default:
        return {
          className: 'text-primary',
          icon: InformationCircleIcon,
          progressClassName: '!bg-primary'
        }
    }
  }, [])

  const launchToast = (params: Params): void => {
    const { type, title, body, iconOnTop = true, autoClose = 5000 } = params

    const toastType = getToastType(type)

    toast(() => <Toast title={title} body={body} />, {
      icon: () => <toastType.icon className={toastType.className} />,
      className: clsx(iconOnTop && 'toast-top-icon'),
      autoClose,
      progressClassName: clsx('!bg-none', toastType.progressClassName),
      closeButton: (props) => (
        <button onClick={props.closeToast} className="self-start mt-[3px]">
          <XCircleIcon className="h-5 w-5 text-secondary-gray hover:text-gray-600 transition-colors" />
        </button>
      )
    })
  }

  return {
    launchToast,
    success: (title, params?: ToastParams) => {
      launchToast({ ...params, type: 'Success', title })
    },
    warning: (title, params?: ToastParams) => {
      launchToast({ ...params, type: 'Warning', title })
    },
    danger: (title, params?: ToastParams) => {
      launchToast({ ...params, type: 'Danger', title })
    },
    info: (title, params?: ToastParams) => {
      launchToast({ ...params, type: 'Info', title })
    }
  }
}

export default useToast

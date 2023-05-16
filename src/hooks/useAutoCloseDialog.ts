import { useEffect, useRef, useState } from 'react'

const useAutoCloseDialog = (): {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  popoverRef: React.RefObject<HTMLDivElement>
} => {
  const [open, setOpen] = useState(false)
  const popoverRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const handleClickOutside = (event): void => {
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside, true)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside, true)
    }
  }, [open])

  return {
    open,
    setOpen,
    popoverRef
  }
}

export { useAutoCloseDialog }

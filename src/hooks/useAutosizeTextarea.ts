import { useEffect } from 'react'

const useAutosizeTextarea = (
  textAreaRef: HTMLTextAreaElement | null,
  value: string
): void => {
  useEffect(() => {
    if (!textAreaRef) return
    textAreaRef.style.height = '0px'
    textAreaRef.style.height = `${textAreaRef.scrollHeight}px`
  }, [value, textAreaRef])
}

export default useAutosizeTextarea

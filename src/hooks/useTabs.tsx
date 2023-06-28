import { ReactElement, ReactNode, useCallback, useState } from 'react'

interface ContentProps {
  value: any
  children: ReactNode
  className?: string
}

type Response = [
  any,
  (step: any) => void,
  (props: ContentProps) => ReactElement
]

const useTabs = <T,>(defaultValue?: T): Response => {
  const [active, setActive] = useState<T | null>(defaultValue ?? null)

  const Content = useCallback(
    ({ value, children, ...props }: ContentProps) =>
      active === value ? <div {...props}>{children}</div> : <></>,
    [active]
  )

  return [active, setActive, Content]
}

export { useTabs }

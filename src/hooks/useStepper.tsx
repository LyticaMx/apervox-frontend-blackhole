import { ReactElement, ReactNode, useCallback, useMemo, useState } from 'react'
import Stepper, { Props } from 'components/Stepper'

type hookProps = Omit<Props, 'active'>
type StepperProps = Omit<Props, 'active' | 'steps'>

interface ContentProps {
  value: number
  children: ReactNode
  className?: string
}

interface Response {
  step?: string
  value: number
  Stepper: (props: StepperProps) => ReactElement
  StepContent: (props: ContentProps) => ReactElement
  reset: () => void
  back: () => void
  next: () => void
  goTo: (step: number) => void
}

const useStepper = ({ steps = [], ...config }: hookProps): Response => {
  const [active, setActive] = useState(steps.length ? 0 : -1)
  const step = useMemo(() => (steps.length ? steps[active] : undefined), [
    steps,
    active
  ])

  const next = (): void => {
    setActive(prev => prev + 1)
  }
  const back = (): void => {
    setActive(prev => prev - 1)
  }
  const reset = (): void => {
    setActive(0)
  }
  const goTo = (position: number): void => {
    setActive(position)
  }

  const Component = useCallback(
    (props: StepperProps) => (
      <Stepper
        onClick={goTo}
        {...config}
        {...props}
        steps={steps}
        active={active}
      />
    ),
    [active]
  )

  const Content = useCallback(
    ({ value, children, ...props }: ContentProps) =>
      active === value ? <div {...props}>{children}</div> : <></>,
    [active]
  )

  return {
    step,
    value: active,
    next,
    back,
    reset,
    goTo,
    Stepper: Component,
    StepContent: Content
  }
}

export { useStepper }

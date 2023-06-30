const easeInOutSin = (time: number): number =>
  (1 + Math.sin(Math.PI * time - Math.PI / 2)) / 2

export const animate = (
  property: string | number,
  element: HTMLDivElement | null,
  to: number,
  options: {
    ease?: (time: number) => number
    duration?: number
    [x: string]: any
  } = {},
  cb: (error?: Error | null) => void = () => {}
): (() => void) => {
  if (!element) return () => {}

  const { ease = easeInOutSin, duration = 300 } = options
  let start: number | null = null
  const from: number = element[property]
  let cancelled = false
  const cancel = (): void => {
    cancelled = true
  }

  const step = (timestamp: number): void => {
    if (cancelled) {
      cb(new Error('Animation cancelled'))
      return
    }

    if (start === null) start = timestamp

    const time = Math.min(1, (timestamp - start) / duration)
    element[property] = ease(time) * (to - from) + from

    if (time >= 1) {
      requestAnimationFrame(() => {
        cb(null)
      })
      return
    }

    requestAnimationFrame(step)
  }

  if (from === to) {
    cb(new Error('Element already at target position'))
    return cancel
  }

  requestAnimationFrame(step)

  return cancel
}

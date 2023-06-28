export const debounce = (
  func: { apply: (arg0: any, arg1: any[]) => void },
  wait: number = 166
): {
  (...args: any[]): void
  clear: () => void
} => {
  let timeout: NodeJS.Timeout

  const debounced = (...args: any[]): void => {
    const later = (): void => {
      func.apply(this, args)
    }

    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }

  debounced.clear = (): void => {
    clearTimeout(timeout)
  }

  return debounced
}

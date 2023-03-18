export const useFunctionDebounce = (
  func: (...args: any[]) => void,
  miliseconds: number
): ((...args: any[]) => void) => {
  const time = miliseconds || 400
  let timer

  return (...args: any[]) => {
    if (timer) clearTimeout(timer)
    timer = setTimeout(func, time, ...args)
  }
}

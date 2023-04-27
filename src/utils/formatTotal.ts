const formatTotal = (total: number, message: string): string =>
  `${total < 10 ? `0${total}` : total} ${message}`

export { formatTotal }

export const chunkArray = <T>(
  arrayToSplit: T[],
  itemsPerChunk: number = 10
): T[][] => {
  return Array.from(
    Array(Math.ceil(arrayToSplit.length / itemsPerChunk)),
    (_, i) =>
      arrayToSplit.slice(i * itemsPerChunk, i * itemsPerChunk + itemsPerChunk)
  )
}

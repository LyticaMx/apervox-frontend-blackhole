import { HistogramGroup } from 'types/graphs'

export const genHistogram = <T>(
  data: T[],
  binField: string = 'value',
  binWidth: number = 2
): Array<HistogramGroup<T>> => {
  const sorted = [...data].sort((a, b) => a[binField] - b[binField])

  if (sorted.length === 0 || binWidth < 0) return []

  const groupRanges: number[] = []

  for (
    let i = Math.floor(Number(sorted[0][binField]));
    i <= sorted[sorted.length - 1][binField];
    i += binWidth
  ) {
    groupRanges.push(i)
  }
  const grouped = {}
  let actualIndex = 0
  for (let i = 0; i < groupRanges.length - 1; i++) {
    if (!grouped[`${groupRanges[i]} - ${groupRanges[i + 1]}`]) {
      grouped[`${groupRanges[i]} - ${groupRanges[i + 1]}`] = []
    }
    for (; sorted[actualIndex][binField] < groupRanges[i + 1]; actualIndex++) {
      grouped[`${groupRanges[i]} - ${groupRanges[i + 1]}`].push(
        sorted[actualIndex]
      )
    }
  }

  const groups = Object.keys(grouped).map((current) => ({
    key: current.split('-')[0].trim(),
    value: grouped[current].length,
    data: grouped[current]
  }))

  return groups
}

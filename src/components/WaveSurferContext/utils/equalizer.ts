import { Filter } from '../types'

const EQ: Filter[] = [
  {
    f: 32,
    type: 'lowshelf'
  },
  {
    f: 64,
    type: 'peaking'
  },
  {
    f: 125,
    type: 'peaking'
  },
  {
    f: 250,
    type: 'peaking'
  },
  {
    f: 500,
    type: 'peaking'
  },
  {
    f: 1000,
    type: 'peaking'
  },
  {
    f: 2000,
    type: 'peaking'
  },
  {
    f: 4000,
    type: 'peaking'
  },
  {
    f: 8000,
    type: 'peaking'
  },
  {
    f: 16000,
    type: 'highshelf'
  }
]

// Media element no tiene la propiedad ac
export const generteFilters = (
  ws: any,
  fq: Filter[] = EQ
): BiquadFilterNode[] => {
  return fq.map((band) => {
    const filter: BiquadFilterNode = ws.backend.ac.createBiquadFilter()
    filter.type = band.type as any
    filter.gain.value = 0
    filter.Q.value = 1
    filter.frequency.value = band.f

    return filter
  })
}

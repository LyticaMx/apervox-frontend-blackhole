/* eslint-disable @typescript-eslint/space-before-function-paren */
import { isInInterval, getTimeInSeconds, randomColor } from '../helpers'
import Annotation from './Annotation'

export default class RegionHandler {
  wavesurfer: any

  constructor(wavesurfer) {
    this.wavesurfer = wavesurfer
    this.getOverlatedRegions = this.getOverlatedRegions.bind(this)
    this.regionIsInNoneSpace = this.regionIsInNoneSpace.bind(this)
    this.regionIsOverlaps = this.regionIsOverlaps.bind(this)
    this.regionIsOverlapsStartToEnd = this.regionIsOverlapsStartToEnd.bind(this)
    this.regionIsOverlapsEndToStart = this.regionIsOverlapsEndToStart.bind(this)
    this.deleteRegion = this.deleteRegion.bind(this)
    this.regionAInB = this.regionAInB.bind(this)
    this.getAdjacentRegionPoints = this.getAdjacentRegionPoints.bind(this)
  }

  static configureRegion(regionFromAPI): any {
    // method to load region since api
    const [start, end] = getTimeInSeconds(regionFromAPI.interval)

    return {
      id: regionFromAPI.id,
      start,
      end,
      data: {
        text: regionFromAPI.text
      },
      color: randomColor(0.5),
      resize: true,
      drag: true
    }
  }

  static addAnnotation(region): void {
    // eslint-disable-next-line no-param-reassign
    region.data.annotation = new Annotation(region)
  }

  getOverlatedRegions(region): any {
    const regions = this.wavesurfer.regions.list
    const regionsOverlated: any = []
    const otherRegions = Object.keys(regions).filter((id) => region.id !== id)

    otherRegions.forEach((id) => {
      const isOverlaps = this.regionIsOverlaps(region, regions[id])

      if (isOverlaps !== 0) {
        regionsOverlated.push({
          region: regions[id],
          overlaps: isOverlaps
        })
      }
    })

    return regionsOverlated
  }

  regionIsInNoneSpace(region): boolean {
    const adjacentRegionPoints = this.getAdjacentRegionPoints()

    if (adjacentRegionPoints.length > 0) {
      for (let i = 0; i < adjacentRegionPoints.length; i++) {
        if (isInInterval(adjacentRegionPoints[i], [region.start, region.end])) {
          return true
        }
      }
    }

    return false
  }

  getAdjacentRegionPoints(): any {
    const regions = Object.values(this.wavesurfer.regions.list)
    const adjacentRegionPoints: any = []

    regions.forEach((reg: any) => {
      regions
        .filter((r: any) => reg.id !== r.id)
        .forEach((r: any) => {
          if (r.start === reg.end) {
            adjacentRegionPoints.push(r.start)
          } else if (r.end === reg.start) {
            adjacentRegionPoints.push(r.end)
          }
        })
    })

    return adjacentRegionPoints
  }

  deleteRegion(regionID): void {
    if (regionID && this.wavesurfer.regions.list[regionID]) {
      this.wavesurfer.regions.list[regionID].remove()
    }
  }

  regionIsOverlapsStartToEnd(regionA, regionB): any {
    const bInterval: any = [regionB.start, regionB.end]

    return isInInterval(regionA.start, bInterval)
  }

  regionIsOverlapsEndToStart(regionA, regionB): any {
    const bInterval: any = [regionB.start, regionB.end]

    return isInInterval(regionA.end, bInterval)
  }

  regionAInB(regionA, regionB): any {
    const bInterval: any = [regionB.start, regionB.end]

    return (
      isInInterval(regionA.start, bInterval) &&
      isInInterval(regionA.end, bInterval)
    )
  }

  regionIsOverlaps(regionA, regionB): any {
    if (
      this.regionAInB(regionA, regionB) ||
      this.regionAInB(regionB, regionA)
    ) {
      return 2
    } else if (this.regionIsOverlapsStartToEnd(regionA, regionB)) {
      return 1
    } else if (this.regionIsOverlapsEndToStart(regionA, regionB)) {
      return -1
    }

    return 0
  }
}

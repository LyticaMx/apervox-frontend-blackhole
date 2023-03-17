// import moment from 'moment'

export default class Annotation {
  region: any
  text: string
  interval?: string

  constructor (region: any) {
    this.region = region
    this.text = ''

    if (region.data?.text) {
      this.text = region.data.text
      // eslint-disable-next-line no-param-reassign
      delete region.data.text
    }

    this.updateInterval = this.updateInterval.bind(this)
    this.fillWithZero = this.fillWithZero.bind(this)
    this.getTimeWithFormat = this.getTimeWithFormat.bind(this)
    this.updateInterval()
  }

  fillWithZero (number: number): number | string {
    if (number < 10) return `0${number}`

    return number
  }

  getTimeWithFormat (timeInSeconds: number): string {
    // let duration = moment.duration(d, 'seconds')
    // let time = [duration.hours(), duration.minutes(), duration.seconds()]

    // return time.map(this.fillWithZero).join(':')

    return `${timeInSeconds}`
  }

  updateInterval (): void {
    const { start, end } = this.region

    this.interval = `${this.getTimeWithFormat(start)}-${this.getTimeWithFormat(
      end
    )}`
  }
}

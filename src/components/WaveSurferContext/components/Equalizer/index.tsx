/* eslint-disable @typescript-eslint/no-unused-vars */
import useWavesurferContext from 'components/WaveSurferContext/hooks/useWavesurferContext'
import { ReactElement, useEffect, useMemo, useRef, useState } from 'react'
import { useElementSize } from 'usehooks-ts'
import './styles.css'

const format = function (string: string, ...args: any): any {
  return string.replace(/{(\d+)}/g, function (match, number) {
    return typeof args[number] !== 'undefined' ? args[number] : match
  })
}

const EqualizerControl = (): ReactElement => {
  const { controls } = useWavesurferContext()
  const [defaultFilters, setDefaultFilters] = useState<any>(
    controls?.filters ?? []
  )
  const [$container, { width, height }] = useElementSize()

  const [ranges, setRanges] = useState<number[]>([])
  const [points, setPoints] = useState<number[]>([])

  const sliderHeight = height
  const sliderWidth = useMemo<number>(() => {
    return width / defaultFilters.length
  }, [width, defaultFilters])

  const $svgLine = document.querySelector('svg .line')
  const $svgLineShadow = document.querySelector('svg .line-shadow')
  const sliderThumbSize = 10

  const updateSliders = (): void => {
    const sliders = document.querySelectorAll('.range-slider')

    sliders.forEach((item) => {
      const $thumb: any = item.querySelector('.range-slider__thumb')
      const $bar: any = item.querySelector('.range-slider__bar')
      const value = item.querySelector('input')?.value

      const pct = ((Number(value) - sliderThumbSize / 2 + 40) * 100) / 80

      $thumb.style.bottom = `${pct}%`
      $bar.style.height = `calc(${pct}% + ${sliderThumbSize / 2}px)`
    })
  }

  const updatePoints = (): void => {
    const pointsY = ranges.map((range) => {
      const pc = ((Number(range) + 40) * 100) / 80

      return sliderHeight - (sliderHeight * pc) / 100
    })

    setPoints(pointsY)
  }

  const getInterpolatedLine = (): any => {
    let counter = 0
    const text = points
      .map((_, index) => {
        return `${index === 0 ? 'M' : 'L'} {${counter++}}, {${counter++}}`
      })
      .join(' ')

    const coords = points
      .map((point, index) => {
        const xpixels = index * sliderWidth + sliderWidth / 2

        return [xpixels, point]
      })
      .reduce((pv, cv) => [...pv, ...cv], [])

    return format(text, ...coords)
  }
  const getInterpolatedShadow = (): any => {
    let counter = 0
    const text = points
      .map((_, index) => {
        return `${index === 0 ? 'M' : 'L'} {${counter++}}, {${counter++}}`
      })
      .join(' ')

    const forma = `${text} L {${counter++}} {${counter++}} L {${counter++}} {${counter++}} L {${counter++}} {${counter++}}`

    const coords = points
      .map((point, index) => {
        const xpixels = index * sliderWidth + sliderWidth / 2

        return [xpixels, point]
      })
      .reduce((pv, cv) => [...pv, ...cv], [])

    const lastX = (points.length - 1) * sliderWidth + sliderWidth / 2
    const coordsForma = [
      ...coords,
      [lastX, sliderHeight],
      [sliderWidth / 2, sliderHeight],
      [sliderWidth / 2, points[0]]
    ]
    return format(forma, ...coordsForma)
  }

  useEffect(() => {
    setDefaultFilters(controls?.filters ?? [])
  }, [controls?.filters])

  useEffect(() => {
    setRanges(defaultFilters.map((item) => item.gain.value))
    updateSliders()
  }, [defaultFilters])

  useEffect(() => {
    updatePoints()
  }, [ranges])

  useEffect(() => {
    $svgLine?.setAttribute('d', getInterpolatedLine())
    $svgLineShadow?.setAttribute('d', getInterpolatedShadow())
  }, [points])

  const handleChange = (frequency: string, newValue: number): void => {
    const newFilters = controls?.filters.map((filter) => {
      const modifiedFilter = filter
      if (filter.frequency.value === +frequency) {
        modifiedFilter.gain.value = newValue
      }

      return modifiedFilter
    })

    setDefaultFilters(newFilters)
    controls?.setFilters(newFilters ?? [])
  }

  const getLabel = (filter): string =>
    filter.frequency.value >= 1000
      ? `${Math.floor(filter.frequency.value / 1000)}k`
      : filter.frequency.value

  return (
    <div className="pb-5 text-sm">
      <div className="sliders" ref={$container}>
        <svg>
          <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop
                offset="0%"
                style={{ stopColor: '#6366f1', stopOpacity: 0.3 }}
              />
              <stop
                offset="100%"
                style={{ stopColor: 'transparent', stopOpacity: 1 }}
              />
            </linearGradient>
          </defs>

          <path d="" className="line"></path>
          <path d="" className="line-shadow" fill="url('#grad1')"></path>
        </svg>

        {defaultFilters.map((item, index) => (
          <div className="range-slider" key={index} data-label={getLabel(item)}>
            <input
              type="range"
              className="orient-vertical"
              min={-40}
              max={40}
              step={4}
              data-slider-index={index}
              value={item.gain.value}
              onChange={(e: any) =>
                handleChange(item.frequency.value, e.target.value)
              }
            />
            <div className="range-slider__bar"></div>
            <div className="range-slider__thumb"></div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default EqualizerControl

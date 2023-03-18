import Grid from 'components/Grid'
import Label from 'components/Label'
import { ChangeEvent, ReactElement, useState } from 'react'
import { useIntl } from 'react-intl'
import { imageFiltersMessages } from '../messages'

import './styles.css'

export interface ImageFiltersState {
  hue: number
  contrast: number
  brightness: number
  grayScale: number
}

interface Props {
  applyCallback: (newImageFilters: ImageFiltersState) => void
}

const ImageFilters = (props: Props): ReactElement => {
  const { applyCallback } = props
  const [imageFilters, setImageFilters] = useState<ImageFiltersState>({
    hue: 210,
    contrast: 100,
    brightness: 100,
    grayScale: 0
  })
  const { formatMessage } = useIntl()

  const handleFilterChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target

    const newFilters = Object.assign({}, imageFilters)

    switch (name) {
      case 'contrast':
        newFilters.contrast = +value
        break
      case 'hue':
        newFilters.hue = +value
        break
      case 'brightness':
        newFilters.brightness = +value
        break
      case 'grayScale':
        newFilters.grayScale = +value
        break
      default:
        break
    }

    applyCallback(newFilters)
    setImageFilters(newFilters)
  }

  return (
    <Grid spacing={2}>
      <Grid item xs={12} md={6} className="flex items-center">
        <Label id="contrast" labelClassname="mb-0 text-white">
          {formatMessage(imageFiltersMessages.contrast)}
        </Label>
        <input
          type="range"
          min="0"
          max="200"
          step="1"
          defaultValue="100"
          name="contrast"
          className="monocolor-slider ml-auto"
          value={imageFilters.contrast}
          onChange={handleFilterChange}
        />
        <span className="w-7 ml-1">
          {(imageFilters.contrast / 100 - 1).toFixed(1)}
        </span>
      </Grid>
      <Grid item xs={12} md={6} className="flex items-center">
        <Label id="contrast" labelClassname="mb-0 text-white">
          {formatMessage(imageFiltersMessages.hue)}
        </Label>
        <input
          type="range"
          min="120"
          max="300"
          step="1"
          defaultValue="210"
          name="hue"
          className="hue-slider ml-auto"
          value={imageFilters.hue}
          onChange={handleFilterChange}
        />
        <span className="w-7 ml-1">
          {imageFilters.hue === 0
            ? ''
            : ((imageFilters.hue - 210) / 90).toFixed(1)}
        </span>
      </Grid>
      <Grid item xs={12} md={6} className="flex items-center">
        <Label id="brightness" labelClassname="mb-0 text-white">
          {formatMessage(imageFiltersMessages.brightness)}
        </Label>
        <input
          type="range"
          min="0"
          max="200"
          step="1"
          defaultValue="200"
          name="brightness"
          value={imageFilters.brightness}
          onChange={handleFilterChange}
          className="monocolor-slider ml-auto"
        />
        <span className="w-7 ml-1">
          {(imageFilters.brightness / 100 - 1).toFixed(1)}
        </span>
      </Grid>
      <Grid item xs={12} md={6} className="flex items-center">
        <Label id="color" labelClassname="mb-0 text-white">
          {formatMessage(imageFiltersMessages.grayScale)}
        </Label>
        <input
          type="range"
          min="0"
          max="100"
          step="1"
          defaultValue="100"
          name="grayScale"
          value={imageFilters.grayScale}
          onChange={handleFilterChange}
          className="color-slider ml-auto"
        />
        <span className="w-7 ml-1">
          {(1 - imageFilters.grayScale / 100).toFixed(1)}
        </span>
      </Grid>
    </Grid>
  )
}

export default ImageFilters

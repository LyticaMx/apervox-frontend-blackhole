import {
  ArrowPathIcon,
  MagnifyingGlassPlusIcon
} from '@heroicons/react/24/outline'
import { MagnifyingGlassMinusIcon } from '@heroicons/react/24/solid'
import IconButton from 'components/Button/IconButton'
import Switch from 'components/Form/Switch'
import Grid from 'components/Grid'
import Label from 'components/Label'
import { ChangeEvent, ReactElement, useRef, useState } from 'react'
import { useIntl } from 'react-intl'
import { messages } from './messages'

import './styles.css'

interface ImageTransformations {
  rotate: number
  scale: number
}

interface ImageFilters {
  isInverted: boolean
  hue: number
  contrast: number
  brightness: number
  grayScale: number
}

interface Props {
  imageUrl: string
}

const ImageEditor = (props: Props): ReactElement => {
  const { imageUrl } = props
  const [imageFilters, setImageFilters] = useState<ImageFilters>({
    isInverted: false,
    hue: 210,
    contrast: 100,
    brightness: 100,
    grayScale: 0
  })
  const [imageTransformations, setImageTransformations] =
    useState<ImageTransformations>({
      rotate: 0,
      scale: 1
    })
  const imageDisplayRef = useRef<HTMLDivElement>(null)
  const imageEvidenceRef = useRef<HTMLImageElement>(null)
  const { formatMessage } = useIntl()

  const applyFilters = (newFilters: ImageFilters): void => {
    if (!imageEvidenceRef.current) return
    const filters: string[] = []

    for (const key in newFilters) {
      switch (key) {
        case 'isInverted':
          filters.push(`invert(${newFilters[key] ? 1 : 0})`)
          break
        case 'hue': {
          const hue = newFilters[key]
          if (hue >= 210 && hue <= 214) filters.push('hue-rotate(0deg)')
          else filters.push(`hue-rotate(${-1 * newFilters[key]}deg)`)
          break
        }
        default:
          filters.push(`${key}(${newFilters[key]}%)`)
          break
      }
    }

    imageEvidenceRef.current.style.filter = filters.join(' ').toLowerCase()
  }

  const applyTransformations = (
    newTransformations: ImageTransformations
  ): void => {
    if (!imageEvidenceRef.current) return
    const transforms: string[] = []

    for (const key in newTransformations) {
      if (key === 'rotate') {
        transforms.push(`${key}(${newTransformations[key]}deg)`)
      } else {
        transforms.push(`${key}(${newTransformations[key]})`)
      }
    }

    imageEvidenceRef.current.style.transform = transforms.join(' ')
  }

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

    applyFilters(newFilters)
    setImageFilters(newFilters)
  }

  const handleTransformationChange = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    const { name, value } = event.target

    const newTransformations = Object.assign({}, imageTransformations)

    switch (name) {
      case 'scale':
        newTransformations.scale = +value
        break
      case 'rotate': {
        const newRotation = parseInt(value)
        if (isNaN(newRotation)) return
        newTransformations.rotate = newRotation
        break
      }
      default:
        break
    }

    applyTransformations(newTransformations)
    setImageTransformations(newTransformations)
  }

  const handleZoomIn = (): void => {
    let { scale } = imageTransformations
    if (scale < 8) {
      scale += 0.25
      const newTransformations = Object.assign({}, imageTransformations, {
        scale
      })
      applyTransformations(newTransformations)
      setImageTransformations(newTransformations)
    }
  }

  const handleZoomOut = (): void => {
    let { scale } = imageTransformations
    if (scale > 0.5) {
      scale -= 0.25
      const newTransformations = Object.assign({}, imageTransformations, {
        scale
      })
      applyTransformations(newTransformations)
      setImageTransformations(newTransformations)
    }
  }

  const toggleInverted = (isInverted: boolean): void => {
    const newFilters = Object.assign({}, imageFilters, { isInverted })
    applyFilters(newFilters)
    setImageFilters(newFilters)
  }

  const changeRotation = (): void => {
    const newTransformations = Object.assign({}, imageTransformations, {
      rotate: (imageTransformations.rotate + 90) % 360
    })
    applyTransformations(newTransformations)
    setImageTransformations(newTransformations)
  }

  return (
    <div className="rounded-b-md overflow-hidden">
      <div className="image-container overflow-auto flex justify-center">
        <div className="image-display" ref={imageDisplayRef}>
          <img
            className="image-evidence"
            src={imageUrl}
            alt="Evidence Img"
            ref={imageEvidenceRef}
          />
        </div>
      </div>
      <div className="image-controls bg-secondary text-white px-12 py-4">
        <div className="flex justify-between">
          <div id="zoom-slider" className="flex items-center">
            <IconButton
              onClick={handleZoomOut}
              className="hover:enabled:bg-secondary-700"
            >
              <MagnifyingGlassMinusIcon className="h-5 w-5 text-white" />
            </IconButton>
            <input
              type="range"
              min=".5"
              max="8"
              step=".1"
              value={imageTransformations.scale}
              name="scale"
              onChange={handleTransformationChange}
              className="height-slider"
              defaultValue="1"
            />
            <IconButton
              onClick={handleZoomIn}
              className="hover:enabled:bg-secondary-700"
            >
              <MagnifyingGlassPlusIcon className="w-5 h-5 text-white" />
            </IconButton>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center">
              <IconButton
                className="hover:enabled:bg-secondary-700"
                onClick={changeRotation}
              >
                <ArrowPathIcon className="w-5 h-5 text-white" />
              </IconButton>
              <input
                className="bg-transparent border-none border-b border-b-white p-0 text-sm w-14 text-right pr-1 outline-primary"
                type="text"
                name="rotate"
                value={imageTransformations.rotate}
                onChange={handleTransformationChange}
              />
              <span>°</span>
            </div>
            <div className="flex gap-2 items-center">
              <Switch
                value={imageFilters.isInverted}
                size="sm"
                color="primary"
                onChange={toggleInverted}
              />
              <Label id="isInverted" labelClassname="mb-0 text-white">
                {formatMessage(messages.negativeEffect)}
              </Label>
            </div>
          </div>
        </div>
        <Grid spacing={2}>
          <Grid item xs={12} md={6} className="flex items-center">
            <Label id="contrast" labelClassname="mb-0 text-white">
              {formatMessage(messages.contrast)}
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
              {formatMessage(messages.hue)}
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
              {formatMessage(messages.brightness)}
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
              {formatMessage(messages.grayScale)}
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
      </div>
    </div>
  )
}

export default ImageEditor

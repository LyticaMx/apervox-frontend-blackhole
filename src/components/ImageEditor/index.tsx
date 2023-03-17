import {
  ArrowPathIcon,
  MagnifyingGlassPlusIcon
} from '@heroicons/react/24/outline'
import { MagnifyingGlassMinusIcon } from '@heroicons/react/24/solid'
import IconButton from 'components/Button/IconButton'
import Switch from 'components/Form/Switch'
import Label from 'components/Label'
import { ChangeEvent, ReactElement, useRef, useState } from 'react'
import { useIntl } from 'react-intl'
import ImageFilters, { ImageFiltersState } from './ImageFilters'
import { messages } from './messages'

import './styles.css'

interface ImageTransformations {
  rotate: number
  scale: number
}

interface Props {
  imageUrl: string
}

const ImageEditor = (props: Props): ReactElement => {
  const { imageUrl } = props
  const [isInverted, setIsInverted] = useState<boolean>(false)
  const [imageTransformations, setImageTransformations] =
    useState<ImageTransformations>({
      rotate: 0,
      scale: 1
    })
  const imageDisplayRef = useRef<HTMLDivElement>(null)
  const imageEvidenceRef = useRef<HTMLImageElement>(null)
  const { formatMessage } = useIntl()

  const applyFilters = (newFilters: ImageFiltersState): void => {
    if (!imageEvidenceRef.current) return
    const filters: string[] = [`invert(${isInverted ? 1 : 0})`]

    for (const key in newFilters) {
      switch (key) {
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
    if (!imageEvidenceRef.current) return
    const actualFilters = imageEvidenceRef.current.style.filter // se obtienen filtros actuales
    const newFilters = actualFilters
      .split(' ') // separamos la cadena por espacios
      .filter((filter) => !filter.includes('invert')) // quitamos aquel que sea de invert
    newFilters.push(`invert(${isInverted ? 1 : 0})`) // agregamos el invert nuevo
    imageEvidenceRef.current.style.filter = newFilters.join(' ') // asignamos la cadena
    setIsInverted(isInverted) // actualizamos el estado
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
                value={isInverted}
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
        <ImageFilters applyCallback={applyFilters} />
      </div>
    </div>
  )
}

export default ImageEditor

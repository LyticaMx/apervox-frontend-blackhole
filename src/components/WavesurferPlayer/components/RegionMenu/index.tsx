import { ReactElement, useEffect, useRef, useState } from 'react'
import AnnotationInput from '../AnnotationInput'
import { useIntl } from 'react-intl'
import { messages } from './messages'

import IconButton from 'components/Button/IconButton'
import Grid from 'components/Grid'
import { BookmarkIcon, ChevronLeftIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'

interface Props {
  coords: any
  region: any
  onClose: () => void
  onDeleteRegion: (id: any) => void
  onPlayRegionLoop: (region: any) => void
}

const RegionMenu = (props: Props): ReactElement => {
  const { coords, region, onClose, onDeleteRegion, onPlayRegionLoop } = props
  const [inputOpen, setInputOpen] = useState(false)
  const [inputValue, setInputValue] = useState(
    region.data.annotation.text || ''
  )
  const [fieldName, setFieldName] = useState('')
  const containerRef = useRef<any>(null)

  const { formatMessage } = useIntl()
  // const classes = useStyles({ coords, inputOpen })

  const handleClickOutside = ({ target }): void => {
    if (containerRef.current && !containerRef.current.contains(target)) {
      onClose()
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside)

    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])

  const toggleInputOpen = (fieldName = ''): void => {
    const annotationValue = region.data.annotation[fieldName] || ''

    setInputOpen(!inputOpen)
    setFieldName(fieldName)
    setInputValue(annotationValue)
  }

  const saveAnnotation = (): void => {
    const { annotation } = region.data

    annotation[fieldName] = inputValue
    toggleInputOpen()
    onClose()
  }

  const handleChange = (e): void => {
    setInputValue(e.target.value)
  }

  const handleKeyPress = ({ key }): void => {
    if (key === 'Enter') saveAnnotation()
  }

  const handleDeleteRegion = (): void => {
    onClose()
    onDeleteRegion(region.id)
  }

  const handlePlayRegionLoop = (): void => {
    onPlayRegionLoop(region)
  }

  return (
    <div
      className="fixed"
      style={{
        left: coords[0],
        top: coords[1]
      }}
      ref={containerRef}
    >
      {inputOpen && (
        <div>
          <div className="flex items-center justify-between max-w-[13.5rem] p-1">
            <IconButton onClick={() => toggleInputOpen}>
              <ChevronLeftIcon />
            </IconButton>
            <AnnotationInput
              value={inputValue}
              onChange={handleChange}
              onKeyPress={handleKeyPress}
              placeholder={fieldName === 'text' ? 'nombre etiqueta' : 'sujeto'}
            />
            <IconButton onClick={saveAnnotation}>
              <BookmarkIcon />
            </IconButton>
          </div>
        </div>
      )}
      <div className={clsx({ block: inputOpen, hidden: !inputOpen })}>
        <Grid>
          <Grid item xs={12} className="w-100% text-center">
            <button onClick={() => toggleInputOpen('text')}>
              {region.data.annotation.text
                ? formatMessage(messages.editTag)
                : formatMessage(messages.createTag)}
            </button>
          </Grid>
          <Grid item xs={12} className="w-100% text-center">
            <button onClick={handleDeleteRegion}>
              {region.data.annotation.text
                ? formatMessage(messages.removeTag)
                : formatMessage(messages.removeLoop)}
            </button>
          </Grid>
          <Grid item xs={12} className="w-100% text-center">
            <button onClick={handlePlayRegionLoop}>
              {formatMessage(messages.playLoop)}
            </button>
          </Grid>
          <Grid item xs={12} className="w-100% text-center">
            <label>{region.data.annotation.interval}</label>
          </Grid>
        </Grid>
      </div>
    </div>
  )
}

export default RegionMenu

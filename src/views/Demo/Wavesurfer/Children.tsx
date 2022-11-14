import { ReactElement } from 'react'

import { Region } from 'components/Wavesurfer'

interface PropsChild {
  regionSelected?: Region
  handleCreateRegion?: (region: Region) => void
  handleUpdateRegion?: (region: Region) => void
  handleDeleteRegion?: (region: Region) => void
  onAction?: () => void
}

const ChildrenWave = ({
  handleCreateRegion,
  handleUpdateRegion,
  handleDeleteRegion,
  regionSelected,
  onAction
}: PropsChild): ReactElement => {
  return (
    <div>
      <button
        className="p-1 bg-blue-200 border-r-2"
        onClick={() => {
          if (handleCreateRegion) {
            handleCreateRegion({
              start: 12,
              end: 16,
              id: 'some',
              partialEnd: 12,
              partialStart: 16,
              color: process.env.REACT_APP_WAVESURFER_REGION_COLOR as string
            })
          }
          if (onAction) {
            onAction()
          }
        }}
      >
        Create Region
      </button>
      {regionSelected && (
        <button
          className="p-1 bg-green-200 border-r-2"
          onClick={() => {
            if (handleUpdateRegion) {
              handleUpdateRegion({
                ...regionSelected,
                start: 30,
                end: 40,
                color: '#f0faf1'
              })
            }
            if (onAction) {
              onAction()
            }
          }}
        >
          Update Region
        </button>
      )}
      {regionSelected && (
        <button
          className="p-1 bg-red-300 border-r-2"
          onClick={() => {
            if (handleDeleteRegion) {
              handleDeleteRegion(regionSelected)
            }
            if (onAction) {
              onAction()
            }
          }}
        >
          Delete Region
        </button>
      )}
    </div>
  )
}

export default ChildrenWave

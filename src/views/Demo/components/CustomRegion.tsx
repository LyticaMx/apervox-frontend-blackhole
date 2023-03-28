import { Cog6ToothIcon } from '@heroicons/react/24/outline'
import asRegion from 'components/WaveSurferContext/hoc/asRegion'
import { RegionContentProps } from 'components/WaveSurferContext/types'
import { ReactElement, useEffect } from 'react'

interface Props extends RegionContentProps {}

const CustomRegion = (props: Props): ReactElement => {
  useEffect(() => {
    // console.log(props)
  }, [])

  return (
    <div className="w-full h-full">
      <button>
        <Cog6ToothIcon className="w-6 h-6" />
      </button>
    </div>
  )
}

export default asRegion(CustomRegion)

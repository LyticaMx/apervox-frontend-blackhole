import { ReactElement } from 'react'

import PinSection from './components/PinSection'
import ChunkSection from './components/ChunkSection'
import Divider from 'components/Divider'

const Pins = (): ReactElement => {
  return (
    <div>
      <div className="mt-10">
        <ChunkSection />
      </div>
      <div className="my-5">
        <Divider title={'PINs'} />
      </div>
      <div className="mt-10">
        <PinSection />
      </div>
    </div>
  )
}

export default Pins

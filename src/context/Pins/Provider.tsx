/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useMemo, ReactNode, ReactElement } from 'react'
import useApi from 'hooks/useApi'
import { PinsContext, initialState } from './context'
import { Pin, Chunk } from 'types/pin'

interface Props {
  children: ReactNode
}

const PinsProvider = ({ children }: Props): ReactElement => {
  const [listOfPins, setListOfPins] = useState<Pin[]>(initialState.listOfPins)
  const [listOfChunks, setListOfChunks] = useState<Chunk[]>(
    initialState.listOfChunks
  )

  const getPinsService = useApi({
    endpoint: 'pins',
    method: 'get'
  })

  const getPinChunksService = useApi({
    endpoint: 'chunks',
    method: 'get'
  })

  /* GET */

  const getPins = async (): Promise<boolean> => {
    const responseDataPin = await getPinsService()

    console.log('responseDataLogin', responseDataPin)

    return true
  }

  const getChunks = async (): Promise<boolean> => {
    const responseDataPinChunk = await getPinChunksService()

    console.log('responseDataPinChunk', responseDataPinChunk)

    return true
  }

  const contextValue = useMemo(
    () => ({
      listOfPins,
      listOfChunks,
      actions: {
        getPins,
        getChunks
      }
    }),
    [listOfPins, listOfChunks]
  )

  return (
    <PinsContext.Provider value={contextValue}>{children}</PinsContext.Provider>
  )
}

export { PinsProvider }

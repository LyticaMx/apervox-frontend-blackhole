import { useState, useMemo, ReactNode, ReactElement } from 'react'
import useApi, { useService } from 'hooks/useApi'
import { PinsContext, initialState } from './context'
import { Pin, Chunk } from 'types/pin'
import { ResponseData } from 'types/api'

interface Props {
  children: ReactNode
}

const PinsProvider = ({ children }: Props): ReactElement => {
  const [listOfPins, setListOfPins] = useState<Pin[]>(initialState.listOfPins)
  const [listOfChunks, setListOfChunks] = useState<Chunk[]>(
    initialState.listOfChunks
  )

  const chunksService = useService('chunks')

  const getPinsService = useApi({
    endpoint: 'pins',
    method: 'get'
  })

  const assignPinService = useApi({
    endpoint: 'speaker',
    method: 'put'
  })

  const getPins = async (filters): Promise<ResponseData> => {
    try {
      const res: any = await getPinsService({ urlParams: filters })

      setListOfPins(res.data)
      return res
    } catch (error) {
      return false as any
    }
  }

  const getChunks = async (filters): Promise<ResponseData> => {
    try {
      const res: any = await chunksService.get({ urlParams: filters })
      setListOfChunks(res.data)

      return res
    } catch (error) {
      return false as any
    }
  }

  const createChunk = async (): Promise<boolean> => {
    try {
      const res: any = await chunksService.post()

      if (!res.error) {
        return true
      }
      return false
    } catch (error) {
      return false
    }
  }

  const linkPin = async (pin: string, speaker: string): Promise<boolean> => {
    try {
      const res: any = await assignPinService({
        queryString: speaker,
        body: { pin_id: pin }
      })

      if (res.data) {
        return true
      }

      return false
    } catch (error) {
      return false
    }
  }

  const deactivatePin = async (speaker: string): Promise<boolean> => {
    try {
      const res: any = await assignPinService({
        queryString: speaker,
        body: { is_active: false }
      })

      if (res.data) {
        return true
      }
      return false
    } catch (error) {
      return false
    }
  }

  const contextValue = useMemo(
    () => ({
      listOfPins,
      listOfChunks,
      actions: {
        getPins,
        getChunks,
        createChunk,
        linkPin,
        deactivatePin
      }
    }),
    [listOfPins, listOfChunks]
  )

  return (
    <PinsContext.Provider value={contextValue}>{children}</PinsContext.Provider>
  )
}

export { PinsProvider }

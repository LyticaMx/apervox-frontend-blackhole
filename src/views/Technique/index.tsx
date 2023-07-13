import { ReactElement, useEffect } from 'react'

import TechniqueList from './components/TechniqueList'
import FormSection from './components/FormSection'
import TechniqueInfo from './components/TechinqueInfo'

import Header from './components/Header'
import { useTechnique } from 'context/Technique'
import { useHistory } from 'react-router-dom'
import { pathRoute } from 'router/routes'

const Techniques = (): ReactElement => {
  const { techniqueId, actions: techniqueActions } = useTechnique()
  const history = useHistory()

  const getTechniqueInfo = async (): Promise<void> => {
    const exist = await techniqueActions?.get()

    if (!exist) history.replace(pathRoute.techniques)
  }

  useEffect(() => {
    getTechniqueInfo()
  }, [techniqueId])

  return (
    <div className="absolute inset-0 p-4 flex flex-col">
      <Header />

      <div className="flex flex-1 overflow-hidden mt-4">
        <div className="px-3 py-4 w-[200px] bg-neutral-200 bg-opacity-60 rounded-md">
          <TechniqueList />
        </div>
        <div className="p-4 flex-grow w-0">
          <FormSection />
        </div>
        <div className="px-3 py-4 w-[325px] bg-neutral-200 bg-opacity-60 rounded-md overflow-y-auto">
          <TechniqueInfo />
        </div>
      </div>
    </div>
  )
}

export default Techniques

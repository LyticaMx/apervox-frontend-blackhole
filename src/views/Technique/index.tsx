/* eslint-disable @typescript-eslint/no-unused-vars */
import { ReactElement } from 'react'

import TechniqueList from './components/TechniqueList'
import FormSection from './components/FormSection'
import TechniqueInfo from './components/TechinqueInfo'

import Header from './components/Header'

const Techniques = (): ReactElement => {
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
        <div className="px-3 py-4 w-[300px] bg-neutral-200 bg-opacity-60 rounded-md">
          <TechniqueInfo />
        </div>
      </div>
    </div>
  )
}

export default Techniques
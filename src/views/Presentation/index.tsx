import { ReactElement, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Images } from 'assets/Images'
import { Welcome } from 'assets/SVG'

const Presentation = (): ReactElement => {
  const history = useHistory()

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      history.replace('/login')
    }, 4000)

    return () => {
      clearTimeout(timeoutId)
    }
  })

  return (
    <div className="bg-blackhole w-screen h-screen bg-no-repeat bg-center bg-cover overflow-hidden relative">
      <img
        src={Images.Producto}
        alt="Producto"
        className="w-11/12 md:w-1/2 min-w-[12rem] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-fadeIn"
      />
      <Welcome className="w-11/12 md:w-1/2 min-w-[12rem] absolute top-1/2 -translate-y-1/2 md:right-0 animate-fadeIn animation-delay-[2s]" />
    </div>
  )
}

export default Presentation

import { ReactElement, useEffect, useRef } from 'react'
import { secondsToString } from 'utils/timeToString'

interface Props {
  time: number
  onFinish: () => void
  thickness?: 'sm' | 'md' | 'l'
  fullTime?: boolean
}

const CLOCK_SIZE = 70
const CLOCK_THICKNESS = {
  sm: 2,
  md: 4,
  l: 8
}
const CANVAS_SPACING = 4

const CountdownRing = (props: Props): ReactElement => {
  const { time, thickness = 'l', fullTime = true, onFinish } = props
  const timeRef = useRef<number>(time)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const contextRef = useRef<CanvasRenderingContext2D | null>(null)

  const countdown = (): void => {
    if (!contextRef.current || !canvasRef.current) return
    // De aqui para abajo es una funcion a parte
    const actualSize = CLOCK_SIZE + CLOCK_THICKNESS[thickness] + CANVAS_SPACING
    const x = CLOCK_SIZE * 0.5 + CLOCK_THICKNESS[thickness] * 0.5
    const y = CLOCK_SIZE * 0.5 + 2
    const minutePercent = !fullTime ? (timeRef.current % 60) / 60 : 0
    const degress = fullTime
      ? (timeRef.current / time) * 360.0
      : (minutePercent > 0 || timeRef.current === 0 ? minutePercent : 1) * 360.0
    const endAngle = degress * (Math.PI / 180)
    contextRef.current.save()
    contextRef.current.translate(x, y)
    contextRef.current.clearRect(
      actualSize * -0.5,
      actualSize * -0.5,
      actualSize,
      actualSize
    )

    // Primer circulo
    contextRef.current.strokeStyle = 'rgba(128,128,128,0.2)'
    contextRef.current.beginPath()
    contextRef.current.arc(
      0,
      2, // CANVAS_SPACING / 2,
      CLOCK_SIZE / 2,
      0,
      2 * Math.PI,
      true
    )
    contextRef.current.lineWidth = CLOCK_THICKNESS[thickness]
    contextRef.current.stroke()

    // Segundo circulo
    contextRef.current.strokeStyle = 'rgb(70, 70, 253, 0.9)'
    contextRef.current.beginPath()
    contextRef.current.arc(
      0,
      2, // CANVAS_SPACING / 2,
      CLOCK_SIZE / 2,
      -Math.PI / 2,
      endAngle - Math.PI / 2,
      false
    )
    contextRef.current.lineWidth = CLOCK_THICKNESS[thickness]
    contextRef.current.stroke()

    // Etiqueta
    contextRef.current.fillStyle = '#ffffff'
    contextRef.current.font = '12px Barlow'
    contextRef.current.fillText('min', 0, 22)
    contextRef.current.fillText('min', 0, 22)
    contextRef.current.font = 'bold 18px Barlow'
    contextRef.current.fillText(
      secondsToString(timeRef.current, { withHours: false }),
      0,
      8
    )

    contextRef.current.restore()
  }

  useEffect(() => {
    if (!canvasRef.current) return
    canvasRef.current.setAttribute(
      'width',
      `${CLOCK_SIZE + CLOCK_THICKNESS[thickness] + CANVAS_SPACING}`
    )
    canvasRef.current.setAttribute(
      'height',
      `${CLOCK_SIZE + CLOCK_THICKNESS[thickness] + CANVAS_SPACING}`
    )
    // Obtenemos el contexto
    contextRef.current = canvasRef.current.getContext('2d')
    if (!contextRef.current) return
    contextRef.current.textAlign = 'center'

    timeRef.current = time

    countdown()

    const intervalId = setInterval(() => {
      timeRef.current--
      countdown()
      if (timeRef.current === 0) {
        clearInterval(intervalId)
        onFinish()
      }
    }, 1000)

    return () => {
      clearInterval(intervalId)
    }
  }, [time])

  return <canvas ref={canvasRef} />
}

export default CountdownRing

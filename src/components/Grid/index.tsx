import clsx from 'clsx'
import { ReactElement, ReactNode, useMemo } from 'react'

type Spacing = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
type Columns = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12

interface Props {
  children?: ReactNode
  item?: boolean
  spacing?: Spacing
  cols?: Columns
  sm?: Columns
  md?: Columns
  lg?: Columns
  xl?: Columns
  className?: string
}

const Grid = ({
  children,
  item,
  spacing = 0,
  cols,
  sm,
  md,
  lg,
  xl,
  className
}: Props): ReactElement => {
  const sizeClass = useMemo(() => {
    return clsx(
      cols && `col-span-${cols}`,
      sm && `sm:col-span-${sm}`,
      md && `md:col-span-${md}`,
      lg && `lg:col-span-${lg}`,
      xl && `xl:col-span-${xl}`
    )
  }, [sm, md, lg, xl, cols])

  const gridClass = useMemo(() => {
    if (item) return ''

    return clsx('container mx-auto w-full grid grid-cols-12', `gap-${spacing}`)
  }, [item, spacing])

  return <div className={clsx(gridClass, sizeClass, className)}>{children}</div>
}

export default Grid

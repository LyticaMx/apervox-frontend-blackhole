import clsx from 'clsx'
import { ElementType, HtmlHTMLAttributes, ReactNode, forwardRef } from 'react'

interface Props {
  children: ReactNode
  className?: string
  style?: object
  selected?: boolean
  props?: ReactNode
  tabAs?: keyof JSX.IntrinsicElements & HtmlHTMLAttributes<HTMLOrSVGElement>
}

const Tab = forwardRef(
  (
    { className = '', selected, style, tabAs = 'button', ...props }: Props,
    ref
  ) => {
    const Tag = tabAs as ElementType

    const buttonSpecialProps = { type: 'button' }

    return (
      <Tag
        {...props}
        className={clsx(
          'btn text indigo shrink-0 sm',
          className,
          selected && 'bg-indigo-100'
        )}
        ref={ref}
        style={style}
        {...(tabAs === 'button' ? buttonSpecialProps : {})}
      >
        {props.children}
      </Tag>
    )
  }
)

Tab.displayName = 'Tab'

export default Tab

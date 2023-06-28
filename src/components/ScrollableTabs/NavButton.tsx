import clsx from 'clsx'
import {
  ElementType,
  HtmlHTMLAttributes,
  ReactNode,
  Ref,
  forwardRef
} from 'react'

interface Props {
  disabled: boolean
  onClick?: () => void
  children: ReactNode
  navBtnStyle?: object
  className?: string
  navBtnContainerClassname?: string
  navBtnAs?: keyof JSX.IntrinsicElements & HtmlHTMLAttributes<HTMLOrSVGElement>
}

const NavButton = forwardRef((props: Props, ref) => {
  const {
    disabled,
    onClick = () => null,
    children,
    navBtnStyle,
    className,
    navBtnContainerClassname,
    navBtnAs
  } = props

  const Tag = navBtnAs as ElementType

  const buttonSpecialProps = {
    disabled,
    type: 'button'
  }

  return (
    <div className={clsx('inline-flex', navBtnContainerClassname)}>
      <Tag
        {...(navBtnAs === 'button' ? buttonSpecialProps : {})}
        className={clsx('disabled:text-neutral-300', className)}
        onClick={onClick}
        style={navBtnStyle}
        dir="ltr"
        aria-hidden="true"
        ref={ref as Ref<HTMLButtonElement>}
      >
        {children}
      </Tag>
    </div>
  )
})

NavButton.displayName = 'NavButton'

export default NavButton

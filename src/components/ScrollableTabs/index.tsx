import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import {
  BaseSyntheticEvent,
  Children,
  MutableRefObject,
  ReactElement,
  ReactNode,
  cloneElement,
  isValidElement,
  useRef
} from 'react'
import NavButton from './NavButton'

interface Props {
  children: ReactNode
  activeTab: number
  onTabClick: (e: BaseSyntheticEvent, id: number) => void
  tabsContainerRef?: MutableRefObject<HTMLDivElement | null>
  tabRef?: MutableRefObject<HTMLDivElement[]>
  tabsUpperContainerClassName?: string
  tabsContainerClassName?: string
  tabsUpperContainerStyle?: object
  tabsContainerStyle?: object
  hideNavButtons?: boolean
  rightButtonIcon?: ReactNode
  leftButtonIcon?: ReactNode
}

const ScrollableTabs = (props: Props): ReactElement => {
  const {
    children,
    activeTab,
    onTabClick,
    tabsUpperContainerClassName,
    tabsContainerClassName,
    tabsUpperContainerStyle,
    tabsContainerStyle,
    tabsContainerRef,
    tabRef,
    hideNavButtons,
    rightButtonIcon = <ChevronRightIcon />,
    leftButtonIcon = <ChevronLeftIcon />
  } = props
  const _tabRef = useRef<HTMLDivElement[]>([])
  const _tabsContainerRef = useRef<HTMLDivElement | null>(null)

  const onNativeTabClick = (e: BaseSyntheticEvent, index: number): void =>
    onTabClick(e, index)

  const getNavBtns = (): {
    start?: ReactElement
    end?: ReactElement
  } | null => {
    if (hideNavButtons) return null
    return {
      start: <NavButton>{rightButtonIcon}</NavButton>,
      end: <NavButton>{leftButtonIcon}</NavButton>
    }
  }

  const conditionalNavBtns = getNavBtns()

  return (
    <div
      className={clsx('tabs__container', tabsUpperContainerClassName)}
      style={tabsUpperContainerStyle}
    >
      {conditionalNavBtns?.start}

      <div
        ref={(ref) => {
          _tabsContainerRef.current = ref
          if (tabsContainerRef) {
            tabsContainerRef.current = ref
          }
        }}
        role="tablist"
        aria-label="tabs"
        // onKeyDown={handleKeyDown}
        // onScroll={handleTabsScroll}
        style={tabsContainerStyle}
        className={clsx('overflow-hidden', tabsContainerClassName)}
      >
        <>
          {Children.map(children, (child, index) => {
            if (!isValidElement(child)) return null
            const selected = index === activeTab
            return cloneElement(child as any, {
              ref: (ref: HTMLDivElement) => {
                _tabRef.current[index] = ref
                if (tabRef) tabRef.current[index] = ref
              },
              onClick: (e: BaseSyntheticEvent) => onNativeTabClick(e, index),
              'data-index': index,
              role: 'tab',
              'aria-selected': selected ? 'true' : 'false',
              tabIndex: selected ? '0' : '-1',
              selected,
              className: clsx('tab btn', child.props.className)
            })
          })}
        </>
      </div>
      {conditionalNavBtns?.end}
    </div>
  )
}

export default ScrollableTabs

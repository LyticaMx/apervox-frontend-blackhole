import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import {
  BaseSyntheticEvent,
  Children,
  HtmlHTMLAttributes,
  MutableRefObject,
  ReactElement,
  ReactNode,
  Ref,
  cloneElement,
  isValidElement,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState
} from 'react'
import NavButton from './NavButton'
import { animate } from './utils/animate'
import { debounce } from './utils/debounce'

interface TabsRects {
  top: number
  right: number
  bottom: number
  left: number
  width: number
  height: number
  x: number
  y: number
  scrollLeft: number
  clientWidth: number
  scrollWidth: number
}

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
  animationDuration?: number
  tabsScrollAmount?: number
  rightNavBtnRef?: Ref<HTMLButtonElement>
  rightButtonIcon?: ReactNode
  rightNavBtnClassName?: string
  leftNavBtnClassName?: string
  leftNavBtnRef?: Ref<HTMLButtonElement>
  leftButtonIcon?: ReactNode
  navBtnStyle?: object
  navBtnClassName?: string
  navBtnContainerClassName?: string
  navBtnAs?: keyof JSX.IntrinsicElements & HtmlHTMLAttributes<HTMLOrSVGElement>
  didReachStart?: (reached: boolean) => void
  didReachEnd?: (reached: boolean) => void
  action?: React.Ref<{
    onLeftNavBtnClick: () => void
    onRightNavBtnClick: () => void
    goToStart: () => void
    goToEnd: () => void
  }>
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
    rightNavBtnRef = null,
    rightButtonIcon = <ChevronRightIcon className="w-5" />,
    rightNavBtnClassName = '',
    leftNavBtnRef = null,
    leftButtonIcon = <ChevronLeftIcon className="w-5" />,
    leftNavBtnClassName = '',
    navBtnClassName = '',
    navBtnStyle = {},
    navBtnContainerClassName = '',
    didReachStart,
    didReachEnd,
    animationDuration = 300,
    tabsScrollAmount = 3,
    navBtnAs = 'button' as keyof JSX.IntrinsicElements &
      HtmlHTMLAttributes<HTMLOrSVGElement>,
    action
  } = props

  const [navBtnDisplay, setNavBtnDisplay] = useState<{
    start: boolean
    end: boolean
  }>({ start: false, end: false })
  const _tabRef = useRef<HTMLDivElement[]>([])
  const _tabsContainerRef = useRef<HTMLDivElement | null>(null)

  const navBtnProps = {
    'aria-hidden': true,
    navBtnStyle,
    navBtnContainerClassName,
    navBtnAs
  }

  const scrollLeft = 'scrollLeft'

  const scroll = (
    scrollValue: number,
    duration: number = 300,
    animation: boolean = true
  ): void => {
    if (!_tabsContainerRef.current) return

    if (animation) {
      animate(scrollLeft, _tabsContainerRef.current, scrollValue, {
        duration
      })
    } else {
      _tabsContainerRef.current.scrollLeft = scrollValue
    }
  }

  const getTabsRects = (
    index: number = activeTab
  ):
    | {
        tabsContainerRects?: TabsRects
        tabRects?: DOMRect
      }
    | undefined => {
    const tabsContainerEl = _tabsContainerRef?.current
    const selectedTabEl = _tabRef.current?.[index]

    let tabsContainerRects: TabsRects | undefined
    let tabRects: DOMRect | undefined
    if (!activeTab && activeTab !== 0) {
      console.error('ScrollableTabs: You have to add activeTab prop')
      return
    }
    if (tabsContainerEl) {
      const rect = tabsContainerEl.getBoundingClientRect()
      tabsContainerRects = {
        top: rect.top,
        right: rect.right,
        bottom: rect.bottom,
        left: rect.left,
        width: rect.width,
        height: rect.height,
        x: rect.x,
        y: rect.y,
        scrollLeft: tabsContainerEl.scrollLeft,
        clientWidth: tabsContainerEl?.clientWidth,
        scrollWidth: tabsContainerEl?.scrollWidth
      }
      tabRects = selectedTabEl.getBoundingClientRect()
    }

    return { tabsContainerRects, tabRects }
  }

  const scrollSelectedIntoView = (
    index: number = activeTab,
    animation: boolean = true,
    isClicked?: boolean
  ): void => {
    if (!_tabsContainerRef.current) return
    const rects = getTabsRects(index)
    if (!rects || !rects.tabsContainerRects || !rects.tabRects) return
    const { tabsContainerRects, tabRects } = rects
    if (tabRects.left < tabsContainerRects.left) {
      const nextScrollStart =
        tabsContainerRects[scrollLeft] +
        (tabRects.left - tabsContainerRects.left)
      scroll(nextScrollStart, animationDuration, animation)
    } else if (tabRects.right > tabsContainerRects.right) {
      const nextScrollStart =
        tabsContainerRects[scrollLeft] +
        (tabRects.right - tabsContainerRects.right)
      scroll(nextScrollStart, animationDuration, animation)
    }
  }

  const onNativeTabClick = (e: BaseSyntheticEvent, index: number): void =>
    onTabClick(e, index)

  const onLeftNavBtnClick = (
    e?: any,
    _tabsScrollAmount = tabsScrollAmount
  ): void => {
    const rects = getTabsRects()
    if (!rects) return
    const { tabsContainerRects } = rects
    if (!tabsContainerRects) return

    scroll(
      tabsContainerRects.scrollLeft -
        _tabRef.current[activeTab].clientWidth * _tabsScrollAmount,
      animationDuration
    )
  }

  const onRightNavBtnClick = (
    e?: any,
    _tabsScrollAmount = tabsScrollAmount
  ): void => {
    const rects = getTabsRects()
    if (!rects) return
    const { tabsContainerRects } = rects
    if (!tabsContainerRects) return

    scroll(
      tabsContainerRects.scrollLeft +
        _tabRef?.current[activeTab].clientWidth * _tabsScrollAmount,
      animationDuration
    )
  }

  const goToStart = (): void => scroll(0)

  const goToEnd = (): void => {
    const tabsRects = getTabsRects()

    scroll(tabsRects?.tabsContainerRects?.scrollWidth ?? 0)
  }

  const updateNavBtnsState = (): void => {
    if (!_tabsContainerRef.current) return

    const scrollLeft = _tabsContainerRef.current.scrollLeft
    const scrollWidth = _tabsContainerRef.current.scrollWidth
    const clientWidth = _tabsContainerRef.current.clientWidth
    const showStartScroll = Math.floor(scrollLeft) > 1
    const showEndScroll = Math.ceil(scrollLeft) < scrollWidth - clientWidth - 1

    setNavBtnDisplay({
      start: showStartScroll,
      end: showEndScroll
    })

    didReachStart?.(!showStartScroll)
    didReachEnd?.(!showEndScroll)
  }

  const handleTabsScroll = useMemo(
    () => debounce(updateNavBtnsState),
    [updateNavBtnsState]
  )

  const getNavBtns = (): {
    start?: ReactElement
    end?: ReactElement
  } | null => {
    if (hideNavButtons) return null
    return {
      start: (
        <NavButton
          disabled={!navBtnDisplay.start}
          onClick={onLeftNavBtnClick}
          ref={rightNavBtnRef}
          className={clsx(navBtnClassName, leftNavBtnClassName)}
          {...navBtnProps}
        >
          {leftButtonIcon}
        </NavButton>
      ),
      end: (
        <NavButton
          disabled={!navBtnDisplay.end}
          onClick={onRightNavBtnClick}
          ref={leftNavBtnRef}
          className={clsx(navBtnClassName, rightNavBtnClassName)}
          {...navBtnProps}
        >
          {rightButtonIcon}
        </NavButton>
      )
    }
  }

  useImperativeHandle(
    action,
    () => ({ onLeftNavBtnClick, onRightNavBtnClick, goToStart, goToEnd }),
    [onLeftNavBtnClick, onRightNavBtnClick, goToStart, goToEnd]
  )

  useEffect(() => {
    handleTabsScroll()
  }, [])

  useEffect(() => {
    return () => {
      handleTabsScroll.clear()
    }
  }, [handleTabsScroll])

  useEffect(() => {
    scrollSelectedIntoView()
  }, [activeTab])

  const conditionalNavBtns = getNavBtns()

  return (
    <div
      className={clsx(
        'flex overflow-auto items-center',
        tabsUpperContainerClassName
      )}
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
        onScroll={handleTabsScroll}
        style={tabsContainerStyle}
        className={clsx(
          'flex overflow-auto scroll-width-0',
          tabsContainerClassName
        )}
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
              className: clsx(
                'text-center align-middle whitespace-nowrap py-1 px-3 my-0 mx-1',
                child.props.className
              )
            })
          })}
        </>
      </div>
      {conditionalNavBtns?.end}
    </div>
  )
}

export default ScrollableTabs

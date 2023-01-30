import clsx from 'clsx'
import Divider from 'components/Divider'
import { MouseEvent, ReactElement } from 'react'
import ListItem from './ListItem'
import ListItemText, { Props as ItemTextProps } from './ListItemText'

interface ItemDivider {
  divider: boolean
}
interface Item extends Pick<ItemTextProps, 'primary' | 'secondary'> {
  onClick?: (e?: MouseEvent) => void
}
interface Props {
  items?: Array<Item | ItemDivider>
  dense?: boolean
  disablePadding?: boolean
}
const List = ({ items = [], disablePadding, dense }: Props): ReactElement => {
  return (
    <ul className={clsx({ 'py-2': !disablePadding })}>
      {items.map((item, index) => {
        if ('divider' in item) {
          return item.divider ? <Divider margin="none" /> : <></>
        } else {
          return (
            <ListItem key={index} onClick={item?.onClick} dense={dense}>
              <ListItemText
                primary={item.primary}
                secondary={item?.secondary}
                dense={dense}
              />
            </ListItem>
          )
        }
      })}
    </ul>
  )
}

export default List
export { ListItem, ListItemText }

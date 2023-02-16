import {
  CheckIcon,
  DocumentMagnifyingGlassIcon
} from '@heroicons/react/24/outline'
import Drawer from 'components/Drawer'
import Typography from 'components/Typography'
import { generalMessages } from 'globalMessages'
import { ReactElement } from 'react'
import { useIntl } from 'react-intl'
import { Target } from '..'
import { lineDrawerMessages } from '../messages'

interface Props {
  lineId: string | null
  onClose: () => void
  handleFilter?: (target: Target) => void
  withBackdrop?: boolean
}

const LineDrawer = (props: Props): ReactElement => {
  const {
    lineId,
    onClose,
    handleFilter = () => {},
    withBackdrop = false
  } = props
  const { formatMessage } = useIntl()

  return (
    <Drawer
      withoutBackdrop={!withBackdrop}
      placement="right"
      open={!!lineId}
      onClose={onClose}
      title={
        <span className="text-secondary text-lg uppercase font-extrabold">
          {formatMessage(lineDrawerMessages.lineData)}
        </span>
      }
    >
      <div className="w-96">
        <Typography variant="subtitle">
          {formatMessage(lineDrawerMessages.selectedLineData)}
        </Typography>
      </div>
      <Typography variant="body1" className="italic mt-3">
        {formatMessage(generalMessages.line)}
      </Typography>
      <Typography variant="body1" className="mt-1 ml-2">
        5509876278
      </Typography>
      <Typography variant="body1" className="italic mt-3">
        {formatMessage(generalMessages.medium)}
      </Typography>
      <Typography variant="body1" className="mt-1 ml-2 flex items-center">
        <CheckIcon className="w-5 h-5 text-primary" />
        <span className="ml-2">ETSI</span>
      </Typography>
      {handleFilter && (
        <button
          className="mt-8 flex items-center group/item"
          onClick={() =>
            handleFilter({
              id: '001',
              name: '5509876278',
              type: 'line'
            })
          }
        >
          <DocumentMagnifyingGlassIcon className="w-5 h-5 text-secondary-gray group-hover/item:text-primary" />
          <p className="ml-2">
            {formatMessage(lineDrawerMessages.lineHistory)}
          </p>
        </button>
      )}
    </Drawer>
  )
}

export default LineDrawer

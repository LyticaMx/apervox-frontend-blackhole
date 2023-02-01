import { ReactElement, useMemo } from 'react'
import { XCircleIcon, CheckCircleIcon } from '@heroicons/react/24/outline'
import { StarIcon } from '@heroicons/react/24/solid'

import { useFormatMessage } from 'hooks/useIntl'

import Table from 'components/Table'

import { groupsMessages } from '../messages'
import Title from 'components/Title'
import Button from 'components/Button'
import { useControlGroups } from 'context/ControlGroups'
import FormDialog from './FormDialog'
import { useToggle } from 'hooks/useToggle'

const GroupsSection = (): ReactElement => {
  const { controlGroups, groupsPagination, actions } = useControlGroups()
  const getMessage = useFormatMessage(groupsMessages)
  const [open, toggleOpen] = useToggle()

  const pagination = {
    currentPage: groupsPagination.page - 1,
    totalRecords: groupsPagination.totalRecords,
    onChange: (page: number) => {
      actions?.getControlGroups({ page: page + 1 })
    }
  }

  const columns = useMemo(
    () => [
      {
        header: ' ',
        accessorKey: 'current',
        cell: (info) => (
          <span className="font-bold">
            {info.getValue() && (
              <StarIcon className="h-5 w-5 text-orange-300" />
            )}
          </span>
        )
      },
      {
        header: 'UID',
        accessorKey: 'uid',
        cell: (info: any) => (
          <span className="font-bold"> {info.getValue()}</span>
        )
      },
      {
        header: 'PIN',
        accessorKey: 'pin',
        cell: (info: any) => {
          return info.getValue()
        }
      },
      {
        header: getMessage('date'),
        accessorKey: 'date'
      },
      {
        header: getMessage('tableAudios'),
        accessorKey: 'audios'
      },
      {
        header: getMessage('tableVector'),
        accessorKey: 'embedding_generate',
        cell: (info: any) => {
          const vector = info.getValue()
          return (
            <div className="flex justify-center">
              {vector && <CheckCircleIcon className="w-5 h-5 text-green-500" />}
              {!vector && <XCircleIcon className="w-5 h-5 text-red-500" />}
            </div>
          )
        }
      }
    ],
    []
  )

  const handleClick = (row): void => {
    actions?.setControlGroup(row)
  }

  const handleSubmit = async (values): Promise<void> => {
    await actions?.saveControlGroup(values)

    toggleOpen()
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <Title variant="card">{getMessage('title')}</Title>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <Button
            variant="contained"
            margin="none"
            color="blue"
            onClick={() => toggleOpen()}
          >
            {getMessage('buttonCreate')}
          </Button>
        </div>
      </div>
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <Table
              data={controlGroups}
              columns={columns}
              paginationStyle="extended"
              manualPagination={pagination}
              onRowClicked={handleClick}
            />
          </div>
        </div>
      </div>

      <FormDialog
        open={open}
        onClose={toggleOpen}
        onSubmit={(values) => {
          handleSubmit(values)
        }}
      />
    </div>
  )
}

export default GroupsSection

import { ReactElement, useState, useMemo, useEffect } from 'react'
import { useIntl } from 'react-intl'
import { PlusCircleIcon, TrashIcon } from '@heroicons/react/24/outline'

import TextField from 'components/Form/Textfield'
import Typography from 'components/Typography'
import Scroller from 'components/Scroller'
import IconButton from 'components/Button/IconButton'
import Pagination from 'components/Table/Pagination'

import { actionsMessages } from 'globalMessages'

import TargetCard from './TargetCard'
import { targetListMessages } from '../messages'
import { useTechnique } from 'context/Technique'
import { useTargets } from 'context/Targets'
import IndeterminateCheckbox from 'components/Table/IndeterminateCheckbox'
import { messages } from 'components/Table/messages'

import DeleteTargetDialog from './DeleteTargetDialog'
import CreateTargetDialog from 'views/Techniques/components/CreateTargetDialog'
import { Target } from 'types/target'
import { ModuleAuditsTypes, useModuleAudits } from 'context/Audit'

const TargetList = (): ReactElement => {
  let timer

  const { techniqueId } = useTechnique()
  const { data, total, actions: targetsActions, pagination } = useTargets()
  const [searchValue, setSearchValue] = useState<string>('')
  const [targetsChecked, setTargetsChecked] = useState<string[]>([])
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false)
  const [openTargetForm, setOpenTargetForm] = useState(false)
  const { formatMessage } = useIntl()
  const { actions: auditActions } = useModuleAudits()

  useEffect(() => {
    targetsActions?.getData({ page: 1, technique_id: techniqueId }, true)
    auditActions?.genAudit(ModuleAuditsTypes.AuditableModules.TARGETS)
  }, [techniqueId])

  const filteredSpeakers = useMemo(() => {
    const matches = data.filter(
      (target) =>
        target.alias?.toUpperCase().includes(searchValue.toLocaleUpperCase()) ||
        target.phone?.toUpperCase().includes(searchValue.toUpperCase())
    )

    return matches
  }, [searchValue, data])

  const handleCheckTarget = (target: Target): void => {
    let newList: string[] = []
    const alreadyChecked = targetsChecked.some((id) => id === target.id)

    if (alreadyChecked) {
      newList = targetsChecked.filter((id) => id !== target.id)
    } else {
      newList = [...targetsChecked, target.id ?? '']
    }

    setTargetsChecked(newList)
  }

  const totalSelected = targetsChecked.length
  const toggleSelection = (selectAll): void => {
    if (selectAll) {
      setTargetsChecked(data.map((item) => item.id))
      return
    }

    setTargetsChecked([])
  }

  const handleCreate = async (target): Promise<void> => {
    if (techniqueId) {
      const newTarget = {
        technique_id: techniqueId,
        alias: target.name,
        phone: target.number,
        carrier_id: target.phoneCompany?.value,
        has_end_date: false,
        overflow_line_id: target.overflowLine?.value,
        type: target.type
      }

      const res = await targetsActions?.create(newTarget)

      if (res) {
        setOpenTargetForm(false)
      }
    }
  }
  const handleDelete = async (): Promise<void> => {
    const res = await targetsActions?.deleteMany(targetsChecked)

    if (res) {
      await targetsActions?.getData()
      setOpenDeleteDialog(false)
    }
  }

  return (
    <div className="flex flex-col h-full">
      <Typography variant="body2" style="semibold" className="uppercase">
        {formatMessage(targetListMessages.totalTargets, { total })}
      </Typography>
      <div className="flex gap-2 items-center">
        <TextField
          placeholder={`${formatMessage(actionsMessages.search)}...`}
          className="flex-1"
          onChange={(e) => {
            clearTimeout(timer)
            const value = e.target.value

            timer = setTimeout(() => {
              setSearchValue(value)
            }, 1000)
          }}
        />
        <IconButton
          variant="contained"
          color="indigo"
          tooltip={formatMessage(targetListMessages.addTarget)}
          onClick={() => setOpenTargetForm(true)}
        >
          <PlusCircleIcon className="h-5 w-5" />
        </IconButton>
      </div>
      {totalSelected > 0 && (
        <div className="flex items-center justify-between my-2">
          <div className="flex items-center">
            <IndeterminateCheckbox
              indeterminate={data.length !== totalSelected && totalSelected > 0}
              checked={data.length === totalSelected}
              onChange={(e) => toggleSelection(e.currentTarget.checked)}
            />
            <Typography className="ml-4">
              {formatMessage(messages.selectedElements, {
                selectedItems: totalSelected
              })}
            </Typography>
          </div>
          <IconButton
            className="!hover:text-primary"
            onClick={() => setOpenDeleteDialog(true)}
          >
            <TrashIcon className="w-5 h-5" />
          </IconButton>
        </div>
      )}
      <Scroller className="flex flex-col gap-2 py-2">
        {filteredSpeakers.map((target) => (
          <TargetCard
            key={target.id}
            data={target}
            isChecked={targetsChecked.some((id) => target.id === id)}
            onCheck={handleCheckTarget}
          />
        ))}
      </Scroller>
      <Pagination
        className={{
          container: 'flex-wrap !p-0'
        }}
        currentPage={pagination.page}
        onPageChange={(page) => targetsActions?.getData({ page: page + 1 })}
        pageSize={pagination.limit}
        totalCount={pagination.totalRecords}
        manualLimit={{
          options: pagination.limitOptions ?? [15],
          onChangeLimit: (page, limit) =>
            targetsActions?.getData({ page: page + 1, limit })
        }}
      />
      <CreateTargetDialog
        open={openTargetForm}
        onClose={() => setOpenTargetForm(false)}
        onAccept={handleCreate}
      />
      <DeleteTargetDialog
        open={openDeleteDialog}
        onClose={() => {
          setOpenDeleteDialog(false)
        }}
        selected={targetsChecked.length}
        onAccept={handleDelete}
      />
    </div>
  )
}

export default TargetList

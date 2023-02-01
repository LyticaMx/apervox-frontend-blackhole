import Button from 'components/Button'
import Table from 'components/Table'
import Typography from 'components/Typography'
import { useCases } from 'context/Cases'
import { actionsMessages, generalMessages } from 'globalMessages'
import { ReactElement, useState } from 'react'
import { useIntl } from 'react-intl'
import { Pin } from 'types/case'
import { pinsTabMessages } from '../messages'
import EjectPinDialog from './EjectPinDialog'
import LinkPinDialog from './LinkPinDialog'

const PinsTab = (): ReactElement => {
  const [openLinkPin, setOpenLinkPin] = useState<boolean>(false)
  const [pinToEject, setPinToEject] = useState<Pin | null>(null)
  const { caseDetail } = useCases()
  const { formatMessage } = useIntl()

  return (
    <div className="pt-3">
      <LinkPinDialog open={openLinkPin} onClose={() => setOpenLinkPin(false)} />
      <EjectPinDialog
        open={!!pinToEject}
        onClose={() => setPinToEject(null)}
        pin={pinToEject?.number ?? -1}
        pinId={pinToEject?.id ?? ''}
      />
      <div className="flex justify-between items-center">
        <Typography>{formatMessage(pinsTabMessages.title)}</Typography>
        <Button
          variant="contained"
          color="indigo"
          onClick={() => setOpenLinkPin(true)}
        >
          {formatMessage(pinsTabMessages.addPin)}
        </Button>
      </div>
      <div className="mt-3">
        <Table
          columns={[
            {
              header: 'PIN',
              accessorKey: 'number'
            },
            {
              header: formatMessage(generalMessages.addedBy),
              accessorKey: 'email',
              cell: ({ getValue }) => getValue() || 'Apervox user'
            },
            {
              header: ' ',
              accessorKey: 'id',
              cell: ({ row }) => (
                <button
                  className="text-blue-500 font-bold"
                  onClick={() => setPinToEject(row.original)}
                >
                  {formatMessage(actionsMessages.remove)}
                </button>
              )
            }
          ]}
          data={caseDetail?.pins ?? []}
        />
      </div>
    </div>
  )
}

export default PinsTab

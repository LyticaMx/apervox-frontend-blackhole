import React, { ReactElement, useEffect, useMemo } from 'react'
import { useLiveCallSocket } from 'context/LiveCallSocket'
import { PhoneIcon, SignalIcon } from '@heroicons/react/24/outline'
import Typography from 'components/Typography'
import clsx from 'clsx'
import { useIntl } from 'react-intl'
import { liveCallsMessages } from '../messages'
import { useRTCPlayer } from 'context/RTCPlayer'

const LiveCalls = (): ReactElement => {
  const { data: liveCalls } = useLiveCallSocket()
  const { actions } = useRTCPlayer()
  const { formatMessage } = useIntl()

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log({ liveCalls })
  }, [liveCalls])

  const phoneColor = useMemo(
    () => ({
      evidence: 'text-primary-500',
      trash: 'text-orange-500',
      verification: 'text-green-400'
    }),
    []
  )

  return (
    <div className="w-40">
      <div className="flex justify-between items-center px-2">
        <SignalIcon className="w-6 h-6 text-red-500 flex-shrink-0 mr-2" />
        <Typography style="bold" className="flex-shrink-0">
          {formatMessage(liveCallsMessages.title)}
        </Typography>
      </div>
      <ul>
        {liveCalls.map((call) => (
          <li
            key={call.id}
            className="hover:bg-slate-200 py-0.5 px-2 border-b border-slate-200 last-of-type:border-b-0"
          >
            <button
              className="flex w-full justify-between items-center"
              onClick={() =>
                actions?.joinRoom(
                  'F_20230927140606_ORIGEN_7777777770_DESTINO_8888888800.wav',
                  call.target
                )
              }
            >
              <span className="flex justify-between items-center gap-2">
                <PhoneIcon className={clsx('w-4 h-4', phoneColor[call.type])} />
                {call.target}{' '}
              </span>
              <span className="ml-4 block rounded-full bg-red-500 w-2 h-2" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default LiveCalls

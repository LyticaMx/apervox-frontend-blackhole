import { ReactElement, useState } from 'react'
import { useIntl } from 'react-intl'
import clsx from 'clsx'

import Button from 'components/Button'
import Typography from 'components/Typography'
import TextField from 'components/Form/Textfield'
import { formMessages } from 'globalMessages'
import { asideListMessages } from '../messages'
import { PlusCircleIcon } from '@heroicons/react/24/outline'
import CreateSpeaker from './CreateSpeaker'

interface Props {
  directory: any[]
  onClickSpeaker: (speaker: any) => void
}

const defaultAvatar =
  'https://www.maxpixel.net/static/photo/640/Avatar-Blank-Profile-Picture-Display-Pic-Mystery-Man-973460.png'

const AsideList = ({ directory, onClickSpeaker }: Props): ReactElement => {
  const intl = useIntl()

  const [openForm, setOpenForm] = useState(false)

  return (
    <div
      className={clsx(
        'w-72 xl:w-96 flex-shrink-0 border-r border-gray-200 lg:order-first'
      )}
    >
      <div className="px-6 pt-6 pb-4">
        <Typography variant="body2" className="text-gray-600">
          {intl.formatMessage(asideListMessages.recordsCountSpeaker, {
            value: '4,000'
          })}
        </Typography>
        <div className="w-full grid grid-cols-12">
          <div className="col-span-9">
            <TextField
              className="mt-5"
              id="search-field"
              value={''}
              onChange={() => {}}
              name="search"
              placeholder={intl.formatMessage(formMessages.search)}
            />
          </div>
          <div className="pt-4 col-span-3 flex justify-center">
            <Button
              variant="contained"
              className="px-3 py-1"
              onClick={() => setOpenForm(true)}
            >
              <PlusCircleIcon className="w-8" />
            </Button>
          </div>
        </div>
      </div>
      <div
        className="z-0 divide-y divide-gray-200 p-1"
        style={{
          maxHeight: 'calc(100vh - 330px)',
          overflowY: 'auto'
        }}
      >
        {directory.map((speaker: any) => (
          <Button
            key={speaker.pin}
            onClick={() => onClickSpeaker(speaker)}
            margin="none"
            className="min-w-full w-full"
          >
            <div className="w-full h-full flex items-center space-x-3">
              <img
                className="h-10 w-10 rounded-full"
                src={defaultAvatar}
                alt=""
              />
              <div className="flex flex-col">
                <Typography style="medium" className="text-gray-900">
                  {speaker.name}
                </Typography>
                <Typography style="medium" className="text-gray-500 w-max">
                  {speaker.pin}
                </Typography>
              </div>
            </div>
          </Button>
        ))}
      </div>
      <CreateSpeaker openForm={openForm} onClose={() => setOpenForm(false)} />
    </div>
  )
}

export default AsideList

import { ReactElement } from 'react'

import { KeyIcon, MapPinIcon } from '@heroicons/react/24/outline'

import { useDirectory } from 'context/Directory'

const defaultBanner =
  'https://images.unsplash.com/photo-1444628838545-ac4016a5418a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80'

const defaultAvatar =
  'https://www.maxpixel.net/static/photo/640/Avatar-Blank-Profile-Picture-Display-Pic-Mystery-Man-973460.png'

const Banner = (): ReactElement => {
  const { speakerDashboard } = useDirectory()

  return (
    <>
      <div>
        <img
          className="h-32 w-full object-cover lg:h-48"
          src={defaultBanner}
          alt="speaker-banner"
        />
      </div>
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
          <div className="flex">
            <img
              className="h-24 w-24 rounded-full ring-4 ring-white sm:h-32 sm:w-32"
              src={defaultAvatar}
              alt="speaker-avatar"
            />
          </div>
          <div className="mt-6 sm:flex sm:min-w-0 sm:flex-1 sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
            <div className="mt-6 min-w-0 flex-1 sm:hidden 2xl:block">
              <h1 className="truncate text-2xl font-bold text-gray-900">
                {speakerDashboard.profile.name}
              </h1>
            </div>
            <div className="justify-stretch mt-6 flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
              <button
                type="button"
                className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
              >
                <KeyIcon
                  className="-ml-1 mr-2 h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
                <span>{speakerDashboard.profile.pin}</span>
              </button>
              <button
                type="button"
                className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
              >
                <MapPinIcon
                  className="-ml-1 mr-2 h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
                <span>{speakerDashboard.profile.location}</span>
              </button>
            </div>
          </div>
        </div>
        <div className="mt-6 hidden min-w-0 flex-1 sm:block 2xl:hidden">
          <h1 className="truncate text-2xl font-bold text-gray-900">
            {speakerDashboard.profile.name}
          </h1>
        </div>
      </div>
    </>
  )
}

export default Banner

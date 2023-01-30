import { Gender } from 'types/speaker'
import { CodeCountry } from 'types/location'

/* {Object.keys(directory).map((letter) => (
          <div key={letter} className="relative">
            <div className="sticky top-0 z-10 border-t border-b border-gray-200 bg-gray-50 px-6 py-1 text-sm font-medium text-gray-500">
              <h3>{letter}</h3>
            </div>
            <ul role="list" className="relative z-0 divide-y divide-gray-200">
              {directory[letter].map((speaker: Speaker) => (
                <li key={speaker.id} onClick={() => setSpeaker(speaker)}>
                  <div className="relative flex items-center space-x-3 px-6 py-5 focus-within:ring-2 focus-within:ring-inset focus-within:ring-pink-500 hover:bg-gray-50">
                    <div className="flex-shrink-0">
                      <img
                        className="h-10 w-10 rounded-full"
                        src={defaultAvatar}
                        alt=""
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <a href="#" className="focus:outline-none">
                        /* Extend touch target to entire panel /*
                        <span className="absolute inset-0" aria-hidden="true" />
                        <p className="text-sm font-medium text-gray-900">
                          {speaker.names}
                        </p>
                        <p className="truncate text-sm text-gray-500">
                          {speaker.gender}
                        </p>
                      </a>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))} */

export const directory = {
  A: [
    {
      id: 'asdadadad1',
      calls: [],
      pin: 1,
      names: 'Javier Alejandro',
      fathers_name: 'Albor',
      mothers_name: 'Chávez',
      age: 22,
      gender: Gender.MALE,
      location: {
        id: '1',
        name: 'Chimalhuacan',
        state: {
          id: '123',
          name: 'México',
          country: { id: '1', code_country: CodeCountry.MEX },
          country_id: '1'
        },
        state_id: '1'
      },
      location_id: '123',
      penitentiary_id: '1',
      registered_at: '',
      deleted: false,
      created_at: '',
      updated_at: '',
      deleted_at: '',
      bannerImage: '',
      avatar: ''
    },
    {
      id: 'asdadadad2',
      calls: [],
      pin: 1,
      names: 'Manuel',
      fathers_name: 'Chimal',
      mothers_name: 'Hernandez',
      age: 22,
      gender: Gender.MALE,
      location: {
        id: '1',
        name: 'Chimalhuacan',
        state: {
          id: '123',
          name: 'México',
          country: { id: '1', code_country: CodeCountry.MEX },
          country_id: '1'
        },
        state_id: '1'
      },
      location_id: '123',
      penitentiary_id: '1',
      registered_at: '',
      deleted: false,
      created_at: '',
      updated_at: '',
      deleted_at: '',
      bannerImage: '',
      avatar: ''
    }
  ],
  C: [
    {
      id: 'asdadadad3',
      calls: [],
      pin: 1,
      names: 'Javier Alejandro',
      fathers_name: 'Albor',
      mothers_name: 'Chávez',
      age: 22,
      gender: Gender.MALE,
      location: {
        id: '1',
        name: 'Chimalhuacan',
        state: {
          id: '123',
          name: 'México',
          country: { id: '1', code_country: CodeCountry.MEX },
          country_id: '1'
        },
        state_id: '1'
      },
      location_id: '123',
      penitentiary_id: '1',
      registered_at: '',
      deleted: false,
      created_at: '',
      updated_at: '',
      deleted_at: '',
      bannerImage: '',
      avatar: ''
    },
    {
      id: 'asdadadad4',
      calls: [],
      pin: 1,
      names: 'Manuel',
      fathers_name: 'Chimal',
      mothers_name: 'Hernandez',
      age: 22,
      gender: Gender.MALE,
      location: {
        id: '1',
        name: 'Chimalhuacan',
        state: {
          id: '123',
          name: 'México',
          country: { id: '1', code_country: CodeCountry.MEX },
          country_id: '1'
        },
        state_id: '1'
      },
      location_id: '123',
      penitentiary_id: '1',
      registered_at: '',
      deleted: false,
      created_at: '',
      updated_at: '',
      deleted_at: '',
      bannerImage: '',
      avatar: ''
    }
  ]
}

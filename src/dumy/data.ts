import { CallVM, TagModel } from 'types/call'
import { ControlGroup, ControlAudio, ControlCall } from 'types/control'
import { Dependency } from 'types/dependency'
import { Penitentiary } from 'types/penitentiaries'
import { Chunk, Pin } from 'types/pin'
import { Segment } from 'types/segment'
import { Speaker } from 'types/speaker'
import { State, Country, Location } from 'types/location'
import { PinActivity, TimeChartValues } from 'types/statistics'
import { Role, User } from 'types/user'

export const calls: CallVM[] = []
export const speakers: Speaker[] = []
export const penitentiaries: Penitentiary[] = []
export const locations: Location[] = [] // Ready
export const states: State[] = [] // Ready
export const pins: Pin[] = [] // Ready
export const pinActivity: PinActivity[] = [] // Ready
export const chunks: Chunk[] = [] // Ready
export const users: User[] = [] // Ready
export const dependencies: Dependency[] = [] // Ready
export const callChartValues: TimeChartValues[] = [] // Ready
export const alertChartValues: TimeChartValues[] = [] // Ready
export const tags: TagModel[] = []
export const regions: any[] = []
export const transcription: Segment[] = []

export const countries: Country[] = [
  {
    id: 'country-0',
    code_country: 0
  },
  {
    id: 'country-1',
    code_country: 1
  },
  {
    id: 'country-2',
    code_country: 2
  },
  {
    id: 'country-3',
    code_country: 3
  }
] // Ready

/* ----- CreationData ----- */
/* Dependencies */
for (let index = 0; index < 3; index++) {
  dependencies.push({
    id: `dependency-${index}`,
    name: `Dependency ${index}`,
    users
  })
}

/* States */
for (let index = 0; index < 3; index++) {
  states.push({
    id: `state-${index}`,
    name: `State ${index}`,
    country: countries[index],
    country_id: countries[index].id
  })
}

/* Locations */
for (let index = 0; index < 3; index++) {
  locations.push({
    id: `location-${index}`,
    name: `Location ${index}`,
    state: states[index],
    state_id: states[index].id
  })
}

/* Penitentiaries */
for (let index = 0; index < 5; index++) {
  penitentiaries.push({
    id: `peni-${index}`,
    name: `Peniten-${index},`,
    location: locations[0],
    location_id: locations[0].id,
    speakers,
    deleted: false,
    created_at: 'Date',
    updated_at: 'Date'
  })
}

/* Speakers */
for (let index = 0; index < 50; index++) {
  speakers.push({
    id: `speaker-${index}`,
    calls,
    pin: index,
    names: `Speaker ${index}`,
    fathers_name: `Fathers Name ${index}`,
    mothers_name: `Mothers Name ${index}`,
    age: Math.random() * 100,
    gender: 0,
    location: locations[0],
    location_id: locations[0].id,
    penitentiary: penitentiaries[0],
    penitentiary_id: penitentiaries[0].id,
    registered_at: 'Dates',
    control_groups: [],
    deleted: false,
    created_at: 'Dates',
    updated_at: 'Dates',
    deleted_at: 'Dates'
  })
}

/* Calls */
for (let index = 0; index < 50; index++) {
  calls.push({
    id: `call-${index}`,
    speaker: speakers[index],
    speaker_id: speakers[index].id,
    transmission_number: '5539308643',
    reception_number: '5531234643',
    penitentiary: penitentiaries[0],
    penitentiary_id: penitentiaries[0].id,
    call_status: 0,
    // transmited_audio TransmitedAudio?
    // received_audio ReceivedAudio?
    deleted: false,
    duration: 10.5,
    status: 0,
    created_at: 'Date',
    updated_at: 'Date',
    deleted_at: 'Date',
    hour: '20:01:54+00:00',
    pin: index
  })
}

/* User */
for (let index = 0; index < 10; index++) {
  users.push({
    id: `user-${index}`,
    approved_by_id: `aproved-user-${index}`,
    approved_by: {} as any,
    approved_users: [],
    accepted: true,
    active: true,
    email: `user${index}@email.com`,
    password: 'password',
    password_changed: false,
    dependency: dependencies[1],
    dependency_id: dependencies[1].id,
    role: Role.WRITER,
    chunks
  })
}

/* Chunks */
for (let index = 0; index < 20; index++) {
  chunks.push({
    id: `chunk-${index}`,
    creator: users[1],
    creator_id: users[1].id,
    pins
  })
}

/* Pins */
for (let index = 0; index < 20; index++) {
  pins.push({
    id: `pin-${index}`,
    number: index,
    speaker: speakers[index],
    chunk: chunks[0],
    chunk_id: chunks[0].id
  } as any)
}

/* Pin Activity */
for (let index = 0; index < 20; index++) {
  pinActivity.push({
    pin: index + 1,
    count: index * 10
  })
}

/* ----------- Dashboard ------------- */
export const callCounts = {
  calls: { current: 55, last: 100, change: 100 },
  pins: { current: 40, last: 30, change: 100 },
  alerts: { current: 32, last: 37, change: 100 }
}

/* callChart */
for (let index = 0; index < 11; index++) {
  callChartValues.push({
    date: `${index + 1}:00`,
    value: index * 10
  })
}

/* alertChart */
for (let index = 0; index < 11; index++) {
  alertChartValues.push({
    date: `${index + 1}:00`,
    value: index * 5
  })
}

/* ------------ Calls ------------ */
export const callDetailDumy = {
  receiver: '554345345454',
  duration: '43:56',
  hour: '1:30',
  voiceControlCimilarity: Number((Math.random() * 100).toFixed()),
  transcription:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
}

/* tags */
for (let i = 0; i < 5; i++) {
  tags.push({
    id: `tag-${i}`,
    label: `Tag ${i}`
  })
}

/* ------------ Control Groups ------------ */

export const controlGroups: ControlGroup[] = Array.from(
  { length: 10 },
  (_, i) => ({
    id: '637552082fcf3416f0fd6896',
    uid: '7dda3e52-fbe6-4b25-a60e-133e91fe8267',
    pin: 1,
    current: false,
    embedding_generate: false,
    audios: 5
  })
)

export const controlAudios: ControlAudio[] = Array.from(
  { length: 10 },
  (_, i) => ({
    id: `controlaudio-${i}`,
    name: 'Audio',
    loading_date: 'Date'
  })
)

export const controlCalls: ControlCall[] = Array.from(
  { length: 10 },
  (_, i) => ({
    date: '08:25:39+00:00',
    duration: 13.5,
    pin: 3,
    receptor: 2879191777262,
    similarity: 1
  })
)
/* regionChart */
for (let index = 0; index < 5; index++) {
  regions.push({
    id: `Region-${index}`,
    start: index,
    partialStart: index,
    end: index * 1.5,
    partialEnd: index * 1.5
  })
}

for (let index = 0; index < 10; index++) {
  transcription.push({
    id: `Segment-${index}`,
    audio_id: 'audio_id',
    created_at: '',
    updated_at: '',
    start_time: index * 2,
    end_time: index * 2 + index * 1,
    transcription: `Segmento ${index}`
  })
}
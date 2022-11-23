import { CallVM, OverusedPhrase, Detail } from 'types/call'
import { ControlGroup, ControlAudio, ControlCall } from 'types/control'
import { Penitentiary } from 'types/penitentiaries'
import { Chunk, Pin } from 'types/pin'
import { Segment } from 'types/segment'
import { State, Country, Location, Speaker } from 'types/speaker'
import { PinActivity, TimeChartValues } from 'types/statistics'
import { Dependency, User } from 'types/user'
import { Evidence } from 'types/evidence'

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
export const overusedPhrases: OverusedPhrase[] = [] // Ready
export const regions: any[] = []
export const transcription: Segment[] = []
export const evidences: Evidence[][] = []
export const callDetail: Detail = {
  assigned_pin: 1,
  date: '10/12/2022',
  hour: '05:31:00',
  receiver: '5532345485',
  duration: '112',
  voiceControlSimilarity: 70,
  transcription,
  overusedPhrases
}

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
    role: 0,
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
  })
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
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  overusedPhrases
}

/* alertChart */
for (let index = 0; index < 20; index++) {
  overusedPhrases.push({
    id: `OverusedPhrase-${index}`,
    phrase: `Phrase ${index}`,
    appears: index * 3
  })
}

/* ------------ Control Groups ------------ */

export const controlGroups: ControlGroup[] = Array.from(
  { length: 10 },
  (_, i) => ({
    id: `controlgroup-${i}`,
    speaker: speakers[i],
    speaker_id: speakers[i].id,
    audios: [],
    // median_vector: null,
    created_at: 'Date',
    updated_at: 'Date'
  })
)

export const controlAudios: ControlAudio[] = Array.from(
  { length: 10 },
  (_, i) => ({
    id: `controlaudio-${i}`,
    name: 'Audio',
    control_group: controlGroups[0],
    control_group_id: controlGroups[0].id,
    created_at: 'Date'
  })
)

export const controlCalls: ControlCall[] = Array.from(
  { length: 10 },
  (_, i) => ({
    id: `controlcall-${i}`
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

/* Evidences */
const genEvidences = (): void => {
  const objectives = [
    {
      phone: '1111111111',
      event: 1
    },
    {
      phone: '2222222222',
      event: 1
    },
    {
      phone: '3333333333',
      event: 1
    },
    {
      phone: '4444444444',
      event: 1
    }
  ]
  const evidenceClassifications = [
    'No visto',
    'Trabajando',
    'Relevante',
    'No relevante',
    'Descartado'
  ]
  const evidenceTypes = ['audio', 'video', 'image', 'doc', 'navigation', 'data']

  for (let i = 0; i < 3; i++) {
    evidences[i] = []
    for (let j = 0; j < 150; j++) {
      const objectiveRng = Math.floor(Math.random() * 4)
      const classificationRng = Math.floor(Math.random() * 5)
      const typeRng = Math.floor(Math.random() * 6)

      evidences[i].push({
        id: j + 1,
        objective: objectives[objectiveRng].phone,
        event: objectives[objectiveRng].event++,
        // Los as se agregan para cumplir la norma de los tipos union de typescript
        classification: evidenceClassifications[classificationRng] as
          | 'No visto'
          | 'Trabajando'
          | 'Relevante'
          | 'No relevante'
          | 'Descartado',
        type: evidenceTypes[typeRng] as
          | 'audio'
          | 'video'
          | 'image'
          | 'doc'
          | 'navigation'
          | 'data',
        workingOn: (objectiveRng * classificationRng * typeRng + j) % 2 === 0
      })
    }
  }
  const tempIndex = evidences.length
  evidences[tempIndex] = []
  for (let i = 0; i < 3; i++) {
    const objectiveRng = Math.floor(Math.random() * 4)
    const classificationRng = Math.floor(Math.random() * 5)
    const typeRng = Math.floor(Math.random() * 6)

    evidences[tempIndex].push({
      id: i + 1,
      objective: objectives[objectiveRng].phone,
      event: objectives[objectiveRng].event++,
      // Los as se agregan para cumplir la norma de los tipos union de typescript
      classification: evidenceClassifications[classificationRng] as
        | 'No visto'
        | 'Trabajando'
        | 'Relevante'
        | 'No relevante'
        | 'Descartado',
      type: evidenceTypes[typeRng] as
        | 'audio'
        | 'video'
        | 'image'
        | 'doc'
        | 'navigation'
        | 'data',
      workingOn: (objectiveRng * classificationRng * typeRng + i) % 2 === 0
    })
  }
}
genEvidences()

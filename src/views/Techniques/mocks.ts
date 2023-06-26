import { Priority } from 'types/priority'
import { Status } from 'types/status'
import { Evidence, Target, Technique, Turn } from 'types/technique'

export const techniquesData: Technique[] = [
  {
    id: '001',
    name: 'T1.23/2022-30',
    created_at: new Date().toISOString(),
    expires_at: new Date(Date.now() + 2 * (3600 * 1000 * 24)).toISOString(),
    registered_by: 'armandoalbor',
    total_target: 3,
    priority: Priority.HIGH,
    attention_turn: Turn.MORNING,
    status: Status.TO_COMPLETE
  },
  {
    id: '002',
    name: 'T1.23/2022-2',
    created_at: new Date().toISOString(),
    expires_at: new Date(Date.now() + 6 * (3600 * 1000 * 24)).toISOString(),
    registered_by: 'armandoalbor',
    total_target: 24,
    priority: Priority.HIGH,
    attention_turn: Turn.EVENING,
    status: Status.TO_COMPLETE
  },
  {
    id: '003',
    name: 'T1.24/2022-23',
    created_at: new Date().toISOString(),
    expires_at: new Date(Date.now() + 4 * (3600 * 1000 * 24)).toISOString(),
    registered_by: 'efracuadras',
    total_target: 10,
    priority: Priority.LOW,
    attention_turn: Turn.NIGHTNING,
    status: Status.CURRENT
  },
  {
    id: '004',
    name: 'T1.20/2022-4',
    created_at: new Date().toISOString(),
    expires_at: new Date(Date.now() + 1 * (3600 * 1000 * 24)).toISOString(),
    registered_by: 'javieralbor',
    total_target: 20,
    priority: Priority.LOW,
    attention_turn: Turn.EVENING,
    status: Status.CURRENT
  },
  {
    id: '005',
    name: 'T1.18/2022-16',
    created_at: new Date().toISOString(),
    expires_at: new Date(Date.now() + 16 * (3600 * 1000 * 24)).toISOString(),
    registered_by: 'alfredogonzalez',
    total_target: 44,
    priority: Priority.MEDIUM,
    attention_turn: Turn.MORNING,
    status: Status.COMPLETED
  }
]

export const targetData: Target[] = [
  {
    id: 'obtv_1',
    name: 'Jorge Jimenez',
    phone_number: '5545654789',
    phone_company: 'TELCEL',
    created_at: new Date(Date.now() - 2 * (3600 * 1000 * 24)).toISOString(),
    expires_at: new Date(Date.now() + 2 * (3600 * 1000 * 24)).toISOString(),
    liid: 'random',
    liid_v: 'random'
  },
  {
    id: 'obtv_2',
    name: 'Raul Perez',
    phone_number: '5612654789',
    phone_company: 'MOVISTAR',
    created_at: new Date(Date.now() - 2 * (3600 * 1000 * 24)).toISOString(),
    expires_at: new Date(Date.now() + 2 * (3600 * 1000 * 24)).toISOString(),
    liid: 'random',
    liid_v: 'random'
  },
  {
    id: 'obtv_3',
    name: 'Eduardo Rangel',
    phone_number: '7765690897',
    phone_company: 'AT&T',
    created_at: new Date(Date.now() - 2 * (3600 * 1000 * 24)).toISOString(),
    expires_at: new Date(Date.now() + 2 * (3600 * 1000 * 24)).toISOString(),
    liid: 'random',
    liid_v: 'random'
  }
]

export const evidencesData: Evidence[] = [
  {
    id: 'ev_1',
    number_event: '00_1',
    number_target: '55-35674518',
    number_origin: '55-31234565',
    created_at: new Date().toISOString(),
    expires_at: new Date(Date.now() + 2 * (3600 * 1000 * 24)).toISOString(),
    duration: '00:07:00',
    carrier: 'Telcel',
    imei: 'AAAA-BBBB-CCCC',
    imsi: '23452346545321',
    code_cell_start: '123',
    direction_cell_start: '123.123',
    region_cell_start: '324',
    audit_by: 'jmartinez',
    follow_up: 'ggarcia',
    obtained_from: 'ETZI',
    tag: 0,
    clasification: 0,
    type: 0
  },
  {
    id: 'ev_2',
    number_event: '00_1',
    number_target: '55-35674518',
    number_origin: '55-31234565',
    created_at: new Date().toISOString(),
    expires_at: new Date(Date.now() + 2 * (3600 * 1000 * 24)).toISOString(),
    duration: '00:07:00',
    carrier: 'Telcel',
    imei: 'AAAA-BBBB-CCCC',
    imsi: '23452346545321',
    code_cell_start: '123',
    direction_cell_start: '123.123',
    region_cell_start: '324',
    audit_by: 'jmartinez',
    follow_up: 'ggarcia',
    obtained_from: 'ETZI',
    tag: 1,
    clasification: 1,
    type: 1
  },
  {
    id: 'ev_3',
    number_event: '00_1',
    number_target: '55-35674518',
    number_origin: '55-31234565',
    created_at: new Date().toISOString(),
    expires_at: new Date(Date.now() + 2 * (3600 * 1000 * 24)).toISOString(),
    duration: '00:07:00',
    carrier: 'Telcel',
    imei: 'AAAA-BBBB-CCCC',
    imsi: '23452346545321',
    code_cell_start: '123',
    direction_cell_start: '123.123',
    region_cell_start: '324',
    audit_by: 'jmartinez',
    follow_up: 'ggarcia',
    obtained_from: 'ETZI',
    tag: 1,
    clasification: 2,
    type: 2
  },
  {
    id: 'ev_4',
    number_event: '00_1',
    number_target: '55-35674518',
    number_origin: '55-31234565',
    created_at: new Date().toISOString(),
    expires_at: new Date(Date.now() + 2 * (3600 * 1000 * 24)).toISOString(),
    duration: '00:07:00',
    carrier: 'Telcel',
    imei: 'AAAA-BBBB-CCCC',
    imsi: '23452346545321',
    code_cell_start: '123',
    direction_cell_start: '123.123',
    region_cell_start: '324',
    audit_by: 'jmartinez',
    follow_up: 'ggarcia',
    obtained_from: 'ETZI',
    tag: 1,
    clasification: 2,
    type: 3
  }
]

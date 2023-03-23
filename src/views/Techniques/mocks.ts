import { Priority } from 'types/priority'
import { Status } from 'types/status'
import { Evidence, Objective, Technique, Turn } from 'types/technique'

export const techniquesData: Technique[] = [
  {
    id: '001',
    name: 'T1.23/2022-30',
    created_at: new Date().toISOString(),
    expires_at: new Date(Date.now() + 2 * (3600 * 1000 * 24)).toISOString(),
    registered_by: 'armandoalbor',
    time_on_platform: '1 día',
    total_objective: 3,
    priority: Priority.HIGH,
    turn_of_attention: Turn.MORNING,
    status: Status.TO_COMPLETE
  },
  {
    id: '002',
    name: 'T1.23/2022-2',
    created_at: new Date().toISOString(),
    expires_at: new Date(Date.now() + 6 * (3600 * 1000 * 24)).toISOString(),
    registered_by: 'armandoalbor',
    time_on_platform: '25 días',
    total_objective: 24,
    priority: Priority.HIGH,
    turn_of_attention: Turn.EVENING,
    status: Status.TO_COMPLETE
  },
  {
    id: '003',
    name: 'T1.24/2022-23',
    created_at: new Date().toISOString(),
    expires_at: new Date(Date.now() + 4 * (3600 * 1000 * 24)).toISOString(),
    registered_by: 'efracuadras',
    time_on_platform: '10 días',
    total_objective: 10,
    priority: Priority.LOW,
    turn_of_attention: Turn.NIGHTNING,
    status: Status.CURRENT
  },
  {
    id: '004',
    name: 'T1.20/2022-4',
    created_at: new Date().toISOString(),
    expires_at: new Date(Date.now() + 1 * (3600 * 1000 * 24)).toISOString(),
    registered_by: 'javieralbor',
    time_on_platform: '1 mes',
    total_objective: 20,
    priority: Priority.LOW,
    turn_of_attention: Turn.EVENING,
    status: Status.CURRENT
  },
  {
    id: '005',
    name: 'T1.18/2022-16',
    created_at: new Date().toISOString(),
    expires_at: new Date(Date.now() + 16 * (3600 * 1000 * 24)).toISOString(),
    registered_by: 'alfredogonzalez',
    time_on_platform: '12 días',
    total_objective: 44,
    priority: Priority.MEDIUM,
    turn_of_attention: Turn.MORNING,
    status: Status.COMPLETED
  }
]

export const objectiveData: Objective[] = [
  {
    id: 'obtv_1',
    name: 'Jorge Jimenez',
    phone_number: '5545654789',
    phone_company: 0,
    created_at: new Date(Date.now() - 2 * (3600 * 1000 * 24)).toISOString(),
    expires_at: new Date(Date.now() + 2 * (3600 * 1000 * 24)).toISOString(),
    liid: 'random',
    liid_v: 'random'
  },
  {
    id: 'obtv_2',
    name: 'Raul Perez',
    phone_number: '5612654789',
    phone_company: 0,
    created_at: new Date(Date.now() - 2 * (3600 * 1000 * 24)).toISOString(),
    expires_at: new Date(Date.now() + 2 * (3600 * 1000 * 24)).toISOString(),
    liid: 'random',
    liid_v: 'random'
  },
  {
    id: 'obtv_3',
    name: 'Eduardo Rangel',
    phone_number: '7765690897',
    phone_company: 0,
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
    number_objective: '55-35674518',
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
    number_objective: '55-35674518',
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
    number_objective: '55-35674518',
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
    number_objective: '55-35674518',
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
    clasification: 3,
    type: 3
  }
]

import { Priority } from 'types/priority'
import { Status } from 'types/status'
import { Technique, Turn } from 'types/technique'

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

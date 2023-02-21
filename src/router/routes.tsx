import { ReactElement } from 'react'

import {
  PhoneIcon,
  UserGroupIcon,
  Cog6ToothIcon,
  BeakerIcon,
  Bars3Icon,
  IdentificationIcon,
  ComputerDesktopIcon
} from '@heroicons/react/24/outline'
import { PersonTargetIcon, AlertPlusIcon, DocIcon, AuditIcon } from 'assets/SVG'

import SignIn from 'views/Auth/SignIn'
import Speakers from 'views/Speakers'
import Pins from 'views/Pins'
import Calls from 'views/Calls'
import CallDetail from 'views/Calls/Detail'
import ControlGroups from 'views/ControlGroups'
import Directory from 'views/Directory'
import Users from 'views/Users'
import Dependencies from 'views/Dependencies'
import RestorePassword from 'views/Auth/RestorePassword'
import Alerts from 'views/Alerts'
import Cases from 'views/Cases'
import Profile from 'views/Profile'
import Audit from 'views/Audit'
import Comparisons from 'views/Comparisons'
import OneToMany from 'views/Comparisons/OneToMany'
import ReceiverToReceiver from 'views/Comparisons/ReceiverToReceiver'
import Presentation from 'views/Presentation'
import Roles from 'views/Roles'
import UserAccount from 'views/Auth/UserAccount'
import BondingNetwork from 'views/BondingNetwork'
import FailedLoginAttemps from 'views/Audit/FailedLoginAttemps'
import BlockedUsers from 'views/Audit/BlockedUsers'
import Monitoring from 'views/Monitoring'
import CallsHistory from 'views/CallsHistory'

import BaseLayout from 'layout/BaseLayout'
import FullScreenLayout from 'layout/FullScreenLayout'
import { Layout } from 'types/layout'
import { sidebarMessages } from 'globalMessages'

/* DEV */
import DemoSystem from 'views/Demo/System'
import DemoCharts from 'views/Demo/Chart'
import DemoForm from 'views/Demo/Form'
import DemoAutoForm from 'views/Demo/AutoForm'
import DemoWavesurfer from 'views/Demo/Wavesurfer'

export interface Route {
  id: string
  i18Key?: keyof typeof sidebarMessages
  i18ModuleKey?: keyof typeof sidebarMessages
  path: string
  modules: Route[]
  icon?: any
  scopes: string[] // permissions for access to route => "admin, superadmin..."
  component: () => ReactElement
  layout: ({ children }: Layout) => ReactElement
  private?: boolean
  sidebar?: boolean
}

export const pathRoute = {
  home: '/',
  profile: '/perfil',
  admin: {
    users: '/administracion/usuarios',
    dependencies: '/administracion/dependencias'
  },
  auth: {
    signIn: '/inicio-de-sesion',
    restorePassword: '/restablecer-contraseña',
    userAccount: '/mi-cuenta'
  },
  pins: '/pins',
  roles: '/roles',
  speakers: {
    dashboard: '/tablero-de-hablantes',
    directory: '/directorio-de-hablantes'
  },
  calls: {
    index: '/llamadas',
    detail: '/detalle-de-llamada'
  },
  comparisons: {
    oneToOne: '/comparison-one',
    oneToMany: '/comparison-many',
    receiverToReceiver: '/comparison-r'
  },
  receiverAudio: '/reseiver-audio',
  senderAudio: '/sender-audio',
  controlGroups: '/grupos-de-control',
  alerts: '/alertas',
  cases: '/casos',
  bondingNetwork: '/redes-de-vinculacion',
  audit: {
    general: '/auditoria',
    failedLoginAttemps: '/auditoria/inicios-de-sesion-fallidos',
    blockedUsers: '/auditoria/usuarios-bloqueados'
  },
  monitoring: {
    base: '/monitoreo',
    history: '/monitoreo/historial'
  },
  demo: {
    chart: '/demo-charts',
    form: '/demo-form',
    autoform: '/demo-autoform',
    system: '/demo-system',
    wavesurfer: '/demo-wavesurfer'
  }
}

export const routes: Route[] = [
  {
    id: 'presentation',
    path: pathRoute.home,
    modules: [],
    scopes: [],
    component: Presentation,
    layout: FullScreenLayout
  },
  {
    id: 'sign-in',
    path: pathRoute.auth.signIn,
    modules: [],
    scopes: [],
    component: SignIn,
    layout: FullScreenLayout
  },
  {
    id: 'restore-password',
    path: pathRoute.auth.restorePassword,
    modules: [],
    scopes: [],
    component: RestorePassword,
    layout: FullScreenLayout
  },
  {
    id: 'mi-cuenta',
    path: pathRoute.auth.userAccount,
    modules: [],
    scopes: [],
    component: UserAccount,
    layout: BaseLayout
  },
  {
    id: 'profile',
    path: pathRoute.profile,
    modules: [],
    icon: Bars3Icon,
    scopes: [],
    component: Profile,
    layout: BaseLayout,
    private: true,
    sidebar: false
  },
  {
    id: 'speaker-dashboard',
    i18Key: 'speakers',
    path: pathRoute.speakers.dashboard,
    modules: [
      {
        id: 'speaker-directory',
        i18Key: 'directory',
        path: pathRoute.speakers.directory,
        modules: [],
        icon: Bars3Icon,
        scopes: [],
        component: Directory,
        layout: BaseLayout,
        private: true
      }
    ],
    icon: PersonTargetIcon,
    scopes: [],
    component: Speakers,
    layout: BaseLayout,
    private: true,
    sidebar: true
  },
  {
    id: 'calls',
    i18Key: 'calls',
    path: pathRoute.calls.index,
    modules: [
      {
        id: 'call-detail',
        i18Key: 'calls',
        path: pathRoute.calls.detail,
        modules: [],
        scopes: [],
        component: CallDetail,
        layout: BaseLayout,
        private: true
      }
    ],
    icon: PhoneIcon,
    scopes: [],
    component: Calls,
    layout: BaseLayout,
    private: true,
    sidebar: true
  },
  {
    id: 'control-groups',
    path: pathRoute.controlGroups,
    icon: UserGroupIcon,
    i18Key: 'controlGroups',
    modules: [],
    scopes: [],
    component: ControlGroups,
    layout: BaseLayout,
    private: true,
    sidebar: true
  },
  {
    id: 'alerts',
    path: pathRoute.alerts,
    icon: AlertPlusIcon,
    i18Key: 'alerts',
    modules: [],
    scopes: [],
    component: Alerts,
    layout: BaseLayout,
    private: true,
    sidebar: true
  },
  {
    id: 'roles',
    path: pathRoute.roles,
    icon: IdentificationIcon,
    i18Key: 'roles',
    modules: [],
    scopes: [],
    component: Roles,
    layout: BaseLayout,
    private: true,
    sidebar: true
  },
  {
    id: 'cases',
    path: pathRoute.cases,
    icon: DocIcon,
    i18Key: 'cases',
    modules: [],
    scopes: [],
    component: Cases,
    layout: BaseLayout,
    private: true,
    sidebar: true
  },
  {
    id: 'bondingNetwork',
    path: pathRoute.bondingNetwork,
    icon: Bars3Icon,
    i18Key: 'bondingNetwork',
    modules: [],
    scopes: [],
    component: BondingNetwork,
    layout: BaseLayout,
    private: true,
    sidebar: true
  },
  {
    id: 'callsHistory',
    path: pathRoute.monitoring.history,
    icon: ComputerDesktopIcon,
    i18Key: 'monitoring',
    modules: [],
    scopes: [],
    component: CallsHistory,
    layout: BaseLayout,
    private: true,
    sidebar: false
  },
  {
    id: 'monitoring',
    path: pathRoute.monitoring.base,
    icon: ComputerDesktopIcon,
    i18Key: 'monitoring',
    modules: [],
    scopes: [],
    component: Monitoring,
    layout: BaseLayout,
    private: true,
    sidebar: true
  },
  {
    id: 'audit',
    path: pathRoute.audit.general,
    icon: AuditIcon,
    i18Key: 'audit',
    modules: [
      {
        id: 'audit-failed-login-attemps',
        component: FailedLoginAttemps,
        layout: BaseLayout,
        modules: [],
        scopes: [],
        path: pathRoute.audit.failedLoginAttemps,
        private: true
      },
      {
        id: 'audit-blocked-users',
        component: BlockedUsers,
        layout: BaseLayout,
        modules: [],
        scopes: [],
        path: pathRoute.audit.blockedUsers,
        private: true
      }
    ],
    scopes: [],
    component: Audit,
    layout: BaseLayout,
    private: true,
    sidebar: true
  },
  {
    id: 'admin-usuarios',
    path: pathRoute.admin.users,
    i18Key: 'users',
    i18ModuleKey: 'admin',
    modules: [
      {
        id: 'admin-dependencies',
        i18Key: 'calls',
        path: pathRoute.admin.dependencies,
        modules: [],
        scopes: [],
        component: Dependencies,
        layout: BaseLayout,
        private: true
      },
      {
        id: 'pins',
        i18Key: 'pins',
        path: pathRoute.pins,
        modules: [],
        scopes: [],
        component: Pins,
        layout: BaseLayout,
        private: true,
        sidebar: true
      }
    ],
    icon: Cog6ToothIcon,
    scopes: [],
    component: Users,
    layout: BaseLayout,
    private: true,
    sidebar: true
  },
  {
    id: 'comparison-one',
    path: pathRoute.comparisons.oneToOne,
    icon: Bars3Icon,
    i18Key: 'comparisons',
    modules: [
      {
        id: 'comparison-many',
        path: pathRoute.comparisons.oneToMany,
        modules: [],
        scopes: [],
        component: OneToMany,
        layout: BaseLayout,
        private: true
      },
      {
        id: 'comparison-receiver',
        i18Key: 'comparisonsRToR',
        path: pathRoute.comparisons.receiverToReceiver,
        modules: [],
        scopes: [],
        component: ReceiverToReceiver,
        layout: BaseLayout,
        private: true,
        sidebar: true
      }
    ],
    scopes: [],
    component: Comparisons,
    layout: BaseLayout,
    private: true,
    sidebar: true
  },
  /* Siempre abajo */
  {
    id: 'demo',
    path: pathRoute.demo.system,
    icon: BeakerIcon,
    i18Key: 'demoSystem',
    i18ModuleKey: 'demo',
    modules: [
      {
        id: 'demo-chart',
        i18Key: 'demoChart',
        path: pathRoute.demo.chart,
        modules: [],
        scopes: [],
        component: DemoCharts,
        layout: BaseLayout,
        private: true,
        sidebar: true
      },
      {
        id: 'demo-form',
        i18Key: 'demoForm',
        path: pathRoute.demo.form,
        modules: [],
        scopes: [],
        component: DemoForm,
        layout: BaseLayout,
        private: true,
        sidebar: true
      },
      {
        id: 'demo-autoform',
        i18Key: 'demoAutoForm',
        path: pathRoute.demo.autoform,
        modules: [],
        scopes: [],
        component: DemoAutoForm,
        layout: BaseLayout,
        private: true,
        sidebar: true
      },
      {
        id: 'demo-ws',
        i18Key: 'demoWavesurfer',
        path: pathRoute.demo.wavesurfer,
        modules: [],
        scopes: [],
        component: DemoWavesurfer,
        layout: BaseLayout,
        private: true,
        sidebar: true
      }
    ],
    scopes: [],
    component: DemoSystem,
    layout: BaseLayout,
    private: true,
    sidebar: false
  }
]

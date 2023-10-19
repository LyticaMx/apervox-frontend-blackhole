import { ReactElement } from 'react'

import {
  // PhoneIcon,
  UserGroupIcon,
  // Cog6ToothIcon,
  BeakerIcon,
  IdentificationIcon,
  UsersIcon,
  ComputerDesktopIcon,
  FolderOpenIcon
} from '@heroicons/react/24/outline'
import { WifiIcon } from '@heroicons/react/24/solid'

import { AuditIcon } from 'assets/SVG'

import SignIn from 'views/Auth/SignIn'
import RestorePassword from 'views/Auth/RestorePassword'
import Audit from 'views/Audit'
import Presentation from 'views/Presentation'
import Roles from 'views/Roles'
import UserAccount from 'views/Auth/UserAccount'
import FailedLoginAttemps from 'views/Audit/FailedLoginAttemps'
import BlockedUsers from 'views/Audit/BlockedUsers'
import UsersAdmin from 'views/UsersAdmin'
import GeneralConfig from 'views/Config'
import Monitoring from 'views/Monitoring'
import Media from 'views/Config/Media'
import Telecom from 'views/Config/Telecom'
import CallsHistory from 'views/CallsHistory'
import Acquisition from 'views/Acquisition'
import WorkGroups from 'views/WorkGroups'
import Evidence from 'views/Evidence'
import Techniques from 'views/Techniques'
import Technique from 'views/Technique'

import BaseLayout from 'layout/BaseLayout'
import EvidenceLayout from 'layout/EvidenceLayout'
import FullScreenLayout from 'layout/FullScreenLayout'
import { Layout } from 'types/layout'
import { sidebarMessages } from 'globalMessages'

/* DEV */
import DemoSystem from 'views/Demo/System'
import DemoCharts from 'views/Demo/Chart'
import DemoForm from 'views/Demo/Form'
import DemoAutoForm from 'views/Demo/AutoForm'
import DemoWavesurfer from 'views/Demo/Wavesurfer'
import DemoCommon from 'views/Demo/Common'
import ImageEditor from 'views/Demo/ImageEditor'
import DemoEfra from 'views/Demo/efra'
import VideoPlayer from 'views/Demo/VideoPlayer'
import RichTextEditor from 'views/Demo/RichTextEditor'
import EvidenceViewDemo from 'views/Demo/EvidenceViewDemo'
import Verification from 'views/Acquisition/Verification'
import { ACTION, SUBJECT } from 'context/Ability'

interface Ability {
  action: ACTION
  subject: SUBJECT
}

export interface Route {
  id: string
  i18Key?: keyof typeof sidebarMessages
  i18ModuleKey?: keyof typeof sidebarMessages
  path: string
  modules: Route[]
  icon?: any
  scopes: Ability[] // permissions for access to route => "admin, superadmin..."
  component: () => ReactElement
  layout: ({ children }: Layout) => ReactElement
  private?: boolean
  sidebar?: boolean
}

export const pathRoute = {
  home: '/',
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
  config: {
    general: '/configuracion',
    media: '/configuracion/medios',
    telecom: '/configuracion/telecom'
  },
  workGroups: '/grupos-de-trabajo',
  alerts: '/alertas',
  audit: {
    general: '/auditoria',
    failedLoginAttemps: '/auditoria/inicios-de-sesion-fallidos',
    blockedUsers: '/auditoria/usuarios-bloqueados'
  },
  users: '/usuarios',
  monitoring: {
    base: '/monitoreo',
    history: '/monitoreo/historial'
  },
  acquisition: {
    acquisitionMedium: '/medios-adquisicion',
    verificationLine: '/lineas-de-verificacion'
  },
  evidence: '/evidencia',
  techniques: '/tecnicas',
  technique: '/tecnica',
  demo: {
    chart: '/demo-charts',
    form: '/demo-form',
    autoform: '/demo-autoform',
    system: '/demo-system',
    wavesurfer: '/demo-wavesurfer',
    imageEditor: '/demo-image-editor',
    common: '/demo-common',
    videoPlayer: '/demo-video-player',
    textEditor: '/demo-text-editor',
    evidenceView: '/demo-evidence-view'
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
    scopes: [{ action: ACTION.READ, subject: SUBJECT.ME }],
    component: UserAccount,
    layout: BaseLayout,
    private: true
  },
  {
    id: 'users',
    path: pathRoute.users,
    icon: UsersIcon,
    i18Key: 'users',
    modules: [],
    scopes: [{ action: ACTION.READ, subject: SUBJECT.USERS }],
    component: UsersAdmin,
    layout: BaseLayout,
    private: true,
    sidebar: true
  },
  {
    id: 'work-groups',
    path: pathRoute.workGroups,
    icon: UserGroupIcon,
    i18Key: 'workGroups',
    modules: [],
    scopes: [{ action: ACTION.READ, subject: SUBJECT.GROUPS }],
    component: WorkGroups,
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
    scopes: [{ action: ACTION.READ, subject: SUBJECT.ROLES }],
    component: Roles,
    layout: BaseLayout,
    private: true,
    sidebar: true
  },
  {
    id: 'config',
    path: pathRoute.config.general,
    i18Key: 'config',
    modules: [
      {
        id: 'config-media',
        component: Media,
        layout: BaseLayout,
        modules: [],
        scopes: [
          { action: ACTION.READ, subject: SUBJECT.DEVICES },
          { action: ACTION.READ, subject: SUBJECT.ACQUISITION_MEDIUMS },
          { action: ACTION.READ, subject: SUBJECT.CARRIERS }
        ],
        path: pathRoute.config.media,
        private: true
      },
      {
        id: 'config-telecom',
        component: Telecom,
        layout: BaseLayout,
        modules: [],
        scopes: [],
        path: pathRoute.config.telecom,
        private: true
      }
    ],
    scopes: [],
    layout: BaseLayout,
    component: GeneralConfig,
    private: true,
    sidebar: false
  },
  {
    id: 'callsHistory',
    path: pathRoute.monitoring.history,
    icon: ComputerDesktopIcon,
    i18Key: 'monitoring',
    modules: [],
    scopes: [{ action: ACTION.READ, subject: SUBJECT.CALL_EVIDENCES }],
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
    scopes: [{ action: ACTION.READ, subject: SUBJECT.CALL_EVIDENCES }],
    component: Monitoring,
    layout: BaseLayout,
    private: true,
    sidebar: true
  },
  {
    id: 'acquisition',
    path: pathRoute.acquisition.acquisitionMedium,
    icon: WifiIcon,
    i18Key: 'acquisition',
    modules: [
      {
        id: 'verification-line',
        component: Verification,
        layout: BaseLayout,
        modules: [],
        scopes: [
          { action: ACTION.READ, subject: SUBJECT.OVERFLOW_LINES },
          { action: ACTION.READ, subject: SUBJECT.VERIFICATION_LINES }
        ],
        path: pathRoute.acquisition.verificationLine,
        private: true
      }
    ],
    scopes: [{ action: ACTION.READ, subject: SUBJECT.OVERFLOW_LINES }],
    component: Acquisition,
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
        scopes: [{ action: ACTION.READ, subject: SUBJECT.AUDITS }],
        path: pathRoute.audit.failedLoginAttemps,
        private: true
      },
      {
        id: 'audit-blocked-users',
        component: BlockedUsers,
        layout: BaseLayout,
        modules: [],
        scopes: [{ action: ACTION.READ, subject: SUBJECT.AUDITS }],
        path: pathRoute.audit.blockedUsers,
        private: true
      }
    ],
    scopes: [{ action: ACTION.READ, subject: SUBJECT.AUDITS }],
    component: Audit,
    layout: BaseLayout,
    private: true,
    sidebar: true
  },
  {
    id: 'evidence',
    path: pathRoute.evidence,
    scopes: [
      { action: ACTION.READ, subject: SUBJECT.CALL_EVIDENCES },
      { action: ACTION.UPDATE, subject: SUBJECT.CALL_EVIDENCES }
    ],
    modules: [],
    component: Evidence,
    layout: EvidenceLayout,
    private: false,
    sidebar: false
  },
  {
    id: 'techniques',
    path: pathRoute.techniques,
    icon: FolderOpenIcon,
    i18Key: 'techniques',
    modules: [],
    scopes: [{ action: ACTION.READ, subject: SUBJECT.TECHNIQUES }],
    component: Techniques,
    layout: BaseLayout,
    private: true,
    sidebar: true
  },
  {
    id: 'technique',
    path: pathRoute.technique,
    icon: FolderOpenIcon,
    i18Key: 'techniques',
    modules: [],
    scopes: [{ action: ACTION.READ, subject: SUBJECT.TECHNIQUES }],
    component: Technique,
    layout: BaseLayout,
    private: true,
    sidebar: false
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
      },
      {
        id: 'demo-common',
        i18Key: 'demoCommon',
        path: pathRoute.demo.common,
        modules: [],
        scopes: [],
        component: DemoCommon,
        layout: BaseLayout,
        private: true,
        sidebar: true
      },

      {
        id: 'demo-imageEditor',
        i18Key: 'demoImageEditor',
        path: pathRoute.demo.imageEditor,
        modules: [],
        scopes: [],
        component: ImageEditor,
        layout: BaseLayout,
        private: true,
        sidebar: true
      },

      {
        id: 'demo-efra',
        i18Key: 'demoImageEditor',
        path: '/demo/efra',
        modules: [],
        scopes: [],
        component: DemoEfra,
        layout: FullScreenLayout
      },
      {
        id: 'demo-video-player',
        i18Key: 'demoVideoPlayer',
        path: pathRoute.demo.videoPlayer,
        modules: [],
        scopes: [],
        component: VideoPlayer,
        layout: BaseLayout,
        private: true,
        sidebar: true
      },
      {
        id: 'demo-text-editor',
        i18Key: 'demoTextEditor',
        path: pathRoute.demo.textEditor,
        modules: [],
        scopes: [],
        component: RichTextEditor,
        layout: BaseLayout,
        private: false,
        sidebar: true
      },
      {
        id: 'demo-evidence-view',
        path: pathRoute.demo.evidenceView,
        modules: [],
        scopes: [],
        component: EvidenceViewDemo,
        layout: BaseLayout,
        private: false,
        sidebar: true
      }
    ],
    scopes: [],
    component: DemoSystem,
    layout: BaseLayout,
    private: false,
    sidebar: false
  }
]

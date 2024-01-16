import { LazyExoticComponent, ReactElement, lazy } from 'react'
import { ACTION, SUBJECT } from 'context/Ability'

import {
  UserGroupIcon,
  BeakerIcon,
  IdentificationIcon,
  UsersIcon,
  ComputerDesktopIcon,
  FolderOpenIcon
} from '@heroicons/react/24/outline'
import { WifiIcon } from '@heroicons/react/24/solid'

import { AuditIcon } from 'assets/SVG'

import SignIn from 'views/Auth/SignIn'
import Presentation from 'views/Presentation'

import BaseLayout from 'layout/BaseLayout'
import EvidenceLayout from 'layout/EvidenceLayout'
import FullScreenLayout from 'layout/FullScreenLayout'
import { Layout } from 'types/layout'
import { sidebarMessages } from 'globalMessages'

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
  component: (() => ReactElement) | LazyExoticComponent<any>
  layout: ({ children }: Layout) => ReactElement
  private?: boolean
  sidebar?: boolean
  fallbackWithBg?: boolean
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
    history: '/monitoreo/historial',
    evidence: '/monitoreo/historial/evidencia'
  },
  acquisition: {
    acquisitionMedium: '/medios-adquisicion',
    verificationLine: '/medios-adquisicion/lineas-de-verificacion'
  },
  techniques: {
    many: '/tecnicas',
    one: '/tecnicas/:id',
    evidence: '/tecnicas/:id/evidencia'
  },
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
    layout: FullScreenLayout,
    fallbackWithBg: true
  },
  {
    id: 'restore-password',
    path: pathRoute.auth.restorePassword,
    modules: [],
    scopes: [],
    component: lazy(async () => await import('views/Auth/RestorePassword')),
    layout: FullScreenLayout,
    fallbackWithBg: true
  },
  {
    id: 'mi-cuenta',
    path: pathRoute.auth.userAccount,
    modules: [],
    scopes: [{ action: ACTION.READ, subject: SUBJECT.ME }],
    component: lazy(async () => await import('views/Auth/UserAccount')),
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
    component: lazy(async () => await import('views/UsersAdmin')),
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
    component: lazy(async () => await import('views/WorkGroups')),
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
    component: lazy(async () => await import('views/Roles')),
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
        component: lazy(async () => await import('views/Config/Media')),
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
        component: lazy(async () => await import('views/Config/Telecom')),
        layout: BaseLayout,
        modules: [],
        scopes: [],
        path: pathRoute.config.telecom,
        private: true
      }
    ],
    scopes: [],
    layout: BaseLayout,
    component: lazy(async () => await import('views/Config')),
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
    component: lazy(async () => await import('views/CallsHistory')),
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
    component: lazy(async () => await import('views/Monitoring')),
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
        component: lazy(
          async () => await import('views/Acquisition/Verification')
        ),
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
    component: lazy(async () => await import('views/Acquisition')),
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
        component: lazy(
          async () => await import('views/Audit/FailedLoginAttemps')
        ),
        layout: BaseLayout,
        modules: [],
        scopes: [{ action: ACTION.READ, subject: SUBJECT.AUDITS }],
        path: pathRoute.audit.failedLoginAttemps,
        private: true
      },
      {
        id: 'audit-blocked-users',
        component: lazy(async () => await import('views/Audit/BlockedUsers')),
        layout: BaseLayout,
        modules: [],
        scopes: [{ action: ACTION.READ, subject: SUBJECT.AUDITS }],
        path: pathRoute.audit.blockedUsers,
        private: true
      }
    ],
    scopes: [{ action: ACTION.READ, subject: SUBJECT.AUDITS }],
    component: lazy(async () => await import('views/Audit')),
    layout: BaseLayout,
    private: true,
    sidebar: true
  },
  {
    id: 'technique-evidence',
    path: pathRoute.techniques.evidence,
    scopes: [
      { action: ACTION.READ, subject: SUBJECT.CALL_EVIDENCES },
      { action: ACTION.UPDATE, subject: SUBJECT.CALL_EVIDENCES }
    ],
    modules: [],
    // TODO: Confirmar si es buena opcion cargarla async
    component: lazy(async () => await import('views/Evidence')),
    layout: EvidenceLayout,
    private: false,
    sidebar: false
  },
  {
    id: 'monitoring-evidence',
    path: pathRoute.monitoring.evidence,
    scopes: [
      { action: ACTION.READ, subject: SUBJECT.CALL_EVIDENCES },
      { action: ACTION.UPDATE, subject: SUBJECT.CALL_EVIDENCES }
    ],
    modules: [],
    component: lazy(async () => await import('views/Evidence')),
    layout: EvidenceLayout,
    private: false,
    sidebar: false
  },
  {
    id: 'techniques',
    path: pathRoute.techniques.many,
    icon: FolderOpenIcon,
    i18Key: 'techniques',
    modules: [],
    scopes: [{ action: ACTION.READ, subject: SUBJECT.TECHNIQUES }],
    component: lazy(async () => await import('views/Techniques')),
    layout: BaseLayout,
    private: true,
    sidebar: true
  },
  {
    id: 'technique',
    path: pathRoute.techniques.one,
    icon: FolderOpenIcon,
    i18Key: 'techniques',
    modules: [],
    scopes: [{ action: ACTION.READ, subject: SUBJECT.TECHNIQUES }],
    component: lazy(async () => await import('views/Technique')),
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
        component: lazy(async () => await import('views/Demo/Chart')),
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
        component: lazy(async () => await import('views/Demo/Form')),
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
        component: lazy(async () => await import('views/Demo/AutoForm')),
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
        component: lazy(async () => await import('views/Demo/Wavesurfer')),
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
        component: lazy(async () => await import('views/Demo/Common')),
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
        component: lazy(async () => await import('views/Demo/ImageEditor')),
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
        component: lazy(async () => await import('views/Demo/efra')),
        layout: FullScreenLayout
      },
      {
        id: 'demo-video-player',
        i18Key: 'demoVideoPlayer',
        path: pathRoute.demo.videoPlayer,
        modules: [],
        scopes: [],
        component: lazy(async () => await import('views/Demo/VideoPlayer')),
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
        component: lazy(async () => await import('views/Demo/RichTextEditor')),
        layout: BaseLayout,
        private: false,
        sidebar: true
      },
      {
        id: 'demo-evidence-view',
        path: pathRoute.demo.evidenceView,
        modules: [],
        scopes: [],
        component: lazy(
          async () => await import('views/Demo/EvidenceViewDemo')
        ),
        layout: BaseLayout,
        private: false,
        sidebar: true
      }
    ],
    scopes: [],
    component: lazy(async () => await import('views/Demo/System')),
    layout: BaseLayout,
    private: false,
    sidebar: false
  }
]

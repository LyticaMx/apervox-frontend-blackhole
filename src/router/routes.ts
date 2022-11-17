import { ReactElement } from 'react'
import { Bars3Icon } from '@heroicons/react/24/outline'

import Home from 'views/Home'

import BaseLayout from 'layout/BaseLayout'
import { Layout } from 'types/layout'
import { sidebarMessages } from 'messages'

/* DEV */
import DemoSystem from 'views/Demo/System'
import DemoCharts from 'views/Demo/Chart'
import DemoForm from 'views/Demo/Form'
import DemoWavesurfer from 'views/Demo/Wavesurfer'
import DemoTranscription from 'views/Demo/Transcription'
import SignIn from 'views/Auth/SignIn'
import AuthLayout from 'layout/AuthLayout'
import SignUp from 'views/Auth/SingUp'
import SingUpLayout from 'layout/SingUpLayout'

export interface Route {
  id: string
  i18Key?: keyof typeof sidebarMessages
  i18ModuleKey?: keyof typeof sidebarMessages
  path: string
  modules: Route[] // For Submodules in the menu (coming son...)
  icon?: any
  scopes: string[] // permissions for access to route => "admin, superadmin..."
  component: () => ReactElement
  layout: ({ children }: Layout) => ReactElement
  private?: boolean
  sidebar?: boolean
}

export const pathRoute = {
  home: '/',
  auth: {
    signIn: '/sign-in',
    signUp: '/sign-up'
  },
  pins: '/pins',
  speakers: {
    dashboard: '/speaker-dashboard',
    directory: '/speaker-directory'
  },
  calls: {
    index: '/calls',
    detail: '/call-detail',
    detailOne: '/detail-one',
    detailTwo: '/detail-Two'
  },
  comparisons: '/comparisons',
  receiverAudio: '/reseiver-audio',
  senderAudio: '/sender-audio',
  controlGroups: '/control-groups',
  demo: {
    chart: '/demo-charts',
    form: '/demo-form',
    system: '/demo-system',
    wavesurfer: '/demo-wavesurfer',
    transcription: '/demo-transcription'
  }
}

export const routes: Route[] = [
  {
    id: 'sign-in',
    path: pathRoute.auth.signIn,
    modules: [],
    icon: Bars3Icon,
    scopes: [],
    component: SignIn,
    layout: AuthLayout,
    private: false
  },
  {
    id: 'sign-up',
    path: pathRoute.auth.signUp,
    modules: [],
    icon: Bars3Icon,
    scopes: [],
    component: SignUp,
    layout: SingUpLayout,
    private: false
  },
  {
    id: 'home',
    path: pathRoute.home,
    i18Key: 'dashboard',
    modules: [],
    icon: Bars3Icon,
    scopes: [],
    component: Home,
    layout: BaseLayout,
    private: true,
    sidebar: true
  },
  /* Siempre abajo */
  {
    id: 'demo',
    path: pathRoute.demo.system,
    icon: Bars3Icon,
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
        private: false,
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
        private: false,
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
        private: false,
        sidebar: true
      },
      {
        id: 'demo-trans',
        i18Key: 'demoTranscription',
        path: pathRoute.demo.transcription,
        modules: [],
        scopes: [],
        component: DemoTranscription,
        layout: BaseLayout,
        private: false,
        sidebar: true
      }
    ],
    scopes: [],
    component: DemoSystem,
    layout: BaseLayout,
    private: false,
    sidebar: true
  }
]

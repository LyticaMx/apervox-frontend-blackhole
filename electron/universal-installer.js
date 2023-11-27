/* eslint-disable no-template-curly-in-string */
const builder = require('electron-builder')

const buildConfig = {
  appId: 'com.octopy.blackhole',
  artifactName: '${productName}_${version}_Setup.${ext}',
  files: ['build/**/*', 'public/electron-starter.js'],
  directories: {
    buildResources: 'assets'
  },
  forceCodeSigning: false,
  mac: {
    // icon: paths.resolveApp('app/public/logo.png'),
    category: 'public.app-category.utilities'
  },
  win: {
    target: ['nsis', 'portable']
    // icon: paths.resolveApp('app/public/logo.png')
  },
  nsis: {
    oneClick: false,
    perMachine: false,
    allowToChangeInstallationDirectory: true
  },
  linux: {
    target: ['deb', 'dir'],
    maintainer: 'Alfredo González'
    // icon: paths.resolveApp('app/public/logo.png')
  },
  extraMetadata: {
    main: 'build/electron.js'
  },
  extends: null
}

builder
  .build({ config: buildConfig })
  .then((res) => {
    console.log(res)
  })
  .catch((e) => {
    console.error(e)
  })

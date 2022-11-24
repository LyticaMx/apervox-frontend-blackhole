export const config = {
  appConfig: {
    virtualizedTableOverscan:
      parseInt(process.env.REACT_APP_VIRTUALIZED_TABLE_OVERSCAN ?? '', 10) ||
      10,
    timePerTranscriptionPage:
      parseInt(process.env.REACT_APP_TIME_PER_TRANSCRIPTION_PAGE ?? '', 10) ||
      30,
    itemsPerTranscriptionPage:
      parseInt(process.env.REACT_APP_ITEMS_PER_TRANSCRIPTION_PAGE ?? '', 10) ||
      9
  },
  endpoints: {
    mainBackendUrl: process.env.REACT_APP_MAIN_BACKEND_URL ?? 'http://localhost'
  }
}

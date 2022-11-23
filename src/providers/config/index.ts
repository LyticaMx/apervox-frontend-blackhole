export const config = {
  appConfig: {
    virtualizedTableOverscan:
      parseInt(
        process.env.REACT_APP_VIRTUALIZED_TABLE_OVERSCAN as string,
        10
      ) || 10
  },
  endpoints: {}
}

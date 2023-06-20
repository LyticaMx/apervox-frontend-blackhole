import { ReactElement, useEffect, useMemo } from 'react'
import { Country, State, City } from 'country-state-city'
import { Breakpoints } from 'types/form'
import Grid from 'components/Grid'
import SelectField from '../Select'

export interface Props {
  countryName?: string
  countryLabel?: string
  countryPlaceholder?: string
  countryBreakpoints?: Breakpoints
  countryError?: boolean
  countryHelperText?: string
  stateName?: string
  stateLabel?: string
  statePlaceholder?: string
  stateBreakpoints?: Breakpoints
  stateError?: boolean
  stateHelperText?: string
  cityName?: string
  cityLabel?: string
  cityPlaceholder?: string
  cityBreakpoints?: Breakpoints
  cityError?: boolean
  cityHelperText?: string
  country: string
  state: string
  city: string
  onChange: (field: string, value: string) => void
  className?: string
  optionsContainerClassname?: string
  disabled?: boolean
}

const CitySelector = (props: Props): ReactElement => {
  const states = useMemo(
    () => State.getStatesOfCountry(props.country),
    [props.country]
  )
  const cities = useMemo(
    () => City.getCitiesOfState(props.country, props.state),
    [props.country, props.state]
  )

  useEffect(() => {
    if (props.state) props.onChange(props.stateName ?? 'state', '')
  }, [props.country])

  useEffect(() => {
    if (props.city) props.onChange(props.cityName ?? 'city', '')
  }, [props.state])

  return (
    <>
      <Grid item xs={12} {...props.countryBreakpoints}>
        <SelectField
          label={props.countryLabel}
          placeholder={props.countryPlaceholder}
          value={props.country}
          onChange={(val) =>
            props.onChange(props.countryName ?? 'country', val)
          }
          textField="name"
          valueField="isoCode"
          items={Country.getAllCountries()}
          error={props.countryError}
          helperText={props.countryHelperText}
          optionsContainerClassname={props.optionsContainerClassname}
        />
      </Grid>
      <Grid item xs={12} {...props.stateBreakpoints}>
        <SelectField
          label={props.stateLabel}
          placeholder={props.statePlaceholder}
          value={props.state}
          onChange={(val) => props.onChange(props.stateName ?? 'state', val)}
          textField="name"
          valueField="isoCode"
          items={states}
          error={props.stateError}
          helperText={props.countryHelperText}
          optionsContainerClassname={props.optionsContainerClassname}
        />
      </Grid>
      <Grid item xs={12} {...props.cityBreakpoints}>
        <SelectField
          label={props.cityLabel}
          placeholder={props.cityPlaceholder}
          value={props.city}
          onChange={(val) => props.onChange(props.cityName ?? 'city', val)}
          textField="name"
          valueField="name"
          items={cities}
          error={props.cityError}
          helperText={props.cityHelperText}
          optionsContainerClassname={props.optionsContainerClassname}
        />
      </Grid>
    </>
  )
}

CitySelector.DefaultProps = {
  countryName: 'country',
  stateName: 'state',
  cityName: 'city'
}

export default CitySelector
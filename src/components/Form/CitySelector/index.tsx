import { ReactElement, useMemo } from 'react'
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
  onTouched?: (field: string) => void
  className?: string
  optionsContainerClassname?: string
  disabled?: boolean
}

const CitySelector = ({
  countryName = 'country',
  stateName = 'state',
  cityName = 'city',
  ...props
}: Props): ReactElement => {
  const states = useMemo(
    () => State.getStatesOfCountry(props.country),
    [props.country]
  )
  const cities = useMemo(
    () => City.getCitiesOfState(props.country, props.state),
    [props.country, props.state]
  )

  return (
    <>
      <Grid item xs={12} {...props.countryBreakpoints}>
        <SelectField
          label={props.countryLabel}
          placeholder={props.countryPlaceholder}
          value={props.country ?? ''}
          onChange={(val) => {
            props.onChange(countryName, val)
            props.onChange(stateName, '')
            props.onChange(cityName, '')
          }}
          onTouched={() => props.onTouched?.(countryName)}
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
          value={props.state ?? ''}
          onChange={(val) => {
            props.onChange(stateName, val)
            props.onChange(cityName, '')
          }}
          onTouched={() => props.onTouched?.(stateName)}
          textField="name"
          valueField="isoCode"
          items={states}
          error={props.stateError}
          helperText={props.stateHelperText}
          optionsContainerClassname={props.optionsContainerClassname}
        />
      </Grid>
      <Grid item xs={12} {...props.cityBreakpoints}>
        <SelectField
          label={props.cityLabel}
          placeholder={props.cityPlaceholder}
          value={props.city ?? ''}
          onChange={(val) => props.onChange(cityName, val)}
          onTouched={() => props.onTouched?.(cityName)}
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

export default CitySelector

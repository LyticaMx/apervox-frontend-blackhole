import { Float } from '@headlessui-float/react'
import { Popover } from '@headlessui/react'
import { AdjustmentsVerticalIcon } from '@heroicons/react/24/outline'
import Form from 'components/Form'
import TextField from 'components/Form/Textfield'
import Grid from 'components/Grid'
import Typography from 'components/Typography'
import { FormikConfig, FormikContextType } from 'formik'
import { actionsMessages, generalMessages } from 'globalMessages'
import { ReactElement, useMemo, useRef, useState } from 'react'
import { useIntl } from 'react-intl'
import { Field } from 'types/form'
import { OnChangeTableFilter, TableFilterOption } from 'types/table'
import { ReadOnlyNonEmptyArray } from 'types/utils'
import { normalizeString } from 'utils/normalizeString'

interface Props {
  optionsTitle?: string
  options: ReadOnlyNonEmptyArray<TableFilterOption>
  onChange: OnChangeTableFilter
}

interface FormValues {
  filters: string[]
}

const StaticFilter = (props: Props): ReactElement => {
  const { onChange, options, optionsTitle } = props
  const [openFilter, setOpenFilter] = useState<boolean>(false)
  const [inputSearch, setInputSearch] = useState<string>('')
  const { formatMessage } = useIntl()

  const fields: Array<Field<FormValues>> = useMemo<
    Array<Field<FormValues>>
  >(() => {
    const query = normalizeString(inputSearch)
    const newOptions =
      inputSearch === ''
        ? options
        : options.filter((option) =>
            normalizeString(option.name).includes(query)
          )
    return newOptions.map<Field<FormValues>>((option, index) => ({
      type: 'checkbox' as any,
      name: 'filters',
      options: {
        label: option.name,
        value: option.value,
        id: `${option.name}-${index}`
      }
    }))
  }, [options, inputSearch])

  const formikRef = useRef<FormikContextType<FormValues>>()

  const formikConfig: FormikConfig<FormValues> = {
    // se utilizan los últimos valores de los formularios como valores iniciales
    initialValues: { filters: formikRef.current?.values.filters ?? [] },
    onSubmit: async (values) => {
      formikRef.current?.resetForm({
        values
      })
      await onChange(values.filters)
    }
  }

  return (
    <Popover>
      <Float
        show={openFilter}
        placement="bottom-start"
        offset={15}
        shift={6}
        flip={10}
        portal
        enter="transition duration-200 ease-out"
        enterFrom="opacity-0 -translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition duration-150 ease-in"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 -translate-y-1"
      >
        <Popover.Button
          as="div"
          className="ml-1 h-4"
          onClick={(e) => {
            setOpenFilter((old) => !old)
          }}
        >
          <button className="text-gray-300 hover:text-primary">
            <AdjustmentsVerticalIcon className="w-4 h-4" />
          </button>
        </Popover.Button>
        <Popover.Panel
          static
          className="bg-white border-gray-200 rounded-md shadow-lg focus:outline-none z-10 max-w-sm"
          onClick={(e) => e.stopPropagation()}
        >
          <Grid spacing={2} className="p-4">
            <Grid item cols={7}>
              <Typography
                className="text-secondary text-lg uppercase"
                style="bold"
              >
                {formatMessage(generalMessages.filters)}
              </Typography>
            </Grid>
            <Grid item cols={5} className="flex max-h-6 items-start">
              <button
                className="text-primary mr-2 flex-none"
                onClick={() => {
                  formikRef.current?.resetForm({
                    values: {
                      filters: []
                    }
                  })
                }}
                type="button"
              >
                {formatMessage(actionsMessages.clean)}
              </button>
              <div className="w-1 inline h-6 bg-[#00000029] rounded-md" />
              <button
                className="text-primary ml-2"
                onClick={() => {
                  formikRef.current?.submitForm()
                  setOpenFilter(false)
                }}
                type="submit"
              >
                {formatMessage(actionsMessages.apply)}
              </button>
            </Grid>
            <Grid item cols={12}>
              {optionsTitle && (
                <Typography variant="body1" style="semibold" className="mb-2">
                  {optionsTitle}
                </Typography>
              )}
              <TextField
                value={inputSearch}
                onChange={(e) => setInputSearch(e.target.value)}
                className="mb-2"
              />
              <Form
                fields={fields}
                formikConfig={formikConfig}
                formikRef={formikRef}
                renderSubmitButton={false}
              />
            </Grid>
          </Grid>
        </Popover.Panel>
      </Float>
    </Popover>
  )
}

export default StaticFilter

import { ReactElement, useEffect, useMemo, useRef } from 'react'
import { Cog8ToothIcon } from '@heroicons/react/24/outline'
import { Popover } from '@headlessui/react'
import { Float } from '@headlessui-float/react'
import Grid from 'components/Grid'
import Typography from 'components/Typography'
import { Table, VisibilityState } from '@tanstack/react-table'
import { useFormik } from 'formik'
import { useIntl } from 'react-intl'
import { tableConfigurationMessages } from '../messages'
import { actionsMessages, generalMessages } from 'globalMessages'
import { useLanguage } from 'context/Language'
import Tooltip from 'components/Tooltip'
import { useAutoCloseDialog } from 'hooks/useAutoCloseDialog'

interface Props<T> {
  table: Table<T>
  onChangeColumnVisibility: (disabledColumns: VisibilityState) => void
}

const TableConfiguration = <DataType,>(
  props: Props<DataType>
): ReactElement | null => {
  const { table, onChangeColumnVisibility } = props

  const {
    open: openTableConfiguration,
    setOpen: setOpenTableConfiguration,
    popoverRef
  } = useAutoCloseDialog()
  const { localeI18n } = useLanguage()
  const { formatMessage } = useIntl()

  const columnsCanBeHidden = useMemo(
    () =>
      table
        .getAllLeafColumns()
        .filter(
          (column) =>
            column.columnDef.enableHiding !== false &&
            column.columnDef.header !== ' ' &&
            column.columnDef.header !== ''
        ),
    [table, localeI18n]
  )

  const initialValuesRef = useRef<VisibilityState>(
    columnsCanBeHidden.reduce((carry, column) => {
      carry[column.id] = column.getIsVisible()
      return carry
    }, {})
  )

  const formik = useFormik({
    initialValues: initialValuesRef.current,
    enableReinitialize: true,
    onSubmit: (values) => {
      onChangeColumnVisibility(
        Object.keys(values).reduce((carry, key) => {
          if (!values[key]) carry[key] = false
          return carry
        }, {})
      )
    }
  })

  const canDisableMore = useMemo<boolean>(
    () =>
      Object.keys(formik.values).reduce(
        (carry, key) => (formik.values[key] ? carry + 1 : carry),
        0
      ) > 1,
    [JSON.stringify(formik.values)]
  )

  useEffect(() => {
    if (
      openTableConfiguration &&
      JSON.stringify(initialValuesRef.current) !== JSON.stringify(formik.values)
    ) {
      // Hayar condición para que no se repita este reduce
      const newInitialValues = columnsCanBeHidden.reduce((carry, column) => {
        carry[column.id] = column.getIsVisible()
        return carry
      }, {})

      if (
        JSON.stringify(initialValuesRef.current) !==
        JSON.stringify(newInitialValues)
      ) {
        formik.resetForm({ values: newInitialValues })
      }
    }
  }, [openTableConfiguration])

  if (columnsCanBeHidden.length === 0) return null

  return (
    <Popover>
      <Float
        show={openTableConfiguration}
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
        <Popover.Group>
          <Tooltip
            content={formatMessage(actionsMessages.configureTable)}
            floatProps={{ offset: 10, arrow: true }}
            classNames={{
              panel:
                'bg-secondary text-white py-1 px-2 rounded-md text-sm whitespace-nowrap',
              arrow: 'absolute bg-white w-2 h-2 rounded-full bg-secondary'
            }}
            placement="top"
          >
            <Popover.Button
              as="div"
              onClick={() => setOpenTableConfiguration((old) => !old)}
            >
              <button className="text-primary">
                <Cog8ToothIcon className="h-4 w-4" />
              </button>
            </Popover.Button>
          </Tooltip>
        </Popover.Group>
        <Popover.Panel className="bg-white border-gray-200 rounded-md shadow-lg focus:outline-none z-10 max-w-sm">
          <div ref={popoverRef}>
            <form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
              <Grid className="p-4" spacing={2}>
                <Grid item cols={7}>
                  <Typography
                    className="text-secondary text-lg uppercase"
                    style="bold"
                  >
                    {formatMessage(tableConfigurationMessages.title)}
                  </Typography>
                </Grid>
                <Grid item cols={5} className="flex max-h-6 items-center">
                  <button
                    className="text-primary mr-2 flex-none"
                    onClick={() => {
                      onChangeColumnVisibility({})
                      formik.resetForm({ values: initialValuesRef.current })
                      setOpenTableConfiguration(false)
                    }}
                    type="button"
                  >
                    {formatMessage(actionsMessages.reset)}
                  </button>
                  <div className="border border-gray-400 rounded-lg h-4" />
                  <button
                    className="text-primary ml-2"
                    onClick={() => setOpenTableConfiguration(false)}
                    type="submit"
                  >
                    {formatMessage(actionsMessages.apply)}
                  </button>
                </Grid>
                <Grid item cols={12}>
                  <Typography
                    variant="caption"
                    className="text-secondary opacity-50"
                  >
                    {formatMessage(generalMessages.columns)}
                  </Typography>

                  {columnsCanBeHidden.map((column, index) => (
                    <div key={column.id}>
                      <label
                        htmlFor={`${column.id}-${index + 1}`}
                        className="cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          className="rounded disabled:bg-gray-400 disabled:hover:bg-gray-400"
                          id={`${column.id}-${index + 1}`}
                          name={column.id}
                          checked={formik.values[column.id]}
                          onChange={formik.handleChange}
                          disabled={!canDisableMore && formik.values[column.id]}
                        />
                        <span className="ml-2 select-none">
                          {column.columnDef.header as string}
                        </span>
                      </label>
                    </div>
                  ))}
                </Grid>
              </Grid>
            </form>
          </div>
        </Popover.Panel>
      </Float>
    </Popover>
  )
}

export default TableConfiguration

import { useState, ReactElement, useRef } from 'react'

import Checkbox from 'components/Form/Checkbox'
import Daterangepicker from 'components/Form/Daterangepicker'
import Radio from 'components/Form/Radio'
import Filter, { InputType } from 'components/Filter'
import DragDrop from 'components/Form/DragDrop'
import Divider from 'components/Divider'
import Switch from 'components/Form/Switch'
import TextField from 'components/Form/Textfield'
import SelectPaginate from './SelectPaginate'
import MultiChip from 'components/Form/Selectmultiple/MultiChip'
import Form from 'components/Form'
import { FormikConfig, FormikContextType } from 'formik'

const initialChipItems = [
  { value: '1', text: 'This ir my value 1' },
  { value: '2', text: 'This ir my value 2' },
  { value: '3', text: 'This ir my value 3' },
  { value: '4', text: 'This ir my value 4' },
  { value: '5', text: 'This ir my value 5' }
]

interface ChipItem {
  value: string
  text: string
}

interface FormValues {
  multiChip: ChipItem[]
}

const DemoForm = (): ReactElement => {
  const [dates, setDates] = useState<[Date?, Date?]>([])
  const [enable, setEnable] = useState(false)

  const [multiChipItems, setMultiChipItems] = useState(initialChipItems)
  const [chipSelected, setChipSelected] = useState([])

  const formRef = useRef<FormikContextType<FormValues>>()

  const formikConfig: FormikConfig<FormValues> = {
    initialValues: { multiChip: [] },
    onSubmit: async (values) => {
      console.log(values)
    }
  }

  const items = [
    {
      title: 'Text',
      name: 'text',
      type: 'text' as InputType,
      wrap: false,
      props: { placeholder: 'Nombre de hablante' }
    },
    {
      title: 'Datepicker',
      type: 'datepicker' as InputType,
      name: 'datepicker',
      description: 'descripcion',
      props: {
        minDate: '2022-10-10',
        maxDate: '2022-10-15'
      }
    },
    {
      title: 'Select',
      type: 'select' as InputType,
      name: 'select',
      props: {
        clearable: true
      },
      items: [
        { value: 1, text: 'efra' },
        { value: 2, text: 'cuadras' },
        { value: 3, text: 'gonzalez' }
      ]
    },
    {
      title: 'Autocomplete',
      type: 'autocomplete' as InputType,
      name: 'autocomplete',
      items: [
        { value: 1, text: 'efra' },
        { value: 2, text: 'cuadras' },
        { value: 3, text: 'gonzalez' }
      ]
    },
    {
      title: 'Checkbox',
      type: 'checkbox' as InputType,
      name: 'checkbox'
    },
    {
      title: 'Checkbox 2',
      name: 'checkbox2',
      items: [
        { label: 'Task a', description: 'descripcion', value: 'a' },
        { label: 'Task b', value: 'b' }
      ],
      type: 'checkbox' as InputType
    },
    {
      title: 'Radio',
      name: 'radio',
      items: [
        { label: 'Task a', description: 'descripcion', value: 'a' },
        { label: 'Task b', value: 'b' }
      ],
      type: 'radio' as InputType
    }
  ]

  return (
    <div>
      <Divider title="Field" />
      <TextField id="field" name="field" value="text" onChange={() => {}} />
      <TextField
        id="field"
        name="field"
        value="text"
        onChange={() => {}}
        multiline
        rows={2}
      />

      <Divider title="Date Range" />
      <Daterangepicker
        label="Datepicker range"
        value={dates}
        onChange={setDates}
        placeholder="Seleccionar fechas"
        clearable
      />
      <Divider title="Check" />
      <Checkbox
        id="prueba"
        name="prueba"
        value="prueba"
        onChange={console.log}
        label="Prueba"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
      />
      <Divider title="Radio" />
      <Radio
        id="prueba"
        name="prueba"
        value="prueba"
        onChange={console.log}
        label="Prueba"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
      />
      <Divider title="Switch" />
      <div className="flex gap-2 items-end">
        <Switch size="sm" color="indigo" value={enable} onChange={setEnable} />
        <Switch size="md" color="blue" value={enable} onChange={setEnable} />
        <Switch size="lg" color="teal" value={enable} onChange={setEnable} />
      </div>
      <Divider title="Filter" />
      <Filter
        items={items}
        onSubmit={console.log}
        initialValues={{ radio: 'a' }}
      />
      <Divider title="Drag" />
      <DragDrop onChange={console.log} accept={{ 'image/*': [] }} />
      <Divider title="Select paginate" />
      <SelectPaginate />
      <Divider title="Multi Chip Select" />
      <MultiChip
        label="Chip selector"
        selected={chipSelected}
        onChange={setChipSelected}
        onNewOption={(newOption: string) =>
          setMultiChipItems((prev) => [
            ...prev,
            { value: newOption, text: newOption }
          ])
        }
        items={multiChipItems}
      />
      <Divider title="Form component" />
      <Form
        formikConfig={formikConfig}
        fields={[
          {
            name: 'multi-chip',
            type: 'multi-chip-select',
            options: {
              items: multiChipItems
            }
          }
        ]}
        renderSubmitButton={false}
        formikRef={formRef}
      />
      <button
        className="text-primary ml-2"
        onClick={() => formRef.current?.submitForm()}
        type="submit"
      >
        Submit
      </button>
    </div>
  )
}

export default DemoForm

import { useState, ReactElement } from 'react'

import Checkbox from 'components/Form/Checkbox'
import Daterangepicker from 'components/Form/Daterangepicker'
import Radio from 'components/Form/Radio'
import Filter, { InputType } from 'components/Filter'
import DragDrop from 'components/Form/DragDrop'
import Divider from 'components/Divider'
import Switch from 'components/Form/Switch'
import TextField from 'components/Form/Textfield'
import SelectPaginate from './SelectPaginate'

const DemoForm = (): ReactElement => {
  const [dates, setDates] = useState<[Date?, Date?]>([])
  const [enable, setEnable] = useState(false)

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
    </div>
  )
}

export default DemoForm

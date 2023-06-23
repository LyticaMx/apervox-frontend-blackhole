import * as yup from 'yup'
import { useIntl } from 'react-intl'
import { ReactElement } from 'react'
import { formMessages } from 'globalMessages'
import { Field, Section } from 'types/form'
import AccordionForm from './AccordionForm'
import { useAddressForm, AddressFormValues } from './useAddressForm'
import {
  targetFormsGeneralMessages,
  scheduleFormMessages
} from 'views/Technique/messages'

interface FormValues extends AddressFormValues {
  name: string
  phone: string
}

const ScheduleForm = (): ReactElement => {
  const { formatMessage } = useIntl()

  const { addressFields, addressValidationSchema } = useAddressForm('address')

  const fields: Array<Field<FormValues | AddressFormValues>> = [
    {
      type: 'text',
      name: 'name',
      options: {
        id: 'contact-name',
        label: formatMessage(scheduleFormMessages.name),
        placeholder: formatMessage(scheduleFormMessages.namePlaceholder)
      },
      breakpoints: { xs: 12, sm: 6, md: 4 }
    },
    {
      type: 'text',
      name: 'phone',
      options: {
        id: 'contact-phone',
        label: formatMessage(targetFormsGeneralMessages.phone),
        placeholder: formatMessage(targetFormsGeneralMessages.phonePlaceholder)
      },
      breakpoints: { xs: 12, sm: 6, md: 4 }
    },

    ...addressFields
  ]

  const validationSchema = yup
    .object({
      name: yup.string().required(formatMessage(formMessages.required)),
      phone: yup
        .string()
        .required(formatMessage(formMessages.required))
    })
    .concat(addressValidationSchema)

  const sections: Section[] = [
    {
      name: 'address',
      title: {
        text: formatMessage(scheduleFormMessages.address),
        className: 'text-primary uppercase mt-2'
      }
    }
  ]

  return (
    <div>
      <AccordionForm<FormValues | AddressFormValues>
        fields={fields}
        validationSchema={validationSchema}
        title={formatMessage(scheduleFormMessages.title).toUpperCase()}
        itemTitle={formatMessage(scheduleFormMessages.itemTitle)}
        withSections={{
          renderMainSection: true,
          sections
        }}
      />
    </div>
  )
}

export default ScheduleForm

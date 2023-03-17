import { StarIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import Typography from 'components/Typography'
import { FormikErrors, FormikTouched } from 'formik'
import { platformMessages } from 'globalMessages'
import { ReactElement, MouseEvent, useCallback } from 'react'
import { useIntl } from 'react-intl'
import { eventInformationMessages } from 'views/Evidence/messages'
import { FormValues } from '.'

interface Props {
  values: FormValues
  errors: FormikErrors<FormValues>
  touched: FormikTouched<FormValues>
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void
  setFieldTouched: (
    field: string,
    isTouched: boolean,
    shouldValidate?: boolean
  ) => void
}

const StarRating = (props: Props): ReactElement => {
  const { values, setFieldValue, errors, touched, setFieldTouched } = props
  const { formatMessage } = useIntl()

  const availableClassifications = [
    platformMessages.unseen,
    platformMessages.discarded,
    platformMessages.irrelevant,
    platformMessages.relevant
  ]

  const handleStarClick = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      const { name } = e.currentTarget
      if (!touched.classification) setFieldTouched('classification', true)
      setFieldValue('classification', name)
    },
    [touched, setFieldTouched, setFieldValue]
  )

  return (
    <div>
      <Typography variant="body2">
        {`${formatMessage(eventInformationMessages.starNumber, {
          count: 1,
          meaning: formatMessage(platformMessages.discarded)
        })}, ${formatMessage(eventInformationMessages.starNumber, {
          count: 2,
          meaning: formatMessage(platformMessages.irrelevant)
        })}, ${formatMessage(eventInformationMessages.starNumber, {
          count: 3,
          meaning: formatMessage(platformMessages.relevant)
        })}`}
      </Typography>
      <div
        className={clsx(
          'flex items-center justify-between mt-3 p-1',
          errors.classification && touched.classification
            ? 'border-2 border-red-500 rounded-md'
            : ''
        )}
      >
        <div className="my-2 group inline-flex">
          <button
            type="button"
            className={clsx(
              'text-secondary-gray group-hover:text-yellow-400 peer/one',
              +values.classification <= 3 && +values.classification > 0
                ? 'text-yellow-400'
                : ''
            )}
            onClick={handleStarClick}
            name="1"
          >
            <StarIcon className="w-6 h-6" />
          </button>
          <button
            type="button"
            className={clsx(
              'text-secondary-gray group-hover:text-yellow-400 peer/two peer-hover/one:text-secondary-gray',
              +values.classification <= 3 && +values.classification > 1
                ? 'text-yellow-400'
                : ''
            )}
            onClick={handleStarClick}
            name="2"
          >
            <StarIcon className="w-6 h-6" />
          </button>
          <button
            type="button"
            className={clsx(
              'text-secondary-gray group-hover:text-yellow-400 peer-hover/one:text-secondary-gray peer-hover/two:text-secondary-gray',
              +values.classification === 3 ? 'text-yellow-400' : ''
            )}
            onClick={handleStarClick}
            name="3"
          >
            <StarIcon className="w-6 h-6" />
          </button>
        </div>
        <Typography className="uppercase font-semibold text-primary">
          {formatMessage(availableClassifications[values.classification])}
        </Typography>
      </div>
      <Typography className="text-red-500" variant="caption">
        {errors.classification && touched.classification
          ? errors.classification
          : ''}
      </Typography>
    </div>
  )
}

// Encontrar porque al usar React.memo me regresa un objeto en lugar de la función
export default StarRating

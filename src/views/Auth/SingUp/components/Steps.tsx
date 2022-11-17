/* eslint-disable @typescript-eslint/indent */
/* eslint-disable multiline-ternary */
import { CheckIcon } from '@heroicons/react/24/outline'
import { ReactElement } from 'react'

export interface Step {
  id: string
  name: string
  status: string
}

interface Props {
  steps: Step[]
}

const Steps = ({ steps }: Props): ReactElement => {
  return (
    <nav aria-label="Progress">
      <ol
        role="list"
        className="divide-y divide-gray-300 rounded-md border border-gray-300 md:flex md:divide-y-0"
      >
        {steps
          ? steps.map((step, stepIdx) => (
              <li key={step.id} className="relative md:flex md:flex-1">
                {step.status === 'complete' ? (
                  <span className="flex items-center px-6 py-4 text-sm font-medium">
                    <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 group-hover:bg-blue-800">
                      <CheckIcon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </span>
                    <span className="ml-4 text-sm font-medium text-gray-900">
                      {step.name}
                    </span>
                  </span>
                ) : step.status === 'current' ? (
                  <div className="flex items-center px-6 py-4">
                    <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 border-blue-600">
                      <span className="text-blue-600">{stepIdx + 1}</span>
                    </span>
                    <span className="ml-4 text-sm font-medium text-blue-600">
                      {step.name}
                    </span>
                  </div>
                ) : (
                  <span className="flex items-center px-6 py-4 text-sm font-medium ">
                    <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 border-gray-300 group-hover:border-gray-400">
                      <span className="text-gray-500 group-hover:text-gray-900">
                        {stepIdx + 1}
                      </span>
                    </span>
                    <span className="ml-4 text-sm font-medium text-gray-500 group-hover:text-gray-900">
                      {step.name}
                    </span>
                  </span>
                )}
                {stepIdx !== steps.length - 1 ? (
                  <>
                    {/* Arrow separator for lg screens and up */}
                    <div
                      className="absolute top-0 right-0 hidden h-full w-5 md:block"
                      aria-hidden="true"
                    >
                      <svg
                        className="h-full w-full text-gray-300"
                        viewBox="0 0 22 80"
                        fill="none"
                        preserveAspectRatio="none"
                      >
                        <path
                          d="M0 -2L20 40L0 82"
                          vectorEffect="non-scaling-stroke"
                          stroke="currentcolor"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </>
                ) : null}
              </li>
            ))
          : null}
      </ol>
    </nav>
  )
}

export default Steps

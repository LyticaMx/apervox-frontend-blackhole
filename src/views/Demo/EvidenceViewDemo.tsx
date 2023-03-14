import { ReactElement } from 'react'
import { Link } from 'react-router-dom'
import { pathRoute } from 'router/routes'

const EvidenceViewDemo = (): ReactElement => {
  return (
    <div className="flex gap-2">
      {['image', 'audio', 'video', 'doc'].map((evidenceType) => (
        <Link
          key={evidenceType}
          to={{
            pathname: pathRoute.evidence,
            state: {
              type: evidenceType
            }
          }}
          className="border px-2 py-1 rounded-md transition-colors border-primary text-primary hover:text-white hover:bg-primary"
        >
          {`Tipo: ${evidenceType}`}
        </Link>
      ))}
    </div>
  )
}

export default EvidenceViewDemo

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  MagnifyingGlassMinusIcon,
  MagnifyingGlassPlusIcon
} from '@heroicons/react/24/outline'
import { ReactElement, useState } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import './style.css'

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`

interface Props {
  file: string
}
export const PDFViewer = (props: Props): ReactElement => {
  const [pageNumber, setPageNumber] = useState(1)
  const [numPages, setNumPages] = useState(1)
  const [file] = useState(props.file)
  const [scale, setScale] = useState(0.5)

  const handleLoadSuccess = ({ numPages }): void => {
    setNumPages(numPages)
  }
  const changePage = (offset: number): void => {
    setPageNumber((prev) => prev + offset)
  }

  const changeScale = (offset: number): void => {
    setScale((prev) => prev + offset)
  }

  const next = (): void => {
    changePage(1)
  }
  const prev = (): void => {
    changePage(-1)
  }

  const zoomOut = (): void => {
    changeScale(-0.5)
  }
  const zoomIn = (): void => {
    changeScale(0.5)
  }

  return (
    <div>
      <div className="flex flex-col items-center">
        <div className="mb-2">
          <Document
            file={file}
            onLoadSuccess={handleLoadSuccess}
            onLoadError={console.error}
            options={{
              workerSrc:
                'https://cdn.jsdelivr.net/npm/react-pdf@4.0.0-beta.5/dist/pdf.worker.entry.js'
            }}
          >
            <Page scale={scale} pageNumber={pageNumber} />
          </Document>
        </div>
        <div className="flex justify-center gap-2 items-center select-none">
          <span>Página</span>
          <button onClick={prev} disabled={pageNumber <= 1}>
            <ChevronLeftIcon className="w-4 h-4 text-muted" />
          </button>
          <div className="px-3 py-1 bg-background-secondary text-primary rounded-md text-sm">
            {pageNumber || (numPages ? 1 : '--')}/{numPages || '--'}
          </div>
          <button onClick={next} disabled={pageNumber >= numPages}>
            <ChevronRightIcon className="w-4 h-4 text-muted" />
          </button>
          <button type="button" disabled={scale <= 0.5} onClick={zoomOut}>
            <MagnifyingGlassMinusIcon className="w-5 h-5 text-muted" />
          </button>
          <button type="button" disabled={scale >= 2.0} onClick={zoomIn}>
            <MagnifyingGlassPlusIcon className="w-5 h-5 text-muted" />
          </button>
        </div>
      </div>
    </div>
  )
}

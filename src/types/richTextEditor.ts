interface Batch {
  baseVersion: number | null
  isLocal: boolean
  isTyping: boolean
  isUndo: boolean
  isUndoable: boolean
  operations: Operation[]
  addOperation: (operation: Operation) => Operation
}

interface Operation {
  baseVersion: number
  batch: Batch | null
  isDocumentOperation: Boolean
  type: string
  clone: () => Operation
  getReversed: () => Operation
  toJSON: () => any
}

interface History {
  lastOperation?: Operation
  version: number
  addOperation: (operation: Operation) => void
  getOperation: (baseVersion: number) => Operation | undefined
  getOperations: (
    fromBaseVersion: number[],
    toBaseVersion: number[]
  ) => Operation[]
  getUndoneOperation: (undoingOperation: Operation) => Operation | undefined
  isUndoingOperation: (operation: Operation) => boolean
  isUndoneOperation: (operation: Operation) => boolean
  reset: () => void
  setOperationAsUndone: (
    undoneOperation: Operation,
    undoingOperation: Operation
  ) => void
}

interface Document {
  getRoot: () => any // Este regresa el root del elemento del editor
  history: History
  model: Model
}

interface Position {
  index: number
  isAtEnd: boolean
  isAtStart: boolean
  nodeAfter: any | null
  nodeBefore: any | null
  offset: number
  parent: any
  path: number[]
  root: any
  stickiness: 'toNone' | 'toNext' | 'toPrevious'
  textNode: any
}

interface Range {
  end: Position
  isCollapsed: boolean
  isFlat: boolean
  root: any
  start: Position
}

interface MarkerData {
  affectsData: boolean
  managedUsingOperations: boolean
  range: Range | null
}

interface Marker {
  affectsData: any
  managedUsingOperations: any
  name: string
  getData: () => MarkerData
  getEnd: () => Position
  getRange: () => Range
  getStart: () => Position
  is: (type: string) => boolean
}

interface MarkerCollection {
  [Symbol.iterator]: () => Iterable<Marker>
  destroy: () => void
  get: (markerName: string) => Marker
  getMarkerAtPosition: (position: Position) => Iterable<Marker>
  getMarkersGroup: (prefix: string) => Iterable<Marker>
  getMarkersIntersectingRange: (range: Range) => Iterable<Marker>
  has: (markerOrName: string | Marker) => boolean
  update: (
    eventInfo: any,
    marker: Marker,
    oldRange: Range,
    newRange: Range,
    oldMarkerData: MarkerData
  ) => void
}

interface Model {
  document: Document
  markers: MarkerCollection
  schema: any // véase https://ckeditor.com/docs/ckeditor5/latest/api/module_engine_model_schema-Schema.html
  applyOperation: (operation: Operation) => void
  change: (callback: (writer: any) => any) => any
  createBatch: (type: {
    isUndoable: boolean
    isLocal: boolean
    isUndo: boolean
    isTyping: boolean
  }) => Batch
  // Para mas funciones de la clase Model véase https://ckeditor.com/docs/ckeditor5/latest/api/module_engine_model_model-Model.html
}

interface View {
  document: Document
  domConverter: any // por definir
  domRoots: Map<string, HTMLElement>
  hasDomSelection: boolean
  isRenderInProgress: boolean
  focus: () => void
  forceRender: () => void
  scrollToTheSelection: () => void
}

interface EditingController {
  view: View
  model: Model
}

interface Config {
  define: (name: string, value: any) => void
  get: (name: string) => any
  names: () => Iterable<string>
  set: (name: string, value: any) => void
}

export interface DecoupledEditor {
  config: Config
  editing: EditingController
  isReadOnly: boolean
  locale: any
  model: Model
  destroy: () => Promise<void>
  disableReadOnlyMode: (lockId: string) => void
  enableReadOnlyMode: (lockId: string) => void
  focus: () => void
  getData: (options?: {
    rootName?: string

    trim?: string
  }) => string
  setData: (data: string) => void
}

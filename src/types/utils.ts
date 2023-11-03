export type NonEmptyArray<T> = [T, ...T[]]
export type ReadOnlyNonEmptyArray<T> = readonly [T, ...T[]]
export type DocumentType = 'excel' | 'csv' | 'pdf' | 'word'
export type RowsQuantity = 'full' | 'page'

export type UniqueArray<T extends unknown[], U = T> = T extends []
  ? U
  : T extends [head: infer Head, ...rest: infer Tail]
  ? Head extends Tail[number]
    ? never
    : UniqueArray<Tail, U>
  : never

export type KeyofWithSymbol<T, S extends string> = keyof T extends string
  ? `${S}${keyof T}`
  : keyof T

export type NonEmptyArray<T> = [T, ...T[]]
export type ReadOnlyNonEmptyArray<T> = readonly [T, ...T[]]
export type DocumentType = 'xls' | 'csv' | 'pdf'

export type UniqueArray<T extends unknown[], U = T> = T extends []
  ? U
  : T extends [head: infer Head, ...rest: infer Tail]
  ? Head extends Tail[number]
    ? never
    : UniqueArray<Tail, U>
  : never

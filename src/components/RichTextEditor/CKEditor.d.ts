declare module '@ghostramses/ckeditor5-blackhole-custom-build/build/ckeditor' {
  export function create(
    sourceElementOrData: HTMLElement | string,
    config?: Config
  ): Promise<Editor>

  export interface Config {
    [key: string]: any
  }

  export interface EventInfo<EventName extends string> {
    readonly name: EventName
    readonly path: any[]
    readonly source: any[]
    return?: any

    off(): void
    stop(): void
  }

  export interface DecoupledEditor {
    readonly commands: any
    readonly config: any
    readonly conversion: any
    readonly data: any
    readonly editing: any
    readonly keystrokes: any
    readonly locale: any
    readonly model: any
    readonly plugins: any
    readonly state: 'initializing' | 'ready' | 'destroyed'

    isReadOnly: boolean

    delegate(events: string[]): any
    destroy(): Promise<void>
    execute(commandName: string, ...params: any[]): void
    fire(eventName: string, args?: any): any
    listenTo(
      emitter: any,
      eventName: string,
      callback: Function,
      options?: any
    ): void
    off(eventName: string, callback: Function): void
    on(eventName: string, callback: Function, options?: any): void
    once(eventName: string, callback: Function, options?: any): void
    stopListening(emitter: any, eventName: string, callback: Function): void
    t(...args: any[]): void

    [property: string]: any
  }

  export interface DataApi {
    getData(): string
    setData(data: string): void
  }

  export interface Editor extends DecoupledEditor, DataApi {}
}

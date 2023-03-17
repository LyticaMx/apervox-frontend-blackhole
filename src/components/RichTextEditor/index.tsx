import { MutableRefObject, ReactElement, useEffect, useRef } from 'react'
import Editor, {
  Editor as EditorInstance
} from '@ghostramses/ckeditor5-blackhole-custom-build/build/ckeditor'

interface Props {
  initialData: string
  editorRef: MutableRefObject<EditorInstance | null> // Referencia del editor
  className?: string
  textAreaClassName?: string
  readOnly?: boolean
}

const RichTextEditor = (props: Props): ReactElement => {
  const { className, textAreaClassName, initialData, editorRef, readOnly } =
    props
  const toolbarRef = useRef<HTMLDivElement>(null)
  const editorDiv = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!editorDiv.current || !toolbarRef.current) return
    editorDiv.current.innerHTML = initialData
    Editor.create(editorDiv.current, { initialData, language: 'en' })
      .then((editor) => {
        if (readOnly) editor.enableReadOnlyMode('readonly-editor')
        toolbarRef.current?.appendChild(editor.ui.view.toolbar.element)
        document.querySelector('.ck-toolbar')?.classList.add('ck-reset-all')
        editorRef.current = editor
      })
      .catch((error) => {
        console.error('Oops, something went wrong!')
        console.error(
          'Please, report the following error on https://github.com/ckeditor/ckeditor5/issues with the build id and the error stack trace:'
        )
        console.warn('Build id: xrb5bzcfnsuk-ric2rbvf6u7i')
        console.error(error)
      })
  }, [])

  return (
    <div className={className}>
      <div className="relative z-[2]" ref={toolbarRef} />
      <div className={textAreaClassName}>
        <div ref={editorDiv} />
      </div>
    </div>
  )
}

export default RichTextEditor

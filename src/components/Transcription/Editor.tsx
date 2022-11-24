import { ReactElement, useEffect, useRef, useState } from 'react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

interface Props {
  initialData: string
  currentInterval: string
  saveData: (string) => void
}

const Editor = (props: Props): ReactElement => {
  const { initialData = '', currentInterval, saveData } = props
  // CKEditor aún no tiene tipado (véase https://github.com/ckeditor/ckeditor5/issues/504)
  const [editor, setEditor] = useState<any>(null)
  const editorDiv = useRef<HTMLDivElement>(null)

  useEffect(() => {
    ClassicEditor.create(editorDiv.current, { initialData })
      .then((editor) => {
        setEditor(editor)
      })
      .catch((error: Error) => {
        console.error('Oops, something went wrong when creating editor')
        console.error(error)
      })
  }, [])

  useEffect(() => {
    if (!editor) return
    saveData(editor.getData())
    editor.setData(initialData)
  }, [initialData, currentInterval])

  return (
    <div>
      <div id="transcriptionEditor" ref={editorDiv} />
    </div>
  )
}

export default Editor

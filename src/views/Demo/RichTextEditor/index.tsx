import { Editor } from '@ghostramses/ckeditor5-blackhole-custom-build/build/ckeditor'
import Button from 'components/Button'
import RichTextEditorComponent from 'components/RichTextEditor'
import Typography from 'components/Typography'
import { ReactElement, useRef } from 'react'
import './RichTextEditor.css'

const RichTextEditor = (): ReactElement => {
  const editorRef = useRef<Editor>(null)

  return (
    <div>
      <Typography variant="title" style="bold" className="mb-4">
        Editor de texto enriquecido
      </Typography>
      <RichTextEditorComponent
        initialData="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque suscipit mi ac nisl congue, sed vestibulum sem varius. Aliquam dapibus quis lacus eu vehicula. Quisque efficitur libero vitae sodales dictum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Integer consequat, orci finibus scelerisque suscipit, magna urna pulvinar lacus, eu lacinia neque enim non tellus. Integer accumsan, ipsum eu sollicitudin gravida, felis purus dapibus erat, et luctus nisi ligula egestas mauris. Nam sed sagittis purus. Sed tempus in leo eu bibendum. Donec venenatis, ex quis congue posuere, felis arcu pharetra odio, in porta leo ligula vel nisl. Nulla ac est enim. Etiam at augue vel nisi placerat blandit."
        editorRef={editorRef}
        className="border mb-3"
        textAreaClassName="editor-demo"
      />
      <Button
        variant="contained"
        color="indigo"
        onClick={() => alert(editorRef.current?.getData())}
      >
        Obtener texto
      </Button>
    </div>
  )
}

export default RichTextEditor

import { ReactElement } from 'react'
import ImageEditorComponent from 'components/ImageEditor'

const ImageEditor = (): ReactElement => {
  return (
    <div>
      <ImageEditorComponent imageUrl="https://cl.buscafs.com/www.tomatazos.com/public/uploads/images/215018/215018_800x480.jpg" />
    </div>
  )
}

export default ImageEditor

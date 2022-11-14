import { WordCloud, WordCloudConfig } from '@ant-design/plots'
import { ReactElement } from 'react'

interface Props {
  data: any[]
  fields: {
    name: string
    value: string
  }
}

const WordCloudChart = ({ data, fields }: Props): ReactElement => {
  const config: WordCloudConfig = {
    data,
    wordField: fields.name,
    weightField: fields.value,
    colorField: fields.name,
    wordStyle: {
      fontFamily: 'Verdana',
      fontSize: [8, 32],
      rotation: 0
    },
    random: () => 0.5
  }

  return <WordCloud {...config} />
}

export default WordCloudChart

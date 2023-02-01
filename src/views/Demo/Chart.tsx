import { ReactElement, useState, useEffect } from 'react'

import BasicRadarChart from 'components/Charts/BasicRadar'
import ColumnChart from 'components/Charts/ColumnChart'
import GaugeChart from 'components/Charts/Gauge'
import LinearChart from 'components/Charts/Linear'
import LiquidChart from 'components/Charts/Liquid'
import PolarHeatmapChart from 'components/Charts/PolarHeatmap'
import RadialTreeChart from 'components/Charts/RadialTree'
import WordCloudChart from 'components/Charts/WordCloud'
import Accordion from 'components/Accordion'
import Card from 'components/Card'
import { ChartBarIcon } from '@heroicons/react/24/outline'
import HistogramChart from 'components/Charts/HistogramChart'
import Grid from 'components/Grid'
import Nodes from 'components/Charts/Nodes'

import dataNodes from 'dumy/fake_nodes.json'

const columnData = [
  {
    type: 'Uno',
    sales: 38
  },
  {
    type: 'Dos',
    sales: 52
  },
  {
    type: 'Tres',
    sales: 61
  },
  {
    type: 'Cuatro',
    sales: 145
  },
  {
    type: 'Cinco',
    sales: 48
  },
  {
    type: 'Seis',
    sales: 38
  },
  {
    type: 'Siete',
    sales: 38
  },
  {
    type: 'Ocho',
    sales: 38
  }
]

const radialTree = {
  id: 'Modeling Methods',
  children: [
    {
      id: 'Classification',
      children: [
        { id: 'Logistic regression', value: { title: 'Logistic regression' } },
        {
          id: 'Linear discriminant analysis',
          value: { title: 'Linear discriminant analysis' }
        },
        { id: 'Rules', value: { title: 'Rules' } },
        { id: 'Decision trees', value: { title: 'Decision trees' } },
        { id: 'Naive Bayes', value: { title: 'Naive Bayes' } },
        { id: 'K nearest neighbor', value: { title: 'K nearest neighbor' } },
        {
          id: 'Probabilistic neural network',
          value: { title: 'Probabilistic neural network' }
        },
        {
          id: 'Support vector machine',
          value: { title: 'Support vector machine' }
        }
      ],
      value: { title: 'Classification' }
    },
    {
      id: 'Consensus',
      children: [
        {
          id: 'Models diversity',
          children: [
            {
              id: 'Different initializations',
              value: { title: 'Different initializations' }
            },
            {
              id: 'Different parameter choices',
              value: { title: 'Different parameter choices' }
            },
            {
              id: 'Different architectures',
              value: { title: 'Different architectures' }
            },
            {
              id: 'Different modeling methods',
              value: { title: 'Different modeling methods' }
            },
            {
              id: 'Different training sets',
              value: { title: 'Different training sets' }
            },
            {
              id: 'Different feature sets',
              value: { title: 'Different feature sets' }
            }
          ],
          value: { title: 'Models diversity' }
        },
        {
          id: 'Methods',
          children: [
            {
              id: 'Classifier selection',
              value: { title: 'Classifier selection' }
            },
            { id: 'Classifier fusion', value: { title: 'Classifier fusion' } }
          ],
          value: { title: 'Methods' }
        },
        {
          id: 'Common',
          children: [
            { id: 'Bagging', value: { title: 'Bagging' } },
            { id: 'Boosting', value: { title: 'Boosting' } },
            { id: 'AdaBoost', value: { title: 'AdaBoost' } }
          ],
          value: { title: 'Common' }
        }
      ],
      value: { title: 'Consensus' }
    },
    {
      id: 'Regression',
      children: [
        {
          id: 'Multiple linear regression',
          value: { title: 'Multiple linear regression' }
        },
        {
          id: 'Partial least squares',
          value: { title: 'Partial least squares' }
        },
        {
          id: 'Multi-layer feedforward neural network',
          value: { title: 'Multi-layer feedforward neural network' }
        },
        {
          id: 'General regression neural network',
          value: { title: 'General regression neural network' }
        },
        {
          id: 'Support vector regression',
          value: { title: 'Support vector regression' }
        }
      ],
      value: { title: 'Regression' }
    }
  ],
  value: { title: 'Modeling Methods' }
}

const DemoChart = (): ReactElement => {
  const [basicRadar, setBasicRadar] = useState([])
  const [linear, setLinear] = useState([])
  const [polar, setPolar] = useState([])
  const [wordCloud, setWordCloud] = useState([])
  const [histogram, setHistogram] = useState([])

  useEffect(() => {
    basicRadarFetch()
    linearFetch()
    polarFetch()
    wordCloudFetch()
    histogramFetch()
  }, [])

  const basicRadarFetch = (): void => {
    fetch('https://gw.alipayobjects.com/os/antfincdn/svFjSfJkYy/radar.json')
      .then((response: any) => response.json())
      .then((json) => setBasicRadar(json))
      .catch((error) => {
        console.log('fetch data failed', error)
      })
  }

  const linearFetch = (): void => {
    fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/cpu-data.json')
      .then((response: any) => response.json())
      .then((json) => setLinear(json))
      .catch((error) => {
        console.log('fetch data failed', error)
      })
  }

  const polarFetch = (): void => {
    fetch(
      'https://gw.alipayobjects.com/os/antvdemo/assets/data/polar-heatmap.json'
    )
      .then((response: any) => response.json())
      .then((json) => setPolar(json))
      .catch((error) => {
        console.log('fetch data failed', error)
      })
  }

  const wordCloudFetch = (): void => {
    fetch(
      'https://gw.alipayobjects.com/os/antvdemo/assets/data/antv-keywords.json'
    )
      .then((response: any) => response.json())
      .then((json) => setWordCloud(json))
      .catch((error) => {
        console.log('fetch data failed', error)
      })
  }

  const histogramFetch = (): void => {
    fetch(
      'https://gw.alipayobjects.com/os/antfincdn/RoliHq%2453S/histogram.json'
    )
      .then((response: any) => response.json())
      .then((json) => setHistogram(json))
      .catch((error) => {
        console.log('fetch data failed', error)
      })
  }

  return (
    <div>
      <Grid spacing={3}>
        <Grid item cols={6}>
          <Card padding="none">
            <Accordion
              defaultOpen
              icon={ChartBarIcon}
              title="Basic Radar"
              classNames={{
                button: 'bg-transparent text-slate-500',
                icon: 'w-5 h-5 text-slate-500',
                children: 'p-3'
              }}
            >
              <div>
                <BasicRadarChart
                  data={basicRadar}
                  fields={{ x: 'item', y: 'score', serie: 'user' }}
                />
              </div>
            </Accordion>
          </Card>
        </Grid>
        <Grid item cols={6}>
          <Card padding="none">
            <Accordion
              defaultOpen
              icon={ChartBarIcon}
              title="Gauge"
              classNames={{
                button: 'bg-transparent text-slate-500',
                children: 'p-3',
                icon: 'w-5 h-5 text-slate-500'
              }}
            >
              <GaugeChart percentage={50} />
            </Accordion>
          </Card>
        </Grid>
        <Grid item cols={6}>
          <Card padding="none">
            <Accordion
              defaultOpen
              icon={ChartBarIcon}
              title="Liquid"
              classNames={{
                button: 'bg-transparent text-slate-500',
                children: 'p-3',
                icon: 'w-5 h-5 text-slate-500'
              }}
            >
              <LiquidChart percentage="50" />
            </Accordion>
          </Card>
        </Grid>
        <Grid item cols={6}>
          <Card padding="none">
            <Accordion
              defaultOpen
              icon={ChartBarIcon}
              title="Linear"
              classNames={{
                button: 'bg-transparent text-slate-500',
                children: 'p-3',
                icon: 'w-5 h-5 text-slate-500'
              }}
            >
              <LinearChart
                data={linear}
                fields={{ x: 'time', y: 'cpu', serie: 'date' }}
              />
            </Accordion>
          </Card>
        </Grid>
        <Grid item cols={6}>
          <Card padding="none">
            <Accordion
              defaultOpen
              icon={ChartBarIcon}
              title="Polar Heatmap"
              classNames={{
                button: 'bg-transparent text-slate-500',
                children: 'p-3',
                icon: 'w-5 h-5 text-slate-500'
              }}
            >
              <PolarHeatmapChart
                data={polar}
                fields={{ x: 'time', y: 'week', colorField: 'value' }}
                onClickElement={(elementSelcted) => console.log(elementSelcted)}
              />
            </Accordion>
          </Card>
        </Grid>
        <Grid item cols={6}>
          <Card padding="none">
            <Accordion
              defaultOpen
              icon={ChartBarIcon}
              title="Word Cloud"
              classNames={{
                button: 'bg-transparent text-slate-500',
                children: 'p-3',
                icon: 'w-5 h-5 text-slate-500'
              }}
            >
              <WordCloudChart
                data={wordCloud}
                fields={{ name: 'name', value: 'value' }}
              />
            </Accordion>
          </Card>
        </Grid>
        <Grid item cols={6}>
          <Card padding="none">
            <Accordion
              defaultOpen
              icon={ChartBarIcon}
              title="Column"
              classNames={{
                button: 'bg-transparent text-slate-500',
                children: 'p-3',
                icon: 'w-5 h-5 text-slate-500'
              }}
            >
              <ColumnChart
                data={columnData}
                fields={{ x: 'type', y: 'sales' }}
                onClickElement={(elementSelcted) => console.log(elementSelcted)}
              />
            </Accordion>
          </Card>
        </Grid>
        <Grid item cols={6}>
          <Card padding="none">
            <Accordion
              defaultOpen
              icon={ChartBarIcon}
              title="Column"
              classNames={{
                button: 'bg-transparent text-slate-500',
                children: 'p-3',
                icon: 'w-5 h-5 text-slate-500'
              }}
            >
              <HistogramChart
                data={histogram}
                onClickElement={(elementSelcted) => console.log(elementSelcted)}
              />
            </Accordion>
          </Card>
        </Grid>

        <Grid cols={12} spacing={3}>
          <Grid item cols={6}>
            <Card padding="none">
              <Accordion
                defaultOpen
                icon={ChartBarIcon}
                title="Nodes"
                classNames={{
                  button: 'bg-transparent text-slate-500',
                  children: 'p-3',
                  icon: 'w-5 h-5 text-slate-500'
                }}
              >
                <Nodes nodes={dataNodes.nodes} links={dataNodes.links} />
              </Accordion>
            </Card>
          </Grid>
          <Grid item cols={6}>
            <Card padding="none">
              <Accordion
                defaultOpen
                icon={ChartBarIcon}
                title="Radial Tree"
                classNames={{
                  button: 'bg-transparent text-slate-500',
                  children: 'p-3',
                  icon: 'w-5 h-5 text-slate-500'
                }}
              >
                <RadialTreeChart data={radialTree} />
              </Accordion>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}

export default DemoChart

import { ReactElement, useState } from 'react'

import Popover from 'components/Popover'
import Button from 'components/Button'
import Dialog from 'components/Dialog'
import Drawer from 'components/Drawer'
import Divider from 'components/Divider'
import Tooltip from 'components/Tooltip'
import Typography from 'components/Typography'
import Title from 'components/Title'
import { useStepper } from 'hooks/useStepper'
import Stepper from 'components/Stepper'
import Card from 'components/Card'
import List from 'components/List'

const DemoSystem = (): ReactElement => {
  const [openDrawer, setOpenDrawer] = useState(false)
  const [openDialog, setOpenDialog] = useState(false)
  const steps = ['Paso 1', 'Paso 2', 'Paso 3']

  const stepper = useStepper({ steps })

  return (
    <div>
      <Divider title="Typography" />
      <div className="flex gap-2 items-end">
        <Typography>Typography</Typography>
        <Title>Title page</Title>
        <Title variant="card">Title card</Title>
      </div>
      <Divider title="Buttons" />
      <div>
        <div className="flex">
          <Button variant="contained" size="sm">
            Small
          </Button>
          <Button variant="contained" size="md">
            Medium
          </Button>
          <Button variant="contained" size="lg">
            Large
          </Button>
        </div>
        <div className="flex">
          <Button variant="text">Text</Button>
          <Button variant="outlined">Outlined</Button>
          <Button variant="contained">Contained</Button>
        </div>
      </div>
      <Divider title="Popover & Tooltip" />
      <div className="flex gap-2">
        <Popover
          content="Ejemplo"
          className="flex"
          floatProps={{ offset: 2 }}
          classNames={{ panel: 'bg-red-500 text-white' }}
        >
          <Button variant="contained" size="sm">
            Example
          </Button>
        </Popover>
        <Popover content="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.">
          <Button variant="contained" size="sm">
            Example
          </Button>
        </Popover>
        <Tooltip content="tooltip">Tooltip</Tooltip>
        <Tooltip content="tooltip" placement="top">
          Tooltip
        </Tooltip>
      </div>
      <Divider title="Stepper" />
      <div className="flex gap-4">
        <Card className="w-1/2">
          <Title variant="card">Hook</Title>
          <div className="flex gap-2">
            <Button size="sm" variant="contained" onClick={stepper.back}>
              back
            </Button>
            <Button size="sm" variant="contained" onClick={stepper.next}>
              next
            </Button>
          </div>
          <stepper.Stepper variant="nonLinear" />
          <stepper.StepContent value={0} className="border border-red-500">
            Paso 1 - contenido
          </stepper.StepContent>
          <stepper.StepContent value={1}>
            Paso 2 - contenido
          </stepper.StepContent>
          <stepper.StepContent value={2}>
            Paso 3 - contenido
          </stepper.StepContent>
        </Card>
        <Card className="w-1/2">
          <Title variant="card">Componente</Title>
          <Stepper steps={steps} placement="top" />
        </Card>
      </div>
      <Divider title="List" />
      <Card>
        <List
          dense
          items={[
            {
              primary: 'Photos',
              onClick () {
                console.log('click')
              }
            },
            { divider: true },
            { primary: 'Work' },
            { primary: 'Vacations' }
          ]}
        />
      </Card>
      {/* Dialog */}
      <Divider title="Dialog" />
      <Button
        className="bg-sky-500 hover:bg-sky-600 text-white"
        onClick={() => setOpenDialog(true)}
      >
        Open Dialog
      </Button>
      <Dialog
        size="7xl"
        open={openDialog}
        onClose={() => {
          setOpenDialog(false)
        }}
      >
        Hello Dialog
      </Dialog>
      {/* Drawer */}
      <Divider title="Drawer" />
      <Button
        className="bg-sky-500 hover:bg-sky-600 text-white"
        onClick={() => setOpenDrawer(true)}
      >
        Open Drawer
      </Button>
      <Drawer
        open={openDrawer}
        placement="bottom"
        onClose={() => setOpenDrawer(false)}
      >
        Hello Drawer
      </Drawer>
    </div>
  )
}

export default DemoSystem

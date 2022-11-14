import { ReactElement, useState } from 'react'

import Popover from 'components/Popover'
import Button from 'components/Button'
import Dialog from 'components/Dialog'
import Drawer from 'components/Drawer'
import Divider from 'components/Divider'
import Tooltip from 'components/Tooltip'
import Typography from 'components/Typography'
import Title from 'components/Title'

const DemoSystem = (): ReactElement => {
  const [openDrawer, setOpenDrawer] = useState(false)
  const [openDialog, setOpenDialog] = useState(false)

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

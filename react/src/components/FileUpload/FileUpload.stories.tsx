import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Button } from '../Button'
import { FileUpload } from './FileUpload'

const meta: Meta<typeof FileUpload> = {
  title: 'Forms/FileUpload',
  component: FileUpload,
  parameters: { layout: 'padded' },
  argTypes: {
    title: { control: 'text' },
    subtitle: { control: 'text' },
    accept: { control: 'object', description: 'Extensiones permitidas' },
    maxSizeMb: { control: 'number', description: 'Peso máximo por archivo (MB)' },
    maxFiles: { control: 'number', description: 'Cantidad máxima de archivos' },
    hint: { control: 'text' },
    chooseLabel: { control: 'text' },
    acceptLabel: { control: 'text' },
    cancelLabel: { control: 'text' },
    modal: { control: 'boolean', description: 'Renderiza como modal con backdrop' },
    onChange: { action: 'change' },
    onAccept: { action: 'accept' },
    onCancel: { action: 'cancel' },
    onClose: { action: 'close' },
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 576 }}>
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof FileUpload>

export const Inline: Story = {
  name: 'Inline (Default)',
  args: {
    title: 'Carga de documento',
    subtitle: 'Subtítulo carga de documento puede no tenerlo.',
    accept: ['jpg', 'jpeg', 'png', 'pdf'],
    maxSizeMb: 5,
    maxFiles: 1,
  },
}

export const CargaMasiva: Story = {
  name: 'Carga masiva (maxFiles 5)',
  args: {
    ...Inline.args,
    maxFiles: 5,
    accept: ['jpg', 'jpeg', 'png', 'pdf', 'docx', 'xlsx', 'csv', 'txt'],
  },
}

export const EnModal: Story = {
  name: 'En modal (con Button del DS)',
  render: (args) => {
    const [open, setOpen] = useState(false)
    return (
      <>
        <Button variant="primary" appearance="solid" size="md" onClick={() => setOpen(true)}>
          Cargar documento
        </Button>
        <FileUpload
          {...args}
          modal
          open={open}
          onClose={() => setOpen(false)}
          onAccept={(files) => console.log('accept', files)}
        />
      </>
    )
  },
  args: { ...Inline.args, maxFiles: 3 },
}

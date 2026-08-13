import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import Button from '../Button/Button.vue'
import FileUpload from './FileUpload.vue'

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
  },
  decorators: [
    () => ({ template: '<div style="max-width: 576px;"><story /></div>' }),
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
  render: (args) => ({
    components: { FileUpload, Button },
    setup() {
      const open = ref(false)
      return { args, open }
    },
    template: `
      <div>
        <Button variant="primary" appearance="solid" size="md" @click="open = true">
          Cargar documento
        </Button>
        <FileUpload v-bind="args" modal :open="open" @close="open = false" />
      </div>
    `,
  }),
  args: { ...Inline.args, maxFiles: 3 },
}

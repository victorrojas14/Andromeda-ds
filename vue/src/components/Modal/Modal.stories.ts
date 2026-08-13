import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import Button from '../Button/Button.vue'
import LabelBadge from './LabelBadge.vue'
import Modal from './Modal.vue'

const TEXTO =
  'Por seguridad, le recomendamos no realizar operaciones y/o Trámites Electrónicos en computadoras públicas (Cafés internet, centros de negocio de hoteles, aerolíneas, etc.). Ya que ello puede poner en riesgo la confidencialidad de su información.'

const meta: Meta<typeof Modal> = {
  title: 'Overlays/Modal',
  component: Modal,
  parameters: { layout: 'padded' },
  argTypes: {
    open: { control: 'boolean' },
    size: {
      control: 'inline-radio',
      options: ['sm', 'md', 'lg'],
      description: 'Figma: Tamano=Modal-SM|MD|LG',
    },
    title: { control: 'text', description: 'Figma: "Texto Titulo"' },
    showTitle: { control: 'boolean', description: 'Oculta el título' },
    showText: { control: 'boolean', description: 'Oculta el cuerpo' },
    showBadge: { control: 'boolean', description: 'Figma: "Mostrar Aviso"' },
    badgeEstado: {
      control: 'inline-radio',
      options: ['success', 'warning', 'info', 'danger'],
      description: 'Los 4 estados del Label Badge',
    },
    badgeText: { control: 'text', description: 'Figma: "Texto Badge"' },
    showIcon: { control: 'boolean', description: 'Figma: "Mostrar Icono Top"' },
    icon: { control: 'text', description: 'Icono de la librería' },
    iconVariant: {
      control: 'inline-radio',
      options: ['default', 'circle'],
      description: 'Figma: Icon=Default|CIrcle illustration',
    },
    showLeftButton: { control: 'boolean', description: 'Figma: "Mostrar Boton Izq"' },
    leftButtonLabel: { control: 'text' },
    showRightButton: { control: 'boolean', description: 'Figma: "Mostrar Boton Der"' },
    rightButtonLabel: { control: 'text' },
    blanket: { control: 'boolean', description: 'Monta sobre el Blanket' },
  },
}

export default meta
type Story = StoryObj<typeof Modal>

const renderInline: Story['render'] = (args) => ({
  components: { Modal },
  setup() {
    return { args, TEXTO }
  },
  template: `<Modal v-bind="args">{{ TEXTO }}</Modal>`,
})

export const MD: Story = {
  name: 'Modal-MD (inline)',
  render: renderInline,
  args: {
    size: 'md',
    title: 'Título Modal',
    badgeEstado: 'warning',
    badgeText: 'EJEMPLO',
    leftButtonLabel: 'Botón',
    rightButtonLabel: 'Botón',
    blanket: false,
  },
}

export const SM: Story = {
  name: 'Modal-SM (inline)',
  render: renderInline,
  args: { ...MD.args, size: 'sm', rightButtonLabel: 'Aceptar' },
}

export const LG: Story = {
  name: 'Modal-LG (inline)',
  render: renderInline,
  args: { ...MD.args, size: 'lg' },
}

export const CircleIllustration: Story = {
  name: 'Circle illustration',
  render: renderInline,
  args: { ...MD.args, size: 'sm', iconVariant: 'circle', icon: 'lock-outline' },
}

export const Badges: Story = {
  name: 'Label Badge (4 estados)',
  render: () => ({
    components: { LabelBadge },
    template: `
      <div style="display: flex; gap: 20px;">
        <LabelBadge estado="success" text="EJEMPLO" />
        <LabelBadge estado="warning" text="EJEMPLO" />
        <LabelBadge estado="info" text="EJEMPLO" />
        <LabelBadge estado="danger" text="EJEMPLO" />
      </div>
    `,
  }),
}

export const SobreBlanket: Story = {
  name: 'Sobre Blanket (con Button del DS)',
  render: (args) => ({
    components: { Modal, Button },
    setup() {
      const open = ref(false)
      return { args, open, TEXTO }
    },
    template: `
      <div>
        <Button variant="primary" appearance="solid" size="md" @click="open = true">
          Abrir modal
        </Button>
        <Modal
          v-bind="args"
          :open="open"
          @close="open = false"
          @right-button="open = false"
        >{{ TEXTO }}</Modal>
      </div>
    `,
  }),
  args: { ...MD.args, blanket: true },
}

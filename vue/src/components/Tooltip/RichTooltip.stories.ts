import type { Meta, StoryObj } from '@storybook/vue3'
import Button from '../Button/Button.vue'
import RichTooltip from './RichTooltip.vue'

const meta: Meta<typeof RichTooltip> = {
  title: 'Overlays/RichTooltip',
  component: RichTooltip,
  parameters: { layout: 'centered' },
  argTypes: {
    title: { control: 'text', description: 'Título del globo' },
    content: { control: 'text', description: 'Texto del globo' },
    position: {
      control: 'inline-radio',
      options: ['top', 'bottom', 'left', 'right'],
      description: 'Lado donde aparece el tooltip',
    },
    theme: {
      control: 'inline-radio',
      options: ['light', 'dark'],
      description: 'Figma: Tipo=Light|Dark',
    },
    showButtons: { control: 'boolean', description: 'Figma: "Show Buttons"' },
    showButtonRight: { control: 'boolean', description: 'Figma: "Show Button Right"' },
    leftButtonLabel: { control: 'text' },
    rightButtonLabel: { control: 'text' },
    open: {
      control: 'boolean',
      description: 'Visibilidad controlada (sin definir: hover/focus)',
    },
  },
  decorators: [() => ({ template: '<div style="padding: 220px;"><story /></div>' })],
}

export default meta
type Story = StoryObj<typeof RichTooltip>

const wrap = (inner: string) => ({
  components: { RichTooltip, Button },
  template: inner,
})

export const Playground: Story = {
  render: (args) => ({
    ...wrap(`
      <RichTooltip v-bind="args">
        <Button variant="primary" appearance="solid" size="md">Pasa el mouse</Button>
      </RichTooltip>
    `),
    setup() {
      return { args }
    },
  }),
  args: {
    title: 'Rich tooltip',
    content:
      'La referencia númerica ayuda a identificar tu pago, automáticamente se llena con la fecha actual, pero puedes cambiarlo por otro número de hasta 7 dígitos.',
    position: 'top',
    theme: 'light',
  },
}

export const Posiciones: Story = {
  name: 'Posiciones (abiertos para comparar)',
  render: (args) => ({
    components: { RichTooltip, Button },
    setup() {
      return { args }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 320px;">
        <div style="display: flex; gap: 420px;">
          <RichTooltip v-for="pos in ['left', 'right']" :key="pos" v-bind="args"
            :content="'Tooltip hacia ' + pos + '.'" :position="pos" :open="true">
            <Button variant="primary" appearance="outline" size="sm">{{ pos }}</Button>
          </RichTooltip>
        </div>
        <div style="display: flex; gap: 420px;">
          <RichTooltip v-for="pos in ['top', 'bottom']" :key="pos" v-bind="args"
            :content="'Tooltip hacia ' + pos + '.'" :position="pos" :open="true">
            <Button variant="primary" appearance="outline" size="sm">{{ pos }}</Button>
          </RichTooltip>
        </div>
      </div>
    `,
  }),
  args: { title: 'Rich tooltip', theme: 'light' },
}

export const Dark: Story = {
  name: 'Dark (sin botón derecho)',
  render: (args) => ({
    ...wrap(`
      <RichTooltip v-bind="args">
        <Button variant="primary" appearance="solid" size="md">Objetivo</Button>
      </RichTooltip>
    `),
    setup() {
      return { args }
    },
  }),
  args: {
    title: 'Rich tooltip',
    content: 'La referencia númerica ayuda a identificar tu pago.',
    position: 'bottom',
    theme: 'dark',
    showButtonRight: false,
  },
}

import type { Meta, StoryObj } from '@storybook/vue3'
import Button from '../Button/Button.vue'
import Icon from '../Icon/Icon.vue'
import RichTooltip from './RichTooltip.vue'
import Tooltip from './Tooltip.vue'

const meta: Meta<typeof Tooltip> = {
  title: 'Overlays/Tooltip',
  component: Tooltip,
  parameters: { layout: 'centered' },
  argTypes: {
    content: { control: 'text', description: 'Texto del globo' },
    position: {
      control: 'inline-radio',
      options: ['top', 'bottom', 'left', 'right'],
      description: 'Lado donde aparece el tooltip',
    },
    theme: {
      control: 'inline-radio',
      options: ['light', 'dark'],
      description: 'Figma: Theme=Light|Dark',
    },
    open: { control: 'boolean', description: 'Visibilidad controlada (sin definir: hover/focus)' },
  },
  decorators: [() => ({ template: '<div style="padding: 120px;"><story /></div>' })],
}

export default meta
type Story = StoryObj<typeof Tooltip>

export const Playground: Story = {
  render: (args) => ({
    components: { Tooltip, Button },
    setup() {
      return { args }
    },
    template: `
      <Tooltip v-bind="args">
        <Button variant="primary" appearance="solid" size="md">Pasa el mouse</Button>
      </Tooltip>
    `,
  }),
  args: {
    content: 'Ejemplo',
    position: 'top',
    theme: 'light',
  },
}

export const Posiciones: Story = {
  name: 'Posiciones (abiertos para comparar)',
  render: () => ({
    components: { Tooltip, Button },
    template: `
      <div style="display: flex; gap: 100px;">
        <Tooltip v-for="pos in ['top', 'bottom', 'left', 'right']" :key="pos"
          content="Ejemplo" :position="pos" theme="dark" :open="true">
          <Button variant="primary" appearance="outline" size="sm">{{ pos }}</Button>
        </Tooltip>
      </div>
    `,
  }),
}

export const SobreIcono: Story = {
  name: 'Sobre un icono del DS',
  render: () => ({
    components: { Tooltip, Icon },
    template: `
      <Tooltip content="Información adicional" position="top" theme="light">
        <span tabindex="0" style="display: inline-flex; color: var(--color-tertiary);">
          <Icon name="info" :size="24" />
        </span>
      </Tooltip>
    `,
  }),
}

export const Rich: Story = {
  name: 'Rich tooltip',
  render: () => ({
    components: { RichTooltip, Button },
    template: `
      <RichTooltip
        title="Rich tooltip"
        content="La referencia númerica ayuda a identificar tu pago, automáticamente se llena con la fecha actual, pero puedes cambiarlo por otro número de hasta 7 dígitos."
        position="top"
        theme="light"
      >
        <Button variant="primary" appearance="solid" size="md">Objetivo</Button>
      </RichTooltip>
    `,
  }),
}

export const RichDark: Story = {
  name: 'Rich tooltip dark (sin botón derecho)',
  render: () => ({
    components: { RichTooltip, Button },
    template: `
      <RichTooltip
        title="Rich tooltip"
        content="La referencia númerica ayuda a identificar tu pago."
        position="bottom"
        theme="dark"
        :show-button-right="false"
      >
        <Button variant="primary" appearance="solid" size="md">Objetivo</Button>
      </RichTooltip>
    `,
  }),
}

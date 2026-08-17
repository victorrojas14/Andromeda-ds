import type { Meta, StoryObj } from '@storybook/react'
import { Button } from '../Button'
import { RichTooltip } from './RichTooltip'

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
    onLeftButton: { action: 'leftButton' },
    onRightButton: { action: 'rightButton' },
  },
  decorators: [
    (Story) => (
      <div style={{ padding: 220 }}>
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof RichTooltip>

export const Playground: Story = {
  render: (args) => (
    <RichTooltip {...args}>
      <Button variant="primary" appearance="solid" size="md">
        Pasa el mouse
      </Button>
    </RichTooltip>
  ),
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
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 320 }}>
      <div style={{ display: 'flex', gap: 420 }}>
        {(['left', 'right'] as const).map((pos) => (
          <RichTooltip
            {...args}
            key={pos}
            content={`Tooltip hacia ${pos}.`}
            position={pos}
            open
          >
            <Button variant="primary" appearance="outline" size="sm">
              {pos}
            </Button>
          </RichTooltip>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 420 }}>
        {(['top', 'bottom'] as const).map((pos) => (
          <RichTooltip
            {...args}
            key={pos}
            content={`Tooltip hacia ${pos}.`}
            position={pos}
            open
          >
            <Button variant="primary" appearance="outline" size="sm">
              {pos}
            </Button>
          </RichTooltip>
        ))}
      </div>
    </div>
  ),
  args: { title: 'Rich tooltip', theme: 'light' },
}

export const Dark: Story = {
  name: 'Dark (sin botón derecho)',
  render: (args) => (
    <RichTooltip {...args}>
      <Button variant="primary" appearance="solid" size="md">
        Objetivo
      </Button>
    </RichTooltip>
  ),
  args: {
    title: 'Rich tooltip',
    content: 'La referencia númerica ayuda a identificar tu pago.',
    position: 'bottom',
    theme: 'dark',
    showButtonRight: false,
  },
}

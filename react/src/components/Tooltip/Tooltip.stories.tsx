import type { Meta, StoryObj } from '@storybook/react'
import { Button } from '../Button'
import { Icon } from '../Icon'
import { Tooltip } from './Tooltip'

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
  decorators: [
    (Story) => (
      <div style={{ padding: 120 }}>
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof Tooltip>

export const Playground: Story = {
  args: {
    content: 'Ejemplo',
    position: 'top',
    theme: 'light',
    children: (
      <Button variant="primary" appearance="solid" size="md">
        Pasa el mouse
      </Button>
    ),
  },
}

export const Posiciones: Story = {
  name: 'Posiciones (abiertos para comparar)',
  render: () => (
    <div style={{ display: 'flex', gap: 100 }}>
      {(['top', 'bottom', 'left', 'right'] as const).map((pos) => (
        <Tooltip key={pos} content="Ejemplo" position={pos} theme="dark" open>
          <Button variant="primary" appearance="outline" size="sm">
            {pos}
          </Button>
        </Tooltip>
      ))}
    </div>
  ),
}

export const SobreIcono: Story = {
  name: 'Sobre un icono del DS',
  render: () => (
    <Tooltip content="Información adicional" position="top" theme="light">
      <span tabIndex={0} style={{ display: 'inline-flex', color: 'var(--color-tertiary)' }}>
        <Icon name="info" size={24} />
      </span>
    </Tooltip>
  ),
}

/* Las stories del RichTooltip viven en RichTooltip.stories.tsx con sus
 * propios controles (position/theme/botones conectados a los args). */

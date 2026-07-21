import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './Button'

// Icono SVG simple (heroicons: plus) para las historias
const PlusIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 5v14M5 12h14" />
  </svg>
)

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
)

const meta = {
  title: 'Actions/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Componente unificado que reemplaza los ~20 component sets fragmentados de Figma (`btn/primary-SM`, `btn/ghost-primary-MD`, etc). Se controla por `variant`, `appearance` y `size`.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'inline-radio',
      options: ['primary', 'secondary'],
      description: 'Jerarquía visual (color base).',
    },
    appearance: {
      control: 'inline-radio',
      options: ['solid', 'outline', 'ghost'],
      description: 'Estilo de superficie.',
    },
    size: {
      control: 'inline-radio',
      options: ['xs', 'sm', 'md', 'lg'],
    },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
  },
  args: {
    children: 'Button',
    variant: 'primary',
    appearance: 'solid',
    size: 'md',
    disabled: false,
    loading: false,
  },
} satisfies Meta<typeof Button>

export default meta

type Story = StoryObj<typeof meta>

/* --- Historias base --- */
export const Primary: Story = {}

export const Secondary: Story = {
  args: { variant: 'secondary' },
}

export const Outline: Story = {
  args: { appearance: 'outline' },
}

export const Ghost: Story = {
  args: { appearance: 'ghost' },
}

export const Disabled: Story = {
  args: { disabled: true },
}

export const Loading: Story = {
  args: { loading: true, children: 'Guardando' },
}

/* --- Con iconos --- */
export const WithLeftIcon: Story = {
  args: { leftIcon: <PlusIcon />, children: 'Agregar' },
}

export const WithRightIcon: Story = {
  args: { rightIcon: <ArrowIcon />, children: 'Continuar' },
}

/* --- Matrices para documentación visual --- */
export const AllSizes: Story = {
  parameters: { controls: { disable: true } },
  render: (args) => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <Button {...args} size="xs">XS</Button>
      <Button {...args} size="sm">SM</Button>
      <Button {...args} size="md">MD</Button>
      <Button {...args} size="lg">LG</Button>
    </div>
  ),
}

export const AllAppearances: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, auto)', gap: 12 }}>
      <Button variant="primary" appearance="solid">Primary solid</Button>
      <Button variant="secondary" appearance="solid">Secondary solid</Button>
      <Button variant="primary" appearance="outline">Primary outline</Button>
      <Button variant="secondary" appearance="outline">Secondary outline</Button>
      <Button variant="primary" appearance="ghost">Primary ghost</Button>
      <Button variant="secondary" appearance="ghost">Secondary ghost</Button>
    </div>
  ),
}

export const FromFigmaMapping: Story = {
  name: 'Mapeo desde Figma (referencia)',
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          'Cómo se traducen los component sets actuales de Figma (Ui Kit Web) al nuevo Button consolidado.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 16px', fontFamily: 'ui-monospace, monospace', fontSize: 13 }}>
      <div><b>Figma actual</b></div><div><b>Button props</b></div>

      <div>btn/primary-SM</div>
      <div><Button variant="primary" appearance="solid" size="sm">primary/solid/sm</Button></div>

      <div>btn/primary-MD</div>
      <div><Button variant="primary" appearance="solid" size="md">primary/solid/md</Button></div>

      <div>btn/primary-Outline-MD</div>
      <div><Button variant="primary" appearance="outline" size="md">primary/outline/md</Button></div>

      <div>btn/secondary-LG</div>
      <div><Button variant="secondary" appearance="solid" size="lg">secondary/solid/lg</Button></div>

      <div>btn/ghost-primary-SM</div>
      <div><Button variant="primary" appearance="ghost" size="sm">ghost/primary/sm</Button></div>

      <div>btn/ghost-secondary-MD</div>
      <div><Button variant="secondary" appearance="ghost" size="md">ghost/secondary/md</Button></div>
    </div>
  ),
}

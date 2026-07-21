import type { Meta, StoryObj } from '@storybook/vue3'
import Button from './Button.vue'

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
    },
    appearance: {
      control: 'inline-radio',
      options: ['solid', 'outline', 'ghost'],
    },
    size: {
      control: 'inline-radio',
      options: ['xs', 'sm', 'md', 'lg'],
    },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
    default: { control: 'text', description: 'Label (slot default)' },
  },
  args: {
    variant: 'primary',
    appearance: 'solid',
    size: 'md',
    disabled: false,
    loading: false,
    default: 'Button',
  },
} satisfies Meta<typeof Button>

export default meta

type Story = StoryObj<typeof meta>

/* --- Historias base --- */
export const Primary: Story = {
  render: (args) => ({
    components: { Button },
    setup: () => ({ args }),
    template: `<Button v-bind="args">{{ args.default }}</Button>`,
  }),
}

export const Secondary: Story = {
  ...Primary,
  args: { variant: 'secondary' },
}

export const Outline: Story = {
  ...Primary,
  args: { appearance: 'outline' },
}

export const Ghost: Story = {
  ...Primary,
  args: { appearance: 'ghost' },
}

export const Disabled: Story = {
  ...Primary,
  args: { disabled: true },
}

export const Loading: Story = {
  ...Primary,
  args: { loading: true, default: 'Guardando' },
}

/* --- Con iconos (via slots) --- */
export const WithLeftIcon: Story = {
  render: (args) => ({
    components: { Button },
    setup: () => ({ args }),
    template: `
      <Button v-bind="args">
        <template #leftIcon>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 5v14M5 12h14" />
          </svg>
        </template>
        Agregar
      </Button>`,
  }),
}

export const WithRightIcon: Story = {
  render: (args) => ({
    components: { Button },
    setup: () => ({ args }),
    template: `
      <Button v-bind="args">
        Continuar
        <template #rightIcon>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </template>
      </Button>`,
  }),
}

/* --- Matrices --- */
export const AllSizes: Story = {
  parameters: { controls: { disable: true } },
  render: (args) => ({
    components: { Button },
    setup: () => ({ args }),
    template: `
      <div style="display: flex; gap: 12px; align-items: center;">
        <Button v-bind="args" size="xs">XS</Button>
        <Button v-bind="args" size="sm">SM</Button>
        <Button v-bind="args" size="md">MD</Button>
        <Button v-bind="args" size="lg">LG</Button>
      </div>`,
  }),
}

export const AllAppearances: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    components: { Button },
    template: `
      <div style="display: grid; grid-template-columns: repeat(2, auto); gap: 12px;">
        <Button variant="primary" appearance="solid">Primary solid</Button>
        <Button variant="secondary" appearance="solid">Secondary solid</Button>
        <Button variant="primary" appearance="outline">Primary outline</Button>
        <Button variant="secondary" appearance="outline">Secondary outline</Button>
        <Button variant="primary" appearance="ghost">Primary ghost</Button>
        <Button variant="secondary" appearance="ghost">Secondary ghost</Button>
      </div>`,
  }),
}

export const FromFigmaMapping: Story = {
  name: 'Mapeo desde Figma (referencia)',
  parameters: { controls: { disable: true } },
  render: () => ({
    components: { Button },
    template: `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px 16px; font-family: ui-monospace, monospace; font-size: 13px;">
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
      </div>`,
  }),
}

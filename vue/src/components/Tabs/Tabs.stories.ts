import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import Tabs from './Tabs.vue'

const meta: Meta<typeof Tabs> = {
  title: 'Navigation/Tabs',
  component: Tabs,
  parameters: { layout: 'padded' },
  argTypes: {
    items: { control: 'object', description: 'Tabs (strings o { label, iconLeft, iconRight, disabled })' },
    variant: {
      control: 'inline-radio',
      options: ['primary', 'secondary'],
      description: 'primary: Tabs-1 subrayado · secondary: segmented',
    },
    activeStyle: {
      control: 'inline-radio',
      options: ['primary', 'secondary'],
      description: 'Color del subrayado (Figma: Active primary/Active secundary)',
    },
  },
}

export default meta
type Story = StoryObj<typeof Tabs>

export const Primary: Story = {
  args: {
    variant: 'primary',
    items: ['Posición', 'Movimientos', 'Órdenes de inversión', 'Documentos'],
  },
}

export const PrimaryConIconos: Story = {
  name: 'Primary con iconos',
  args: {
    variant: 'primary',
    items: [
      { label: 'Texto Tab', iconLeft: 'account-outline', iconRight: 'account-outline' },
      { label: 'Texto Tab', iconLeft: 'account-outline' },
      { label: 'Texto Tab' },
      { label: 'Texto Tab', disabled: true },
    ],
  },
}

export const ActiveSecundary: Story = {
  name: 'Active secundary (subrayado tertiary)',
  args: { ...Primary.args, activeStyle: 'secondary', modelValue: 1 },
}

export const Secondary: Story = {
  name: 'Secondary (segmented)',
  args: {
    variant: 'secondary',
    items: ['Text', 'Text', 'Text'],
  },
}

export const Controlado: Story = {
  render: (args) => ({
    components: { Tabs },
    setup() {
      const tab = ref(0)
      return { args, tab }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <Tabs v-bind="args" v-model="tab" />
        <p style="font-family: var(--font-family-sans); font-size: 14px;">
          Tab activo: <strong>{{ tab }}</strong>
        </p>
      </div>
    `,
  }),
  args: { ...Primary.args },
}

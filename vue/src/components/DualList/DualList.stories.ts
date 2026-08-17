import type { Meta, StoryObj } from '@storybook/vue3'
import DualList from './DualList.vue'

const PERMISOS = [
  'Arrendadora',
  'Inversiones',
  'Banca privada',
  'Captación',
  'Fraudes',
  'Clientes',
  'Contratación',
]

const meta: Meta<typeof DualList> = {
  title: 'Forms/DualList',
  component: DualList,
  parameters: { layout: 'centered' },
  argTypes: {
    items: { control: 'object', description: 'Items (strings o { value, label })' },
    leftTitle: { control: 'text', description: 'Figma: "Title-Text-Content"' },
    rightTitle: { control: 'text' },
    addLabel: { control: 'text', description: 'Figma: Botones Action=Add' },
    removeLabel: { control: 'text', description: 'Figma: Botones Action=Remove' },
    searchPlaceholder: { control: 'text' },
    selectAllLabel: { control: 'text' },
    emptyLeftText: { control: 'text', description: 'Figma: "Content text"' },
    emptyRightText: { control: 'text' },
    showSearch: { control: 'boolean' },
  },
  // Full width: ejemplo dentro de un contenedor de 850px
  decorators: [
    () => ({ template: '<div style="width: 850px; max-width: 100%;"><story /></div>' }),
  ],
}

export default meta
type Story = StoryObj<typeof DualList>

export const Playground: Story = {
  name: 'Contenedor de 850px (initial.empty)',
  args: { items: PERMISOS },
}

export const ConTransferidos: Story = {
  name: 'Con elementos transferidos',
  args: {
    items: PERMISOS,
    modelValue: ['Arrendadora', 'Inversiones', 'Banca privada'],
  },
}

export const TransferComplete: Story = {
  name: 'Todo transferido (transfer.complete)',
  args: { items: PERMISOS, modelValue: [...PERMISOS] },
}

export const AnchoCompleto: Story = {
  name: 'Ancho completo (100%)',
  parameters: { layout: 'padded' },
  decorators: [() => ({ template: '<div style="width: 100%;"><story /></div>' })],
  args: { items: PERMISOS },
}

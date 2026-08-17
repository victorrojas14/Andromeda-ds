import type { Meta, StoryObj } from '@storybook/react'
import { DualList } from './DualList'

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
    value: { control: 'object', description: 'Valores transferidos (controlado)' },
    defaultValue: { control: 'object' },
    leftTitle: { control: 'text', description: 'Figma: "Title-Text-Content"' },
    rightTitle: { control: 'text' },
    addLabel: { control: 'text', description: 'Figma: Botones Action=Add' },
    removeLabel: { control: 'text', description: 'Figma: Botones Action=Remove' },
    searchPlaceholder: { control: 'text' },
    selectAllLabel: { control: 'text' },
    emptyLeftText: { control: 'text', description: 'Figma: "Content text"' },
    emptyRightText: { control: 'text' },
    showSearch: { control: 'boolean' },
    onChange: { action: 'change' },
  },
  // Full width: ejemplo dentro de un contenedor de 850px
  decorators: [
    (Story) => (
      <div style={{ width: 850, maxWidth: '100%' }}>
        <Story />
      </div>
    ),
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
  args: { items: PERMISOS, defaultValue: ['Arrendadora', 'Inversiones', 'Banca privada'] },
}

export const TransferComplete: Story = {
  name: 'Todo transferido (transfer.complete)',
  args: { items: PERMISOS, defaultValue: PERMISOS },
}

export const AnchoCompleto: Story = {
  name: 'Ancho completo (100%)',
  parameters: { layout: 'padded' },
  decorators: [
    (Story) => (
      <div style={{ width: '100%' }}>
        <Story />
      </div>
    ),
  ],
  args: { items: PERMISOS },
}

import type { Meta, StoryObj } from '@storybook/vue3'
import { Input, InputPassword } from './index'
import { Icon } from '../Icon'

/*
 * Forms / Input
 * Figma: página "Forms" (node 9477:7685), component sets Form-SM,
 * Form-MD y Form-LG con Estados Default/Normal/Active/Error/Disabled/
 * Llenado-Bloqueado/No llenado.
 */

const meta: Meta = {
  title: 'Forms/Input',
  component: Input,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Campo de formulario del DS Andromeda (Figma: Form-SM/MD/LG). Label flotante, línea inferior por estado (foco tertiary, error danger, disabled/readonly gray-300) y asistencia opcional. Acepta cualquier icono del DS vía el slot #icon, y `InputPassword` agrega el toggle de ojo que enmascara el campo. Soporta v-model.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text', description: 'Etiqueta flotante (Figma: "Texto Label").' },
    assist: { control: 'text', description: 'Texto de asistencia (Figma: "Texto Asistencia").' },
    size: {
      control: 'inline-radio',
      options: ['sm', 'md', 'lg'],
      description: 'Tamaño (Figma: Form-SM/MD/LG).',
      table: { defaultValue: { summary: 'md' } },
    },
    error: { control: 'boolean', description: 'Estado de error (Figma: Error / No llenado).' },
    disabled: { control: 'boolean' },
    readonly: {
      control: 'boolean',
      description: 'Bloqueado con valor (Figma: Llenado-Bloqueado).',
    },
  },
  args: {
    label: 'Texto Label',
    assist: 'Texto de asistencia.',
    size: 'md',
    error: false,
    disabled: false,
    readonly: false,
  },
}

export default meta
type Story = StoryObj

export const Playground: Story = {
  render: (args) => ({
    components: { Input },
    setup: () => ({ args }),
    template: `
      <div style="max-width:320px;">
        <Input
          :label="args.label"
          :assist="args.assist"
          :size="args.size"
          :error="args.error"
          :disabled="args.disabled"
          :readonly="args.readonly"
        />
      </div>
    `,
  }),
}

export const Estados: Story = {
  render: () => ({
    components: { Input },
    template: `
      <div style="display:grid;grid-template-columns:repeat(auto-fill, minmax(220px, 1fr));gap:30px;">
        <Input label="Default" assist="Texto de asistencia." />
        <Input label="Normal (con valor)" assist="Texto de asistencia." model-value="Placeholder" />
        <Input label="Error" assist="Texto de asistencia." model-value="Placeholder" error />
        <Input label="No llenado" error="Campo obligatorio." />
        <Input label="Llenado-Bloqueado" assist="Texto de asistencia." model-value="Placeholder" readonly />
        <Input label="Disabled" assist="Texto de asistencia." disabled />
      </div>
    `,
  }),
}

export const Tamanos: Story = {
  name: 'Tamaños',
  render: () => ({
    components: { Input },
    template: `
      <div style="display:flex;flex-direction:column;gap:30px;max-width:320px;">
        <Input size="sm" label="Form-SM" assist="Texto de asistencia." />
        <Input size="md" label="Form-MD" assist="Texto de asistencia." />
        <Input size="lg" label="Form-LG" assist="Texto de asistencia." />
      </div>
    `,
  }),
}

export const ConIcono: Story = {
  name: 'Con icono',
  render: () => ({
    components: { Input, Icon },
    template: `
      <div style="display:flex;flex-direction:column;gap:30px;max-width:320px;">
        <Input label="Buscar">
          <template #icon><Icon name="search" :size="24" /></template>
        </Input>
        <Input label="Correo">
          <template #icon><Icon name="email-outline" :size="24" /></template>
        </Input>
        <Input label="Fecha">
          <template #icon><Icon name="calendar-outline" :size="24" /></template>
        </Input>
      </div>
    `,
  }),
}

export const Password: Story = {
  render: () => ({
    components: { InputPassword },
    setup: () => ({ }),
    template: `
      <div style="max-width:320px;">
        <InputPassword label="Contraseña" assist="Mínimo 8 caracteres." model-value="secreta123" />
      </div>
    `,
  }),
}

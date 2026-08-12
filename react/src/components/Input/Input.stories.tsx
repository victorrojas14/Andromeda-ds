import type { Meta, StoryObj } from '@storybook/react'
import { Input, InputPassword } from './Input'
import { Icon } from '../Icon'

/*
 * Forms / Input
 * Figma: página "Forms" (node 9477:7685), component sets Form-SM,
 * Form-MD y Form-LG con Estados Default/Normal/Active/Error/Disabled/
 * Llenado-Bloqueado/No llenado.
 */

const meta = {
  title: 'Forms/Input',
  component: Input,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Campo de formulario del DS Andromeda (Figma: Form-SM/MD/LG). Label flotante, línea inferior por estado (foco tertiary, error danger, disabled/readonly gray-300) y asistencia opcional. Acepta cualquier icono del DS vía `icon`, y `InputPassword` agrega el toggle de ojo que enmascara el campo.',
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
    readOnly: {
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
    readOnly: false,
  },
} satisfies Meta<typeof Input>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {
  render: (args) => (
    <div style={{ maxWidth: 320 }}>
      <Input {...args} />
    </div>
  ),
}

export const Estados: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 30 }}>
      <Input label="Default" assist="Texto de asistencia." />
      <Input label="Normal (con valor)" assist="Texto de asistencia." defaultValue="Placeholder" />
      <Input label="Error" assist="Texto de asistencia." defaultValue="Placeholder" error />
      <Input label="No llenado" error="Campo obligatorio." />
      <Input label="Llenado-Bloqueado" assist="Texto de asistencia." defaultValue="Placeholder" readOnly />
      <Input label="Disabled" assist="Texto de asistencia." disabled />
    </div>
  ),
}

export const Tamanos: Story = {
  name: 'Tamaños',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 30, maxWidth: 320 }}>
      <Input size="sm" label="Form-SM" assist="Texto de asistencia." />
      <Input size="md" label="Form-MD" assist="Texto de asistencia." />
      <Input size="lg" label="Form-LG" assist="Texto de asistencia." />
    </div>
  ),
}

export const ConIcono: Story = {
  name: 'Con icono',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 30, maxWidth: 320 }}>
      <Input label="Buscar" icon={<Icon name="search" size={24} />} />
      <Input label="Correo" icon={<Icon name="email-outline" size={24} />} />
      <Input label="Fecha" icon={<Icon name="calendar-outline" size={24} />} />
    </div>
  ),
}

export const Password: Story = {
  render: () => (
    <div style={{ maxWidth: 320 }}>
      <InputPassword label="Contraseña" assist="Mínimo 8 caracteres." defaultValue="secreta123" />
    </div>
  ),
}

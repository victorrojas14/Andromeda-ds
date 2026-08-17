import type { Meta, StoryObj } from '@storybook/vue3'
import Token from './Token.vue'

const meta: Meta<typeof Token> = {
  title: 'Overlays/Token',
  component: Token,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    open: { control: 'boolean' },
    tipo: {
      control: 'inline-radio',
      options: ['virtual', 'fisico'],
      description: 'virtual = 6 dígitos, físico = 8 dígitos',
    },
    title: { control: 'text' },
    showHelp: { control: 'boolean', description: 'Link ¿Dónde encuentro este número?' },
    showTokenHelp: { control: 'boolean', description: 'Link ¿Necesitas ayuda con tu token?' },
    text: { control: 'text', description: 'Figma: "Contenido"' },
    showText: { control: 'boolean', description: 'Figma: "Añadir texto"' },
    error: { control: 'text', description: 'Estado Error (true o mensaje)' },
    blanket: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof Token>

export const Virtual: Story = {
  name: 'Virtual (6 dígitos)',
  args: { tipo: 'virtual' },
}

export const Fisico: Story = {
  name: 'Físico (8 dígitos)',
  args: { tipo: 'fisico' },
}

export const ConError: Story = {
  name: 'Estado Error',
  args: { tipo: 'virtual', error: 'Error' },
}

export const SinTexto: Story = {
  name: 'Sin texto (Añadir texto=false)',
  args: { tipo: 'fisico', showText: false, showTokenHelp: false },
}

export const Inline: Story = {
  name: 'Sin blanket (inline)',
  parameters: { layout: 'centered' },
  args: { tipo: 'virtual', blanket: false },
}

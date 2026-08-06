import type { Meta, StoryObj } from '@storybook/vue3'
import { Alert, AlertBlock } from './index'
import { Button } from '../Button'

/*
 * Feedback / Alert
 * Figma: página "Alerts" (nodes 9274:5251 y 9274:14594), component
 * sets "Alerta" y "Alertas con accion".
 */

const meta: Meta = {
  title: 'Feedback/Alert',
  component: Alert,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Alerta del DS Andromeda (Figma: "Alerta"). Fondo semántico light con textos e iconos en el tono dark, mensaje destacado con divisor, acción opcional (slot #action) y botón de cerrar. `AlertBlock` es la variante en bloque con título ("Alertas con accion").',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'inline-radio',
      options: ['success', 'warning', 'danger', 'info'],
      description: 'Estado semántico (Figma: Estado).',
    },
    message: { control: 'text', description: 'Mensaje destacado (Figma: "Mensaje Alerta").' },
    default: { control: 'text', description: 'Texto de la alerta (slot default).' },
    closable: { control: 'boolean', description: 'Botón de cerrar (Figma: "Mostrar Icon Der").' },
  },
  args: {
    variant: 'success',
    message: 'MENSAJE ALERTA',
    default: 'Texto Contenido.',
    closable: true,
  },
}

export default meta
type Story = StoryObj

export const Playground: Story = {
  render: (args) => ({
    components: { Alert },
    setup: () => ({ args }),
    template: `
      <div style="max-width:684px;">
        <Alert
          :key="JSON.stringify(args)"
          :variant="args.variant"
          :message="args.message"
          :closable="args.closable"
        >{{ args.default }}</Alert>
      </div>
    `,
  }),
}

export const Estados: Story = {
  render: () => ({
    components: { Alert },
    template: `
      <div style="display:flex;flex-direction:column;gap:24px;max-width:684px;">
        <Alert variant="success" message="MENSAJE ALERTA">Texto Contenido.</Alert>
        <Alert variant="warning" message="MENSAJE ALERTA">Texto Contenido.</Alert>
        <Alert variant="danger" message="MENSAJE ALERTA">Texto Contenido.</Alert>
        <Alert variant="info" message="MENSAJE ALERTA">Texto Contenido.</Alert>
      </div>
    `,
  }),
}

export const ConAccion: Story = {
  name: 'Con acción',
  render: () => ({
    components: { Alert, Button },
    setup: () => ({ variants: ['success', 'warning', 'info'] }),
    template: `
      <div style="display:flex;flex-direction:column;gap:24px;max-width:684px;">
        <Alert v-for="v in variants" :key="v" :variant="v" message="MENSAJE ALERTA">
          Texto Contenido.
          <template #action>
            <Button
              variant="secondary"
              appearance="outline"
              size="sm"
              style="border-radius:var(--radius-xl);background:var(--color-white);"
            >Verificar</Button>
          </template>
        </Alert>
      </div>
    `,
  }),
}

export const SinExtras: Story = {
  name: 'Solo contenido',
  render: () => ({
    components: { Alert },
    template: `
      <div style="max-width:684px;">
        <Alert variant="info" hide-icon :closable="false">Texto Contenido.</Alert>
      </div>
    `,
  }),
}

export const Bloque: Story = {
  name: 'AlertBlock (con título)',
  render: () => ({
    components: { AlertBlock },
    setup: () => ({ variants: ['success', 'warning', 'info'] }),
    template: `
      <div style="display:flex;flex-direction:column;gap:24px;max-width:976px;">
        <AlertBlock v-for="v in variants" :key="v" :variant="v">
          Aww sí, leíste con éxito este importante mensaje de alerta. Este texto de ejemplo se
          extenderá un poco más para que pueda ver cómo funciona el espaciado dentro de una alerta
          con este tipo de contenido.
          <template #footer>
            Siempre que lo necesite, asegúrese de usar utilidades de margen para mantener las cosas
            ordenadas y ordenadas.
          </template>
        </AlertBlock>
      </div>
    `,
  }),
}

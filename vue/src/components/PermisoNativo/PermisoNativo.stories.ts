import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import Button from '../Button/Button.vue'
import PermisoNativo from './PermisoNativo.vue'

const meta: Meta<typeof PermisoNativo> = {
  title: 'Overlays/PermisoNativo',
  component: PermisoNativo,
  parameters: { layout: 'centered' },
  argTypes: {
    type: {
      control: 'inline-radio',
      options: ['notificaciones', 'ubicacion', 'microfono'],
      description: 'Figma: Type=Notificaciones|Ubicación|Microfono',
    },
    site: { control: 'text' },
    requestText: { control: 'text', description: 'Texto de la solicitud (default según tipo)' },
    open: { control: 'boolean' },
    fixed: { control: 'boolean', description: 'Anclado arriba a la izquierda como el navegador' },
  },
}

export default meta
type Story = StoryObj<typeof PermisoNativo>

export const Notificaciones: Story = {
  args: { type: 'notificaciones' },
}

export const Ubicacion: Story = {
  name: 'Ubicación',
  args: { type: 'ubicacion' },
}

export const Microfono: Story = {
  name: 'Micrófono',
  args: { type: 'microfono' },
}

export const DesdeUnBoton: Story = {
  name: 'Desde un botón (como el navegador)',
  parameters: { layout: 'padded' },
  render: () => ({
    components: { PermisoNativo, Button },
    setup() {
      const abierto = ref<string | null>(null)
      const resultado = ref('')
      const responder = (texto: string) => {
        resultado.value = texto
        abierto.value = null
      }
      return { abierto, resultado, responder }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px; align-items: flex-start; font-family: var(--font-family-sans);">
        <div style="display: flex; gap: 12px; flex-wrap: wrap;">
          <Button variant="primary" appearance="solid" size="md" @click="abierto = 'notificaciones'">
            Pedir notificaciones
          </Button>
          <Button variant="primary" appearance="outline" size="md" @click="abierto = 'ubicacion'">
            Pedir ubicación
          </Button>
          <Button variant="primary" appearance="outline" size="md" @click="abierto = 'microfono'">
            Pedir micrófono
          </Button>
        </div>
        <p v-if="resultado" style="margin: 0; font-size: 14px; color: var(--color-body);">
          Respuesta: <strong>{{ resultado }}</strong>
        </p>
        <PermisoNativo
          v-if="abierto"
          :type="abierto"
          fixed
          @close="responder('cerrado')"
          @allow="responder('permitido')"
          @allow-this-time="responder('permitido esta vez')"
          @block="responder('bloqueado')"
        />
      </div>
    `,
  }),
}

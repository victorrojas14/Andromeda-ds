import type { Meta, StoryObj } from '@storybook/vue3'
import { onUnmounted, ref, watch } from 'vue'
import Button from '../Button/Button.vue'
import Skeleton from './Skeleton.vue'

const meta: Meta<typeof Skeleton> = {
  title: 'Feedback/Skeleton',
  component: Skeleton,
  parameters: { layout: 'padded' },
  argTypes: {
    width: { control: 'text', description: 'Ancho (px o CSS)' },
    height: { control: 'text', description: 'Alto (px o CSS; Figma: 40)' },
    radius: { control: 'text', description: 'Radio (Figma: 4)' },
    circle: { control: 'boolean', description: 'Placeholder circular' },
    animated: {
      control: 'boolean',
      description: 'Shimmer (Group 1 ↔ Group 2 de Figma)',
    },
  },
}

export default meta
type Story = StoryObj<typeof Skeleton>

export const Playground: Story = {
  args: { width: 360, height: 40 },
}

export const Estatico: Story = {
  name: 'Estático (Group 1)',
  args: { width: 360, height: 40, animated: false },
}

export const Composicion: Story = {
  name: 'Composición (perfil)',
  render: () => ({
    components: { Skeleton },
    template: `
      <div style="display: flex; gap: 16px; align-items: center; max-width: 360px;">
        <Skeleton circle :width="56" :height="56" />
        <div style="display: flex; flex-direction: column; gap: 10px; flex: 1;">
          <Skeleton :height="16" width="60%" />
          <Skeleton :height="12" />
        </div>
      </div>
    `,
  }),
}

export const EjemploDeCarga: Story = {
  name: 'Ejemplo de carga (aparece el contenido)',
  render: () => ({
    components: { Skeleton, Button },
    setup() {
      const cargando = ref(true)
      let timer: ReturnType<typeof setTimeout> | undefined
      const programar = () => {
        clearTimeout(timer)
        timer = setTimeout(() => {
          cargando.value = false
        }, 2500)
      }
      programar()
      watch(cargando, (v) => {
        if (v) programar()
      })
      onUnmounted(() => clearTimeout(timer))
      return { cargando }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px; width: 360px; font-family: var(--font-family-sans);">
        <template v-if="cargando">
          <Skeleton :height="28" width="45%" />
          <Skeleton :height="180" />
          <Skeleton :height="14" />
          <Skeleton :height="14" width="80%" />
          <Skeleton :height="48" :width="160" :radius="4" />
        </template>
        <template v-else>
          <h3 style="margin: 0; font-size: 20px; color: var(--color-body);">Carteras</h3>
          <div style="display: flex; align-items: center; justify-content: center; height: 180px; background: var(--color-primary); border-radius: 10px; color: var(--color-white); font-size: 24px; font-weight: 600;">
            CER 30
          </div>
          <p style="margin: 0; font-size: 14px; color: var(--color-body);">
            Para inversionistas que inician su ciclo de vida laboral o que
            buscan los mayores rendimientos posibles.
          </p>
          <Button variant="primary" appearance="solid" size="md" @click="cargando = true">
            Volver a cargar
          </Button>
        </template>
      </div>
    `,
  }),
}

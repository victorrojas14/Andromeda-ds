import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import Button from '../Button/Button.vue'
import Blanket from './Blanket.vue'

const meta: Meta<typeof Blanket> = {
  title: 'Overlays/Blanket',
  component: Blanket,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    fixed: { control: 'boolean', description: 'Cubre el viewport o solo su contenedor' },
  },
}

export default meta
type Story = StoryObj<typeof Blanket>

export const SobreContenido: Story = {
  name: 'Sobre contenido',
  render: (args) => ({
    components: { Blanket, Button },
    setup() {
      const open = ref(true)
      return { args, open }
    },
    template: `
      <div style="position: relative; min-height: 360px; padding: 24px;">
        <h3 style="font-family: var(--font-family-sans);">Contenido de la página</h3>
        <p style="font-family: var(--font-family-sans); font-size: 14px;">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
        <Button variant="primary" appearance="solid" size="md" @click="open = true">
          Mostrar blanket
        </Button>
        <Blanket v-if="open" v-bind="args" :fixed="false" @close="open = false">
          <p style="color: var(--color-white); font-family: var(--font-family-sans);">
            Click fuera de este texto para cerrar
          </p>
        </Blanket>
      </div>
    `,
  }),
}

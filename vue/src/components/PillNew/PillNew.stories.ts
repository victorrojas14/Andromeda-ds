import type { Meta, StoryObj } from '@storybook/vue3'
import { PillNew } from './index'

/*
 * Data Display / PillNew
 * Figma: página "Pill new" (node 13990:53495), componente "Pill new"
 * (13992:3512). Etiqueta para marcar elementos nuevos; en la página
 * de Figma se muestra anclada a la esquina superior derecha de tabs.
 */

const meta: Meta = {
  title: 'Data Display/PillNew',
  component: PillNew,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Etiqueta "Nuevo" del DS Andromeda (Figma: "Pill new"): pill de 15px con fondo bg-now, borde gray-100, punto y texto en Info. Se usa para marcar elementos nuevos, por ejemplo anclada a la esquina de un tab.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    default: { control: 'text', description: 'Texto del pill (en Figma es fijo "Nuevo").' },
  },
  args: {
    default: 'Nuevo',
  },
}

export default meta
type Story = StoryObj

export const Playground: Story = {
  render: (args) => ({
    components: { PillNew },
    setup: () => ({ args }),
    template: `<PillNew>{{ args.default }}</PillNew>`,
  }),
}

export const AncladoATab: Story = {
  name: 'Anclado a un tab',
  render: () => ({
    components: { PillNew },
    template: `
      <div style="display:flex;gap:40px;align-items:flex-start;">
        <div style="position:relative;display:inline-block;padding-top:3px;">
          <div style="display:inline-flex;align-items:center;padding:10px 20px;font-family:var(--font-family-sans);font-size:var(--font-size-parrafo);font-weight:var(--font-weight-medium);color:var(--color-secondary);border-bottom:2px solid var(--color-gray-300);">
            Inversiones
          </div>
          <span style="position:absolute;top:0;right:-14px;"><PillNew /></span>
        </div>
        <div style="position:relative;display:inline-block;padding-top:3px;">
          <div style="display:inline-flex;align-items:center;padding:10px 20px;font-family:var(--font-family-sans);font-size:var(--font-size-parrafo);font-weight:var(--font-weight-medium);color:var(--color-primary);border-bottom:2px solid var(--color-primary);">
            CFDIs
          </div>
          <span style="position:absolute;top:0;right:-14px;"><PillNew /></span>
        </div>
      </div>
    `,
  }),
}

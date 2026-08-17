import type { Meta, StoryObj } from '@storybook/react'
import { InfoBox } from './InfoBox'

const meta: Meta<typeof InfoBox> = {
  title: 'Feedback/InfoBox',
  component: InfoBox,
  parameters: { layout: 'centered' },
  argTypes: {
    type: {
      control: 'select',
      options: ['legal', 'negocio', 'interaccion', 'nota', 'diseno', 'desarrollo'],
      description:
        'Figma: Type — legal (Legal o de riesgo), negocio (Regla de negocio), interaccion (Interacción & funcionalidad), nota (Nota general), diseno (Acuerdo de diseño), desarrollo (Definición de desarrollo)',
    },
    title: { control: 'text', description: 'Figma: "Título"' },
    description: { control: 'text', description: 'Figma: "Descripción"' },
    icon: { control: 'text', description: 'Icono del DS (default según el tipo)' },
    showIcon: { control: 'boolean' },
    ctaLabel: { control: 'text' },
    showCta: { control: 'boolean' },
    onCta: { action: 'cta' },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 390 }}>
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof InfoBox>

export const Playground: Story = {
  args: { type: 'legal' },
}

export const Variantes: Story = {
  name: 'Las 6 variantes (Type)',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, width: 390 }}>
      <InfoBox type="legal" title="Legal o de riesgo" description="Restricciones, riesgos o consideraciones legales que deben contemplarse." />
      <InfoBox type="negocio" title="Regla de negocio" description="Define condiciones y validaciones necesarias para el funcionamiento del sistema." />
      <InfoBox type="interaccion" title="Interacción & funcionalidad" description="Explica comportamientos, interacciones o dinámicas esperadas en la experiencia." />
      <InfoBox type="nota" title="Nota general" description="Agrega aclaraciones o contexto complementario sin impacto crítico." />
      <InfoBox type="diseno" title="Acuerdo de diseño" description="Documenta decisiones visuales y criterios de experiencia definidos por diseño." />
      <InfoBox type="desarrollo" title="Definición de desarrollo" description="Describe detalles técnicos o criterios necesarios para la implementación." />
    </div>
  ),
}

export const SinCta: Story = {
  name: 'Sin CTA ni icono',
  args: { type: 'nota', showCta: false, showIcon: false },
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
  args: { type: 'interaccion' },
}

import type { Meta, StoryObj } from '@storybook/react'
import { CardPhoto, CardAction, CardContact } from './Card'
import { Button } from '../Button'
import { Icon } from '../Icon'

/*
 * Surfaces / Card
 * Figma: página "Cards" (node 9343:9376): "Card Photo" vertical y
 * horizontal (una sola card, responsive) y las dos "Card Action"
 * (acción y contacto).
 */

// Imagen de muestra embebida (data URI) para no depender de la red.
const FOTO =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 424"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="%23122530"/><stop offset="1" stop-color="%230f89d3"/></linearGradient></defs><rect width="600" height="424" fill="url(%23g)"/><circle cx="470" cy="90" r="46" fill="%23fff3cd"/><path d="M0 424 L210 210 L340 330 L470 200 L600 320 L600 424 Z" fill="%231b2f3e"/></svg>',
  )

const DESCRIPCION =
  'Información de indicadores económicos de coyuntura y estrategias de inversión.'

const leerMas = (
  <Button
    variant="primary"
    appearance="ghost"
    size="md"
    leftIcon={<Icon name="account-outline" />}
    rightIcon={<Icon name="account-outline" />}
  >
    Leer más
  </Button>
)

const meta = {
  title: 'Surfaces/Card',
  component: CardPhoto,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Cards del DS Andromeda (Figma: página "Cards"). `CardPhoto` es una sola card con variante `horizontal` que se apila en vertical bajo 768px; `CardAction` (fecha + título + acción) y `CardContact` (contacto centrado) son dos cards distintas.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text', description: 'Título de la card.' },
    children: { control: 'text', description: 'Descripción.' },
    horizontal: {
      control: 'boolean',
      description: 'Layout horizontal en desktop; vuelve a vertical bajo 768px.',
    },
  },
  args: {
    image: FOTO,
    title: 'Blog',
    children: DESCRIPCION,
    horizontal: false,
  },
} satisfies Meta<typeof CardPhoto>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {
  render: (args) => (
    <div style={{ maxWidth: args.horizontal ? 600 : 300 }}>
      <CardPhoto {...args} action={leerMas} />
    </div>
  ),
}

export const Photo: Story = {
  name: 'CardPhoto — vertical y horizontal',
  render: () => (
    <div style={{ display: 'flex', gap: 134, alignItems: 'flex-start', flexWrap: 'wrap' }}>
      <div style={{ width: 300 }}>
        <CardPhoto image={FOTO} title="Blog" action={leerMas}>
          {DESCRIPCION}
        </CardPhoto>
      </div>
      <div style={{ width: 600 }}>
        <CardPhoto image={FOTO} title="Blog" horizontal action={leerMas}>
          {DESCRIPCION}
        </CardPhoto>
      </div>
    </div>
  ),
}

export const PhotoResponsive: Story = {
  name: 'CardPhoto — responsive',
  parameters: { viewport: { defaultViewport: 'mobile2' } },
  render: () => (
    <CardPhoto image={FOTO} title="Blog" horizontal action={leerMas}>
      {DESCRIPCION}
    </CardPhoto>
  ),
}

export const Action: Story = {
  name: 'CardAction',
  render: () => (
    <div style={{ maxWidth: 420 }}>
      <CardAction
        date="24 jul 2022"
        title="Earnings Conference Call 2022 Q3"
        action={
          <Button variant="primary" appearance="solid" size="md">
            Descargar
          </Button>
        }
      />
    </div>
  ),
}

export const Contacto: Story = {
  name: 'CardContact',
  render: () => (
    <div style={{ maxWidth: 350 }}>
      <CardContact title="Tarjetas de Crédito" email="atencion@invex.com">
        <strong>Ciudad de México:</strong>
        <br />
        T +52 (55) 4000 4000
        <br />
        <strong>De interior:</strong>
        <br />
        01 55 4000 4000
      </CardContact>
    </div>
  ),
}

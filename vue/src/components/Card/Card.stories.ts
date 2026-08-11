import type { Meta, StoryObj } from '@storybook/vue3'
import { CardPhoto, CardAction, CardContact } from './index'
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

const meta: Meta = {
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
    default: { control: 'text', description: 'Descripción (slot default).' },
    horizontal: {
      control: 'boolean',
      description: 'Layout horizontal en desktop; vuelve a vertical bajo 768px.',
    },
  },
  args: {
    title: 'Blog',
    default: DESCRIPCION,
    horizontal: false,
  },
}

export default meta
type Story = StoryObj

export const Playground: Story = {
  render: (args) => ({
    components: { CardPhoto, Button, Icon },
    setup: () => ({ args, FOTO }),
    template: `
      <div :style="{ maxWidth: (args.horizontal ? 600 : 300) + 'px' }">
        <CardPhoto :image="FOTO" :title="args.title" :horizontal="args.horizontal">
          {{ args.default }}
          <template #action>
            <Button variant="primary" appearance="ghost" size="md">
              <template #leftIcon><Icon name="account-outline" /></template>
              Leer más
              <template #rightIcon><Icon name="account-outline" /></template>
            </Button>
          </template>
        </CardPhoto>
      </div>
    `,
  }),
}

export const Photo: Story = {
  name: 'CardPhoto — vertical y horizontal',
  render: () => ({
    components: { CardPhoto, Button, Icon },
    setup: () => ({ FOTO, DESCRIPCION }),
    template: `
      <div style="display:flex;gap:134px;align-items:flex-start;flex-wrap:wrap;">
        <div style="width:300px;">
          <CardPhoto :image="FOTO" title="Blog">
            {{ DESCRIPCION }}
            <template #action>
              <Button variant="primary" appearance="ghost" size="md">
                <template #leftIcon><Icon name="account-outline" /></template>
                Leer más
                <template #rightIcon><Icon name="account-outline" /></template>
              </Button>
            </template>
          </CardPhoto>
        </div>
        <div style="width:600px;">
          <CardPhoto :image="FOTO" title="Blog" horizontal>
            {{ DESCRIPCION }}
            <template #action>
              <Button variant="primary" appearance="ghost" size="md">
                <template #leftIcon><Icon name="account-outline" /></template>
                Leer más
                <template #rightIcon><Icon name="account-outline" /></template>
              </Button>
            </template>
          </CardPhoto>
        </div>
      </div>
    `,
  }),
}

export const PhotoResponsive: Story = {
  name: 'CardPhoto — responsive',
  parameters: { viewport: { defaultViewport: 'mobile2' } },
  render: () => ({
    components: { CardPhoto, Button },
    setup: () => ({ FOTO, DESCRIPCION }),
    template: `
      <CardPhoto :image="FOTO" title="Blog" horizontal>
        {{ DESCRIPCION }}
        <template #action>
          <Button variant="primary" appearance="ghost" size="md">Leer más</Button>
        </template>
      </CardPhoto>
    `,
  }),
}

export const Action: Story = {
  name: 'CardAction',
  render: () => ({
    components: { CardAction, Button },
    template: `
      <div style="max-width:420px;">
        <CardAction date="24 jul 2022" title="Earnings Conference Call 2022 Q3">
          <template #action>
            <Button variant="primary" appearance="solid" size="md">Descargar</Button>
          </template>
        </CardAction>
      </div>
    `,
  }),
}

export const Contacto: Story = {
  name: 'CardContact',
  render: () => ({
    components: { CardContact },
    template: `
      <div style="max-width:350px;">
        <CardContact title="Tarjetas de Crédito" email="atencion@invex.com">
          <strong>Ciudad de México:</strong><br />
          T +52 (55) 4000 4000<br />
          <strong>De interior:</strong><br />
          01 55 4000 4000
        </CardContact>
      </div>
    `,
  }),
}

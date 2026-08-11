import type { Meta, StoryObj } from '@storybook/vue3'
import { ButtonRounded, ButtonRoundedCard, ButtonMisProductos, ButtonTrade } from './index'
import { Icon } from '../Icon'

/*
 * Actions / Button variants
 * Figma: página "Buttons variants" (node 9336:23778), component sets
 * btn/Rounded-LG, btn/Rounded-MD, btn/Mis-Productos, btn-buy y
 * btn-sell. El Estado Hover de Figma es :hover en CSS.
 */

const meta: Meta = {
  title: 'Actions/Button variants',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Variantes de botón del DS Andromeda (Figma: "Buttons variants"): `ButtonRounded` (btn/Rounded-LG, con variante de solo icono), `ButtonRoundedCard` (btn/Rounded-MD), `ButtonMisProductos` (btn/Mis-Productos) y `ButtonTrade` (btn-buy/btn-sell). Los iconos usan el componente `Icon` del DS y el hover replica el Estado Hover de Figma.',
      },
    },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj

export const Rounded: Story = {
  name: 'ButtonRounded (Rounded-LG)',
  render: () => ({
    components: { ButtonRounded, Icon },
    template: `
      <div style="display:flex;gap:30px;align-items:flex-start;flex-wrap:wrap;">
        <ButtonRounded>
          <template #leftIcon><Icon name="account-outline" :size="24" /></template>
          Android
          <template #rightIcon><Icon name="account-outline" :size="24" /></template>
        </ButtonRounded>
        <ButtonRounded>
          <template #topIcon><Icon name="android" :size="24" /></template>
        </ButtonRounded>
      </div>
    `,
  }),
}

export const RoundedCard: Story = {
  name: 'ButtonRoundedCard (Rounded-MD)',
  render: () => ({
    components: { ButtonRoundedCard },
    template: `
      <ButtonRoundedCard title="Texto Titulo" style="width:240px;">
        Texto Contenido
      </ButtonRoundedCard>
    `,
  }),
}

export const MisProductos: Story = {
  name: 'ButtonMisProductos',
  render: () => ({
    components: { ButtonMisProductos },
    template: `
      <div style="display:flex;gap:20px;align-items:center;flex-wrap:wrap;">
        <ButtonMisProductos />
        <ButtonMisProductos disabled />
      </div>
    `,
  }),
}

export const Trade: Story = {
  name: 'ButtonTrade (buy/sell)',
  render: () => ({
    components: { ButtonTrade },
    template: `
      <div style="display:flex;gap:40px;align-items:center;flex-wrap:wrap;">
        <ButtonTrade variant="buy" />
        <ButtonTrade variant="buy" selected />
        <ButtonTrade variant="sell" />
        <ButtonTrade variant="sell" selected />
      </div>
    `,
  }),
}

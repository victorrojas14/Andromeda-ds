import type { Meta, StoryObj } from '@storybook/react'
import { ButtonRounded, ButtonRoundedCard } from './ButtonRounded'
import { ButtonMisProductos } from './ButtonMisProductos'
import { ButtonTrade } from './ButtonTrade'
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
  render: () => (
    <div style={{ display: 'flex', gap: 30, alignItems: 'flex-start', flexWrap: 'wrap' }}>
      <ButtonRounded
        leftIcon={<Icon name="account-outline" size={24} />}
        rightIcon={<Icon name="account-outline" size={24} />}
      >
        Android
      </ButtonRounded>
      <ButtonRounded topIcon={<Icon name="android" size={24} />} />
    </div>
  ),
}

export const RoundedCard: Story = {
  name: 'ButtonRoundedCard (Rounded-MD)',
  render: () => (
    <ButtonRoundedCard title="Texto Titulo" style={{ width: 240 }}>
      Texto Contenido
    </ButtonRoundedCard>
  ),
}

export const MisProductos: Story = {
  name: 'ButtonMisProductos',
  render: () => (
    <div style={{ display: 'flex', gap: 20, alignItems: 'center', flexWrap: 'wrap' }}>
      <ButtonMisProductos />
      <ButtonMisProductos disabled />
    </div>
  ),
}

export const Trade: Story = {
  name: 'ButtonTrade (buy/sell)',
  render: () => (
    <div style={{ display: 'flex', gap: 40, alignItems: 'center', flexWrap: 'wrap' }}>
      <ButtonTrade variant="buy" />
      <ButtonTrade variant="buy" selected />
      <ButtonTrade variant="sell" />
      <ButtonTrade variant="sell" selected />
    </div>
  ),
}

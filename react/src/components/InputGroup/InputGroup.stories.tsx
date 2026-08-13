import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { InputGroup } from './InputGroup'

const CATEGORIAS = [
  'Categoria 1',
  'Categoria 2',
  'Categoria 3',
  'Categoria 4',
  'Categoria 5',
  'Categoria 6',
  'Categoria 7',
  'Categoria 8',
]

const meta: Meta<typeof InputGroup> = {
  title: 'Forms/InputGroup',
  component: InputGroup,
  parameters: { layout: 'padded' },
  argTypes: {
    categoryLabel: { control: 'text', description: 'Label del segmento de categorías' },
    categories: { control: 'object', description: 'Categorías (dropdown en desktop, chips en mobile)' },
    category: { control: 'text', description: 'Categoría seleccionada (controlada)' },
    defaultCategory: { control: 'text' },
    placeholder: { control: 'text', description: 'Placeholder del campo de texto' },
    value: { control: 'text', description: 'Texto de búsqueda (controlado)' },
    defaultValue: { control: 'text' },
    categorySearchable: {
      control: 'boolean',
      description: 'Buscador interno del dropdown de categorías',
    },
    categorySearchPlaceholder: { control: 'text' },
    noResultsText: { control: 'text' },
    onChange: { action: 'change' },
    onCategoryChange: { action: 'categoryChange' },
    onSearch: { action: 'search' },
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 500, minHeight: 480 }}>
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof InputGroup>

export const Playground: Story = {
  args: {
    categoryLabel: 'Categorías',
    categories: CATEGORIAS,
    placeholder: 'Buscar',
    categorySearchable: true,
    categorySearchPlaceholder: 'Buscar',
    noResultsText: 'No se encontraron resultados',
  },
}

export const ConCategoria: Story = {
  name: 'Con categoría seleccionada',
  args: { ...Playground.args, defaultCategory: 'Categoria 1' },
}

export const Controlado: Story = {
  render: (args) => {
    const [texto, setTexto] = useState('')
    const [categoria, setCategoria] = useState('')
    const [busqueda, setBusqueda] = useState('')
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <InputGroup
          {...args}
          value={texto}
          onChange={setTexto}
          category={categoria}
          onCategoryChange={setCategoria}
          onSearch={(v, c) => setBusqueda(`"${v}" en ${c || '(todas)'}`)}
        />
        <p style={{ fontFamily: 'var(--font-family-sans)', fontSize: 14 }}>
          Última búsqueda: <strong>{busqueda || '(ninguna)'}</strong>
        </p>
      </div>
    )
  },
  args: { ...Playground.args },
}

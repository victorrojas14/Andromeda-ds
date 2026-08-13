import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import InputGroup from './InputGroup.vue'

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
    placeholder: { control: 'text', description: 'Placeholder del campo de texto' },
    categorySearchable: {
      control: 'boolean',
      description: 'Buscador interno del dropdown de categorías',
    },
    categorySearchPlaceholder: { control: 'text' },
    noResultsText: { control: 'text' },
  },
  decorators: [
    () => ({ template: '<div style="max-width: 500px; min-height: 480px;"><story /></div>' }),
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
  args: { ...Playground.args, category: 'Categoria 1' },
}

export const Controlado: Story = {
  render: (args) => ({
    components: { InputGroup },
    setup() {
      const texto = ref('')
      const categoria = ref('')
      const busqueda = ref('')
      const onSearch = (v: string, c: string) => {
        busqueda.value = `"${v}" en ${c || '(todas)'}`
      }
      return { args, texto, categoria, busqueda, onSearch }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <InputGroup
          v-bind="args"
          v-model="texto"
          v-model:category="categoria"
          @search="onSearch"
        />
        <p style="font-family: var(--font-family-sans); font-size: 14px;">
          Última búsqueda: <strong>{{ busqueda || '(ninguna)' }}</strong>
        </p>
      </div>
    `,
  }),
  args: { ...Playground.args },
}

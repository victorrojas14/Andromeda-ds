import type { Meta, StoryObj } from '@storybook/vue3'
import { Breadcrumbs, BreadcrumbItem } from './index'

/*
 * Navigation / Breadcrumbs
 * Figma: página "Breadcrumbs" (node 9278:2376), component set
 * "Breadcrumbs" (Estado Default/Active × Size Desktop/Mobile).
 */

const meta: Meta = {
  title: 'Navigation/Breadcrumbs',
  component: BreadcrumbItem,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Miga de pan del DS Andromeda (Figma: "Breadcrumbs"). `BreadcrumbItem` es el item del set (separador chevron-right opcional + texto Regular; los navegables en Active: primario subrayado con link; el último en `body` sin link y con `aria-current`); `Breadcrumbs` los apila con gap de 10px y oculta el separador del primero. Responsive: en viewport mobile (< 768px) el texto pasa de 16px a 12px.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    default: { control: 'text', description: 'Texto de la categoría (Figma: "Texto Categoria").' },
    active: { control: 'boolean', description: 'Item navegable (Figma: Estado Active): primario subrayado.' },
    icon: { control: 'boolean', description: 'Separador chevron-right (Figma: "Mostrar Icono").' },
  },
  args: {
    default: 'Texto Categoria',
    active: true,
    icon: true,
  },
}

export default meta
type Story = StoryObj

export const Playground: Story = {
  render: (args) => ({
    components: { BreadcrumbItem },
    setup: () => ({ args }),
    template: `<BreadcrumbItem :active="args.active" :icon="args.icon">{{ args.default }}</BreadcrumbItem>`,
  }),
}

export const Navegacion: Story = {
  name: 'Navegación',
  render: () => ({
    components: { Breadcrumbs, BreadcrumbItem },
    template: `
      <Breadcrumbs>
        <BreadcrumbItem active href="/inicio">Inicio</BreadcrumbItem>
        <BreadcrumbItem active href="/inversiones">Inversiones</BreadcrumbItem>
        <BreadcrumbItem>Fondos de inversión</BreadcrumbItem>
      </Breadcrumbs>
    `,
  }),
}

export const Mobile: Story = {
  name: 'Mobile (responsive)',
  parameters: { viewport: { defaultViewport: 'mobile2' } },
  render: () => ({
    components: { Breadcrumbs, BreadcrumbItem },
    template: `
      <Breadcrumbs>
        <BreadcrumbItem active href="/inicio">Inicio</BreadcrumbItem>
        <BreadcrumbItem active href="/inversiones">Inversiones</BreadcrumbItem>
        <BreadcrumbItem>Fondos de inversión</BreadcrumbItem>
      </Breadcrumbs>
    `,
  }),
}

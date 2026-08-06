import type { Meta, StoryObj } from '@storybook/react'
import { Breadcrumbs, BreadcrumbItem } from './Breadcrumbs'

/*
 * Navigation / Breadcrumbs
 * Figma: página "Breadcrumbs" (node 9278:2376), component set
 * "Breadcrumbs" (Estado Default/Active × Size Desktop/Mobile).
 */

const meta = {
  title: 'Navigation/Breadcrumbs',
  component: BreadcrumbItem,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Miga de pan del DS Andromeda (Figma: "Breadcrumbs"). `BreadcrumbItem` es el item del set (separador chevron-right opcional + texto Regular; Active en primario subrayado y con `aria-current`); `Breadcrumbs` los apila con gap de 10px y oculta el separador del primero. Responsive: en viewport mobile (< 768px) el texto pasa de 16px a 12px.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    children: { control: 'text', description: 'Texto de la categoría (Figma: "Texto Categoria").' },
    active: {
      control: 'boolean',
      description: 'Página actual (Figma: Estado Active).',
    },
    icon: {
      control: 'boolean',
      description: 'Separador chevron-right (Figma: "Mostrar Icono").',
    },
  },
  args: {
    children: 'Texto Categoria',
    active: true,
    icon: true,
  },
} satisfies Meta<typeof BreadcrumbItem>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {
  render: (args) => <BreadcrumbItem {...args} />,
}

export const Navegacion: Story = {
  name: 'Navegación',
  render: () => (
    <Breadcrumbs>
      <BreadcrumbItem href="/inicio">Inicio</BreadcrumbItem>
      <BreadcrumbItem href="/inversiones">Inversiones</BreadcrumbItem>
      <BreadcrumbItem active>Fondos de inversión</BreadcrumbItem>
    </Breadcrumbs>
  ),
}

export const Mobile: Story = {
  name: 'Mobile (responsive)',
  parameters: { viewport: { defaultViewport: 'mobile2' } },
  render: () => (
    <Breadcrumbs>
      <BreadcrumbItem href="/inicio">Inicio</BreadcrumbItem>
      <BreadcrumbItem href="/inversiones">Inversiones</BreadcrumbItem>
      <BreadcrumbItem active>Fondos de inversión</BreadcrumbItem>
    </Breadcrumbs>
  ),
}

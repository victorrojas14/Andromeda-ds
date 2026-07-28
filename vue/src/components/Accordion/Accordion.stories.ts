import type { Meta, StoryObj } from '@storybook/vue3'
import { Accordion, AccordionItem } from './index'
import { Button } from '../Button'
import { Icon } from '../Icon'

/*
 * Surfaces / Accordion
 * Figma: página "Accordion" (nodes 9259:752 y 9259:2202), component
 * sets "Acordeon" e "Item Accordion 2".
 */

const CONTENIDO =
  'Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod.'

const meta: Meta = {
  title: 'Surfaces/Accordion',
  component: Accordion,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Acordeón del DS Andromeda (Figma: "Acordeon"). Header con título, icono (slot #icon) y acción (slot #action) opcionales y chevron; panel de contenido (slot default) sobre fondo neutro. Uso controlado con `v-model:open` o no controlado con `defaultOpen`.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text', description: 'Título del header.' },
    size: {
      control: 'inline-radio',
      options: ['desktop', 'mobile'],
      description: 'Variante de tamaño (Figma: Size).',
    },
    defaultOpen: {
      control: 'boolean',
      description: 'Estado inicial (Figma: Estado Abierto/Cerrado).',
    },
  },
  args: {
    title: 'Título Acordeón',
    size: 'desktop',
    defaultOpen: false,
  },
}

export default meta
type Story = StoryObj

export const Playground: Story = {
  render: (args) => ({
    components: { Accordion },
    setup: () => ({ args, CONTENIDO }),
    template: `
      <div :style="{ maxWidth: (args.size === 'mobile' ? 358 : 699) + 'px' }">
        <Accordion v-bind="args" :key="args.size + '-' + args.defaultOpen">
          {{ CONTENIDO }}
        </Accordion>
      </div>
    `,
  }),
}

export const Completo: Story = {
  render: () => ({
    components: { Accordion, Button, Icon },
    setup: () => ({ CONTENIDO }),
    template: `
      <div style="max-width:699px;">
        <Accordion title="Título Acordeón" default-open>
          <template #icon><Icon name="account-outline" :size="24" /></template>
          <template #action>
            <Button variant="primary" appearance="ghost" size="sm">Default</Button>
          </template>
          <p style="margin:0;">{{ CONTENIDO }}</p>
          <div style="display:flex;gap:24px;justify-content:flex-end;">
            <Button variant="primary" appearance="ghost" size="sm">Texto ghost</Button>
            <Button variant="primary" appearance="solid" size="sm">Botón</Button>
          </div>
        </Accordion>
      </div>
    `,
  }),
}

export const Mobile: Story = {
  render: () => ({
    components: { Accordion, Icon },
    setup: () => ({ CONTENIDO }),
    template: `
      <div style="max-width:358px;display:flex;flex-direction:column;">
        <Accordion title="Título Acordeón" size="mobile">
          <template #icon><Icon name="account-outline" :size="24" /></template>
        </Accordion>
        <Accordion title="Título Acordeón" size="mobile" default-open>
          {{ CONTENIDO }}
        </Accordion>
      </div>
    `,
  }),
}

export const Agrupados: Story = {
  render: () => ({
    components: { Accordion, Icon },
    setup: () => ({ CONTENIDO }),
    template: `
      <div style="max-width:699px;display:flex;flex-direction:column;">
        <Accordion title="Título Acordeón">
          <template #icon><Icon name="account-outline" :size="24" /></template>
        </Accordion>
        <Accordion title="Título Acordeón" default-open>
          <template #icon><Icon name="account-outline" :size="24" /></template>
          {{ CONTENIDO }}
        </Accordion>
        <Accordion title="Título Acordeón">
          <template #icon><Icon name="account-outline" :size="24" /></template>
        </Accordion>
      </div>
    `,
  }),
}

export const Items: Story = {
  name: 'Item Accordion',
  render: () => ({
    components: { AccordionItem, Icon },
    template: `
      <div style="display:flex;gap:40px;flex-wrap:wrap;">
        <div style="width:350px;display:flex;flex-direction:column;gap:20px;">
          <AccordionItem title="Título Acordeón">
            <template #icon><Icon name="account-outline" :size="24" /></template>
          </AccordionItem>
          <AccordionItem title="Título Acordeón" />
        </div>
        <div style="width:350px;display:flex;flex-direction:column;gap:20px;">
          <AccordionItem title="Título Acordeón" size="mobile">
            <template #icon>
              <span style="color:var(--color-tertiary);display:inline-flex;">
                <Icon name="account-outline" :size="24" />
              </span>
            </template>
          </AccordionItem>
          <AccordionItem title="Título Acordeón" size="mobile" />
        </div>
      </div>
    `,
  }),
}

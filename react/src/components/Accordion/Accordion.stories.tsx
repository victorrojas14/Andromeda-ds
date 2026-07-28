import type { Meta, StoryObj } from '@storybook/react'
import { Accordion, AccordionItem } from './Accordion'
import { Button } from '../Button'
import { Icon } from '../Icon'

/*
 * Surfaces / Accordion
 * Figma: página "Accordion" (nodes 9259:752 y 9259:2202), component
 * sets "Acordeon" e "Item Accordion 2".
 */

const CONTENIDO =
  'Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod.'

const meta = {
  title: 'Surfaces/Accordion',
  component: Accordion,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Acordeón del DS Andromeda (Figma: "Acordeon"). Header con título, icono y acción opcionales y chevron; panel de contenido sobre fondo neutro. Uso controlado con `open`/`onToggle` o no controlado con `defaultOpen`.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text', description: 'Título del header.' },
    defaultOpen: {
      control: 'boolean',
      description: 'Estado inicial (Figma: Estado Abierto/Cerrado).',
    },
  },
  args: {
    title: 'Título Acordeón',
    defaultOpen: false,
  },
} satisfies Meta<typeof Accordion>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {
  render: (args) => (
    <div style={{ maxWidth: 699 }}>
      <Accordion {...args} key={String(args.defaultOpen)}>
        {CONTENIDO}
      </Accordion>
    </div>
  ),
}

export const Completo: Story = {
  render: () => (
    <div style={{ maxWidth: 699 }}>
      <Accordion
        title="Título Acordeón"
        defaultOpen
        leftIcon={<Icon name="account-outline" size={24} />}
        headerAction={
          <Button variant="primary" appearance="ghost" size="sm">
            Default
          </Button>
        }
      >
        <p style={{ margin: 0 }}>{CONTENIDO}</p>
        <div style={{ display: 'flex', gap: 24, justifyContent: 'flex-end' }}>
          <Button variant="primary" appearance="ghost" size="sm">
            Texto ghost
          </Button>
          <Button variant="primary" appearance="solid" size="sm">
            Botón
          </Button>
        </div>
      </Accordion>
    </div>
  ),
}

export const Mobile: Story = {
  name: 'Mobile (responsive)',
  parameters: { viewport: { defaultViewport: 'mobile2' } },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Accordion title="Título Acordeón" leftIcon={<Icon name="account-outline" size={24} />} />
      <Accordion title="Título Acordeón" defaultOpen>
        {CONTENIDO}
      </Accordion>
    </div>
  ),
}

export const Agrupados: Story = {
  render: () => (
    <div style={{ maxWidth: 699, display: 'flex', flexDirection: 'column' }}>
      <Accordion title="Título Acordeón" leftIcon={<Icon name="account-outline" size={24} />} />
      <Accordion title="Título Acordeón" defaultOpen leftIcon={<Icon name="account-outline" size={24} />}>
        {CONTENIDO}
      </Accordion>
      <Accordion title="Título Acordeón" leftIcon={<Icon name="account-outline" size={24} />} />
    </div>
  ),
}

export const VarianteBotonGhost: Story = {
  name: 'Variante — botón ghost',
  render: () => (
    <div style={{ maxWidth: 699 }}>
      <Accordion
        title="Título Acordeón"
        leftIcon={<Icon name="account-outline" size={24} />}
        headerAction={
          <Button
            variant="primary"
            appearance="ghost"
            size="sm"
            leftIcon={<Icon name="account-outline" />}
            rightIcon={<Icon name="account-outline" />}
          >
            Default
          </Button>
        }
      >
        {CONTENIDO}
      </Accordion>
    </div>
  ),
}

export const VarianteEstatus: Story = {
  name: 'Variante — estatus',
  render: () => (
    <div style={{ maxWidth: 699 }}>
      <Accordion
        title="Título Acordeón"
        leftIcon={<Icon name="account-outline" size={24} />}
        headerAction={
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              minHeight: 33,
              padding: '0 var(--space-10)',
              color: 'var(--color-feedback-success)',
              fontFamily: 'var(--font-family-sans)',
              fontSize: 'var(--font-size-parrafo-sm)',
              fontWeight: 'var(--font-weight-medium)' as never,
            }}
          >
            <Icon name="check-circle-outline" size={20} />
            HECHO
          </span>
        }
      >
        {CONTENIDO}
      </Accordion>
    </div>
  ),
}

export const Items: Story = {
  name: 'Item Accordion',
  render: () => (
    <div style={{ display: 'flex', gap: 40, flexWrap: 'wrap' }}>
      <div style={{ width: 350, display: 'flex', flexDirection: 'column', gap: 20 }}>
        <AccordionItem title="Título Acordeón" leftIcon={<Icon name="account-outline" size={24} />} />
        <AccordionItem title="Título Acordeón" />
      </div>
      <div style={{ width: 350, display: 'flex', flexDirection: 'column', gap: 20 }}>
        <AccordionItem
          title="Título Acordeón"
          leftIcon={
            <span style={{ color: 'var(--color-tertiary)', display: 'inline-flex' }}>
              <Icon name="account-outline" size={24} />
            </span>
          }
        />
        <AccordionItem title="Título Acordeón" />
      </div>
    </div>
  ),
}

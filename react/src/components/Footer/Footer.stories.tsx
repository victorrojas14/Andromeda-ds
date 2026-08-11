import type { Meta, StoryObj } from '@storybook/react'
import { Footer } from './Footer'
import type { FooterColumn } from './Footer'

/*
 * Layout / Footer
 * Figma: página "Footer" (nodes 9356:11408 desktop, 9356:11419 tablet
 * y 9775:3865 mobile), componentes "Footer Desktop" y "Footer Mobile".
 */

const COLUMNAS: FooterColumn[] = [
  {
    title: 'Acércate a INVEX',
    links: [
      { label: 'Análisis de mercados', href: '#' },
      { label: 'Línea de honor', href: '#' },
      { label: 'Contacto y Centro Financieros', href: '#' },
      { label: 'Bolsa de trabajo', href: '#' },
      { label: 'Preguntas frecuentes', href: '#' },
    ],
  },
  {
    title: 'Información Corporativa',
    links: [
      { label: 'Información Corporativa', href: '#' },
      { label: 'Aviso de Privacidad', href: '#' },
      { label: 'Adevertencia Legal', href: '#' },
      { label: 'Marcos Generales de Actuación y Guías de Inversión', href: '#' },
    ],
  },
  {
    title: 'Información Relevante',
    links: [
      { label: 'UNE', href: '#' },
      { label: 'FATCA - CRS', href: '#' },
      { label: 'Contratos', href: '#' },
      { label: 'Portabilidad de nómina', href: '#' },
      { label: 'Tips de seguridad', href: '#' },
      { label: 'Costos y comisiones', href: '#' },
      { label: 'Aclaraciones y consultas SPEI', href: '#' },
    ],
  },
  {
    title: 'Sitios de interés',
    links: [
      { label: 'INVEX Controladora', href: '#' },
      { label: 'INVEX Fiduciario', href: '#' },
      { label: 'INVEX Cambios y Derivados', href: '#' },
      { label: 'INVEX Inversiones', href: '#' },
      { label: 'INVEX Energía', href: 'https://ammper.com' },
      { label: 'INVEX Infraestructura', href: '#' },
      { label: 'Tu socio financiero', href: 'https://tusociofinanciero.com' },
    ],
  },
]

interface FooterArgs {
  numColumns: 1 | 2 | 3 | 4
  social: boolean
  copyright: string
}

const meta: Meta<FooterArgs> = {
  title: 'Layout/Footer',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Pie de página del DS Andromeda (Figma: "Footer Desktop" / "Footer Mobile"). Columnas de menú editables (título, subitems con texto y URL; de 1 a 4), columna "Síguenos" opcional con redes y logos regulatorios (Buró, CONDUSEF, IPAB), y barra inferior con el logo INVEX y copyright. Un solo componente responsive: en <1024px las columnas se apilan y colapsan con chevron.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    numColumns: {
      control: 'inline-radio',
      options: [1, 2, 3, 4],
      description: 'Cantidad de columnas del menú (se editan vía la prop `columns`).',
      table: { defaultValue: { summary: '4' } },
    },
    social: {
      control: 'boolean',
      description: 'Columna "Síguenos" (iconos de redes + logos).',
      table: { defaultValue: { summary: 'true' } },
    },
    copyright: { control: 'text', description: 'Texto de la barra inferior.' },
  },
  args: {
    numColumns: 4,
    social: true,
    copyright: '2026 INVEX® Todos los derechos reservados',
  },
}

export default meta
type Story = StoryObj<FooterArgs>

export const Playground: Story = {
  render: (args) => (
    <Footer
      columns={COLUMNAS.slice(0, args.numColumns)}
      social={args.social}
      copyright={args.copyright}
      socialLinks={{
        facebook: 'https://facebook.com/invex',
        x: 'https://x.com/invex',
        instagram: 'https://instagram.com/invex',
      }}
    />
  ),
}

export const Completo: Story = {
  render: () => <Footer columns={COLUMNAS} />,
}

export const DosColumnas: Story = {
  name: 'Dos columnas sin Síguenos',
  render: () => <Footer columns={COLUMNAS.slice(0, 2)} social={false} />,
}

export const Responsive: Story = {
  name: 'Mobile (responsive)',
  parameters: { viewport: { defaultViewport: 'mobile2' } },
  render: () => <Footer columns={COLUMNAS} />,
}

import figma from '@figma/code-connect'
import { Footer } from './Footer'

/*
 * Code Connect — Footer (React)
 *
 * Mapea los componentes publicados de la página "Footer" del archivo
 * Figma "Ui Kit Web". "Footer Desktop" (735:11855) y "Footer Mobile"
 * (735:11856) resuelven al mismo componente responsive: en <1024px
 * las columnas se apilan y colapsan (diseño Mobile/Tablet).
 */

figma.connect(
  Footer,
  'https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=735-11855',
  {
    example: () => (
      <Footer
        columns={[
          {
            title: 'Acércate a INVEX',
            links: [
              { label: 'Análisis de mercados', href: '/analisis' },
              { label: 'Bolsa de trabajo', href: '/bolsa-de-trabajo' },
            ],
          },
          {
            title: 'Información Corporativa',
            links: [{ label: 'Aviso de Privacidad', href: '/aviso-de-privacidad' }],
          },
        ]}
        socialLinks={{ facebook: 'https://facebook.com/invex' }}
      />
    ),
  },
)

figma.connect(
  Footer,
  'https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=735-11856',
  {
    example: () => (
      <Footer
        columns={[
          {
            title: 'Acércate a INVEX',
            links: [
              { label: 'Análisis de mercados', href: '/analisis' },
              { label: 'Bolsa de trabajo', href: '/bolsa-de-trabajo' },
            ],
          },
          {
            title: 'Información Corporativa',
            links: [{ label: 'Aviso de Privacidad', href: '/aviso-de-privacidad' }],
          },
        ]}
        socialLinks={{ facebook: 'https://facebook.com/invex' }}
      />
    ),
  },
)

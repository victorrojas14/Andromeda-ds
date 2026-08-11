import figma, { html } from '@figma/code-connect/html'

/*
 * Code Connect — Footer (Vue)
 *
 * Mapea los componentes publicados de la página "Footer" del archivo
 * Figma "Ui Kit Web". "Footer Desktop" (735:11855) y "Footer Mobile"
 * (735:11856) resuelven al mismo componente responsive: en <1024px
 * las columnas se apilan y colapsan (diseño Mobile/Tablet).
 */

figma.connect('https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=735-11855', {
  example: () => html`
<Footer
  :columns="[
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
  ]"
  :social-links="{ facebook: 'https://facebook.com/invex' }"
/>`,
  imports: ["import { Footer } from '@andromeda/vue'"],
})

figma.connect('https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=735-11856', {
  example: () => html`
<Footer
  :columns="[
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
  ]"
  :social-links="{ facebook: 'https://facebook.com/invex' }"
/>`,
  imports: ["import { Footer } from '@andromeda/vue'"],
})

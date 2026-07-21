/*
 * Fundamentos — Colores del DS Andromeda.
 *
 * Fuente: Figma "Ui Kit Web" (oTZzdsgGkCjbL2f3oybxD0)
 *   - Colores Base             (node 9075:37705)
 *   - Paleta gráfica de pastel (node 10445:399)
 *
 * Estos valores son un espejo de tokens/tokens.css para poder
 * consumirlos desde JS/TS (gráficas, canvas, temas dinámicos).
 * Para estilos usá siempre las CSS custom properties.
 */

export const colors = {
  primary: { light: '#c68091', base: '#a41d36', dark: '#6e0011' },
  secondary: { light: '#73797e', base: '#565a5c', dark: '#232930' },
  tertiary: { light: '#eef4ff', base: '#0f89d3', dark: '#035688' },
  neutral: {
    white: '#ffffff',
    background: '#f6f6f6',
    gray100: '#ededed',
    gray200: '#e9e9e9',
    gray300: '#cccccc',
    gray400: '#a7a7a7',
    gray500: '#666666',
    body: '#222222',
  },
  success: { light: '#d4edda', base: '#28a745', dark: '#176529' },
  warning: { light: '#fff3cd', base: '#ffc107', dark: '#a17901' },
  danger: { light: '#fcd9e0', base: '#ed002f', dark: '#bd0026' },
  info: { light: '#d7e6ff', base: '#3582ff', dark: '#0044b4' },
  darkMode: { darkBlue01: '#122530', darkBlue02: '#1b2f3e', blackBlue: '#171436' },
} as const

/**
 * Paleta para gráficas de pastel. El orden importa: el índice 0 es el
 * primer elemento de la gráfica. Del 6º elemento en adelante se agrupa
 * la serie en "Otros" usando el último color.
 */
export const chartPalette = [
  '#6e0011', // 1º elemento
  '#a41d36', // 2º elemento
  '#0f89d3', // 3º elemento
  '#423670', // 4º elemento
  '#cccccc', // 5º elemento
  '#565a5c', // 6º elemento en adelante ("Otros")
] as const

/** Color para el elemento `index` (base 0) de una gráfica de pastel. */
export function chartColor(index: number): string {
  return chartPalette[Math.min(index, chartPalette.length - 1)]
}

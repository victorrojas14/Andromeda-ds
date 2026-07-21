import type { Preview } from '@storybook/react'

// Tokens del DS — se cargan una vez para todas las stories
import '../../tokens/tokens.css'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'default',
      values: [
        { name: 'default', value: 'var(--color-surface-default)' },
        { name: 'subtle', value: 'var(--color-surface-subtle)' },
        { name: 'inverse', value: 'var(--color-surface-inverse)' },
      ],
    },
  },
}

export default preview

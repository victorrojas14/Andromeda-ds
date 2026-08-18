import figma from '@figma/code-connect'
import { Tabs } from './Tabs'

/**
 * Tabs — Code Connect
 * Figma: Ui Kit Web — página Tabs, sets "Tabs-1" (175:4777, primary
 * con subrayado), "Tab secundario" (14033:4376, segmented) y
 * "Tab-atom" (14031:9608). Size=Desktop|Mobile es el mismo componente
 * responsivo (<768px).
 */

// Tabs-1 (tab primary) — set publicado 175:4777
figma.connect(
  Tabs,
  'https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=175-4777',
  {
    props: {
      label: figma.string('Texto'),
      activeStyle: figma.enum('Estado', {
        'Active primary': 'primary',
        'Active secundary': 'secondary',
      }),
      disabled: figma.enum('Estado', {
        Disabled: true,
      }),
    },
    example: (props) => (
      <Tabs
        variant="primary"
        activeStyle={props.activeStyle}
        items={[
          { label: props.label, iconLeft: 'account-outline', iconRight: 'account-outline', disabled: props.disabled },
          'Texto Tab',
        ]}
      />
    ),
  },
)

// Tab secundario (segmented) — set publicado 14033:4376
figma.connect(
  Tabs,
  'https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=14033-4376',
  {
    props: {
      items: figma.enum('Quantity', {
        '2': ['Text', 'Text'],
        '3': ['Text', 'Text', 'Text'],
        '4': ['Text', 'Text', 'Text', 'Text'],
        '5': ['Text', 'Text', 'Text', 'Text', 'Text'],
      }),
    },
    example: (props) => <Tabs variant="secondary" items={props.items} />,
  },
)

// Tab-atom (segmento individual) — set publicado 14031:9608
figma.connect(
  Tabs,
  'https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=14031-9608',
  {
    props: {
      label: figma.string('TextContent'),
    },
    example: (props) => (
      <Tabs variant="secondary" items={[props.label, 'Text']} />
    ),
  },
)

# Andromeda Design System

Sistema de diseño de INVEX. Este repositorio contiene los componentes del DS en **React** y **Vue 3**, con **Storybook** para documentación interactiva y **Figma Code Connect** para mantener sincronizado el código con la librería de Figma.

Primer componente disponible: **Button**.

## Estructura del repositorio

```
├── tokens/
│   └── tokens.css          # Design tokens compartidos (primitivos + semánticos)
├── react/                  # @andromeda/react
│   ├── .storybook/
│   └── src/components/Button/
└── vue/                    # @andromeda/vue
    ├── .storybook/
    └── src/components/Button/
```

Ambos paquetes consumen el mismo archivo de tokens (`tokens/tokens.css`), que define la paleta de marca, espaciado, radios y tipografía como CSS custom properties. Cuando el refactor del DS termine, este archivo se generará automáticamente vía Style Dictionary a partir de las Variables de Figma.

## Requisitos

- Node.js 18+
- npm

## Instalación

Cada paquete se instala por separado:

```bash
cd react && npm install
cd vue && npm install
```

## Fuente Poppins

Poppins es la fuente por defecto del DS (`--font-family-sans`). Los Storybooks ya la cargan desde Google Fonts vía `.storybook/preview-head.html`. Las apps consumidoras deben incluir en su `<head>`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">
```

Nota: Google Fonts no ofrece el peso 275 (ExtraLight de los estilos Display en Figma); el navegador resuelve al peso disponible más cercano (300).

## Storybook

| Paquete | Comando | Puerto |
| ------- | ------- | ------ |
| React | `cd react && npm run storybook` | http://localhost:6006 |
| Vue | `cd vue && npm run storybook` | http://localhost:6007 |

## Fundamentos

Los fundamentos del DS provienen de las páginas "Colores Base" y "Paleta gráfica de pastel" del archivo Figma "Ui Kit Web":

- **`tokens/tokens.css`** — colores de marca (Primary/Secondary/Tertiary con variantes Light/Dark), neutros, semánticos (Success/Warning/Danger/Info × Light/Base/Dark), dark mode, paleta para gráficas de pastel, tipografía Poppins, espaciado, radios y sombras. Incluye la capa semántica (`--color-action-*`, `--color-text-*`, etc.) que consumen los componentes.
- **`src/foundations/colors.ts`** (en cada paquete) — espejo tipado de los tokens para consumirlos desde JS/TS: `colors`, `chartPalette` y `chartColor(index)` para series de gráficas (del 6º elemento en adelante se agrupa en «Otros»).
- **`ColorCard`** — componente de documentación de color (réplica del "DS/Color Card" de Figma), usado por las páginas de Storybook bajo **Fundamentos**.
- **Grid** — retícula del fundamento "Grid" de Figma: 12 columnas, gutter de 20px y contenedor de 1140px centrado (tokens `--grid-*`). Se consume con los componentes `Grid` y `GridCol` (`<GridCol span={8}>` / `<GridCol :span="8">`) y está documentada en Storybook bajo **Fundamentos/Grid**. El Code Connect del Grid queda preparado (comentado en `Grid.figma.*`) porque el nodo de Figma es un frame de documentación y Figma solo permite conectar componentes publicados en la librería.
- **Icons** — librería de 170 iconos generada desde la página "Icons" de Figma (`Icon/icons.ts`, no editar a mano). Se consume con `<Icon name="account-outline" size={24} />` / `<Icon name="account-outline" :size="24" />`; el color se hereda vía currentColor y los tamaños de la librería son 12–72. Los 1014 componentes de icono publicados están mapeados con Code Connect (`Icon.figma.*`, generados por script).
- **Rounded** — escala de radios de la página "Rounded" de Figma: SM 4px, MD 10px, LG 20px y XL 50px (tokens `--radius-*`, más `--radius-none` y `--radius-pill`), documentada en Storybook bajo **Fundamentos/Rounded**. Es un fundamento de tokens puros: la página de Figma son rectángulos de documentación sin componentes publicados, por lo que no hay nodo mapeable con Code Connect.
- **Spacing** — tokens de espaciado de la página "Spacing" de Figma, con variables **Desktop y Mobile**: `--space-N` (el nombre indica el valor desktop: 0/8/10/16/20/24/30/40/50/70/90) y `--space-N-mobile` (10→8, 20→16, 24→16, 30→24, 40→32; el resto igual). El gutter y margen del Grid ahora referencian esta escala. Documentado en Storybook bajo **Fundamentos/Spacing** con la tabla Desktop/Mobile y Playground interactivo. Fundamento de tokens puros, sin nodo mapeable con Code Connect. Se mantienen aliases legacy `--space-1..5` para los componentes existentes.
- **Shading** — catálogo de sombras de la página "Shading" de Figma (tokens `--shadow-*`): Sombra 1 centrada (`sm`/`md`/`lg`/`xl`/`per`), Sombra 2 abajo-derecha (`*-2`), Sombra 3 abajo-izquierda (`*-3`) y Sombra Autolayout (`autolayout-sm/md/lg/xl`), con los valores exactos de los effect styles. Documentado en Storybook bajo **Fundamentos/Shading** con Playground interactivo. Fundamento de tokens puros: la página no tiene componentes publicados, por lo que no hay nodo mapeable con Code Connect.
- **Typography** — escala tipográfica de las páginas "Tipografía Web" y "Tipografía App" de Figma: Poppins con line-height 150%, estilos Display 1–4 (72/64/56/48), Heading h1–h6 (40/32/28/24/20/16), Body (Parrafo 16, SM 14, XS 12) y Small 1–2 (10/8), en pesos regular/medium/semibold (en Display, `regular` renderiza ExtraLight 275 y `medium` renderiza 400, fiel a Figma). Se consume con `<Text variant="h2" weight="semibold">` (prop `as` en React / `tag` en Vue para el elemento HTML). El Code Connect queda preparado (comentado en `Text.figma.*`) porque la tipografía está definida como text styles y Variables, no como componentes publicados.
- **Logo** — marcas INVEX (Invex, Invex Banco, Invex Fiduciario, Invex Renacer) desde la página "Marcas Invex" de Figma. Se consume con `<Logo variant="invex" height={40} />` / `<Logo variant="invex" :height="40" />`; el color se hereda vía currentColor (Rojo INVEX por defecto) y la prop `envolvente` aplica el área de seguridad sobre fondo primario con el logo en blanco. Los component sets publicados `Logotipos-Todos` y `Logo-InvexTodos` (con mapeo de variante) y los componentes `logo/*` están conectados con Code Connect (`Logo.figma.*`).

## Accordion

Acordeón del DS (Figma: component sets **Acordeon** e **Item Accordion 2** de la página Accordion), en React y Vue bajo **Surfaces/Accordion** en Storybook:

- **`Accordion`** — header blanco (borde inferior `gray-300`, radios `sm` superiores, título Poppins Medium `secondary-dark`) con icono opcional, acción opcional (ej. Button ghost) y chevron; panel de contenido sobre `background` con radios `sm` inferiores. **Responsive**: usa el diseño Desktop de Figma (padding `space-20`, título 16px, panel `space-30`) y en viewport mobile (< 768px) adopta automáticamente el diseño Mobile (padding `space-8·16`, título 14px, panel `space-16`) — no hay prop de tamaño. Uso controlado (`open`/`onToggle` en React, `v-model:open` en Vue) o no controlado (`defaultOpen`). Accesible: header con `role="button"`, `aria-expanded`, `aria-controls` y teclado (Enter/Espacio).
- **`AccordionItem`** — fila tipo card (fondo blanco, radio `md`, sombra `autolayout-sm`, padding `space-10`, alto mínimo 52px, título Poppins Medium `body`), con icono izquierdo opcional y chevron derecho por defecto. Responsive con el mismo breakpoint.
- **Code Connect**: ambos component sets mapeados con sus properties reales (`Texto Titulo`/`Ttitulo`, `Estado`, iconos y botón). La variante `Size` de Figma no se mapea: ambas resuelven al mismo componente responsive. Los sets "NO USAR" (deprecados en Figma) no se mapean a propósito.

## Alert

Alertas del DS (Figma: sets **Alerta** y **Alertas con accion** de la página Alerts), bajo **Feedback/Alert** en Storybook. `Alert` (inline): fondo semántico `*-light`, textos/iconos en `*-dark`, radio `md`, sombra `--shadow-md-2`, mensaje destacado con divisor, acción opcional y botón de cerrar (auto-descarte + `onClose`/`@close`); variants success/warning/danger/info con iconos fieles (Info usa `alert-outline` rotado). `AlertBlock` (bloque): título h5 SemiBold por variant, cuerpo y footer con divisor de 0.5px (sin danger). Ambos sets mapeados con Code Connect.

## Loading

Spinner de carga (Figma: set **Loading** de la página Loading, variantes `Color=Red|White` y `Property 1=1..4`), bajo **Feedback/Loading**. Ocho puntos de radio decreciente (15 → 2.5) con la **geometría exacta del frame 1** de Figma en un lienzo de 100×100; las variantes Property 1=1..4 son los frames de la animación (el patrón rotado), así que el **movimiento** se reproduce rotando el SVG en pasos de 45° (`steps(8)`, 0.8s, infinito) — equivalente al flipbook de 4 frames — y se detiene con `prefers-reduced-motion`. Props: `color` (`red` = `--color-primary` | `white`, para fondos oscuros como en la documentación Claro/Oscuro), `size` en px (100 por defecto, escala limpia por viewBox) y `label` accesible (`role="status"`). El set publicado está mapeado con Code Connect (Color → `color`; los frames son la animación). React y Vue.

## Skeleton

Placeholder de carga (Figma: página **Skeleton**, set **Skeleton** con `Property 1=Group 1|Group 2`), bajo **Feedback/Skeleton**. Bloque de 360×40 con radio 4 y **degradado lineal blanco → `gray-300`**; las dos variantes del set son las dos direcciones del degradado — es decir, las fases del shimmer — así que la animación **desliza el degradado entre Group 1 y Group 2** (1.2s alternante, background de 200%) y se detiene con `prefers-reduced-motion` o `animated=false` (que congela exactamente el Group 1). Props: `width`/`height` (px o cualquier valor CSS; default 100%×40), `radius` (default 4) y `circle` para placeholders de avatar. Al ser bloques componibles, mantiene la jerarquía visual y evita saltos de layout: la story **"Ejemplo de carga"** muestra la pantalla del doc (título, imagen, textos y botón como skeletons) que tras ~2.5s se reemplaza por el contenido real, con botón "Volver a cargar" para repetirlo. El set publicado está mapeado con Code Connect en React y Vue.

## Avatar

Avatar circular (Figma: set **Avatar**), bajo **Data Display/Avatar**. El estado se deriva de las props: `src` (Foto), `initials` (Iniciales, tipografía 72/40/24/16 según tamaño) o placeholder de agregar foto (icono `camera-plus-outline`, texto solo en 200). Props `size` (40/60/100/200) y `color` (`rojo`/`blanco`), `role="img"` con `aria-label`. Code Connect con Size/Color/Estado mapeados.

## Badge

Badge (Figma: set **Badge** y componente **Badge/Counter** de la página Badges), bajo **Data Display/Badge**. Fondo Info, texto blanco Poppins Medium con `size` h1–h6 (alturas 51/40/36/31/23/20) y contador opcional `count` que escala con el badge; `BadgeCounter` standalone (20×20, fondo Secondary, SemiBold). Ambos mapeados con Code Connect.

## Tooltip y RichTooltip

Tooltips (Figma: sets **Tooltips** con `Theme=Light|Dark` × `Direction=Top|Right|Bottom|Left` y **Rich Tooltip** con `Tipo=Light/Dark × Top/Bottom/Left/Right` + `Show Buttons`/`Show Button Right`), bajo **Overlays/Tooltip**. **Se integran envolviendo cualquier componente de la librería** (children/slot) y aparecen **estrictamente en la posición indicada** con la prop `position` (`top`/`bottom`/`left`/`right`, centrados en el eje contrario y pegados al target); se muestran con hover/focus o de forma controlada con `open`. Ojo con el mapeo: la `Direction` de Figma nombra el lado de la **flecha** (que apunta al target), por lo que en Code Connect se mapea al lado opuesto de `position`. **Tooltip**: globo de 12px con padding 8/4, radio 4, máx. 254px, flecha de 10×5 (clip-path del asset "Globo texto arrow") y sombra `autolayout-sm` como drop-shadow (cubre también la flecha); temas **Light** (blanco/`body`) y **Dark** (`secondary-dark`/blanco). **RichTooltip**: globo de 254px (máx. 320) con radio 10, padding 16 y gap 8; título de 12px Medium (pb 2), texto de 12px y fila de **botones ghost-secondary SM del DS** (gap 20) ocultables con `showButtons`/`showButtonRight` — este globo sí es interactivo (`pointer-events`). El RichTooltip tiene sus propias stories bajo **Overlays/RichTooltip** con todos los controles conectados (`position`, `theme`, botones y `open`). Los 2 sets publicados están mapeados con Code Connect en React y Vue.

## Blanket

Overlay (Figma: página "Blanket con Modal", rectángulo con la variable **Color/Neutros/Blanket** `#000000B2` — nuevo token `--color-blanket`), bajo **Overlays/Blanket**. Capa que cubre el viewport (o solo su contenedor con `fixed=false`), centra su contenido y dispara `onClose`/`@close` al hacer click directo sobre el overlay. Es la base del componente Modal. El Blanket no está publicado como componente en Figma (es un rectángulo con la variable), así que su Code Connect queda preparado en comentario.

## Modal

Modal (Figma: set **Modal** de la página Pop up / Modals con `Tamano=Modal-SM|MD|LG` e `Icon=Default|CIrcle illustration`, y set **Label Badge**), bajo **Overlays/Modal**, montado **sobre el Blanket** (o inline con `blanket=false`). Card blanca de radio 10, padding y gap 20 y sombra `autolayout-md`; tamaños **SM 350** (título H5 y cuerpo 14 centrados, footer en columna con el primary arriba y botones al 100%), **MD 576** y **LG 992** (título H4 24, cuerpo 16, footer en fila con gap 24). Header con **LabelBadge** — componente propio exportado con los **4 estados** de Figma: `success`/`info`/`danger` (texto blanco) y `warning` (texto `body`), 12px SemiBold con padding 8/4 — y X de cierre. **Icono superior de la librería** (`icon` = cualquier nombre del registro, 72px, `success` por defecto con `baseline-check-circle`; `iconVariant="circle"` lo envuelve en el aro de 100px con borde de 6px `--color-chart-4` del set Cicle-illustration). **Todo es ocultable por props**, espejo de las de Figma: `showBadge` (Mostrar Aviso), `showIcon` (Mostrar Icono Top), `showTitle`, `showText`, `showLeftButton`/`showRightButton` (Mostrar Boton Izq/Der) — los botones **reutilizan el Button del DS** (ghost y solid primary MD). Cierra con la X, click fuera (Blanket) o los callbacks de los botones. Los 2 sets publicados están mapeados con Code Connect en React y Vue.

## Token

Pop up Token (Figma: página **Token** — set **Token** con `Tipo=Desktop|Mobile`, `Añadir texto` y `Contenido`, e **Inputs-Token**/**Input** con estados `Default|Normal|Active|Error`), bajo **Overlays/Token**. Modal montado sobre el **Blanket del DS** (ocultable con `blanket=false`) que reutiliza los **Buttons de la librería**: card blanca de 576px (radio 10, padding y gap 20, sombra `autolayout-md`) con X de cierre, título H5 20 Medium `secondary-dark` centrado, **inputs de 40×40** (radio 8, borde `gray-200`, dígito 20 centrado, placeholder "0" en `gray-400`; el foco pinta el borde `tertiary` — estado Active), links de ayuda 14 `tertiary` ("¿Dónde encuentro este número?" y "¿Necesitas ayuda con tu token?", ocultables con `showHelp`/`showTokenHelp` y con callbacks), texto inferior 14 (`text` = Contenido, ocultable con `showText` = Añadir texto) y footer con **Cancelar ghost + Continuar solid primary MD**. La prop **`tipo`** define los dígitos: **`virtual` = 6** y **`fisico` = 8**. **Validaciones**: solo acepta dígitos, avanza el foco al teclear, el Backspace en un input vacío borra y regresa al anterior, el pegado distribuye el código entre los inputs y **Continuar queda deshabilitado** (relleno `primary-light` #c68091 como en Figma) **hasta completar el código** — al hacer clic entrega el token por `onContinue(code)`/`@continue`; la prop `error` pinta el **estado Error** (bordes `danger` + mensaje 12). **Responsivo**: en <768px toma el layout Mobile de Figma (card de 350, texto centrado y footer en columna con Continuar al 100% arriba y Cancelar abajo). Los 2 sets publicados (Token e Inputs-Token) están mapeados con Code Connect en React y Vue.

## PermisoNativo

Prompt de permisos nativos del navegador (Figma: página **Permisos nativos web**, set publicado con `Type=Notificaciones|Ubicación|Microfono`), bajo **Overlays/PermisoNativo**. Componente de apoyo que replica el prompt de Chrome para representar en los flujos la interacción real del usuario con el navegador: card de **318px** con radio 15, padding y gap 20, sombra `per` y **tipografía Roboto** (la nativa del navegador, no la del DS); header "**www.invex.com quiere**" (Bold + Medium 14) con X de 20; fila del permiso con su icono nativo de 16 (campana / pin de ubicación / micrófono, vectores exactos del set) y texto de 12; y **chips nativos de Chrome** de 36px con radio 55 en `#d3e3fd`/`#041e49` — **Notificaciones**: fila con padding izquierdo de 100 y chips *Permitir*/*Bloquear*; **Ubicación** y **Micrófono**: columna con *Permitir mientras se visita el sitio* / *Permitir esta vez* / *No permitir nunca* al 100%. Props: `type`, `site`, `requestText` (default según el tipo), `open` para **mostrarlo desde el llamado de un botón**, `fixed` (anclado arriba a la izquierda como el prompt real) y callbacks `onClose`/`onAllow`/`onAllowThisTime`/`onBlock` (en Vue: `@close`/`@allow`/`@allow-this-time`/`@block` — el evento evita el sufijo "Once" porque Vue lo interpreta como el modificador `.once`). La story **"Desde un botón"** muestra el flujo completo: tres Buttons del DS abren cada permiso anclado y la respuesta elegida se registra al cerrarse. El set publicado está mapeado con Code Connect en React y Vue.

## Tabs

Tabs (Figma: página Tabs — set **Tabs-1** con `Estado=Default|Disabled|Active primary|Active secundary` × `Size=Desktop 44px|Mobile 41px`, y sets **Tab secundario** con `Quantity=2..5` × `Desktop 48px|Mobile 46px` + **Tab-atom**), bajo **Navigation/Tabs**. **Un solo componente responsivo** — sin variantes desktop/mobile: en <768px el primary pasa a texto de 14px con iconos de 20px y el segmented pierde el ancho mínimo y se desplaza horizontalmente. **`variant="primary"`** (Tabs-1): fila de tabs con barra inferior de 4px — Default con texto `secondary` y barra transparente; activo con texto `body` y barra **`primary`** o **`tertiary`** según `activeStyle` (Estados Active primary/Active secundary); Disabled con fondo blanco y texto `gray-400` (no clickeable); cada item acepta **iconos de la librería** a la izquierda/derecha (`iconLeft`/`iconRight` = Cambiar/Mostrar Icono Izq/Der, 24px desktop / 20 mobile) y su `label` (Texto). **`variant="secondary"`** (Tab secundario): segmented control con contenedor `gray-200` (radio 8, padding 4/3, gap 1) y segmentos de 40px (mín. 150px desktop, radio 4, texto 16 Medium `body`); el activo con fondo blanco y la doble sombra del set. Controlado/no controlado en React y `v-model` (índice) en Vue. Los 3 sets publicados están mapeados con Code Connect.

## Menu

Menú de navegación (Figma: página Menu — set **Item Menu** con `Estado=Default|Active` + `Texto`/`Mostrar Icono`, barra **Menu Desktop**, y para mobile el set **Menu Movil y Lateral** `Estado=Abierto|Cerrado` con items **Item menu mobile** `Estado=Default|Hover|Active` + `Texto`/`Cambiar Icono`/`Mostrar Icono Izq`/`Mostrar Icono Der`), bajo **Navigation/Menu**. **Un solo componente responsivo** — sin variantes desktop/mobile: en ≥768px es la barra blanca de **70px** (padding 20, borde inferior `gray-100`, sombra `md-2`, scroll horizontal invisible) con items de **44px** (texto 14 Medium `body`, gap 16) cuyo activo lleva subrayado de 4px `primary` y chevron up/down cuando `showIcon`; en <768px se muestra el **menú lateral mobile**: columna blanca de **250px** (padding lateral 20, gap 10) con un botón superior de chevron-left y **items de 60px** (radio 10, padding 20: icono izquierdo de 24 del registro del DS — `icon`, default `account-outline`, ocultable con `showLeftIcon` — texto 14 Medium `secondary` y chevron-down opcional con `showIcon` que indica submenú); **Hover** pinta el item con fondo `primary` y texto blanco, y el **activo** con fondo `background` y texto `body`. El chevron superior **colapsa el menú al Estado Cerrado**: riel de **84px** (padding 10) con items de solo icono (con `title`/`aria-label`) y chevron-right para reabrir, con `aria-expanded`. Los items aceptan strings o `{ label, icon, showLeftIcon, showIcon }`; selección controlada/no controlada en React (`active`/`defaultActive` + `onChange`) y `v-model` (índice) en Vue; el colapso es controlable con `open`/`defaultOpen` + `onOpenChange` en React y `v-model:open` en Vue.

La prop **`variant="usuario"`** cambia el mobile al set **Menu Mobile** (composición del **Perfil Movil** + botón Mis productos): **barra de usuario** Top Menu Mobile (padding 10/20, círculo de iniciales de 32px blanco con borde y texto `primary` SemiBold, nombre 14 SemiBold + último acceso 12 — props `userName`/`userInitials`/`lastAccess`) cuyo chevron abre el **Menu usuario** (padding-izq 30, borde inferior `gray-300`; items con iconos del DS — default Mi perfil, Preguntas frecuentes, Configuración, Notificaciones y Cerrar sesión, personalizables con `userMenuItems`); **ButtonMisProductos del DS** al 100% en un wrapper de padding 20 (ocultable con `showProductsButton`) que despliega su propia lista `productsItems` girando el chevron; y la **lista de items** de 60px. **Al hacer clic en cualquier item** (del menú, del menú de usuario o de Mis productos) **el menú se colapsa** al Estado Cerrado (solo queda la barra de usuario; el chevron lo reabre), con callbacks `onUserMenuSelect`/`onProductsSelect` en React y eventos `userMenuSelect`/`productsSelect` en Vue. Los 6 nodos publicados (Item Menu, Item menu mobile, Menu Movil y Lateral, Menu Mobile, Perfil Movil y Top Menu Mobile) están mapeados con Code Connect; la barra Menu Desktop no está publicada en Figma.

## MenuEstatus

Menú de secciones con estatus (Figma: set **ItemMenu_Estatus** de la página Menu con `Titulo seccion`/`Cambiar Icono Izq` y `Estado=Default|Estatus todos|Completo|Activa|Deshabilitada`), bajo **Navigation/MenuEstatus**, exportado como componente propio. Lista vertical (gap 10) de cards de **57px** (padding efectivo 10 con el borde de 1px por dentro, radio 10, sombra `per`) con icono izquierdo de 24 del DS (`icon`, default `file-document-outline`), **Titulo seccion** 14 Medium, **Estatus seccion** 12 Regular y chevron-right en `tertiary`. Estados espejo de Figma por item (`estado`, con textos default): **Default** (borde `background`, título `secondary`, estatus "Por iniciar" en `secondary-light`), **Estatus todos** (borde `tertiary`, título `body`, estatus "Captura completa" en `tertiary`), **Completo** (igual pero el icono cambia a `baseline-check-circle`, estatus "Completa"), **Activa** (fondo `tertiary`, contenido blanco, sin estatus) y **Deshabilitada** (todo `gray-400` al 60%, no seleccionable, sombra `autolayout-sm`). Sin `estado` explícito, el item activo se pinta como Activa: selección controlada/no controlada en React (`active`/`defaultActive` + `onChange`) y `v-model` (índice) en Vue; `status` por item sobreescribe el texto. El set publicado está mapeado con Code Connect en React y Vue.

## ProgressTracker

Barra de progreso / stepper (Figma: página **Progress Tracker** — átomo **Puntero** con `Estado=Default|Active`, molécula **BasicProgress** y organismo **Límite de crédito** con `Limite credito`/`Saldo`/`Disponible`/`Tooltip` + `Mostrar texto top/Izq/der/tooltip`), bajo **Data Display/ProgressTracker**. **Full width y responsivo**: la pista, el puntero y el tooltip se posicionan por porcentaje (`value`/`max`) y se ajustan a cualquier resolución sin scroll horizontal. **El Puntero es arrastrable con el mouse** (`draggable`, activo por defecto; también responde a las flechas del teclado con `role="slider"`): al arrastrar se actualiza el valor — controlado/no controlado con `value`/`defaultValue` + `onChange` en React y `v-model` + `@change` en Vue — y **la información derivada se actualiza en vivo** con `formatTooltip`/`formatLeft`/`formatRight` (`(value, max) => string`), que sobreescriben los textos estáticos según la posición; con `draggable=false` vuelve a ser solo lectura (`role="progressbar"`). Las stories lo muestran en un contenedor de 500px, con el Playground arrastrable calculando tooltip y saldos sobre un límite de $200,000. Pista de **4px** radio 4 en `gray-300` (wrapper de 18px) con relleno `tertiary`; **Puntero** de 20px blanco con anillo de 2px `tertiary` centrado en el fin del relleno — `active` agrega el halo de 30px `tertiary` al 30% del Estado Active. **Todas las partes son ocultables por props**, espejo de Figma: `tooltip`+`showTooltip` (globo `info-dark` con texto H5 20 blanco, padding 14/4, radio 4, flecha de 20×12 hacia abajo, centrado en el puntero y a 53px del texto superior como en Figma), `limitText`+`showLimitText` (14 Medium `body` centrado) y los saldos `leftLabel`/`leftValue`+`showLeft` y `rightLabel`/`rightValue`+`showRight` (12 Regular `secondary` + valor 12 SemiBold `body`, derecha alineada al final). Expone `role="progressbar"` con `aria-valuenow/min/max`. Los 3 nodos publicados (Límite de crédito, BasicProgress y Puntero) están mapeados con Code Connect en React y Vue.

## Stepper

Barra de pasos (Figma: página **Steppers** — sets **Items Progress Tracker 1** (vertical) y **2** (horizontal) con `Texto`/`Number`/`Mostrar Texto` y Estados Default/Active/Completed, **Stepper Web + 5** con `No Pasos`/`Titulo`, **Stepper Mobile** y **Stepper Mobile 2.0**), bajo **Data Display/Stepper**. Con **≤5 pasos** (el máximo del diseño numerado) renderiza los items web: círculo de **44px** con borde de 1px y número 20 SemiBold — Default en `gray-400`, Active en el color del stepper y Completed relleno con el **Check** blanco de Figma — con `orientation` **horizontal** (texto 14 centrado abajo, items en columnas iguales) o **vertical** (texto a la derecha, conector de 1px×20); los conectores de 1px van coloreados hasta el paso activo y en gris después. Con **más de 5 pasos** cambia automáticamente al **Stepper Web + 5**: dots de 12px (Complete en color, el activo con halo de 20px al 30%, Default `gray-300`) unidos por líneas de 1px, con "Paso # de #" 14 `secondary-light` y el título del paso activo en H5 20 Medium. **Responsivo sin variantes**: en <768px con ≤5 pasos se ve el **Stepper Mobile** (círculos de 30px con número 16 SemiBold, conectores flex de 1px con padding 4 y el título del paso activo en 12 abajo) y con >5 el **Stepper Mobile 2.0** (aro de 90px con grosor 6.3 y puntas redondas mostrando la fracción, "# de #" 20 Medium al centro y el título a la derecha, gap 16). La prop **`color`** elige **azul** (`tertiary`) o **vino** (`primary`) vía `--and-stepper-color`; `active` marca el paso actual (base 0) y `showLabels` oculta los textos (Mostrar Texto). Los 5 nodos publicados están mapeados con Code Connect en React y Vue.

## Breadcrumbs

Miga de pan (Figma: set **Breadcrumbs**), bajo **Navigation/Breadcrumbs**. `BreadcrumbItem`: separador `chevron-right` opcional + texto Regular — Default en `body`, Active en primario subrayado con `aria-current="page"`; `Breadcrumbs` (`nav`) los apila con gap 10px y oculta el separador del primero. Responsive: 16px → 12px bajo 768px (la variante Size de Figma no se mapea). Code Connect con Texto Categoria/Estado/Mostrar Icono.

## Button variants

Variantes de botón (Figma: página **Buttons variants**), bajo **Actions/Button variants**, todas usando el componente `Icon` del DS y con el Estado Hover de Figma implementado vía `:hover`:

- **`ButtonRounded`** (btn/Rounded-LG) — borde 2px `gray-300` con radio 40, icono superior (default `android`) y fila icono/texto/icono (texto h5 en `secondary-light`); hover: borde `tertiary`, texto `secondary-dark` y sombra `autolayout-md`. Sin texto queda la variante cuadrada de solo icono (72×72 exacto).
- **`ButtonRoundedCard`** (btn/Rounded-MD, 240×101) — título h5 en `body` + contenido 14 en `secondary-light`, mismo hover.
- **`ButtonMisProductos`** (btn/Mis-Productos, 226×48) — pill `radius-xl` en `secondary-dark` con `view-cozy-rounded` + texto Medium blanco + `chevron-down`; hover negro pleno, disabled `gray-200`/`gray-300`.
- **`ButtonTrade`** (btn-buy/btn-sell, 150×44) — `variant="buy"` en `success` con `arrow_buy` o `variant="sell"` en `danger-dark` con `arrow_sell`; hover o prop `selected` proyectan sombra del mismo color (`aria-pressed`).

Los 5 component sets publicados están mapeados con Code Connect en `ButtonVariants.figma.*` con sus properties reales.

## Card

Cards del DS (Figma: página **Cards**, frames "Card Photo" y "Card Action"), bajo **Surfaces/Card** en Storybook:

- **`CardPhoto`** — card con imagen, título h5 SemiBold, descripción en `secondary` y acción (ej. Button ghost "Leer más"). **Una sola card** con prop `horizontal`: en desktop pone la imagen a la izquierda (274px, gap 30) y **bajo 768px vuelve automáticamente al diseño vertical** (imagen 212px arriba) — no hay variante mobile separada. Fondo blanco, radio `md`, sombra `autolayout-sm`.
- **`CardAction`** — fecha con separador `gray-300`, título h4 Medium y acción a lo ancho (padding `space-30`, gap `space-20`, borde `background`, sombra `lg-2`).
- **`CardContact`** — contacto centrado: título h4 SemiBold, correo `mailto:` en primario (h5) y contenido libre con `<strong>` en Medium (sombra `md-2`).

Las cards de Figma son frames de documentación sin componentes publicados en la librería, por lo que el Code Connect queda preparado (comentado en `Card.figma.*`) para activarse cuando se publiquen.

## Carousel

Carrusel de imágenes (Figma: component set **Carousel** y dots **Ellipse 4** de la página Carousel), bajo **Data Display/Carousel**. Un solo componente sin variante responsive: alto fijo de 400px y **ancho fluido** que se adapta al contenedor (el comportamiento de la página "Carousel 2", con ejemplos a 288/670/800px). Flechas `arrow-left`/`arrow-right` en primario (izquierda al borde, derecha con inset de 24px, como el master) con vuelta en los extremos, y dots de 10px (activo/hover en primario, resto `secondary`) centrados a 16px del fondo. Uso controlado (`index`/`onIndexChange` en React, `v-model:index` en Vue) o no controlado (`defaultIndex`). Ambos sets mapeados con Code Connect (Number→`defaultIndex`; los dots muestran el snippet del Carousel completo).

## Divider

Separador (Figma: componentes **Divider** y **Divider 10px–90px** de la página Dividers), bajo **Layout/Divider**. Línea de 1px en `gray-300` renderizada como `<hr>`, con prop `spacing` (0/10/20/30/40/50/70/90) que aplica el espaciado vertical de la escala Spacing a cada lado vía `margin-block: var(--space-N)`. Los 7 componentes publicados están mapeados con Code Connect (el "Divider 30px" existe en la página pero no está publicado; el componente igual soporta `spacing={30}`).

## Controls (Switch / Checkbox / RadioButton)

Controles de formulario (Figma: sets **Switch atom**, **Switch**, **CheckBox** y **RadioButton** de la página Forms; documentación "Controls"), bajo **Forms/Controls** — tres componentes que comparten base: fila `label + control` de 16px con texto opcional (prop `label` = "Texto"; omitirla equivale a "Mostrar Texto" off) y área de golpe de 32px en checkbox/radio, con inputs nativos ocultos para accesibilidad.

- **Switch**: atom de 40×24 (track pill `tertiary` on / `gray-300` off con sombra `cards-1`, knob blanco de 16px que se desliza 4↔20px), `role="switch"`; estados On/Off Disabled = atom al 50%.
- **Checkbox**: caja de 20px radio `sm` — Off borde `body`; On borde y palomita `tertiary` con sombra `cards-1`; On-Disabled fondo `gray-100` con contorno/palomita `gray-400`; Off-Disabled relleno `secondary-light` al 50% con label `secondary-light`. El estado **On-Multiple** de Figma comparte el visual de On (listas de selección múltiple).
- **RadioButton**: círculo de 20px con punto `tertiary` de 12px — labels en `secondary-dark` y estados disabled en `gray-300`/`secondary-light`; soporta grupos vía `name`/`value` (v-model del grupo en Vue).

Controlados/no controlados en React y `v-model` en Vue; los labels hacen wrap (fluidos/responsivos). Los 4 sets publicados están mapeados con Code Connect (Texto, Mostrar Texto y Estado → `label`/`checked`/`disabled`).

## Calendar

Calendario (Figma: componente **Calendario--Form** y set **NumeroCalendario** de la página Forms; documentación "Calendar"), bajo **Forms/Calendar**. Panel blanco con borde `gray-300`, radio `sm`, padding 10 y sombra `autolayout-sm`; celdas de 33px (mín. 40×30 + padding 6) que se reparten con flex, por lo que el calendario es **fluido/responsivo**. Encabezado de días "Dom..Sab" en Poppins Medium y los 6 estados del set NumeroCalendario resueltos por fecha: Default (`body`), **Disabled** (`gray-300`, con `disablePast` para días anteriores a hoy), **Selected** (fondo `tertiary`, texto blanco), **Weekend** (`tertiary-dark` al 50%), **Current day** (`tertiary`) y **timelapse** (fondo `tertiary-light`, para rangos vía `rangeStart`/`rangeEnd`). Dos variantes de header: **Primary** — flechas ‹ › y título "JULIO 2023" clickeable que abre la vista de **años** (grid 4×4 paginable) y luego **meses** (grid 4×3 ENE..DIC), como la secuencia de la documentación; **Secondary** — dos dropdowns de **Mes** y **Año** (items de 44px con scroll de 8px, sin flechas). `value`/`onChange` en React y `v-model` ('YYYY-MM-DD') en Vue. El componente y el set publicados están mapeados con Code Connect.

## DateTimePicker

Selector de rango de fechas (Figma: set **TimeLapse Calendar** de la página Date Picker), bajo **Forms/DateTimePicker**, construido **sobre el Calendar**. Funciona como **popover** siguiendo la secuencia de la documentación: cerrado muestra solo los dos campos; al hacer click en cualquier input (o su icono) se abre la card encimada con los calendarios, y **se cierra al completar el rango, con Aplicar, click fuera o Escape** (prop `defaultOpen` para renderla abierta). Card blanca (padding 16, sombra `cards/shadow 1` — token `--shadow-cards-1` agregado de la variable de Figma) con dos campos Form-MD ("Seleccionar fecha de inicio/fin", placeholder dd/mm/aaaa, icono `calendar-month-outline`, línea de 2px `tertiary` en el campo activo) sobre **dos Calendar** (mes y mes+1) cuya variante se elige con la prop `variant` (`primary` con flechas — default — o `secondary` con dropdowns de Mes/Año). La selección fluye como los estados del set: **Empty** → click fija el inicio, **Half-completed** → el siguiente click fija el fin, y **Completed** pinta los extremos Selected y los intermedios timelapse en ambos calendarios. Pie con contador de **días hábiles** calculado (lun-vie del rango, prop `showBusinessDays` = "Mostrar días seleccionados?"), botón ghost **"Borrar fechas"** y **"Aplicar"** primary SM (deshabilitado hasta completar el rango; `showApplyButton` = "Mostrar botón aplicar") reutilizando el componente Button del DS. Responsivo: en <768px las columnas se apilan. `start`/`end` + `onChange`/`onApply`/`onClear` en React y `v-model:start`/`v-model:end` en Vue. El set publicado está mapeado con Code Connect.

## DualList

Lista dual de transferencia (Figma: página **Duallist** — organismo **Duallist** con `State=initial.empty…transfer.complete`, paneles **Dual-list-atom** con `Title-Text-Content`/`Quantity elements`/`Content text` + `Selection State=None|Some|All` × `Content state=Default|Empty`, y **Botones** `Action=Add|Remove`), bajo **Forms/DualList**. Contenedor blanco con padding 16 y gap 19 de dos columnas iguales; cada **panel de 518px** (radio 10, borde `gray-100`) tiene título H6 16 Medium + contador "**N elementos**" automático, **buscador** (borde `gray-300`, radio 5, icono search de 24, filtro sin acentos), item "**Seleccionar todo**" de 44px con borde inferior y la lista de **items de 44px** con el **Checkbox del DS** — el marcado se pinta con fondo `background` — y **scroll de 8px** (track `background`, thumb `gray-300`). Los **botones Agregar/Quitar** (Button solid primary SM del DS al 100% con chevron y el relleno `primary-light` exacto al deshabilitarse) muestran el **contador de marcados** ("Agregar (3)") y transfieren los items de una lista a la otra; los paneles vacíos muestran su Content text ("Todos los elementos han sido agregados." / "No hay elementos seleccionados aún"). **Full width y responsivo**: ocupa el 100% del contenedor (las stories lo muestran en uno de **850px** como el ejemplo pedido, más una a ancho completo) y en <768px las columnas se apilan. Transferidos controlados/no controlados: `value`/`defaultValue` + `onChange(values, items)` en React y `v-model` + `@change` en Vue; textos personalizables por props. Los 3 sets publicados están mapeados con Code Connect en React y Vue.

## Dropdown

Selector desplegable (Figma: página Dropdown — trigger **Form option**, panel **Dropdown--full--new**, **Input busqueda**, **Item Opcion New** y **No results**), bajo **Forms/Dropdown**. Trigger con la anatomía del Input (caja de 48px, borde `gray-300`, label flotante "Seleccionar" y línea inferior de 2px que pasa a `tertiary` al abrir) y chevron de 24px que alterna down/up. El panel (borde `gray-300`, radios inferiores `sm`, padding y gap de 10, sombra `autolayout-sm`) incluye un **buscador funcional** que filtra los items en vivo (insensible a mayúsculas y acentos: "opcion 3" encuentra "Opción 3"); sin coincidencias muestra el estado **"No se encontraron resultados"** (bloque de 102px en `background` con icono search-off). Items de 44px con separador `gray-300` y check de 20px configurable con `checkShape` (`square`/`circle`) y `checkPosition` (`left`/`right`) — las 4 variantes del set de Figma; el seleccionado lleva fondo `background` y check en `tertiary`. Scrollbar de 8px estilizada (track `background`, thumb `gray-300`). Props: `label`, `options` (strings u objetos `{ label, value }`), `searchable`, `searchPlaceholder`, `noResultsText`, `disabled`; uso controlado/no controlado en React y `v-model` en Vue. Cierra con click fuera, Escape o al seleccionar. Los 4 sets publicados y el componente No results están mapeados con Code Connect.

## DropdownMultipleList

Selector de cuentas (Figma: set **DropDown-lista-multiple** con estados Default/Active/Seleccion, item **Item Opcion Cuenta/Saldo** y trigger **Form datos cuenta selected**; documentación "Dropdown multiple-list"), bajo **Forms/DropdownMultipleList**. Trigger con anatomía **Form-LG**: caja de 60px con borde de 0.5px `secondary-light`, radios superiores, label flotante de 12px `secondary-dark` que también funge como placeholder de 16px, chevron 24 y **línea inferior de 2px que cambia por estado** — `gray-400` en Default, `tertiary` abierto (Active) y `secondary-light` con selección. El panel (borde `gray-300`, radios inferiores, padding 10, sombra `autolayout-sm`) trae **buscador funcional** que filtra por **nombre o número de cuenta** (insensible a mayúsculas y acentos), items de dos líneas — nombre 16px `body` / encabezado "Saldo" a la derecha, y cuenta `secondary-light` / cantidad `body` — con separador `gray-300`, scrollbar de 8px y estado "No se encontraron resultados". Al seleccionar, el trigger pasa al estado **Seleccion** (datos de la cuenta con borde 1px `gray-300`) y el panel se cierra. Props de Figma respetadas: `Nombre`/`Cuenta`/`Saldo` → `options` (`{ name, account, balance, value? }`), `Mostrar Saldo` → `showBalance` (oculta la columna derecha), más `label`, `searchable`, `searchPlaceholder`, `balanceHeading` y `noResultsText`. Fluido/responsivo (ancho del contenedor); controlado/no controlado en React y `v-model` en Vue. El set y los 2 componentes publicados están mapeados con Code Connect.

## FileUpload

Carga de documentos (Figma: set **Carga de documento** con estados Default/Hover/Completado/Carga-Masiva/Error-Por-Peso/Error-No-Compatible, fila **Cargando-Archivo** e icono **Icono-CargaDocumento**; documentación "Upload file"), bajo **Forms/FileUpload**. Card blanca de radio 10, padding 20, gap 20 y sombra `autolayout-md`, con título H4 Medium, X de cierre y subtítulo opcional. **Dropzone** de borde punteado de 2px `gray-300` (radio 10, padding 50/30) que pasa a `tertiary` con "Suelta tu archivo aquí" al arrastrar (estado Hover); acepta click, botón "Elegir archivo" (**Button del DS** outline SM con los colores `secondary-light` del set) y drag & drop, con hint generado de las props ("Peso máximo: Nmb. Tipo de archivo: ..."). **Validaciones de Figma**: extensión no permitida → "El tipo de archivo no es compatible..." y peso mayor a `maxSizeMb` → "El archivo excede el límite..." en `danger`. Cada archivo se muestra como fila (fondo `background`, radio 10) con **icono por extensión** — hoja de documento + pastilla de color: PDF/JPG/PNG en `danger`, DOC/TXT en `info`, XLS/CSV en `success`, extensiones desconocidas con su propio texto — nombre Medium, "N KB of M KB •", spinner + "Cargando..." con **barra de progreso** `tertiary` y luego palomita `success` + "Completado"; la X cancela la carga y el bote de basura elimina el archivo. **`maxFiles`** controla la cantidad máxima (1 = estado Completado; >1 = Carga-Masiva; al llegar al límite el dropzone se oculta). Pie con **Cancelar** (ghost) y **Aceptar** (solid, deshabilitado hasta completar) reutilizando el Button del DS. **Usable inline en cualquier div o como modal** (props `modal` + `open`/`onClose`, backdrop con cierre por click fuera y X), invocable desde un Button de la librería. Callbacks `onChange`/`onAccept`/`onCancel`/`onClose` en React y eventos en Vue. Los 3 sets publicados están mapeados con Code Connect.

## Footer

Pie de página (Figma: componentes **Footer Desktop** 1440×471 y **Footer Mobile** 375×421 de la página Footer), bajo **Layout/Footer**. Fondo `secondary` con padding 40/60 (30 en mobile), títulos SemiBold 16 y links Regular 14 en blanco:

- **Menú editable**: prop `columns` (array de `{ title, links: [{ label, href }] }`) — de 1 a 4 columnas, con textos y URLs modificables y posibilidad de agregar más items/subitems.
- **Columna "Síguenos" opcional** (prop `social`): iconos de Facebook/X/Instagram (con URLs vía `socialLinks`) y logos regulatorios Buró de Entidades Financieras, CONDUSEF e IPAB (assets SVG incluidos en el paquete).
- **Barra inferior**: logo INVEX en blanco (reutiliza el componente `Logo`) + `copyright` editable, separados por línea blanca superior.
- **Responsive** (un solo componente): en <1024px adopta el diseño Footer Mobile — columnas apiladas **colapsables con chevron** y barra inferior en columna (cubre tablet 744 y mobile 375).

Ambos componentes publicados están mapeados con Code Connect al mismo Footer responsive.

## Input

Campo de formulario (Figma: sets **Form-SM/MD/LG** de la página Forms), bajo **Forms/Input**. Patrón de **label flotante**: en reposo la etiqueta ocupa el centro (16px `secondary-light`; 14px en SM) y con foco o valor sube a 12px `secondary-dark`. Caja con borde `gray-300`, radios superiores `sm` y **línea inferior de 2px** que cambia por estado: `secondary-light` en reposo, **`tertiary` con foco**, **`danger` en error**, `gray-300` en disabled/readonly. Los 7 Estados de Figma se mapean así: Default/Normal/Active son dinámicos (vacío/con valor/foco); `error` cubre Error y "No llenado" (con string se muestra como asistencia en danger); `disabled` nativo; `readonly` es "Llenado-Bloqueado" (fondo neutro, textos `gray-500`). Tamaños con cajas de **40/48/61px**, texto de asistencia opcional y cualquier icono del DS a la derecha (`icon`/slot `#icon`). **`InputPassword`**: variante con icono `eye-outline` que alterna a `eye-off-outline` y des/enmascara el campo (type password ↔ text, con `aria-label`/`aria-pressed`). Soporta uso controlado y `v-model`. Los 3 sets publicados están mapeados con Code Connect (en Form-SM el swap del icono se llama "sear", typo real de Figma).

## InputGroup

Barra de búsqueda con categorías (Figma: set **Input group** de la página Forms con estados Close/Open/Mobile-default/Mobile-selected), bajo **Forms/InputGroup**. Un **solo componente responsivo** — no hay variantes desktop/mobile: en desktop es la fila [**Categorías ▾** (segmento Form-MD de 200px)][**Buscar** (campo fluido)][**botón primary** de 60×49 con icono search de 32], con radios en las esquinas superiores externas y líneas inferiores de 2px (`tertiary` en el segmento de categorías al abrir); el dropdown de categorías reutiliza el patrón Dropdown--full--new (panel de 200px con buscador propio que filtra insensible a acentos, items de 44px y estado "No se encontraron resultados"). En **<768px** adopta el diseño Mobile: input Form-SM de 40px + botón SM de 44×41 con icono de 24, y las categorías pasan a **chips horizontales** (radio 20, `gray-100`/borde `gray-300`; seleccionado `gray-200` con borde y texto `primary`) en una fila con **scroll invisible arrastrable con el mouse** (sin barra en Chrome/Firefox, cursor grab/grabbing, con umbral para no disparar el click del chip al arrastrar). Props: `categoryLabel`, `categories`, `category`/`defaultCategory` + `onCategoryChange`, `value`/`defaultValue` + `onChange`, `onSearch(value, category)` (botón o Enter), `categorySearchable`, `noResultsText`; `v-model` y `v-model:category` en Vue. El set publicado está mapeado con Code Connect.

## Multiselect

Selector desplegable de selección múltiple (Figma: set **Multiselect dropdown** de la página Forms, documentación "Dropdown checkbox left"), bajo **Forms/Multiselect**. Trigger con la misma anatomía del Dropdown (caja de 48px, borde `gray-300`, label flotante "Selecciona", línea de 2px que pasa a `tertiary` al abrir, chevron 24) que muestra los seleccionados como **chips Pill** (borde `gray-300`, radio 2px, texto 14 `secondary-light`, icono close de 16px para quitar cada uno) más un **close de 20px** que limpia toda la selección; cuando los chips no caben, la fila tiene **scroll horizontal** (barra de 4px estilo Scroll del DS) manteniendo el trigger en sus 48px. El panel reutiliza el patrón Dropdown--full--new: **buscador funcional** (insensible a mayúsculas y acentos), fila **"Seleccionar todo"** (sin separador, marca/desmarca todas las opciones; se oculta mientras hay filtro activo), items de 44px con **checkbox de 20px a la izquierda** (borde `body` en reposo; borde y palomita `tertiary` al marcar — sin fondo de fila, a diferencia del Dropdown), estado "No se encontraron resultados" y scrollbar de 8px. El panel permanece abierto al marcar/desmarcar (convención multiselect y estados One/Partial/All-selected de Figma). Los 8 States del set se cubren dinámicamente (`Disable` → `disabled`, con fondo `background` y textos `gray-300`). Props: `label`, `options`, `searchable`, `searchPlaceholder`, `selectAll`, `selectAllLabel`, `noResultsText`, `disabled`; `value: string[]` controlado/no controlado en React y `v-model` (array) en Vue. El set publicado y el chip Pill están mapeados con Code Connect.

## Status

Indicador de estatus (Figma: sets **Item_Estatus_v1** — punto + texto con padding 10 — e **Item_Estatus_v2** — pill de 26px con fondo tenue, radio 50 y padding 10/4 — de la página Status), bajo **Data Display/Status**. Punto de 8px y texto de 12px Medium en el color del estado (el punto usa `currentColor`). **8 estados** con la semántica de la documentación: `verde` Éxito/Activo (`success`), `gris` Inactivo (`secondary-light`), `azul` En progreso/Información (`info`), `amarillo` Pendiente/Advertencia (`warning-dark`), `rojo` Error/Fallido (`danger`), `morado` Revisión, `naranja` Advertencia leve y `magenta` Personalizado/Especial — los tres últimos con las variables **Color/Estatus/** de Figma agregadas a los tokens (`--color-estatus-*` con sus fondos `-light` para la pill). Props: `estado`, `text` (Figma: "Texto") y `variant` (`v1`/`v2`); Estado9/Variant9 del set son el slot personalizado y mapean a su color base en Code Connect. Los 2 sets publicados están conectados en React y Vue.

## Table

Tabla (Figma: página Tables — sets **Título Columna** Desktop 55px/Movil 40px, **Item Columna** Default/Select × Izq/Centrado/Der × Desktop 50px/Mobile 36px y **Table items**), bajo **Data Display/Table**. **Un solo componente responsivo** — sin variantes desktop/mobile: en <768px el header y las celdas adoptan las alturas del diseño Movil y la tabla se desplaza horizontalmente (scrollbar de 8px). Header con títulos de 12px Medium `secondary-light` en **mayúsculas**, borde inferior `gray-200` y **orden ascendente/descendente al click en el título** (icono `unfold` en `primary` → chevron up/down según el orden; el tercer click restaura; `aria-sort` incluido; ordena números y texto con `localeCompare` numérico). Celdas de 14px `body` con alineación por columna (`align` = los estados Izq/Centrado/Der) y **filas alternas con el estado Select** (fondo `background`, prop `zebra`). Las celdas aceptan **cualquier componente de la librería** vía `render` (React) o el slot `#cell` (Vue) — la historia "Tabla ejemplo" replica estrictamente el ejemplo de Figma: columna de **Checkbox** con seleccionar-todo (`selectable`), acciones con iconos `delete-outline` (1/2/3), **Switch**, **Button** "Texto Boton", buscador y kebab `menu-vertical` en `primary`. Los 3 sets publicados están mapeados con Code Connect.

## Paginator

Paginador (Figma: página Pagination — sets **Paginador** Size=Desktop|Mobile, **NumerosPaginador-1** 40×40 y **NumerosPaginador-2** 28×28), bajo **Navigation/Paginator**, como componente independiente. Texto "Mostrando N de M páginas" de 14px a la izquierda (ocultable con `showText` = "Mostrar Texto Izq", personalizable con `text`) y controles con gap 8: primera/anterior (iconos `arrow-collapse-left` y `chevron-left` de la librería), botón **Ant.**, ventana de números (el activo con fondo `primary` y texto blanco, radio 4, hover `gray-100`), **Sig.** y siguiente/última — los extremos se deshabilitan al 50% en la primera/última página. **Funcional**: controlado (`page` + `onChange` / `v-model`) o no controlado, con ventana centrada de `maxButtons`. **Responsivo**: en <768px los botones pasan a 28×28 y el texto baja centrado (Size=Mobile). Los 3 sets publicados están mapeados con Code Connect.

## PillNew

Etiqueta "Nuevo" (Figma: componente **Pill new** de la página Badges), bajo **Data Display/PillNew**. Pill de 47×15 con fondo `--color-bg-now` (#F9F9FB, variable de Figma agregada a los tokens), borde 0.5px `gray-100`, punto y texto en Info 10px Medium. Sin props en Figma; el texto es reemplazable por children/slot. Conectado con Code Connect.

## Button

Button unifica los ~20 component sets fragmentados de Figma (`btn/primary-SM`, `btn/ghost-primary-MD`, etc.) en una única API:

| Prop | Tipo | Default | Descripción |
| ---- | ---- | ------- | ----------- |
| `variant` | `'primary' \| 'secondary'` | `'primary'` | Jerarquía visual del botón. |
| `appearance` | `'solid' \| 'outline' \| 'ghost'` | `'solid'` | Estilo de superficie: relleno, borde o transparente. |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg'` | `'md'` | Tamaño del botón. |
| `loading` | `boolean` | `false` | Muestra un spinner y bloquea el botón. |
| `disabled` | `boolean` | `false` | Deshabilita el botón. |
| `leftIcon` | nodo/slot | — | Icono a la izquierda del label. |
| `rightIcon` | nodo/slot | — | Icono a la derecha del label. |

### React

```tsx
import { Button } from '@andromeda/react'

<Button variant="primary" appearance="solid" size="md">
  Guardar
</Button>
```

### Vue

```vue
<script setup lang="ts">
import { Button } from '@andromeda/vue'
</script>

<template>
  <Button variant="primary" appearance="solid" size="md">Guardar</Button>
</template>
```

## Figma Code Connect

Cada paquete incluye sus mapeos de Code Connect (`Button.figma.tsx` / `Button.figma.ts`) y su configuración en `figma.config.json`. Los 19 component sets de botones publicados en la librería (`btn/primary-*`, `btn/secondary-*`, `btn/ghost-*`) están mapeados al Button consolidado con sus node-ids reales. `btn/Rounded-*` y `btn/Mis-Productos` quedan fuera a propósito (otra anatomía). El "DS/Color Card" de las páginas de fundamentos no está publicado en la librería, por lo que no es mapeable todavía.

```bash
# Validar los mapeos sin publicar
npm run figma:connect:dry

# Publicar a Figma (requiere FIGMA_ACCESS_TOKEN)
npm run figma:connect
```

## Scripts útiles

En cada paquete:

| Script | Descripción |
| ------ | ----------- |
| `npm run storybook` | Levanta Storybook en modo desarrollo. |
| `npm run build-storybook` | Genera el build estático de Storybook. |
| `npm run typecheck` | Chequeo de tipos (`tsc` en React, `vue-tsc` en Vue). |
| `npm run figma:connect:dry` | Valida los mapeos de Code Connect. |
| `npm run figma:connect` | Publica los mapeos de Code Connect a Figma. |

## Notas

- `vue/vite.config.ts` es necesario para que Storybook procese los SFC: `@storybook/vue3-vite` 8.x no aplica `@vitejs/plugin-vue` por sí solo y lo toma de la config de Vite del proyecto.

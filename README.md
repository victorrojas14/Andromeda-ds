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

## Avatar

Avatar circular (Figma: set **Avatar**), bajo **Data Display/Avatar**. El estado se deriva de las props: `src` (Foto), `initials` (Iniciales, tipografía 72/40/24/16 según tamaño) o placeholder de agregar foto (icono `camera-plus-outline`, texto solo en 200). Props `size` (40/60/100/200) y `color` (`rojo`/`blanco`), `role="img"` con `aria-label`. Code Connect con Size/Color/Estado mapeados.

## Badge

Badge (Figma: set **Badge** y componente **Badge/Counter** de la página Badges), bajo **Data Display/Badge**. Fondo Info, texto blanco Poppins Medium con `size` h1–h6 (alturas 51/40/36/31/23/20) y contador opcional `count` que escala con el badge; `BadgeCounter` standalone (20×20, fondo Secondary, SemiBold). Ambos mapeados con Code Connect.

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

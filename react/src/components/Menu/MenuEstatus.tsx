import { useState, type HTMLAttributes } from 'react'
import { Icon, type AndIconName } from '../Icon'
import './Menu.css'

/** Estados del ItemMenu_Estatus (Figma: variante "Estado") */
export type MenuEstatusEstado =
  | 'default'
  | 'estatus-todos'
  | 'completo'
  | 'activa'
  | 'deshabilitada'

export interface MenuEstatusItem {
  /** Título de la sección (Figma: "Titulo seccion") */
  title: string
  /** Texto del Estatus seccion (default según el estado) */
  status?: string
  /** Icono izquierdo (Figma: "Cambiar Icono Izq"; default file-document-outline) */
  icon?: AndIconName
  /**
   * Estado del item (Figma: Default / Estatus todos / Completo /
   * Activa / Deshabilitada). Sin definirlo, el item activo se pinta
   * como Activa y el resto como Default.
   */
  estado?: MenuEstatusEstado
}

/** Texto default del Estatus seccion por estado (Figma) */
const DEFAULT_STATUS: Record<MenuEstatusEstado, string> = {
  default: 'Por iniciar',
  'estatus-todos': 'Captura completa',
  completo: 'Completa',
  activa: '',
  deshabilitada: 'Completa',
}

const ESTADO_CLASS: Record<MenuEstatusEstado, string> = {
  default: '',
  'estatus-todos': 'and-menu-estatus__item--todos',
  completo: 'and-menu-estatus__item--completo',
  activa: 'and-menu-estatus__item--activa',
  deshabilitada: 'and-menu-estatus__item--deshabilitada',
}

export interface MenuEstatusProps
  extends Omit<HTMLAttributes<HTMLElement>, 'onChange'> {
  /** Items del menú de estatus */
  items: MenuEstatusItem[]
  /** Índice activo (controlado); el item activo toma el Estado Activa */
  active?: number
  defaultActive?: number
  onChange?: (index: number, item: MenuEstatusItem) => void
}

/**
 * MenuEstatus — menú de secciones con estatus del DS Andromeda
 * (Figma: set "ItemMenu_Estatus" 3379:2647 de la página Menu). Lista
 * de cards de 57px (padding 10, radio 10, borde 1px, sombra
 * Sombra-Per) con icono, título, estatus y chevron. El estado por
 * item respeta las variantes de Figma; los items Deshabilitada no se
 * pueden seleccionar.
 */
export function MenuEstatus({
  items,
  active,
  defaultActive = 0,
  onChange,
  className = '',
  ...rest
}: MenuEstatusProps) {
  const [inner, setInner] = useState(defaultActive)
  const current = active !== undefined ? active : inner

  const estadoOf = (item: MenuEstatusItem, index: number): MenuEstatusEstado =>
    item.estado ?? (index === current ? 'activa' : 'default')

  const select = (index: number) => {
    if (estadoOf(items[index], index) === 'deshabilitada') return
    if (active === undefined) setInner(index)
    onChange?.(index, items[index])
  }

  return (
    <nav
      className={['and-menu-estatus', className].filter(Boolean).join(' ')}
      {...rest}
    >
      {items.map((item, i) => {
        const estado = estadoOf(item, i)
        const status =
          estado === 'activa' ? '' : (item.status ?? DEFAULT_STATUS[estado])
        return (
          <button
            key={i}
            type="button"
            className={['and-menu-estatus__item', ESTADO_CLASS[estado]]
              .filter(Boolean)
              .join(' ')}
            aria-current={estado === 'activa' ? 'page' : undefined}
            disabled={estado === 'deshabilitada'}
            onClick={() => select(i)}
          >
            <span className="and-menu-estatus__body">
              <span className="and-menu-estatus__icon" aria-hidden="true">
                <Icon
                  name={
                    estado === 'completo'
                      ? 'baseline-check-circle'
                      : (item.icon ?? 'file-document-outline')
                  }
                  size={24}
                />
              </span>
              <span className="and-menu-estatus__texts">
                <span className="and-menu-estatus__title">{item.title}</span>
                {status && (
                  <span className="and-menu-estatus__status">{status}</span>
                )}
              </span>
            </span>
            <span className="and-menu-estatus__chevron" aria-hidden="true">
              <Icon name="chevron-right" size={24} />
            </span>
          </button>
        )
      })}
    </nav>
  )
}

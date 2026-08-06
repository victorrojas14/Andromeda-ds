import * as React from 'react'
import './Avatar.css'
import { Icon } from '../Icon'

export type AvatarSize = 40 | 60 | 100 | 200
export type AvatarColor = 'rojo' | 'blanco'

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Tamaño en px (Figma: Size 40/60/100/200). */
  size?: AvatarSize
  /** Esquema de color (Figma: Color Rojo/Blanco). */
  color?: AvatarColor
  /** URL de la foto (Figma: Estado Foto). */
  src?: string
  /** Iniciales a mostrar (Figma: Estado Iniciales), ej. "CM". */
  initials?: string
  /** Texto accesible del avatar (nombre de la persona). */
  alt?: string
}

/**
 * Avatar — avatar circular del DS Andromeda (Figma: component set
 * "Avatar"). El estado se deriva de las props: con `src` muestra la
 * foto, con `initials` las iniciales, y sin ambas el placeholder de
 * "agregar foto" (icono camera-plus-outline; en 200 además el texto
 * "Agregar foto de perfil").
 */
export function Avatar({
  size = 200,
  color = 'rojo',
  src,
  initials,
  alt,
  className,
  ...rest
}: AvatarProps) {
  const classes = ['and-avatar', `and-avatar--${size}`, `and-avatar--${color}`, className]
    .filter(Boolean)
    .join(' ')

  return (
    <div
      className={classes}
      role="img"
      aria-label={alt ?? (initials ? String(initials) : 'Avatar')}
      {...rest}
    >
      {src ? (
        <img className="and-avatar__photo" src={src} alt="" />
      ) : initials ? (
        <span className="and-avatar__initials">{initials}</span>
      ) : (
        <>
          <span className="and-avatar__placeholder-icon" aria-hidden="true">
            <Icon name="camera-plus-outline" size={size === 40 ? 20 : 24} />
          </span>
          <span className="and-avatar__label">{'Agregar foto \nde perfil'}</span>
        </>
      )}
    </div>
  )
}

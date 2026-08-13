import type { HTMLAttributes, MouseEvent, ReactNode } from 'react'
import './Blanket.css'

export interface BlanketProps extends HTMLAttributes<HTMLDivElement> {
  /** Cubre el viewport (true) o solo su contenedor relativo (false) */
  fixed?: boolean
  /** Click directo sobre el blanket (no sobre su contenido) */
  onClose?: () => void
  children?: ReactNode
}

export function Blanket({
  fixed = true,
  onClose,
  children,
  className = '',
  ...rest
}: BlanketProps) {
  const onClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose?.()
  }

  return (
    <div
      className={['and-blanket', !fixed && 'and-blanket--contained', className]
        .filter(Boolean)
        .join(' ')}
      onClick={onClick}
      {...rest}
    >
      {children}
    </div>
  )
}

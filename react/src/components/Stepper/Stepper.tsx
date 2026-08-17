import { Fragment, type HTMLAttributes } from 'react'
import './Stepper.css'

export interface StepperStep {
  /** Texto del paso (Figma: "Texto" / "Titulo") */
  label: string
}

export interface StepperProps extends HTMLAttributes<HTMLDivElement> {
  /** Pasos del stepper (con más de 5 cambia al diseño "+ 5" de Figma) */
  steps: Array<string | StepperStep>
  /** Índice del paso activo (base 0); los anteriores quedan Completed */
  active?: number
  /** Orientación en web con ≤5 pasos (Figma: Tracker 2 / Tracker 1) */
  orientation?: 'horizontal' | 'vertical'
  /** Color del stepper: azul (tertiary) o vino (primary) */
  color?: 'azul' | 'vino'
  /** Muestra los textos de los pasos (Figma: "Mostrar Texto") */
  showLabels?: boolean
}

const toSteps = (steps: Array<string | StepperStep>): StepperStep[] =>
  steps.map((s) => (typeof s === 'string' ? { label: s } : s))

/** Check blanco de los pasos Completed (Figma: componente "Check") */
const Check = ({ width }: { width: number }) => (
  <svg
    width={width}
    height={(width * 19) / 26}
    viewBox="0 0 26 19"
    fill="none"
    aria-hidden="true"
  >
    <path
      d="M9.09203 19L0 9.99376L2.27301 7.7422L9.09203 14.4969L23.727 0L26 2.25156L9.09203 19Z"
      fill="currentColor"
    />
  </svg>
)

/* Aro del Stepper Mobile 2.0: 90px con grosor 6.3 y puntas redondas */
const RING_R = (90 - 6.3) / 2
const RING_C = 2 * Math.PI * RING_R

/**
 * Stepper — barra de pasos del DS Andromeda (Figma: página Steppers).
 * Con ≤5 pasos (máximo del diseño numerado) usa los items web "Items
 * Progress Tracker" en horizontal o vertical; con más de 5 cambia al
 * "Stepper Web + 5" (dots + "Paso # de #" + título). En <768px se ve
 * el diseño mobile: "Stepper Mobile" (círculos de 30px con el título
 * del paso activo) para ≤5 y el aro "Stepper Mobile 2.0" para >5.
 * El color azul (tertiary) o vino (primary) se elige con `color`.
 */
export function Stepper({
  steps,
  active = 0,
  orientation = 'horizontal',
  color = 'azul',
  showLabels = true,
  className = '',
  ...rest
}: StepperProps) {
  const items = toSteps(steps)
  const total = items.length
  const current = Math.min(Math.max(active, 0), Math.max(total - 1, 0))
  const activeLabel = items[current]?.label ?? ''
  const overFive = total > 5

  const stateOf = (index: number) =>
    index < current ? 'completed' : index === current ? 'active' : 'default'

  return (
    <div
      className={[
        'and-stepper',
        color === 'vino' && 'and-stepper--vino',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...rest}
    >
      {!overFive ? (
        /* Web ≤5: Items Progress Tracker 1 (vertical) / 2 (horizontal) */
        <div className={`and-stepper__web and-stepper__web--${orientation}`}>
          {items.map((step, i) => {
            const state = stateOf(i)
            const item = (
              <div
                key={`s${i}`}
                className={[
                  'and-stepper__item',
                  state !== 'default' && `and-stepper__item--${state}`,
                ]
                  .filter(Boolean)
                  .join(' ')}
                aria-current={state === 'active' ? 'step' : undefined}
              >
                <span className="and-stepper__circle">
                  {state === 'completed' ? <Check width={26} /> : i + 1}
                </span>
                {showLabels && (
                  <span className="and-stepper__label">{step.label}</span>
                )}
              </div>
            )
            if (orientation === 'vertical' && i > 0) {
              return (
                <Fragment key={i}>
                  <div
                    className={[
                      'and-stepper__vconn',
                      i <= current && 'and-stepper__vconn--done',
                    ]
                      .filter(Boolean)
                      .join(' ')}
                  />
                  {item}
                </Fragment>
              )
            }
            return item
          })}
        </div>
      ) : (
        /* Web >5: Stepper Web + 5 (dots + Paso # de # + título) */
        <div className="and-stepper__v2">
          <div className="and-stepper__v2-row">
            {items.map((_, i) => (
              <div key={i} className="and-stepper__v2-item">
                <span
                  className={[
                    'and-stepper__dot',
                    i < current && 'and-stepper__dot--complete',
                    i === current && 'and-stepper__dot--active',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                />
                {i < total - 1 && (
                  <span
                    className={[
                      'and-stepper__v2-line',
                      i < current && 'and-stepper__v2-line--done',
                    ]
                      .filter(Boolean)
                      .join(' ')}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="and-stepper__v2-textos">
            <span className="and-stepper__v2-paso">
              Paso {current + 1} de {total}
            </span>
            {showLabels && (
              <span className="and-stepper__v2-titulo">{activeLabel}</span>
            )}
          </div>
        </div>
      )}

      {!overFive ? (
        /* Mobile ≤5: Stepper Mobile (círculos de 30px + título activo) */
        <div className="and-stepper__mobile">
          <div className="and-stepper__mobile-row">
            {items.map((_, i) => {
              const state = stateOf(i)
              return (
                <Fragment key={i}>
                  {i > 0 && (
                    <span
                      className={[
                        'and-stepper__mobile-conn',
                        i <= current && 'and-stepper__mobile-conn--done',
                      ]
                        .filter(Boolean)
                        .join(' ')}
                    />
                  )}
                  <span
                    className={[
                      'and-stepper__mobile-num',
                      state !== 'default' && `and-stepper__mobile-num--${state}`,
                    ]
                      .filter(Boolean)
                      .join(' ')}
                    aria-current={state === 'active' ? 'step' : undefined}
                  >
                    {state === 'completed' ? <Check width={17} /> : i + 1}
                  </span>
                </Fragment>
              )
            })}
          </div>
          {showLabels && (
            <span className="and-stepper__mobile-label">{activeLabel}</span>
          )}
        </div>
      ) : (
        /* Mobile >5: Stepper Mobile 2.0 (aro de 90px + # de # + título) */
        <div className="and-stepper__ring-wrap">
          <div className="and-stepper__ring">
            <svg viewBox="0 0 90 90" aria-hidden="true">
              <circle
                className="and-stepper__ring-track"
                cx="45"
                cy="45"
                r={RING_R}
                fill="none"
                strokeWidth="6.3"
              />
              <circle
                className="and-stepper__ring-progress"
                cx="45"
                cy="45"
                r={RING_R}
                fill="none"
                strokeWidth="6.3"
                strokeLinecap="round"
                strokeDasharray={`${(RING_C * (current + 1)) / total} ${RING_C}`}
                transform="rotate(-90 45 45)"
              />
            </svg>
            <span className="and-stepper__ring-text">
              {current + 1} de {total}
            </span>
          </div>
          {showLabels && (
            <span className="and-stepper__ring-title">{activeLabel}</span>
          )}
        </div>
      )}
    </div>
  )
}

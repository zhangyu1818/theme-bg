import * as React from 'react'

import { createTransition, type Options } from './createTransition'

export interface CircleTransitionProps
  extends React.CanvasHTMLAttributes<HTMLCanvasElement> {
  center?: boolean
  trigger: string | React.RefObject<unknown>
  options: Options
}

export const CircleTransition = (props: CircleTransitionProps) => {
  const { center, trigger, options, ...restProps } = props

  const ref = React.useRef<HTMLCanvasElement | null>(null)

  React.useEffect(() => {
    const canvas = ref.current!
    const transition = createTransition(canvas, options)

    const triggerEle =
      typeof trigger === 'string'
        ? document.querySelector<HTMLElement>(trigger)
        : (trigger.current as HTMLElement)

    if (!triggerEle) {
      console.error('CircleTransition: trigger is not defined.')
      return
    }

    let isForwards = false

    const callback = (event: MouseEvent) => {
      const { clientX, clientY, offsetX, offsetY } = event

      let x: number, y: number

      if (center) {
        const target = event.target as HTMLElement
        const { width, height } = target.getBoundingClientRect()

        x = clientX - offsetX + width / 2
        y = clientY - offsetY + height / 2
      } else {
        x = clientX
        y = clientY
      }

      isForwards = !isForwards
      transition.startTransition(x, y, isForwards ? 'forwards' : 'backwards')
    }

    triggerEle.addEventListener('click', callback)

    return () => {
      transition.stopTransition()
      triggerEle.removeEventListener('click', callback)
    }
  }, [center, trigger, options])

  return <canvas ref={ref} {...restProps} />
}

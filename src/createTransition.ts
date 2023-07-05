import { animate, type Bezier, type Spring, type Controls } from 'from-to.js'

interface TransitionOptions {
  background: string
  foreground: string
}

type TransitionType = 'forwards' | 'backwards'

export type Options = TransitionOptions & (Bezier | Spring)

export const createTransition = (
  canvas: HTMLCanvasElement,
  options: Options
) => {
  const ctx = canvas.getContext('2d')!

  let currentRadius = 0
  let animation: Controls | null = null

  function draw(x: number, y: number, type: TransitionType = 'forwards') {
    animation?.stop()

    const { background, foreground, ...transitionOptions } = options

    const width = canvas.width
    const height = canvas.height

    const clientWidth = canvas.clientWidth
    const clientHeight = canvas.clientHeight

    const widthRatio = width / clientWidth
    const heightRatio = height / clientHeight

    const fromX = x * widthRatio
    const fromY = y * heightRatio

    const maxRadius = Math.hypot(
      Math.max(fromX, width - fromX),
      Math.max(fromY, height - fromY)
    )

    let start: number, end: number

    if (type === 'backwards') {
      start = currentRadius || maxRadius
      end = 0
    } else {
      start = currentRadius
      end = maxRadius
    }

    const onUpdate = (radius: number) => {
      if (radius < 0) {
        radius = 0
      }
      currentRadius = radius
      ctx.clearRect(0, 0, width, height)
      ctx.fillStyle = background
      ctx.fillRect(0, 0, width, height)
      ctx.beginPath()
      ctx.arc(fromX, fromY, radius, 0, 2 * Math.PI)
      ctx.fillStyle = foreground
      ctx.fill()
    }

    animation = animate(start, end, {
      ...transitionOptions,
      loop: false,
      onUpdate,
      onComplete() {
        currentRadius = 0
      },
    })

    return { then: animation.then }
  }

  return {
    startTransition: draw,
    stopTransition: () => {
      animation?.stop()
    },
  }
}

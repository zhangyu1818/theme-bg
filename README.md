# theme-bg

React and vanilla background circular transition animation.

[demo](https://zhangyu1818.github.io/theme-bg/)

## install

```shell
npm i theme-bg
```

## React usage

```tsx
function App() {
  const ref = useRef<HTMLButtonElement | null>(null)
  return (
    <div className='flex h-screen w-screen items-center justify-center'>
      <CircleTransition
        className='absolute h-full w-full bg-white'
        width={innerWidth}
        height={innerHeight}
        center
        trigger={ref}
        options={{
          background: '#fff',
          foreground: '#000',
        }}
      />
      <button
        className='relative z-10 rounded border border-white px-6 py-2 text-white mix-blend-difference'
        ref={ref}
      >
        Start Transition
      </button>
    </div>
  )
}
```

```ts
interface CircleTransitionProps
  extends React.CanvasHTMLAttributes<HTMLCanvasElement> {
  center?: boolean
  trigger: string | React.RefObject<unknown>
  options: Options
}

interface TransitionOptions {
  background: string
  foreground: string
}
type Options = TransitionOptions & (Bezier | Spring)
```

**center**: Whether to start transition from the center of the triggering element

**trigger**: The element that triggers the transition, if it is a string, querySelector will be called.

**options**: Color and animation settings.

## Vanilla usage

```ts
const transition = createTransition(canvas, options)

await transition.startTransition(x, y, 'forwards')
await transition.startTransition(x, y, 'backwards')

transition.stopTransition()
```

## License

[MIT](https://github.com/zhangyu1818/theme-bg/blob/main/LICENSE)

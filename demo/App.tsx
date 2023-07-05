import { useRef } from 'react'
import { CircleTransition } from '../src'

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

export default App

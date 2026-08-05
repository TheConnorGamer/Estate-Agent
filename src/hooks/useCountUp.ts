import { useState, useEffect } from 'react'

export function useCountUp(end: number, duration: number = 800, trigger: boolean = true): number {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!trigger) return

    let startTime: number | null = null
    let rafId: number

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const elapsed = timestamp - startTime
      const progress = Math.min(elapsed / duration, 1)
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(end * eased))

      if (progress < 1) {
        rafId = requestAnimationFrame(animate)
      }
    }

    rafId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafId)
  }, [end, duration, trigger])

  return value
}

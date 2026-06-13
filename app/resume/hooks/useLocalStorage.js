'use client'

import { useCallback, useEffect, useMemo, useState, useSyncExternalStore } from 'react'

const subscribeToHydration = () => () => {}

export function useLocalStorage(key, initialValue, { delay = 600, serialize = JSON.stringify, deserialize = JSON.parse } = {}) {
  const [value, setValue] = useState(() => {
    if (typeof window === 'undefined') return initialValue
    try {
      const stored = window.localStorage.getItem(key)
      return stored ? deserialize(stored) : initialValue
    } catch (_) {
      return initialValue
    }
  })
  const [saved, setSaved] = useState(false)
  const hydrated = useSyncExternalStore(
    subscribeToHydration,
    () => true,
    () => false
  )
  const serializer = useMemo(() => serialize, [serialize])

  useEffect(() => {
    if (!hydrated) return undefined

    const timer = window.setTimeout(() => {
      try {
        window.localStorage.setItem(key, serializer(value))
        setSaved(true)
        window.setTimeout(() => setSaved(false), 1800)
      } catch (_) {}
    }, delay)

    return () => window.clearTimeout(timer)
  }, [delay, hydrated, key, serializer, value])

  const clear = useCallback((nextValue = initialValue) => {
    try {
      window.localStorage.removeItem(key)
    } catch (_) {}
    setValue(nextValue)
  }, [initialValue, key])

  return [value, setValue, { hydrated, saved, clear }]
}

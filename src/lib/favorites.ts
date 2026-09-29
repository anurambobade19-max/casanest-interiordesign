import { useSyncExternalStore } from 'react'

// Favorites live in localStorage until accounts arrive (see PLAN.md, milestone 3).
const KEY = 'casanest:favorites'
const listeners = new Set<() => void>()
let cache: string[] | null = null

function read(): string[] {
  if (cache) return cache
  if (typeof window === 'undefined') return []
  try {
    cache = JSON.parse(localStorage.getItem(KEY) ?? '[]')
  } catch {
    cache = []
  }
  return cache!
}

const EMPTY: string[] = []

export function toggleFavorite(id: string) {
  const current = read()
  cache = current.includes(id) ? current.filter((x) => x !== id) : [...current, id]
  localStorage.setItem(KEY, JSON.stringify(cache))
  listeners.forEach((l) => l())
}

export function useFavorites() {
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb)
      return () => listeners.delete(cb)
    },
    read,
    () => EMPTY,
  )
}

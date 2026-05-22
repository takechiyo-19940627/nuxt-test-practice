import { ref, type Ref } from 'vue'

const stateMap = new Map<string, Ref<unknown>>()

export function useState<T>(key: string, init?: () => T): Ref<T> {
  if (!stateMap.has(key)) {
    stateMap.set(key, ref(init ? init() : undefined) as Ref<unknown>)
  }
  return stateMap.get(key) as Ref<T>
}

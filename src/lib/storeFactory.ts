import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import type { StateCreator } from 'zustand'

export function createStore<T extends object>(state: StateCreator<T, [['zustand/immer', never]], [], T>) {
  return create(immer(state))
}

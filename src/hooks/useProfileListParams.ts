import { createStore } from '../lib/storeFactory'

interface ProfileListParamStore {
  canPageBackward: boolean
  canPageForward: boolean
  isFetching: boolean
  page: number
  searchTerm: string | undefined
  count: number
  onPageBackward: () => void
  onPageForward: () => void
  onSearchChange: (searchTerm: string | undefined) => void
  onFetch: ({ hasNext, hasPrevious, count }: { hasNext: boolean; hasPrevious: boolean; count: number }) => void
}

export const useProfileListParams = createStore<ProfileListParamStore>(set => {
  return {
    page: 1,
    searchTerm: undefined,
    count: 0,
    canPageForward: true,
    canPageBackward: false,
    isFetching: false,

    onFetch: ({ hasNext, hasPrevious, count }) => {
      set(state => {
        state.canPageBackward = hasPrevious
        state.canPageForward = hasNext
        state.isFetching = false
        state.count = count
      })
    },

    onPageBackward: () => {
      set(state => {
        state.isFetching = true
        const newPage = state.page - 1
        state.page = newPage
        state.canPageBackward = newPage > 1
      })
    },

    onPageForward: () => {
      set(state => {
        state.isFetching = true
        const newPage = state.page + 1
        state.page = newPage
      })
    },

    onSearchChange: searchTerm => {
      set(state => {
        state.searchTerm = searchTerm
      })
    }
  }
})

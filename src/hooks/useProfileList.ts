import type { UseQueryResult } from '@tanstack/react-query'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { filter } from 'ramda'
import { useProfileListParams } from './useProfileListParams'

export interface ProfileList {
  count: number
  next: string
  previous: string
  results: Result[]
}

export interface Result {
  bio: string
  current_room: CurrentRoom
  following_user_profile_ids: number[]
  id: number
  name: string
  username: string
}

export interface CurrentRoom {
  followed_by_speaker: boolean
  is_moderator: boolean
  is_speaker: boolean
  room: number
  user_profile: number
}

const onFetch = useProfileListParams.getState().onFetch

export const useProfileList = (): UseQueryResult<ProfileList> => {
  const { page, searchTerm } = useProfileListParams()

  return useQuery({
    queryKey: ['profiles', { page, searchTerm }],
    queryFn: () =>
      axios.get<ProfileList>(`https://ch-coding-api.herokuapp.com/api/user_profiles/`, {
        params: { page }
      }),
    onSuccess: data => {
      onFetch({
        hasNext: !!data.next,
        hasPrevious: !!data.previous,
        count: data.results.length
      })
    },

    select: ({ data }) => {
      function filterBySearchTerm(result: Result) {
        if (searchTerm) {
          const { name, username, bio } = result
          const hasMatch = [name, username, bio].find(str => str.toLowerCase().includes(searchTerm.toLowerCase()))
          return !!hasMatch
        }
        return true
      }

      return {
        count: data.count,
        next: data.next,
        previous: data.previous,
        results: filter(filterBySearchTerm, data.results)
      }
    },
    cacheTime: 300000
  })
}

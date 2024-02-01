import { useQuery } from '@tanstack/react-query'
import { listParams, listResult } from '../types'
import { getMatchScoring } from '..'
import { queryParamsToQs } from '../helpers'

export const useGetScoring = ({ queryParams = {} }: listParams = {}) => {
  const queryString = queryParamsToQs(queryParams)
  return useQuery({
    queryKey: ['scoring', queryString],
    queryFn: async (): Promise<listResult> => {
      return await getMatchScoring(queryString)
    },
    placeholderData: (previousData) => previousData,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  })
}

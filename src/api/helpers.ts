import * as qs from 'qs'
import { queryParams } from '@/api/types'

export const queryParamsToQs = (queryParams: queryParams = {}): string => {
  const withParams = Object.keys(queryParams)?.length
  const queryString = withParams
    ? '?' +
      qs.stringify(queryParams, {
        arrayFormat: 'indices',
        encode: false,
        format: 'RFC3986',
      })
    : ''
  return queryString
}

export const qsToQueryParams = (queryString: string): queryParams => {
  const parsedParams = qs.parse(queryString, {
    ignoreQueryPrefix: true,
  }) as queryParams

  return parsedParams
}

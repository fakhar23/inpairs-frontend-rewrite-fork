import { queryParams } from '@/api/types';
import * as qs from 'qs';


export const queryParamsToQs = (queryParams: queryParams = {}): string => {
  const withParams = Object.keys(queryParams)?.length;
  const queryString = withParams
    ? '?' +
      qs.stringify(queryParams, {
        arrayFormat: 'indices',
        encode: false,
        format: 'RFC3986',
      })
    : '';
  return queryString;
};

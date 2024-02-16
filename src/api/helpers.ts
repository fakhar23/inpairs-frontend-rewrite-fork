import * as qs from "qs";
import { QueryParams } from "./types";

export const queryParamsToQs = (queryParams: QueryParams = {}): string => {
  const withParams = Object.keys(queryParams)?.length;
  const queryString = withParams
    ? "?" +
      qs.stringify(queryParams, {
        arrayFormat: "indices",
        encode: false,
        format: "RFC3986",
      })
    : "";
  return queryString;
};

export const qsToQueryParams = (queryString: string): QueryParams => {
  const parsedParams = qs.parse(queryString, {
    ignoreQueryPrefix: true,
  }) as QueryParams;

  return parsedParams;
};

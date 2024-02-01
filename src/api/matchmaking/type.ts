export interface TrackingCalculationItem {
  title: string | number;
  total: number;
  yes: number;
  no: number;
  autoRejected: number;
  connected: number;
  [key: string]: number | string;
}

export interface getMatchTrackingResult {
  calculations?: TrackingCalculationItem[];
  rejectionReasons?: string[];
}

export type getMatchTrackingArgs = {
  queryParams?: { select?: 'calculations' | 'rejectionReasons' };
  skip?: boolean;
};

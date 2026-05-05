export interface BaanRecord {
  id: number;
  baan_id: string;
  field: string;
  lower_limit: number;
  upper_limit: number;
  aspect_id: string;
  sequence: string;
  version: string;
}

export interface BaanResponse {
  result: BaanRecord[];
  total: number;
}

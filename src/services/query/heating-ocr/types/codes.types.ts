export interface MakerCode {
  mapping_label: string;
  mapping_value: string;
  is_active: boolean;
  id: number;
  created_on: string;
  last_modified_on: string;
}

export interface MakerCodeCreateInput {
  mapping_label: string;
  mapping_value: string;
  is_active?: boolean;
}

export interface ProcessCode {
  mapping_label: string;
  mapping_value: string;
  is_active: boolean;
  id: number;
  created_on: string;
  last_modified_on: string;
}

export interface ProcessCodeCreateInput {
  mapping_label: string;
  mapping_value: string;
  is_active?: boolean;
}

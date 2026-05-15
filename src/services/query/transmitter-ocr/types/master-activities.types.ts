type DeviceType = "TRANSMITTER" | "GAUGE";

type Status = "IN_PROGRESS" | "COMPLETED" | "FAILED";

interface User {
  name: string;
  email: string;
  id: number;
}

export interface MasterActivitiesItem {
  title: string;
  filename: string;
  template: string;
  device_type: DeviceType;
  status: Status;
  is_extracted: boolean;
  id: number;
  user_id: number;
  price: number;
  is_active: boolean;
  created_on: string;
  last_modified_on: string;
  user: User;
}

export interface MasterActivitiesResponse {
  total: number;
  result: MasterActivitiesItem[];
}

export interface MasterDataItem {
  "Tag number": string;
  "Model number": string;
  "Lower Calibration Range": number;
  "Upper Calibration Range": number;
  "Calibration Range Unit": string;
}

export interface MasterActivityItem {
  title: string;
  filename: string;
  master_data: Record<string, MasterDataItem>[];
  template: string;
  device_type: DeviceType;
  status: Status;
  is_extracted: boolean;
  id: number;
  user_id: number;
  price: number;
  is_active: boolean;
  created_on: string;
  last_modified_on: string;
  user: User;
}

export type MasterActivityResponse = MasterActivityItem;

export interface MasterDataRecord {
  serialNo: number;
  tagNumber: string;
  modelNumber: string;
  lowerRange: string;
  upperRange: string;
  unit: string;
}

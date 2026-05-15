export interface AppItem {
  title: string;
  description: string;
  imageUrl: string;
  path: string;
}

interface ServiceItem {
  title: string;
  description: string;
}

export interface AppListResponse {
  result: ServiceItem[];
}

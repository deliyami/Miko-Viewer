export interface TimeStamps {
  updatedAt: Date;
  createdAt: Date;
}

export interface CommonProps extends TimeStamps {
  id: number;
}

export interface CommonFSW {
  filter?: [string, string | number][];
  sort?: string[];
  with?: string[];
  start?: string;
  end?: string;
  per_page?: number;
}

export interface Pagination<T> {
  data: T[];
  links: Links;
  meta: Meta;
}

export interface CommonDataResponse<T> {
  data: T;
}

export interface Links {
  first: string;
  last: string;
  prev: null;
  next: null;
}

export interface Meta {
  current_page: number;
  from: number;
  last_page: number;
  links: Link[];
  path: string;
  per_page: string;
  to: number;
  total: number;
}

export interface Link {
  url: null | string;
  label: string;
  active: boolean;
}

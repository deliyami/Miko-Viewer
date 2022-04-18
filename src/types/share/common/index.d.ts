export interface TimeStamps {
  updatedAt: Date;
  createdAt: Date;
}

export interface CommonProps extends TimeStamps {
  id: number;
}

export interface CommonFSW {
  /**
   * @example: [[user_id:1],[concert_id:12]]
   */
  filter?: [string, string | number | undefined][];
  /**
   * @example: ["score","-title"]
   * -를 붙이면 역순
   */
  sort?: string[];
  /**
   * @example: ["concerts","user"]
   * Join 기능
   * Laravel Model 파일을 열어 메소드 이름과 동일하게 입력해주면 됨.
   */
  with?: string[];
  start?: string;
  end?: string;
  /**
   * @example: 10
   * Pagination 전용
   * 미 입력시 Default per_page 적용됨
   */
  perPage?: number;
  /**
   * @example: 10
   * Pagination 전용
   * 미 입력시 page = 1
   */
  page?: number;
  /**
   * @example: "FULL TEXT 문법에 따름"
   * boolean mode로 작동
   */
  search?: string;
}

export interface CommonFindId {
  /**
   * @example: ["concerts","user"]
   * Join 기능
   * Laravel Model 파일을 열어 메소드 이름과 동일하게 입력해주면 됨.
   */
  with?: string[];
}

export interface Pagination<T> {
  length: ReactNode;
  map: any;
  data: T[];
  links: Links;
  meta: Meta;
}

export interface CommonDataResponse<T> {
  map: any;
  length: SetStateAction<number>;
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

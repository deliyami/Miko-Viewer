export interface Recording {
  id: number;
  ticketId: number;
  prefix: string;
  stream_id: string;
  end?: string;
  start: string;
  avl_archive: number;
  createdAt: string;
}

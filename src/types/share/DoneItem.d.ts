export interface DoneItem {
  price: number;
  name: string;
  id: number;
  path: string;
}

export interface DoneSendInterface {
  sender: string;
  itemId: number;
  timestamp: number;
}

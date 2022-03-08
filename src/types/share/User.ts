export type User = {
  id: number;
  name: string;
  email: string;
  avatar?: string;
  uuid: string;
  coin: number;
};

export type CreteUserData = Pick<User, 'name' | 'email'> & {
  password: string;
  confirm: string;
};

export type LoginData = {
  email: string;
  password: string;
};

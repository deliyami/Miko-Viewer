export type User = {
  id: number;
  name: string;
  email: string;
  photo?: string;
};

export type CreteUserData = Pick<User, 'name' | 'email'> & {
  password: string;
  confirm: string;
};

export type LoginData = {
  email: string;
  password: string;
};

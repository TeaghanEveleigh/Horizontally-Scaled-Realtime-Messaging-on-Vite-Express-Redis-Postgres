
export type CreateUserInput = {
  email: string;
  password: string;       // plain text — service layer hashes it
  username: string;
};

export type PublicUser = Omit<User, 'password_hash'>;

export type UpdateUserInput = Partial<CreateUserInput>;

// DB Row for user Table
export type User = {
  created_at: Date;
  email: string;
  id: string;
  password_hash: string;
  username: string;
};
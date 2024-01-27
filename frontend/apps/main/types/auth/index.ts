export type FileEntity = {
  id: string;
  path: string;
};

export enum RoleEnum {
  ADMIN = 1,
  USER = 2,
}

export type Role = {
  id: RoleEnum;
  name?: string;
};

export type Tokens = {
  token: string | null | undefined;
  refreshToken: string | null | undefined;
  tokenExpires: number | null | undefined;
};

export enum UserProviderEnum {
  EMAIL = "email",
  GOOGLE = "google",
}

export type User = {
  id: number | string;
  email: string;
  firstName?: string;
  lastName?: string;
  photo?: FileEntity;
  provider?: UserProviderEnum;
  socialId?: string;
  role?: Role;
};

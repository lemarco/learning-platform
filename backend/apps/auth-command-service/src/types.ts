export type GoogleUser = {
  picture?: string;
  id: string;
  email: string;
  locale: string;
  given_name?: string;
  family_name?: string;
};

export type Tokens = {
  access: string;
  refresh: string;
};
export type RequestInfo = {
  ip: string;
  useragent: string;
};
export type GoogleSigninCode = {
  code: string;
};
export type User = { id: string; role: string };

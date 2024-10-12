export type AuthLoginBody = {
  email: string;
  password: string;
};

export type AuthLoginDTO = {
  access_token: string;
  refresh_token: string;
};

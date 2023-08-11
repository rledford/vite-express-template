export type VerifyUserArgs = {
  username: string;
  password: string;
};
export type VerifyUserCallback = (args: VerifyUserArgs) => Promise<boolean>;

import argon from "argon2";

export const encrypt = async (password: string) => {
  return await argon.hash(password);
};

export const verify = async (password: string, hash: string) => {
  return await argon.verify(hash, password);
};

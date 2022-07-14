import jwt from "jsonwebtoken";

export const sign = (
  payload: { id: string; email: string },
  secret: string,
  expriration: string
) => {
  return jwt.sign(payload, secret, {
    expiresIn: expriration,
  });
};

export const verify = (token: string, secret: string) => {
  return jwt.verify(token, secret);
};

export const getPayload = (token: string) => {
  const payload = jwt.decode(token);
  if (typeof payload === "string") return null;
  return payload;
};
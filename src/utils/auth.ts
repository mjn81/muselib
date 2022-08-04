import { PrismaClient, Role } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { MESSAGES } from "constants/index";
import { JwtPayload } from "jsonwebtoken";

export const roleBaseAuth = async (
  payload: JwtPayload | undefined,
  prisma: PrismaClient,
  role? : Role[] | null
) => {
  if (!payload)
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: MESSAGES["USER_NOT_AUTHENTICATED"],
    });
  const user = await prisma.users.findUnique({
    where: {
      id: payload.id,
    },
  });
  if (!user)
  throw new TRPCError({
    code: "UNAUTHORIZED",
    message: MESSAGES["USER_NOT_FOUND"],
  });
  if (role)
    if (!role.includes(user.role))
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: MESSAGES["USER_INSUFICIENT_PERMISSION"],
      });
  return user;
};

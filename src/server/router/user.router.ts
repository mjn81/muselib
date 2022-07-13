import { TRPCError } from "@trpc/server";
import { LoginInputUser, UserOutputSchema } from "schemas";
import { createRouter } from "./context";


export const userRouter = createRouter()
  .mutation('login', {
    input: LoginInputUser,
    output: UserOutputSchema,
    resolve: async ({ input, ctx }) => {
      const { email, pasword } = input;
      
      const user = await ctx.prisma.users.findUnique({
        where: {
          email,
        },
      });
      if (!user) {
        throw new TRPCError({
          code:'NOT_FOUND',
          message: "such email doesn't exist!!",
        });
      }

      //dummy return ... 
      
      return {
        userName: "",
        token:""
      }
    }
  })
  

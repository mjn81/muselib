import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { LoginInput, LoginInputForm } from "schemas";
import { trpc } from "utils/trpc";

const Login = () => {
  const { mutate, error } = trpc.useMutation("user.login", {
    onSuccess: (data) => {
      console.log(data);
    },
  });

  const { data } = trpc.useQuery(["user.me"], {
    onSuccess: (data) => {
      console.log(data);
    },
  });
  const { register, handleSubmit } = useForm<LoginInputForm>({
    resolver: zodResolver(LoginInput),
  });

  const onSubmit: SubmitHandler<LoginInputForm> = (data) => {
    mutate(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {error && error.message}
      <input type="text" {...register("email")} />
      <input type="password" {...register("password")} />
      <button>Login</button>
    </form>
  );
};

export default Login;

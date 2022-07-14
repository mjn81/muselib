import { useValidForm } from "hooks";
import { LoginInput, LoginInputForm } from "schemas";
import { trpc } from "utils/trpc";

const Login = () => {
  const { mutate, error } = trpc.useMutation("user.login", {
    onSuccess: (data) => {
      console.log(data);
    },
  });

  const submit = (data: LoginInputForm) => mutate(data);
  const { register, handleSubmit, onSubmit } = useValidForm(LoginInput, submit);

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

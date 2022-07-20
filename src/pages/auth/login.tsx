import { Button, Card, Input } from "components";
import { useValidForm } from "hooks";
import { AuthLayout } from "layouts";
import Link from "next/link";
import { LoginInput, LoginInputForm } from "schemas";
import { trpc } from "utils/trpc";

const Login = () => {
  const { mutate, error } = trpc.useMutation("user.login", {
    onSuccess: (data) => {
      console.log(data);
    },
  });

  const submit = (data: LoginInputForm) => mutate(data);
  const { register, handleSubmit, onSubmit } = useValidForm(
    LoginInput,
    submit
  );

  return (
    <AuthLayout>
      <Card className=" absolute z-10 items-center justify-center h-full w-full px-6 md:w-2/3 md:px-12 lg:w-1/2 lg:px-32 xl:px-48 bg-white shadow-2xl shadow-extra_dark_purple">
        <h1 className="w-full text-left font-bold text-purple-600 my-4 text-4xl">
          Login.
        </h1>
        <form
          className="w-full py-6 flex flex-col space-y-6 items-center justify-center"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Input
            type="email"
            placeholder="Email"
            {...register("email")}
          />
          <Input
            type="password"
            placeholder="Password"
            {...register("password")}
          />
          <Button type="submit">Login</Button>
        </form>
        <span className="w-full border-t-2 border-slate-100 mb-6 mt-2" />
        <span className="flex space-x-1">
          <p>Don&lsquo;t have an account?</p>
          <span className="text-dark_purple">
            <Link href="/auth/register">Click here</Link>
          </span>
        </span>
      </Card>
    </AuthLayout>
  );
};

export default Login;

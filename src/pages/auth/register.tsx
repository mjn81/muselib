import { Button, Card, Input } from "components";
import { useValidForm } from "hooks";
import { AuthLayout } from "layouts";
import Link from "next/link";
import { RegisterInput, RegisterInputForm } from "schemas";
import { trpc } from "utils/trpc";

const Register = () => {
  const { mutate } = trpc.useMutation(["user.register"], {
    onSuccess: (data) => {
      console.log(data);
    },
  });

  const submit = (data: RegisterInputForm) => {
    mutate(data);
  };

  const { register, handleSubmit, onSubmit } = useValidForm(
    RegisterInput,
    submit
  );

  return (
    <AuthLayout>
      <Card className=" absolute z-10 items-center justify-center h-full w-full md:w-2/3 px-12 lg:w-1/2 lg:px-32 xl:px-48 bg-white shadow-2xl shadow-extra_dark_purple">
        <h1 className="w-full text-left font-bold text-purple-600 my-4 text-4xl">
          Register.
        </h1>
        <form
          className="w-full py-6 flex flex-col space-y-6 items-center justify-center"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Input
            type="text"
            placeholder="FullName"
            {...register("fullName")}
          />
          <Input
            type="text"
            placeholder="UserName"
            {...register("userName")}
          />
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
          <Button type="submit">Register</Button>
        </form>
        <span className="w-full border-t-2 border-slate-100 mb-6 mt-2" />
        <span className="flex space-x-1">
          <p>Already have an account?</p>
          <span className="text-dark_purple">
            <Link href="/auth/login">Click here</Link>
          </span>
        </span>
      </Card>
    </AuthLayout>
  );
};

export default Register;

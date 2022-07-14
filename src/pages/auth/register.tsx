import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { RegisterInputForm, RegisterInput } from "schemas";
import { trpc } from "utils/trpc";

const Register = () => {
  // this is a proto basic --- needs further improvement
  const { mutate } = trpc.useMutation(["user.register"], {
    onSuccess: (data) => {
      console.log(data);
    },
  });

  const { register, handleSubmit } = useForm<RegisterInputForm>({
    resolver: zodResolver(RegisterInput),
  });

  const onSubmit: SubmitHandler<RegisterInputForm> = (data) => {
    mutate(data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" {...register("fullName")} />
        <input type="text" {...register("userName")} />
        <input type="email" {...register("email")} />
        <input type="password" {...register("password")} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Register;

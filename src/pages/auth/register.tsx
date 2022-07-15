
import {RegisterForm} from "components";
import { AuthLayout } from "layouts";
import { trpc } from "utils/trpc";

const Register = () => {
  // this is a proto basic --- needs further improvement
  const { mutate } = trpc.useMutation(["user.register"], {
    onSuccess: (data) => {
      console.log(data);
    },
  });


  return (
    <AuthLayout>
      <RegisterForm submit={(data)=> mutate(data)} />
    </AuthLayout>
  );
};

export default Register;

import Link from "next/link";
import { toast } from "react-toastify";
import { Form, Formik, Field } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { useRouter } from "next/router";

import { Button, Card, Input, Alert } from "components";
import { AuthLayout } from "layouts";
import { RegisterInput, RegisterInputForm } from "schemas";
import { trpc } from "utils/trpc";
import { setUser } from "utils/storage";
import {
  ALERT_TYPES,
  REGISTER_INITIAL,
} from "constants/index";

type FormikActions = {
  setSubmitting: (isSubmitting: boolean) => void;
};

const Register = () => {
  const router = useRouter();
  const { mutateAsync } = trpc.useMutation(
    "user.register",
    {
      onSuccess: (data) => {
        setUser(data.token, data.userName);
        toast.success("success");
        router.push({
          pathname: "/app",
        });
      },
      onError: ({ message }) => {
        toast.error(message);
      },
    }
  );
  const submit = (
    data: RegisterInputForm,
    { setSubmitting }: FormikActions
  ) => {
    mutateAsync(data).then(() => setSubmitting(false));
  };

  return (
    <AuthLayout>
      <Card className=" absolute z-10 items-center justify-center h-full w-full px-6 md:w-2/3 md:px-12 lg:w-1/2 lg:px-32 xl:px-48 bg-white shadow-2xl shadow-extra_dark_purple">
        <h1 className="w-full text-left font-bold text-purple-600 my-4 text-4xl">
          Register.
        </h1>
        <Formik
          initialValues={REGISTER_INITIAL}
          validationSchema={toFormikValidationSchema(
            RegisterInput
          )}
          onSubmit={submit}
        >
          {({ isSubmitting, errors }) => (
            <Form className="w-full py-6 flex flex-col space-y-6 items-center justify-center">
              {Object.values(errors).length > 0 && (
                <Alert type={ALERT_TYPES.ERROR}>
                  {Object.values(errors).map(
                    (error, index) => (
                      <p key={`er_${index}`}>{error}</p>
                    )
                  )}
                </Alert>
              )}
              <Field
                name="fullName"
                type="text"
                placeholder="fullName"
                as={Input}
              />
              <Field
                name="userName"
                type="text"
                placeholder="userName"
                as={Input}
              />
              <Field
                name="email"
                type="email"
                placeholder="Email"
                as={Input}
              />
              <Field
                name="password"
                type="password"
                placeholder="Password"
                as={Input}
              />
              <Button type="submit" disabled={isSubmitting}>
                Register
              </Button>
            </Form>
          )}
        </Formik>
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

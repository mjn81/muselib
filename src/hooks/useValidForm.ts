import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z, ZodType } from "zod";

export const useValidForm = (schema: ZodType, submit: Function) => {
  type stype = z.infer<typeof schema>;
  const { register, handleSubmit } = useForm<stype>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<stype> = (data) => {
    submit(data);
  };

  return { register, handleSubmit, onSubmit };
};

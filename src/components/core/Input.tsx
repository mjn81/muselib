import { Props } from "constants/index";

export const Input = (props: Props) => {
  const { children, ...others } = props;
  return (
    <input
      className="border-2 w-full border-slate-100 outline-2 outline-light_purple rounded-xl px-6 py-3 text-slate-700"
      {...others}
    />
  );
};

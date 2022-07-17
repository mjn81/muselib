import { Props } from "constants/index";

export const Button = (props: Props) => {
  const { children, ...others } = props;
  return (
    <button
      className="
      rounded-xl py-3 px-6 outline-2 outline-extra_light_purple
      w-full bg-gradient-to-br 
      text-lg
      from-extra_light_purple to-dark_purple
      via-light_purple text-white
      "
      {...others}
    >
      {children}
    </button>
  );
};

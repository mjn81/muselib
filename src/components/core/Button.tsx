import { Props } from "constants/index";

export const Button = (props: Props) => {
  const { children, ...others } = props;
  return (
    <button
      className="
      rounded-xl py-3 px-6 outline-2 outline-extra_light_purple
      w-full 
      text-lg
      bg-light_purple  text-white
      transition-all ease-in-out duration-200 
      hover:bg-purple-600
      "
      {...others}
    >
      {children}
    </button>
  );
};

import { Props } from "constants/index";
import { SideBar } from "./navs";

export const AppLayout = (props: Props) => {
  const { children } = props;

  return <div className="flex min-h-screen w-full bg-extra_dark_purple">
    <SideBar />
    
    <main className="bg-white flex-grow">

    {children}
    </main>
  </div>;
};

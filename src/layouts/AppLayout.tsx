import { Header } from "components";
import { Props } from "constants/index";
import { SideBar } from "./navs";

type ExteraProps = {
  title: string;
} & Props;

export const AppLayout = (props: ExteraProps) => {
  const { children, title } = props;

  return (
    <div className="flex min-h-screen w-full bg-extra_dark_purple">
      <SideBar />

      <main className="bg-white flex-grow p-8">
        <Header title={title} />

        {children}
      </main>
    </div>
  );
};

import { AppLayout } from "layouts";
import { NextPage } from "next";

import { TopArtSideBar } from "components";

const App: NextPage = () => {

  const ar = [
    {
      name: "artist 1",
    }
  ]
  return (
    <AppLayout title="home">
      <section className="flex space-x-2 h-full">
        <div className="flex-grow "></div>
        <aside className="w-[350px] ">
          <TopArtSideBar singers={ar} />
        </aside>
      </section>
    </AppLayout>
  );
};

export default App;

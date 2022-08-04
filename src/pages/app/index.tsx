import { AppLayout } from "layouts";
import { NextPage } from "next";
import { TopArtSideBar } from "components";
import { MockSingers } from "mock";

const App: NextPage = () => {

  return (
    <AppLayout title="home">
      <section className="flex space-x-2 h-full">
        <div className="flex-grow "></div>
        <aside className="w-[350px] ">
          <TopArtSideBar singers={MockSingers} />
        </aside>
      </section>
    </AppLayout>
  );
};

export default App;

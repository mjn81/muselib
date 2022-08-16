import { NextPage } from 'next';
import { AppSideBar, TopArtSideBar } from 'components';
import { AppLayout } from 'layouts';
import { MockSingers } from 'mock';
const App: NextPage = () => {
  return (
    <AppLayout title='home'>
      <AppSideBar>
        <TopArtSideBar singers={MockSingers} />
      </AppSideBar>
    </AppLayout>
  );
};

export default App;

import { AppLayout } from "layouts";
import { NextPage } from "next";
import { toast } from "react-toastify";
import { trpc } from "utils/trpc";

const App: NextPage = () => {

  return <AppLayout>hello world</AppLayout>;
}

export default App;
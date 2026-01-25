import Header from "./src/components/Header/header";
import { Outlet } from "react-router-dom";
import MasterMenu from "./src/components/MasterMenu/masterMenu";

const layout = () => {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <div className="sticky top-0 ">
        <Header />
      </div>
      <div className="flex-1 overflow-hidden flex flex-row">
        <div className="shrink-0">
          <MasterMenu />
        </div>
        <div className="flex-1 overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
export default layout;

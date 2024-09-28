import { NavigationBar } from "@/main/UI/NavigationBar";
import Sidebar from "@/main/UI/SideBar";
import BottomActions from "@Components/BottomActions/BottomActions";
import cn from "clsx";
import { PropsWithChildren } from "react";
import { useLocation } from "react-router-dom";

const bottomActionsPath = ["/order", "/admin"];

const MainLayout = ({ children }: PropsWithChildren) => {
  const { pathname } = useLocation();

  const isBottomActions = bottomActionsPath.some((path) =>
    pathname.startsWith(path)
  );

  return (
    <>
      <NavigationBar />
      <div className="sm:grid block" style={{ gridTemplateColumns: "1fr 4fr" }}>
        <div className="hidden sm:block">
          <Sidebar />
        </div>
        <main
          className={cn("py-5 min-h-screen", {
            "px-0": pathname.startsWith("/product"),
            "px-6": !pathname.startsWith("/product"),
          })}
        >
          {children}
        </main>
      </div>
      {!isBottomActions && <BottomActions />}
    </>
  );
};

export default MainLayout;

import { NavigationBar } from "@/main/UI/NavigationBar";
import Sidebar from "@/main/UI/SideBar";
import BottomActions from "@Components/BottomActions/BottomActions";
import cn from "clsx";
import { PropsWithChildren } from "react";
import { useLocation } from "react-router-dom";

const bottomActionsPath = ["/order", "/admin", "/about"];

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
          className={cn("min-h-screen", {
            "px-0": pathname.startsWith("/product"),
            "px-6": !pathname.startsWith("/product"),
            "py-5": isBottomActions,
            "pt-5 pb-36": !isBottomActions,
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

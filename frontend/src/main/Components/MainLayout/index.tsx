import { NavigationBar } from "@/main/UI/NavigationBar";
import Sidebar from "@/main/UI/SideBar";
import BottomActions from "@Components/BottomActions/BottomActions";
import cn from "clsx";
import { PropsWithChildren } from "react";
import { useLocation } from "react-router-dom";

const bottomActionsPath = [
  "/order",
  "/admin",
  "/about",
  "/company",
  "/profile",
];

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
          className={cn(
            "min-h-screen bg-default-50 border-l-1 border-t-1 border-gray sm:rounded-tl-3xl",
            {
              "px-0 pt-6 pb-40": pathname.startsWith("/product"),
              "px-6": !pathname.startsWith("/product"),
              "py-5": isBottomActions,
              "pt-5 pb-40":
                !isBottomActions && !pathname.startsWith("/product"),
            }
          )}
        >
          {children}
        </main>
      </div>
      {!isBottomActions && <BottomActions />}
    </>
  );
};

export default MainLayout;

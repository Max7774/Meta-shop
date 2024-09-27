import { NavigationBar } from "@/main/UI/NavigationBar";
import Sidebar from "@/main/UI/SideBar";
import cn from "clsx";
import { PropsWithChildren } from "react";
import { useLocation } from "react-router-dom";

const MainLayout = ({ children }: PropsWithChildren) => {
  const { pathname } = useLocation();

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
    </>
  );
};

export default MainLayout;

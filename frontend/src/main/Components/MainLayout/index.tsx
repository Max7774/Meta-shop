import { NavigationBar } from "@/main/UI/NavigationBar";
import Sidebar from "@/main/UI/SideBar";
import { PropsWithChildren } from "react";

const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <NavigationBar />
      <div className="sm:grid block" style={{ gridTemplateColumns: "1fr 4fr" }}>
        <div className="hidden sm:block">
          <Sidebar />
        </div>
        <main className="py-5 px-6 min-h-screen">{children}</main>
      </div>
    </>
  );
};

export default MainLayout;

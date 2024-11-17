import { NavigationBar } from "@/main/UI/NavigationBar";
import Sidebar from "@/main/UI/SideBar";
import BottomActions from "@Components/BottomActions/BottomActions";
import Footer from "@Components/Footer/Footer";
import { Chip } from "@nextui-org/react";
import cn from "clsx";
import { lazy, PropsWithChildren, Suspense } from "react";
import { useLocation } from "react-router-dom";

const BreadCrumbs = lazy(() => import("@Components/BreadCrumbs/BreadCrumbs"));

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
      <NavigationBar isBottomActions={isBottomActions} />
      <div className="sm:grid block" style={{ gridTemplateColumns: "1fr 4fr" }}>
        <div className="hidden sm:block">
          {/* <div className="flex flex-row">
        <div className="hidden sm:block w-1/5"> */}
          <Sidebar />
        </div>
        <main
          className={cn(
            "min-h-screen bg-default-50 sm:border-l-1 border-t-1 sm:border-b-1 border-gray sm:rounded-l-3xl w-full",
            {
              "px-0 pt-5 pb-72": pathname.startsWith("/product"),
              "px-6": !pathname.startsWith("/product"),
              "py-5": isBottomActions,
              "pt-5 pb-56":
                !isBottomActions && !pathname.startsWith("/product"),
            }
          )}
        >
          {!isBottomActions && pathname !== "/" && (
            <Suspense fallback={<Chip size="md" />}>
              <BreadCrumbs />
            </Suspense>
          )}
          {children}
        </main>
      </div>
      <div className="hidden sm:block">
        <Footer />
      </div>
      {!isBottomActions && <BottomActions />}
    </>
  );
};

export default MainLayout;

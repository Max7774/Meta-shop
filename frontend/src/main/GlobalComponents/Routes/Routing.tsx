import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { AUTH_ROLES_ROUTES, ROUTES } from "./data/routes";
import MainLayout from "@/main/Components/MainLayout";
import Loader from "@/main/UI/Loader";
import NotFound from "@/main/Screens/NotFound/NotFound";
import { ERoutes } from "@enums/ERoutes";
import Auth from "@/main/Screens/Auth/Auth";
import PrivateRoute from "../Providers/PrivateRoute";
import { GlOBAL_PREFIX } from "@/const/globalPrefix";
import { Claim } from "./data/components/root";

const Routing = () => {
  return (
    <Routes>
      <Route
        path={GlOBAL_PREFIX + ERoutes.CLAIM}
        element={
          <Suspense fallback={<Loader />}>
            <Claim />
          </Suspense>
        }
      />
      <Route path={GlOBAL_PREFIX + ERoutes.AUTH} element={<Auth />} />
      {Object.entries(AUTH_ROLES_ROUTES).map(
        ([
          key,
          {
            key: keyOfComponent,
            id: idOfComponent,
            another_routes,
            routes,
            Loader: AuthLoader,
            role,
          },
        ]) => (
          <Route path={key} key={key}>
            <Route
              key={idOfComponent}
              element={<PrivateRoute currentRole={role} />}
            >
              <Route
                key={keyOfComponent}
                id={idOfComponent}
                path={another_routes}
                element={
                  <MainLayout>
                    <NotFound />
                  </MainLayout>
                }
              />
              {routes.map(({ id, path, component: Component }) => (
                <Route
                  key={id}
                  id={id}
                  path={path}
                  element={
                    <MainLayout>
                      <Suspense fallback={AuthLoader && <AuthLoader />}>
                        <Component />
                      </Suspense>
                    </MainLayout>
                  }
                />
              ))}
            </Route>
          </Route>
        )
      )}
      {Object.entries(ROUTES).map(
        ([
          key,
          { key: keyOfComponent, id: idOfComponent, another_routes, routes },
        ]) => (
          <Route path={key} key={key}>
            <Route key={idOfComponent}>
              <Route
                key={keyOfComponent}
                id={idOfComponent}
                path={another_routes}
                element={
                  <MainLayout>
                    <NotFound />
                  </MainLayout>
                }
              />
              {routes.map(({ id, path, component: Component }) => (
                <Route
                  key={id}
                  id={id}
                  path={path}
                  element={
                    <MainLayout>
                      <Suspense fallback={<Loader />}>
                        <Component />
                      </Suspense>
                    </MainLayout>
                  }
                />
              ))}
            </Route>
          </Route>
        )
      )}
    </Routes>
  );
};

export default Routing;

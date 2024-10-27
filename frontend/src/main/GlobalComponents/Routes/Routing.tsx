import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { ADMIN_ROUTES_DATA, COMPANY_ROUTES_DATA, ROUTES } from "./data/routes";
import MainLayout from "@/main/Components/MainLayout";
import Loader from "@/main/UI/Loader";
import NotFound from "@/main/Screens/NotFound/NotFound";
import { ERoutes } from "@enums/ERoutes";
import Auth from "@/main/Screens/Auth/Auth";
import PrivateRoute from "../Providers/PrivateRoute";
import { GlOBAL_PREFIX } from "@/const/globalPrefix";

const Routing = () => {
  return (
    <Routes>
      <Route path={GlOBAL_PREFIX + ERoutes.AUTH} element={<Auth />} />
      {Object.entries(ADMIN_ROUTES_DATA).map(
        ([
          key,
          {
            key: keyOfComponent,
            id: idOfComponent,
            another_routes,
            routes,
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
      {Object.entries(COMPANY_ROUTES_DATA).map(
        ([
          key,
          {
            key: keyOfComponent,
            id: idOfComponent,
            another_routes,
            routes,
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

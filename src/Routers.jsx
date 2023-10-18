import { Routes, Route } from "react-router-dom";
import { PrivateRoute, SignInPage } from "./auth";
import { ConversationsListPage } from "./conversations";

const routes = [
  {
    path: "/sign-in",
    Component: SignInPage,
  },
  {
    path: "/",
    private: true,
    Component: ConversationsListPage,
  },
];

export const Routers = ({ isLoading, user }) => {
  return (
    <Routes>
      {routes.map((route, index) => {
        if (route.private) {
          return (
            <Route
              key={index}
              path={route.path}
              element={<PrivateRoute isLoading={isLoading} isAuthed={!!user} />}
            >
              <Route path={route.path} element={<route.Component />} />
            </Route>
          );
        } else {
          return (
            <Route
              key={index}
              path={route.path}
              element={<route.Component />}
            />
          );
        }
      })}
    </Routes>
  );
};

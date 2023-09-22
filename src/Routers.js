import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const routes = [];

export const Routers = () => (
  <Router>
    <Routes>
      {routes.map((route, index) => (
        <Route key={index} path={route.path} exact={route.exact}>
          <route.element />
        </Route>
      ))}
    </Routes>
  </Router>
);

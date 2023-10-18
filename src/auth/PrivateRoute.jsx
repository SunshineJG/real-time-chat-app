import { Navigate, Outlet } from "react-router-dom";

export const PrivateRoute = ({ isLoading, isAuthed }) => {
  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (!isAuthed) {
    return <Navigate to="/sign-in" />;
  }

  return <Outlet />;
};

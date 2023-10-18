import { BrowserRouter as Router } from "react-router-dom";
import { Routers } from "./Routers";
import { useUser } from "./auth";
import { NavBar } from "./navigation";

function App() {
  const { isLoading, user } = useUser();

  return (
    <Router>
      <NavBar user={user} />
      <Routers isLoading={isLoading} user={user} />
    </Router>
  );
}

export default App;

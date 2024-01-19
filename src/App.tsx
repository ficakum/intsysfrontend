import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import { ROUTES } from "./constants/routes";
import Auth from "./pages/Auth";
import Welcome from "./pages/Welcome";
import Header from "./components/Header";
import "./App.css"

function App() {
  return (
    <div className="main-div">
      <Header />
      <Router>
        <Routes>
          <Route path={ROUTES.AUTH.PATH} element={<Auth />} />

          <Route path={ROUTES.WELCOME.PATH} element={<Welcome />} />

          {/* wild route*/}
          <Route
            path="*"
            element={<Navigate to={ROUTES.AUTH.PATH} replace />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

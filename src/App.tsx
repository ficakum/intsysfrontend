import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import { ROUTES } from "./constants/routes";
import Auth from "./pages/Auth";
import Welcome from "./pages/Welcome";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path={ROUTES.AUTH.PATH} element={<Auth />} />

          <Route path={ROUTES.WELCOME.PATH} element={<Welcome />} />

          {/* <Route
            path={`${ROUTES.PORTAL.PATH}/*`}
            element={
              <TeamsProvider>
                <Private />
                <Footer />
              </TeamsProvider>
            }>
            <Route index element={<Portal />} />

            <Route path={ROUTES.FINANCIALS.PATH} element={<Financials />} />

            <Route
              path={`${ROUTES.PORTAL.PATH}/*`}
              element={<Navigate to={ROUTES.PORTAL.PATH} replace />}
            />
          </Route> */}

          {/* wild route*/}
          <Route
            path="*"
            element={<Navigate to={ROUTES.AUTH.PATH} replace />}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;

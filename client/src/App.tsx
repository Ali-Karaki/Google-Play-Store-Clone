import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import AuthCheck from "./components/auth/AuthChecker";
import FilteringNavBar from "./components/filteringNavBar/FilteringNavBar";
import NavBar from "./components/navbar/NavBar";
import Footer from "./components/footer/Footer"
import routes from "./config/routes";
import { checkTokenExpiration } from "./services/auth.service";

function App() {
  checkTokenExpiration();
  return (
    <>
      <BrowserRouter>
        <Routes>
          {routes.map((route) => (
            <Route
              key={route.name}
              path={route.path}
              element={
                route.protected ? (
                  <>
                    <AuthCheck>
                      <NavBar />
                      {!route.path.includes("admin") &&
                        !route.path.includes("view") && <FilteringNavBar />}
                      <route.component />
                      <Footer />
                    </AuthCheck>
                  </>
                ) : (
                  <>
                    <route.component />
                  </>
                )
              }
            />
          ))}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

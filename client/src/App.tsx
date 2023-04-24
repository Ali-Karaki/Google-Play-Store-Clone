import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import AuthCheck from "./components/auth/AuthChecker";
import FilteringNavBar from "./components/filteringNavBar/FilteringNavBar";
import NavBar from "./components/navbar/NavBar";
import routes from "./config/routes";
import { checkTokenExpiration } from "./services/auth.service";

function App() {
  const noNavBar = ["admin", "view", "wishlist"];
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
                      {!noNavBar.some((path) => route.path.includes(path)) && (
                        <FilteringNavBar />
                      )}
                      <route.component />
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

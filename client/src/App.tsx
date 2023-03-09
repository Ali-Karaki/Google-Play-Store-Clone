import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import AuthCheck from "./components/auth/AuthChecker";
import NavBar from "./components/navbar/NavBar";
import routes from "./config/routes";

function App() {
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

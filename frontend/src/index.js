import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { HashRouter, Routes, Route } from "react-router-dom";
import RoomDetails from "./pages/RoomDetails";
import { UserProvider } from "./context/userContext";
import UserAuth from "./auth/UserAuth";
import Login from "./comps/Login";
import Cashout from "./pages/Cashout";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <UserProvider>
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />}></Route>
        <Route
          path="/login"
          element={
            <UserAuth>
              {" "}
              <Login />{" "}
            </UserAuth>
          }
        />
        <Route path="/room/:id" element={<RoomDetails />}></Route>
        <Route
          path="/room/:id/cashout"
          element={
            <UserAuth>
              {" "}
              <Cashout />{" "}
            </UserAuth>
          }
        ></Route>
      </Routes>
    </HashRouter>
  </UserProvider>
);

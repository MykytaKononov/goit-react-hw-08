import React from "react";
import { Outlet } from "react-router-dom";
import { AppBar } from "../AppBar/AppBar";

export const Layout = () => {
  return (
    <div>
      <AppBar />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navigation from "./pages/Auth/Navigation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminMenu from "./pages/Admin/AdminMenu";

function App() {
  return (
    <>
      <ToastContainer />
      <Navigation />
      
      <main className="py-3">
      {/* <AdminMenu/> */}
        <Outlet />
      </main>
    </>
  );
}

export default App;

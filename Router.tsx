import { HashRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Login } from "./src/pages/login";

export function Router() {
  return (
    <main>
      <ToastContainer
        newestOnTop
        autoClose={2000}
        hideProgressBar={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        style={{
          width: "30%",
          marginTop: "60px",
          textAlign: "center",
          zIndex: 3500,
        }}
      />
      <HashRouter>
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
      </HashRouter>
    </main>
  );
}

import { HashRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Login } from "./src/pages/login";
import { Inicio } from "./src/pages/Home/inicio";
import { ProtectedRoute } from "./src/config/protectedRoute";
import { VideosEducacional } from "./src/pages/Home/videos_educacional";

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
          <Route
            path="/inicio"
            element={
              <ProtectedRoute>
                <Inicio />
              </ProtectedRoute>
            }
          />
          <Route
            path="/videoseducacional"
            element={
              <ProtectedRoute>
                <VideosEducacional />
              </ProtectedRoute>
            }
          />
        </Routes>
      </HashRouter>
    </main>
  );
}

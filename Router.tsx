// @ts-nocheck
import NavLogin from "./src/pages/login";
import ProtectedRoute from "./src/config/protectedRoute";

import { HashRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Inicio } from "./src/pages/Home/inicio";
import { VideosEducacional } from "./src/pages/Home/videos_educacional";
import { Agendamento } from "./src/pages/Home/agendamento";
import { NovaSenha } from "./src/pages/Home/novaSenha";
import { Confirmacao } from "./src/pages/Home/confirmacao";

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
          <Route path="/" element={<NavLogin />} />
          <Route path="/novasenha/:token" element={<NovaSenha />} />
          <Route path="/confirmacao/:token" element={<Confirmacao />} />

          <Route
            path="/inicio"
            element={<ProtectedRoute component={Inicio} />}
          />
          <Route
            path="/videoseducacional"
            element={<ProtectedRoute component={VideosEducacional} />}
          />
          <Route
            path="/agendamento"
            element={<ProtectedRoute component={Agendamento} />}
          />
        </Routes>
      </HashRouter>
    </main>
  );
}

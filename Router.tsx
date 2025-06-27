// @ts-nocheck
import NavLogin from "./src/pages/login";
import ProtectedRoute from "./src/config/protectedRoute";

import { HashRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Inicio } from "./src/pages/Home/inicio";
import { VideosEducacional } from "./src/pages/Home/videos_educacional";
import { Fornecedores } from "./src/pages/Home/fornecedores";
import { NovaSenha } from "./src/pages/Home/novaSenha";
import { Confirmacao } from "./src/pages/Home/confirmacao";
import { VideoInfo, VideosInfo } from "./src/pages/Home/video_info";
import PrivacyPolicy from "./src/pages/Home/privacy";
import BeginPage from "./src/pages/Home/home";

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

          <Route path="/home" element={<BeginPage />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />

          <Route
            path="/start"
            element={<ProtectedRoute component={Inicio} />}
          />
          <Route
            path="/pedagogiskvideo"
            element={<ProtectedRoute component={VideosEducacional} />}
          />
          <Route
            path="/videoinfo"
            element={<ProtectedRoute component={VideoInfo} />}
          />
          <Route
            path="/fornecedores"
            element={<ProtectedRoute component={Fornecedores} />}
          />
          <Route
            path="/produtos"
            element={<ProtectedRoute component={Produtos} />}
          />
        </Routes>
      </HashRouter>
    </main>
  );
}

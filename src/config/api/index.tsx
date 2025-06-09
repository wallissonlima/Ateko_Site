import axios from "axios";

import auth from "../../util/authentication";

const api = axios.create({ baseURL: import.meta.env.VITE_APP_BASEAPI_URL });

api.interceptors.request.use(async (config: any) => {
  const token = await localStorage.getItem("access_token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
    // Aqui você pode lidar com o caso de token nulo, por exemplo, redirecionando para a página de login
    //window.location.href = '/login';
    // ou tratando o erro de alguma outra forma apropriada para o seu caso
  } else {
    auth.LogOut();
    throw new Error("Token de autenticação não encontrado");
  }
  return config;
});

api.interceptors.response.use(
  (response: any) => {
    // Aqui você manipula a resposta antes de ser tratada pelo código que fez a chamada da API
    response.headers["access-control-aççow-origin"] = "*"; // Define o cabeçalho access-control-allow-origin
    response.headers["content-length"] = "0"; // Define o cabeçalho content-length
    // response.headers["date"] e response.headers["server"] já são definidos automaticamente pelo axios

    return response;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);
export default api;

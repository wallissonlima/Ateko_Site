import moment from "moment";

const auth = {
  isAuth: false,
  async check() {
    try {
      const token = localStorage.getItem("access_token");
      const expire_date: any = localStorage.getItem(".expires");
      if (token) {
        var dt = new Date(expire_date);
        var dataAtual = new Date(moment().valueOf());

        if (dataAtual > dt) {
          return (this.isAuth = false);
        }
        return (this.isAuth = true);
      } else {
        return (this.isAuth = false);
      }
    } catch (error) {
      return (this.isAuth = false);
    }
  },
  async Login(
    token: string,
    time: any,
    nomeUsuario: string,
    idEmpresa: string,
    tipousuario: string
  ) {
    await localStorage.setItem("access_token", token);
    await localStorage.setItem(".expires", time);
    await localStorage.setItem("nomeUsuario", nomeUsuario);
    await localStorage.setItem("idEmpresa", idEmpresa);
    await localStorage.setItem("tipoUsuario", tipousuario);

    window.location.reload();
  },
  async LogOut() {
    try {
      await localStorage.clear();
      window.location.reload();
    } catch (error) {
      console.debug(error);
    }
  },
};
export default auth;

import {
  Context,
  CustomButton,
  CustomSenha,
  CustonCheck,
  FromCotainer,
  Summary,
} from "./styles";
import logoKings from "../../assets/logoEmpresateste.png";
import logoAteko from "../../assets/AtekoLogo.png";
import { Eye, EyeSlash, User } from "phosphor-react";
import { useEffect, useState } from "react";
import axios from "axios";
import uri_header from "../../config/uri_header.json";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Input, Label } from "reactstrap";
import React from "react";

interface iUser {
  bruker: string;
  passord: string;
}
export function Login() {
  const navigate = useNavigate();
  const token = localStorage.getItem("access_token");
  const [user, setUser] = useState<iUser>({
    bruker: "",
    passord: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  // Inicia os dados do formulário com o e-mail e senha armazenados, se existirem
  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    const storedPassword = localStorage.getItem("passord");
    const storedRememberMe = localStorage.getItem("rememberMe") === "true";

    if (storedRememberMe) {
      setUser({ bruker: storedEmail || "", passord: storedPassword || "" });
      setRememberMe(true);
    }
  }, []);

  //Fazer login
  const ax = axios.create({ baseURL: import.meta.env.VITE_APP_BASEAPI_URL });
  const _logIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // console.log(user);
    try {
      const login = await ax.post("/Account/Adgang", user, {
        headers: uri_header,
      });

      if (login.data) {
        const token = login.data.token; // Verifique onde o token é retornado
        localStorage.setItem("access_token", token); // Armazena o token no localStorage
        toast.success("Login realizado com sucesso!", { autoClose: 1000 });

        // Limpar os campos após o login
        setUser({ bruker: "", passord: "" });
        setRememberMe(false); // Opcional: resetar a opção de "lembrar-me"

        navigate("/inicio", { replace: true });
      }
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        toast.error("Email ou senha incorretos. Tente novamente.", {
          autoClose: 2000,
        });
      } else {
        toast.error("Erro ao tentar realizar login. Tente mais tarde.", {
          autoClose: 2000,
        });
      }
    }
  };
  // Mostrar ou esconder a senha
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Atualizar a opção de "Lembrar-me"
  const handleRememberLogin = () => {
    if (rememberMe) {
      localStorage.setItem("email", user.bruker);
      localStorage.setItem("passord", user.passord);
      localStorage.setItem("rememberMe", "true");
    } else {
      localStorage.removeItem("email");
      localStorage.removeItem("passord");
      localStorage.removeItem("rememberMe");
    }
  };

  // Redirecionar para a página principal se já estiver logado
  useEffect(() => {
    if (token) {
      navigate("/", { replace: true });
    }
  }, [token]);

  return (
    <Context>
      <Summary>
        {/* <User size={90} /> */}
        {/* <h1>Adgang</h1> */}
      </Summary>
      <FromCotainer>
        <img src={logoAteko} alt="Logo Tipo" />
        <form onSubmit={_logIn}>
          <input
            className="input"
            type="text"
            id="email"
            placeholder="Email"
            required
            value={user.bruker}
            onChange={(e: any) =>
              setUser((prevState: any) => ({
                ...prevState,
                bruker: e.target.value.toUpperCase(),
              }))
            }
            style={{ display: "flex", justifyContent: "center" }}
          />
          <div style={{ position: "relative", width: "300px" }}>
            <input
              className="input"
              type={showPassword ? "text" : "password"}
              id="passord"
              placeholder="Senha"
              required
              value={user.passord}
              onChange={(e: any) =>
                setUser((prevState: any) => ({
                  ...prevState,
                  passord: e.target.value,
                }))
              }
              style={{ display: "flex", justifyContent: "center" }}
            />
            <span
              onClick={togglePasswordVisibility}
              style={{
                position: "absolute",
                right: "30px",
                top: "50%",
                transform: "translateY(-50%)",
                cursor: "pointer",
              }}
            >
              {showPassword ? <EyeSlash size={20} /> : <Eye size={20} />}
            </span>
          </div>
          <CustomSenha>
            <CustonCheck>
              <Label className="form-check-label">Minn meg på det</Label>
              <Input
                className="inputCheck"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
            </CustonCheck>

            {/* <a type="submit" style={{ color: "white" }}>
            Glemt passordet ditt?
            </a> */}
          </CustomSenha>

          <CustomButton>
            <button type="submit" onClick={handleRememberLogin}>
              Å gå inn
            </button>
          </CustomButton>
        </form>
      </FromCotainer>

      <div className="footer">
        <div>
          <img className="logKings" src={logoKings} alt="Logo Tipo" />
        </div>
        <div>
          <footer>
            {" "}
            Painel do app &copy; Ateko - The Green Line -{" "}
            {new Date().getUTCFullYear()}
          </footer>
        </div>
      </div>
    </Context>
  );
}

import styled from "styled-components";
import logo from "../../assets/teste.jpg";
import * as Dialog from "@radix-ui/react-dialog";

export const Context = styled.div`
  width: 100%;
  min-height: 100vh;
  padding: 5px;
  background: ${(props) => props.theme["gray-100"]};
  display: flex;
  flex-direction: column;

  img {
    width: 15rem;
    padding: 0.5rem;

    @media (max-width: 768px) {
      width: 10rem;
    }

    @media (max-width: 480px) {
      width: 8rem;
    }
  }

  .logKings {
    width: 6rem;

    @media (max-width: 768px) {
      width: 4rem;
    }
  }

  .footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: small;
    color: ${(props) => props.theme["green-500"]};
    margin-top: auto; /* empurra o footer para o final */
    padding: 10px;

    /* Faz o footer ser responsivo */
    flex-wrap: wrap;
    gap: 10px;
    text-align: center;

    @media (max-width: 768px) {
      flex-direction: column;
    }
  }
`;

export const Summary = styled.summary`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding: 2% 0;
  margin-top: 1px;
`;

export const FromCotainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  max-width: 25rem;
  height: 22rem;
  margin: 0 auto;
  background-color: rgb(44, 46, 17, 0.2);

  border-radius: 10px;
  padding: 1rem;

  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  input {
    box-sizing: border-box; /* Inclui padding e border nas dimensões totais */
    width: 280px; /* Definindo uma largura específica */
    height: 25px;
    padding: 1rem; /* Mantendo o padding */
    margin: 5px auto; /* Espaçamento entre os campos */
    font-weight: bold;
    border: 1px solid rgba(255, 255, 255, 0.5); /* Borda quase transparente */
    background-color: rgba(255, 255, 255, 0.5); /* Fundo quase transparente */
    color: ${(props) => props.theme["green-500"]}; /* Cor do texto */
    border-radius: 20px; /* Arredondamento das bordas */
    outline: none;
    text-align: center;

    ::placeholder {
      color: #000000; /* Cor preta para o placeholder */
    }
  }

  button {
    width: 140px;
    padding: 12px;
    margin-top: -2px;
    font-size: 1.2em;
    background: ${(props) => props.theme["green-300"]};
    color: ${(props) => props.theme.white};
    font-weight: bold;
    border: none;
    border-radius: 15px;
    cursor: pointer;

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
    &:not(:disabled):hover {
      background: ${(props) => props.theme["green-400"]};
      transition: background-color 0.2s;
    }
  }
`;

export const CustomSenha = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  a {
    font-size: 90%;
    font-weight: bold;
  }
`;
export const CustonCheck = styled.div`
  display: flex;
  /* align-items: end; */
  flex-direction: row-reverse;
  width: 8rem;

  .form-check-label {
    color: white;
    font-size: 90%;
    font-weight: bold;
  }

  .inputCheck {
    width: 1.5rem; /* Tamanho maior para a caixa de seleção */
    height: 1.5rem; /* Tamanho igual à largura para manter a proporção */
    padding: 0; /* Remove o padding, pois não é necessário */
    border-radius: 0.25rem; /* Deixa os cantos arredondados */
    border: 2px solid ${(props) => props.theme["green-300"]}; /* Borda de cor azul */
    transition:
      background-color 0.3s,
      border-color 0.3s;
  }
  .inputCheck:checked {
    background-color: ${(props) =>
      props.theme["green-400"]}; /* Cor de fundo quando marcado */
    border-color: ${(props) =>
      props.theme["green-500"]}; //Cor de borda quando marcado
  }
`;

export const CustomButton = styled.div`
  display: flex;
  justify-content: center;
`;
export const CunstomButtonSenha = styled.div`
  color: white;
  background: "none";
  border: "none";
  padding: 0;
  text-decoration: "underline";
  cursor: "pointer";
  font-weight: bold;
`;

export const Overlay = styled(Dialog.Overlay)`
  position: fixed;
  width: 100w;
  height: 100vh;
  inset: 0;
  background: rgba(0, 0, 0, 0.75);
`;

export const Content = styled(Dialog.Content)`
  min-width: 28rem;
  border-radius: 8px;
  padding: 0.5rem 3rem;
  background-color: rgba(0, 0, 0, 0.5); /* Fundo quase transparente */

  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  form {
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;

    input {
      border-radius: 6px;
      border: 0;
      background: ${(props) => props.theme.white};
      color: ${(props) => props.theme["gray-300"]};
      padding: 1rem;

      &::placeholder {
        color: ${(props) => props.theme["gray-500"]};
      }
    }
    .Buttonregistro {
      display: flex;
      justify-content: flex-end;
    }
    button {
      width: 100px;
      padding: 10px;
      margin-top: -2px;
      font-size: 1.2em;
      background: ${(props) => props.theme["green-300"]};
      color: ${(props) => props.theme.white};
      font-weight: bold;
      border: none;
      border-radius: 15px;
      cursor: pointer;

      &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }

      &:not(:disabled):hover {
        background: ${(props) => props.theme["green-400"]};
        transition: background-color 0.2s;
      }
    }
  }
`;
export const CloseButton = styled(Dialog.Close)`
  position: absolute;
  background: transparent;
  border: 0;
  top: 0.7rem;
  right: 1rem;
  line-height: 0;
  cursor: pointer;
  color: ${(props) => props.theme["gray-500"]};
`;
export const Title = styled(Dialog.Title)`
  color: white;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: bold;
`;

import styled from 'styled-components';
import logo from '../../assets/teste.jpg';
// import * as Dialog from '@radix-ui/react-dialog';

export const Context = styled.div`
  height: 100vh; /* Garante altura igual à da viewport */
  width: 100%; /* Garante que ocupa toda a largura */
  position: relative;
  background-image: url(${logo});
  background-repeat: no-repeat;
  background-size: cover;

  img {
    width: 8rem;
    /* padding-inline-start: 1rem; */
    padding: 0.5rem;
  }
  .footer {
    font-size: small;
    margin-top: 2rem;
    color: ${(props) => props.theme['green-500']};
    position: absolute; /* Garante que fique no rodapé */
    bottom: 10px;
    right: 10px; /* Alinha ao canto inferior direito */
  }
`;

export const Summary = styled.summary`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding: 1px 0;
  margin-top: 13px;

  color: rgb(44, 46, 17, 0.5);
`;

export const FromCotainer = styled.div`
  display: flex;
  justify-content: center;
  max-width: 22rem;
  margin: 0 auto;
  background-color: rgb(44, 46, 17, 0.5);

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
    padding: 1rem; /* Mantendo o padding */
    margin: 5px auto; /* Espaçamento entre os campos */
    font-weight: bold;
    border: 1px solid rgba(255, 255, 255, 0.5); /* Borda quase transparente */
    background-color: rgba(255, 255, 255, 0.5); /* Fundo quase transparente */
    color: ${(props) => props.theme['green-500']}; /* Cor do texto */
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
    background: ${(props) => props.theme['green-300']};
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
      background: ${(props) => props.theme['green-400']};
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
    border: 2px solid ${(props) => props.theme['green-300']}; /* Borda de cor azul */
    transition: background-color 0.3s, border-color 0.3s;
  }
  .inputCheck:checked {
    background-color: ${(props) => props.theme['green-400']}; /* Cor de fundo quando marcado */
    border-color: ${(props) => props.theme['green-500']}; //Cor de borda quando marcado
  }
`;

export const CustomButton = styled.div`
  display: flex;
  justify-content: center;
`;
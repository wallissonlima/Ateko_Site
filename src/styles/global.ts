import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    html, body {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%; /* Garante que ocupem toda a altura */
    /* overflow: hidden; //Remove barras de rolagem */
  }

    body, input, textarea, button{
        font: 400 1rem Roboto, sans-serif;
    }

    #root {
    height: 100%; /* Garante que o React ocupe toda a tela */
  }

`;

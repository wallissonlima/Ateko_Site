import React from "react";
import "./SinglePage.css";

const BeginPage: React.FC = () => {
  return (
    <div className="begin-container">
      <div className="glass-panel">
        <h1>🧬 Ateko</h1>
        <p className="intro-text">
          Proteja sua casa ou empresa contra umidade com o aplicativo Ateko!
        </p>
        <div className="info-section">
          <h2>🌫️ O que é o Ateko?</h2>
          <p>
            O Ateko é um aplicativo de monitoramento inteligente que detecta
            problemas de umidade em tempo real. Com sensores e inteligência
            artificial, ele alerta você sobre condições que podem causar mofo,
            infiltrações ou danos à estrutura, oferecendo soluções
            personalizadas para proteger seu ambiente.
          </p>
        </div>
        <div className="info-section">
          <h2>📡 Como funciona?</h2>
          <ul>
            <li>Monitora umidade, temperatura e CO₂ em tempo real.</li>
            <li>
              Envia alertas automáticos sobre riscos de mofo ou infiltrações.
            </li>
            <li>Oferece recomendações baseadas em IA para prevenir danos.</li>
            <li>Integra-se com as soluções de impermeabilização da Ateko.</li>
          </ul>
        </div>
        <div className="info-section">
          <h2>🛡️ Por que usar?</h2>
          <ul>
            <li>Previna doenças respiratórias causadas por mofo.</li>
            <li>Proteja móveis, paredes e equipamentos contra danos.</li>
            <li>
              Economize com manutenção preventiva e controle total do ambiente.
            </li>
          </ul>
        </div>
        <div className="info-section">
          <h2>🏢 Sobre a Ateko</h2>
          <p>
            Com mais de 40 anos de experiência, a Ateko é líder em soluções
            contra umidade em edifícios. Nossos produtos, como Controll®,
            Penetron e Xypex, garantem proteção duradoura.{" "}
            <a href="/sobre">Saiba mais</a>.
          </p>
        </div>
      </div>
      <footer className="footer">
        <p>
          <a
            href="https://atekoconfig.kingssoftware.com.br/#/privacy"
            target="_blank"
            rel="noopener noreferrer"
          >
            Política de Privacidade
          </a>
        </p>
      </footer>
    </div>
  );
};

export default BeginPage;

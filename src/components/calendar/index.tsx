// CalendarPage.jsx
import React, { useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format } from "date-fns/format";
import { parse } from "date-fns/parse";
import { startOfWeek } from "date-fns/startOfWeek";
import { getDay } from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { ptBR } from "date-fns/locale";

// Configuração do localizador para datas
const locales = {
  "pt-BR": ptBR,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const CalendarPage = () => {
  const [eventos, setEventos] = useState([
    {
      title: "Reunião com o cliente",
      start: new Date(2025, 4, 10, 10, 0),
      end: new Date(2025, 4, 10, 11, 0),
    },
    {
      title: "Plantio de soja",
      start: new Date(2025, 4, 15, 8, 0),
      end: new Date(2025, 4, 15, 12, 0),
    },
  ]);

  return (
    <div style={{ height: "80vh", padding: "20px" }}>
      <h2 style={{ fontWeight: "bord" }}>Agenda Mensal</h2>
      <Calendar
        localizer={localizer}
        events={eventos}
        startAccessor="start"
        endAccessor="end"
        style={{
          height: "100%",
          border: "1px solid #000000",
          borderRadius: "5px",
          color: "#000000",
          backgroundColor: "#fcf9f9d5",
        }}
        views={["month"]}
        messages={{ month: "Mês" }}
      />
    </div>
  );
};

export default CalendarPage;

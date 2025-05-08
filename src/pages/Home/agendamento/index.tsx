import CalendarPage from "../../../components/calendar";
import { Header } from "../../../components/Header";
import { Context } from "./styles";

export function Agendamento() {
  return (
    <>
      <Header />
      <Context>
        <CalendarPage />
      </Context>
    </>
  );
}

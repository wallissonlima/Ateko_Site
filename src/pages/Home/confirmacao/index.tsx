import { Button, Input, Label, Row } from "reactstrap";
import { Context, CustomFormGrup } from "./styles";

export const Confirmacao = () => {
  return (
    <>
      <Context>
        <Row>
          <CustomFormGrup>
            <h2>
              Brukeren ble autentisert med suksess! <br />
              Klikk på OK for å bli omdirigert til applikasjonen.
            </h2>

            <div>
              <Button>Omdirigere</Button>
            </div>
          </CustomFormGrup>
        </Row>
      </Context>
    </>
  );
};

import { Button, Input, Label, Row } from "reactstrap";
import { Context, CustomFormGrup } from "./styles";

export const NovaSenha = () => {
  return (
    <>
      <Context>
        <Row>
          <CustomFormGrup>
            <Label>Adgangskode:</Label>
            <Input required name="nome" type="text" maxLength={50} />
            <Label>Gentag adgangskoden:</Label>
            <Input required name="nome" type="text" maxLength={50} />
            <div>
              <Button>at ændre</Button>
            </div>
          </CustomFormGrup>
        </Row>
      </Context>
    </>
  );
};

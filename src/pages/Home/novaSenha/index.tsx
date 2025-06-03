import { Input, Label } from "reactstrap";
import { Context, CustomFormGrup } from "./styles";

export const NovaSenha = () => {
  return (
    <>
      <Context>
        <div>
          <CustomFormGrup>
            <Label>Senha:</Label>
            <Input required name="nome" type="text" maxLength={50} />
            <Label>Repetir senha:</Label>
            <Input required name="nome" type="text" maxLength={50} />
          </CustomFormGrup>
        </div>
      </Context>
    </>
  );
};

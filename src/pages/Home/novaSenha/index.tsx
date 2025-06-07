import api from "../../../config/api";
import axios from "axios";

import { Button, Input, Label, Row } from "reactstrap";
import { Context, CustomFormGrup } from "./styles";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { z } from "zod";

const ax = axios.create({ baseURL: import.meta.env.VITE_APP_BASEAPI_URL });

// Define the Zod schema for validation
const AtualizacaoSchema = z
  .object({
    epost: z
      .string()
      .email("Skriv inn en gyldig e-postadresse")
      .min(1, "E-post er påkrevd"),
    passord: z
      .string()
      .min(8, "Passordet må ha minst 8 tegn")
      .min(1, "Passord er påkrevd")
      .regex(
        /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/,
        "Passordet må inneholde minst én stor bokstav, ett tall og ett spesialtegn"
      ),
    confirm: z.string().min(1, "Bekreftelse av passord er påkrevd"),
    token: z.string(),
  })
  .refine((data) => data.passord === data.confirm, {
    message: "Passordene stemmer ikke overens",
    path: ["confirm"],
  });

// Infer the TypeScript type from the schema
type iAtualizacao = z.infer<typeof AtualizacaoSchema>;

// Type for form errors
type FormErrors = Partial<Record<keyof iAtualizacao, string>>;

export const NovaSenha = () => {
  const { token } = useParams<{ token: string }>(); // Capture token from URL

  const [atualizar, setAtualizar] = useState<iAtualizacao>({
    epost: "",
    passord: "",
    confirm: "",
    token: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});

  // Handle input changes
  const atualizacao_do_input = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAtualizar((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    // Clear error for the field being edited
    setErrors((prev) => ({ ...prev, [e.target.name]: undefined }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      AtualizacaoSchema.parse(atualizar);
      setErrors({});

      /// Aqui será gerado uma cópia do objeto atualizar, removenddo o campo confirm, incluindo o token da URL.
      const { confirm, ...formulario } = atualizar;
      if (token) {
        formulario.token = token;
      }

      /// Aqui será encaminha para API os dados para atualização dos dados informados no formulario.
      const resp = await ax.put("/Account/OppdateringAvPassord", formulario);

      console.log(resp);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const formattedErrors: FormErrors = {};
        error.errors.forEach((err) => {
          const path = err.path[0] as keyof iAtualizacao;
          formattedErrors[path] = err.message;
        });
        setErrors(formattedErrors);
      }
    }
  };

  return (
    <Context>
      <Row>
        <CustomFormGrup>
          <form onSubmit={handleSubmit}>
            <div
              style={{
                display: "flex",
                justifyContent: "end",
                padding: "2%",
                flexDirection: "column",
              }}
            >
              <Label>Epost :</Label>
              <Input
                required
                name="epost"
                type="email"
                maxLength={100}
                onChange={atualizacao_do_input}
                value={atualizar.epost}
              />
              {errors.epost && (
                <span style={{ color: "red" }}>{errors.epost}</span>
              )}
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "end",
                padding: "2%",
                flexDirection: "column",
              }}
            >
              <Label>Adgangskode :</Label>
              <Input
                required
                name="passord"
                type="password"
                maxLength={100}
                onChange={atualizacao_do_input}
                value={atualizar.passord}
              />
              {errors.passord && (
                <span style={{ color: "red" }}>{errors.passord}</span>
              )}
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "end",
                padding: "2%",
                flexDirection: "column",
              }}
            >
              <Label>Gentag adgangskoden :</Label>
              <Input
                required
                name="confirm"
                type="password"
                maxLength={100}
                onChange={atualizacao_do_input}
                value={atualizar.confirm}
              />
              {errors.confirm && (
                <span style={{ color: "red" }}>{errors.confirm}</span>
              )}
            </div>

            <div>
              <Button type="submit">at ændre</Button>
            </div>
          </form>
        </CustomFormGrup>
      </Row>
    </Context>
  );
};

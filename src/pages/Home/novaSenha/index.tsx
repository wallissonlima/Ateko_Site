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
  const [isAlterPassord, setIsAlterPassord] = useState<boolean>(false);

  // Handle input changes
  const atualizacao_do_input = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAtualizar((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setErrors((prev) => ({ ...prev, [e.target.name]: undefined }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      AtualizacaoSchema.parse(atualizar);
      setErrors({});

      const { confirm, ...formulario } = atualizar;
      if (token) {
        formulario.token = token;
      }

      const resp = await ax.put("/Account/OppdateringAvPassord", formulario);

      if (resp.data === "Passordet ble oppdatert med suksess.") {
        setIsAlterPassord(true);
      } else {
        alert("En feil oppstod: " + resp.data); // Em norueguês
      }

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
      {!isAlterPassord ? (
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
                <Button type="submit">Endre</Button>
              </div>
            </form>
          </CustomFormGrup>
        </Row>
      ) : (
        <Row>
          <div
            style={{
              backgroundColor: "#d4edda",
              color: "#155724",
              border: "1px solid #c3e6cb",
              borderRadius: "5px",
              padding: "20px",
              marginTop: "30px",
              width: "100%",
              textAlign: "center",
            }}
          >
            <h4>✔️ Passordet ble endret med suksess!</h4>
            <p>Du kan nå logge inn med ditt nye passord.</p>
          </div>
        </Row>
      )}
    </Context>
  );
};

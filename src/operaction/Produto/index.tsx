import { Col, Form, Input, Label, Row } from "reactstrap";
import { useState } from "react";
import * as z from "zod";
import iProdutoProps from "../../interfaces/produto";

interface iProps {
  dt: iProdutoProps;
  up: (e: any) => void;
}

const produtoSchema = z.object({
  nome_produto: z
    .string()
    .min(3, { message: "Navnet må ha minst 3 tegn" })
    .max(500),
});

export function CadProduto({ dt, up }: iProps) {
  const [errors, setErrors] = useState({
    idLeverandor: "",
    nome_produto: "",
    tipo_produto: "",
    img: "",
  });
  const produto = dt ?? {
    nome_produto: "",
    tipo_produto: "",
    img: "",
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newDt = { ...dt, [name]: value };
    try {
      produtoSchema.parse(newDt); // Prøver å validere det oppdaterte objektet
      setErrors({ ...errors, [name]: "" }); // Fjerner feilen hvis gyldig
    } catch (err) {
      if (err instanceof z.ZodError) {
        setErrors({
          ...errors,
          [name]:
            err.errors.find((error) => error.path[0] === name)?.message || "",
        });
      }
    }
    up(e); // Kaller oppdateringsfunksjonen
  };

  // Funksjon for å håndtere filinndata og konvertere til base64
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64data = reader.result as string;

      // Siden du ikke har en standardhendelse for denne oppdateringen,
      // lager vi en falsk hendelse for å kalle 'up'
      const fakeEvent = {
        target: {
          name: "img",
          value: base64data,
        },
      } as unknown as React.ChangeEvent<HTMLInputElement>;

      up(fakeEvent);
    };

    reader.readAsDataURL(file);
  };

  return (
    <Form>
      <Row style={{ fontWeight: "bold", fontFamily: "Arial, sans-serif" }}>
        <Col lg={7}>
          <Label>Produktnavn</Label>
          <Input
            name="nome_produto"
            type="text"
            maxLength={50}
            value={produto.nome_produto}
            onChange={handleChange}
            required
            invalid={!!errors.nome_produto}
          />
          {errors.nome_produto && (
            <p style={{ color: "red", fontSize: "0.875rem" }}>
              {errors.nome_produto}
            </p>
          )}
        </Col>
        <Col lg={8}>
          <Label>Produkttype</Label>
          <Input
            required
            name="tipo_produto"
            type="text"
            maxLength={50}
            value={produto.tipo_produto}
            onChange={handleChange}
            invalid={!!errors.tipo_produto}
          />
          {errors.tipo_produto && (
            <p style={{ color: "red", fontSize: "0.875rem" }}>
              {errors.tipo_produto}
            </p>
          )}
        </Col>
        <Col lg={8}>
          <Label htmlFor="img">Bilde</Label>
          <input
            required
            name="img"
            type="file"
            accept="image/*"
            onChange={handleFileChange} // Her er endringen
            className={errors.img ? "is-invalid" : ""}
          />
          {errors.img && (
            <p style={{ color: "red", fontSize: "0.875rem" }}>{errors.img}</p>
          )}
        </Col>
      </Row>
    </Form>
  );
}

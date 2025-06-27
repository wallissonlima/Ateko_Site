import { Col, Form, Input, Label, Row } from "reactstrap";
import { useState } from "react";
import * as z from "zod";
import iFornecedorProps from "../../interfaces/fornecedor";

interface iProps {
  dt: iFornecedorProps;
  up: (e: any) => void;
}

const FornecedorSchema = z.object({
  nome: z.string().min(3, { message: "Navnet må ha minst 3 tegn" }).max(500),
});

export function CadFornecedor({ dt, up }: iProps) {
  const [errors, setErrors] = useState({
    nome: "",
    contato: "",
    email: "",
    tipo_distribuicao: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newDt = { ...dt, [name]: value };
    try {
      FornecedorSchema.parse(newDt); // Prøver å validere det oppdaterte objektet
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

  return (
    <Form>
      <Row style={{ fontWeight: "bold", fontFamily: "Arial, sans-serif" }}>
        <Col lg={7}>
          <Label>Navn</Label>
          <Input
            name="nome"
            type="text"
            maxLength={50}
            value={dt.nome}
            onChange={handleChange}
            required
            invalid={!!errors.nome}
          />
          {errors.nome && (
            <p style={{ color: "red", fontSize: "0.875rem" }}>{errors.nome}</p>
          )}
        </Col>
        <Col lg={8}>
          <Label>E-post</Label>
          <Input
            required
            name="email"
            type="text"
            maxLength={50}
            value={dt.email}
            onChange={handleChange}
            invalid={!!errors.email}
          />
          {errors.email && (
            <p style={{ color: "red", fontSize: "0.875rem" }}>{errors.email}</p>
          )}
        </Col>
        <Col lg={8}>
          <Label>Kontakt</Label>
          <Input
            required
            name="contato"
            type="number"
            maxLength={50}
            value={dt.contato}
            onChange={handleChange}
            invalid={!!errors.contato}
          />
          {errors.contato && (
            <p style={{ color: "red", fontSize: "0.875rem" }}>
              {errors.contato}
            </p>
          )}
        </Col>
        <Col lg={8}>
          <Label>Distribusjonstype</Label>
          <Input
            required
            name="tipo_distribuicao"
            type="text"
            maxLength={50}
            value={dt.tipo_distribuicao}
            onChange={handleChange}
            invalid={!!errors.tipo_distribuicao}
          />
          {errors.tipo_distribuicao && (
            <p style={{ color: "red", fontSize: "0.875rem" }}>
              {errors.tipo_distribuicao}
            </p>
          )}
        </Col>
      </Row>
    </Form>
  );
}

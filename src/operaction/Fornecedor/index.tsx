import { Col, Form, Input, Label, Row } from "reactstrap";
import { useState } from "react";
import * as z from "zod";
import iFornecedorProps from "../../interfaces/fornecedor";

interface iProps {
  dt: iFornecedorProps;
  up: (e: any) => void;
}

const FornecedorSchema = z.object({
  nome: z
    .string()
    .min(3, { message: "A área deve ter pelo menos 3 caracteres" })
    .max(500),
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
      FornecedorSchema.parse(newDt); // Tenta validar o objeto atualizado
      setErrors({ ...errors, [name]: "" }); // Limpa o erro se válido
    } catch (err) {
      if (err instanceof z.ZodError) {
        setErrors({
          ...errors,
          [name]:
            err.errors.find((error) => error.path[0] === name)?.message || "",
        });
      }
    }
    up(e); // Chama a função de atualização
  };

  return (
    <Form>
      <Row style={{ fontWeight: "bold", fontFamily: "Arial, sans-serif" }}>
        <Col lg={7}>
          <Label>Nome</Label>
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
          <Label>E-mail</Label>
          <Input
            required
            name="email"
            type="text"
            maxLength={50}
            value={dt.email}
            onChange={handleChange}
            invalid={!!errors.email}
          />
          {errors.nome && (
            <p style={{ color: "red", fontSize: "0.875rem" }}>{errors.email}</p>
          )}
        </Col>
        <Col lg={8}>
          <Label>Contato</Label>
          <Input
            required
            name="contato"
            type="number"
            maxLength={50}
            value={dt.contato}
            onChange={handleChange}
            invalid={!!errors.contato}
          />
          {errors.nome && (
            <p style={{ color: "red", fontSize: "0.875rem" }}>{errors.email}</p>
          )}
        </Col>
        <Col lg={8}>
          <Label>Tipo distribuição</Label>
          <Input
            required
            name="tipo_distribuicao"
            type="text"
            maxLength={50}
            value={dt.tipo_distribuicao}
            onChange={handleChange}
            invalid={!!errors.tipo_distribuicao}
          />
          {errors.nome && (
            <p style={{ color: "red", fontSize: "0.875rem" }}>{errors.email}</p>
          )}
        </Col>
      </Row>
    </Form>

    
  );
}

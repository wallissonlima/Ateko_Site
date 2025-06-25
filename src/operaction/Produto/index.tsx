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
    .min(3, { message: "A área deve ter pelo menos 3 caracteres" })
    .max(500),
});

export function CadProduto({ dt, up }: iProps) {
  const [errors, setErrors] = useState({
    idLeverandor: "",
    nome_produto: "",
    tipo_produto: "",
    img: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newDt = { ...dt, [name]: value };
    try {
      produtoSchema.parse(newDt); // Tenta validar o objeto atualizado
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
          <Label>Nome produto</Label>
          <Input
            name="nome_produto"
            type="text"
            maxLength={50}
            value={dt.nome_produto}
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
          <Label>Tipo produto</Label>
          <Input
            required
            name="tipo_produto"
            type="text"
            maxLength={50}
            value={dt.tipo_produto}
            onChange={handleChange}
            invalid={!!errors.tipo_produto}
          />
          {errors.nome_produto && (
            <p style={{ color: "red", fontSize: "0.875rem" }}>
              {errors.tipo_produto}
            </p>
          )}
        </Col>
        <Col lg={8}>
          <Label htmlFor="img">Imagem</Label>
          <input
            required
            name="img"
            type="file"
            accept="image/*"
            onChange={handleChange}
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

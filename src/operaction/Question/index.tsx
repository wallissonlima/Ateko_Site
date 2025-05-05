import { Form, Input, Label } from "reactstrap";
import iQuestionProps from "../../interfaces/iQuestion";
import { useState } from "react";
import * as z from "zod";

interface iProps {
  dt: iQuestionProps;
  up: (e: any) => void;
}

const clienteSchema = z.object({
  nome: z
    .string()
    .min(3, { message: "A área deve ter pelo menos 3 caracteres" })
    .max(500),
});

export function CadQuestion({ dt, up }: iProps) {
  const [errors, setErrors] = useState({ questionTexts: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newDt = { ...dt, [name]: value };
    try {
      clienteSchema.parse(newDt); // Tenta validar o objeto atualizado
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
      <Label>Pergunta</Label>
      <Input
        required
        name="questionTexts"
        type="text"
        maxLength={50}
        value={dt.questionTexts}
        onChange={handleChange}
        invalid={!!errors.questionTexts}
      />
      {errors.questionTexts && (
        <p style={{ color: "red", fontSize: "0.875rem" }}>
          {errors.questionTexts}
        </p>
      )}
    </Form>
  );
}

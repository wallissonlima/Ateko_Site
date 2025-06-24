import { Form, Input, Label, FormGroup } from "reactstrap";
import iQuestionProps from "../../interfaces/iQuestion";
import { useState } from "react";
import * as z from "zod";
import _ from "lodash";

interface iProps {
  dt: iQuestionProps;
  up: (e: any) => void;
}

const clienteSchema = z.object({
  questionTexts: z
    .string()
    .min(3, { message: "Området må ha minst 3 tegn" })
    .max(500, { message: "Området kan ha maksimalt 500 tegn" }),
});

export function CadQuestion({ dt, up }: iProps) {
  const [errors, setErrors] = useState({ questionTexts: "" });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    const new_object: any = _.cloneDeep(dt);
    new_object[name] = value;

    if (name === "questionTexts") {
      try {
        clienteSchema.parse(new_object);
        setErrors({ questionTexts: "" });
      } catch (err) {
        if (err instanceof z.ZodError) {
          setErrors({
            questionTexts:
              err.errors.find((error) => error.path[0] === name)?.message || "",
          });
        }
      }
    }

    up(e); // Passa o valor ajustado
  };

  return (
    <Form>
      <FormGroup>
        <Label for="questionTexts">Spørsmål</Label>
        <Input
          required
          id="questionTexts"
          name="questionTexts"
          type="textarea"
          maxLength={500}
          value={dt.questionTexts}
          onChange={handleChange}
          invalid={!!errors.questionTexts}
          rows={4}
        />
        {errors.questionTexts && (
          <p style={{ color: "red", fontSize: "0.875rem" }}>
            {errors.questionTexts}
          </p>
        )}
      </FormGroup>

      <FormGroup>
        <Label>Relevant spørsmål</Label>
        <div>
          <FormGroup check inline>
            <Input
              type="radio"
              name="importantQuestion"
              value="true"
              checked={dt.importantQuestion}
              onChange={handleChange}
            />
            <Label check>Ja</Label>
          </FormGroup>
          <FormGroup check inline>
            <Input
              type="radio"
              name="importantQuestion"
              value="false"
              checked={!dt.importantQuestion}
              onChange={handleChange}
            />
            <Label check>Nei</Label>
          </FormGroup>
        </div>
      </FormGroup>
    </Form>
  );
}

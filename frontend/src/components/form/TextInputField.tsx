import { Form } from "react-bootstrap";
import { FieldError, RegisterOptions, UseFormRegister } from "react-hook-form";

interface TextInputFieldProps {
  name: string;
  label: string;
  register: UseFormRegister<any>;
  registerOptions?: RegisterOptions;
  errors?: FieldError;
  [x: string]: any;
}

const TextInputField = ({
  name,
  label,
  register,
  registerOptions,
  errors,
  ...props
}: TextInputFieldProps) => {
  return (
    <Form.Group className="mb-3" controlId={name + "-input"}>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        {...props}
        placeholder={label}
        isInvalid={!!errors}
        {...register(name, registerOptions)}
      />
      <Form.Control.Feedback type="invalid">
        {errors?.message}
      </Form.Control.Feedback>
    </Form.Group>
  );
};

export default TextInputField;

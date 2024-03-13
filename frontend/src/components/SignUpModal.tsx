import { useForm } from "react-hook-form";
import { User } from "../models/user";
import { SignUpCredentials, signUp } from "../api/userApi";
import { Button, Form, Modal } from "react-bootstrap";
import TextInputField from "./form/TextInputField";
import classes from "../styles/utils.module.css";

interface SignUpModalProps {
  onDismiss: () => void;
  onSignUpSuccessful: (user: User) => void;
}
const SignUpModal = ({ onDismiss, onSignUpSuccessful }: SignUpModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpCredentials>();

  const onSubmit = async (credentials: SignUpCredentials) => {
    try {
      const response = await signUp(credentials);
      onSignUpSuccessful(response);
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  return (
    <Modal show onHide={onDismiss}>
      <Modal.Header closeButton>Sign Up</Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <TextInputField
            name="username"
            label="Username"
            type="text"
            placeholder="Username"
            register={register}
            registerOptions={{ required: "Required" }}
            errors={errors.username}
          />

          <TextInputField
            name="email"
            label="Email"
            type="email"
            placeholder="Email"
            register={register}
            registerOptions={{ required: "Required" }}
            errors={errors.email}
          />

          <TextInputField
            name="password"
            label="Password"
            type="password"
            placeholder="Password"
            register={register}
            registerOptions={{ required: "Required" }}
            errors={errors.password}
          />

          <Button
            type="submit"
            disabled={isSubmitting}
            className={classes.width100}
          >
            Sign Up
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default SignUpModal;

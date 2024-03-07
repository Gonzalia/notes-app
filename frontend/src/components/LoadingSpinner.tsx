import { Spinner } from "react-bootstrap";

const LoadingSpinner = () => {
  return (
    <Spinner
      className="spinner-grow spinner-grow-xl"
      animation="border"
      variant="primary"
    />
  );
};

export default LoadingSpinner;

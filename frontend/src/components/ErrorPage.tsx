import classes from "../styles/ErrorPage.module.css";

const ErrorPage = () => {
  return (
    <p className={classes.adviceMessage}>
      Something went wrong. Please refresh the page
    </p>
  );
};

export default ErrorPage;

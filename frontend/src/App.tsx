import { Container } from "react-bootstrap";
import SignUpModal from "./components/SignUpModal";
import LoginModal from "./components/LoginModal";
import NavBar from "./components/NavBar";
import { useEffect, useState } from "react";
import { User } from "./models/user";
import { getLoggedInUser } from "./api/userApi";
import NotesPageLoggedInView from "./components/NotesPageLoggedInView";
import NotesPageLoggedOutView from "./components/NotesPageLoggedOutView";

const App = () => {
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showLogInModal, setShowLogInModal] = useState(false);

  useEffect(() => {
    const fetchLoggedInUser = async () => {
      try {
        const response = await getLoggedInUser();
        console.log(response);

        setLoggedInUser(response);
      } catch (error) {
        console.error(error);
      }
    };

    fetchLoggedInUser();
  }, []);

  return (
    <>
      <NavBar
        loggedInUser={loggedInUser}
        onLoginClicked={() => setShowLogInModal(true)}
        onSignUpClicked={() => setShowSignUpModal(true)}
        onLogoutSuccessful={() => setLoggedInUser(null)}
      />
      <Container>
        <>
          {loggedInUser ? (
            <NotesPageLoggedInView />
          ) : (
            <NotesPageLoggedOutView />
          )}
        </>
      </Container>

      {showSignUpModal && (
        <SignUpModal
          onDismiss={() => {
            setShowSignUpModal(false);
          }}
          onSignUpSuccessful={(user) => {
            setLoggedInUser(user);
            setShowSignUpModal(false);
          }}
        />
      )}
      {showLogInModal && (
        <LoginModal
          onDismiss={() => {
            setShowLogInModal(false);
          }}
          onLoginSuccessful={(user) => {
            setLoggedInUser(user);
            setShowLogInModal(false);
          }}
        />
      )}
    </>
  );
};

export default App;

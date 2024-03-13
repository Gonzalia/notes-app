import { Navbar as BootstrapNavBar, Container, Nav } from "react-bootstrap";
import { User } from "../models/user";
import NavBarLoggedInView from "./NavBarLoggedInView";
import NavBarLoggedOutView from "./NavBarLoggedOutView";

interface NavBarProps {
  loggedInUser: User | null;
  onLoginClicked: () => void;
  onSignUpClicked: () => void;
  onLogoutSuccessful: () => void;
}

const NavBar = ({
  loggedInUser,
  onSignUpClicked,
  onLoginClicked,
  onLogoutSuccessful,
}: NavBarProps) => {
  return (
    <BootstrapNavBar bg="primary" variant="dark" expand="sm" sticky="top">
      <Container>
        <BootstrapNavBar.Brand>Cool Notes App</BootstrapNavBar.Brand>
        <BootstrapNavBar.Toggle aria-controls="main-navbar" />
        <BootstrapNavBar.Collapse id="main-navbar">
          <Nav className="ms-auto">
            {loggedInUser ? (
              <NavBarLoggedInView
                user={loggedInUser}
                onLogoutSuccessful={onLogoutSuccessful}
              />
            ) : (
              <NavBarLoggedOutView
                onLoginClicked={onLoginClicked}
                onSignUpClicked={onSignUpClicked}
              />
            )}
          </Nav>
        </BootstrapNavBar.Collapse>
      </Container>
    </BootstrapNavBar>
  );
};

export default NavBar;

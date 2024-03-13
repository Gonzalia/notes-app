import { Button, Navbar } from "react-bootstrap";
import { logout } from "../api/userApi";
import { User } from "../models/user";

interface NavBarLoggedInViewProps {
  user: User;
  onLogoutSuccessful: () => void;
}
const NavBarLoggedInView = ({
  user,
  onLogoutSuccessful,
}: NavBarLoggedInViewProps) => {
  const handleLogout = async () => {
    try {
      await logout();
      onLogoutSuccessful();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <Navbar.Text className="me-2">Signed in as : {user.username}</Navbar.Text>
      <Button onClick={handleLogout}>Log out</Button>
    </>
  );
};

export default NavBarLoggedInView;

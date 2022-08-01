import { slide as Menu } from "react-burger-menu";
import { Link } from "react-router-dom";
import AuthService from "../../utils/auth";
import "../BurgerMenu/index.css";

const BurgerMenu = ({ event_id }) => {
  const logout = (event) => {
    event.preventDefault();
    AuthService.logout();
  };
  const navOptions = [
    {
      link: `/event/${event_id}`,
      name: "Calendar",
    },
    {
      link: `/event/${event_id}/guests`,
      name: "Guests",
    },
    {
      link: `/event/${event_id}/passwords`,
      name: "Passwords",
    },
    {
      link: `/event/${event_id}/surveylink`,
      name: "Survey",
    },
  ];
  return (
    <Menu className="">
      <nav className="">
        <ul className="">
          {navOptions.map((option, index) => (
            <li key={index}>
              <Link to={option.link} className="">
                {option.name}
              </Link>
            </li>
          ))}
          <li>
            <button className="" onClick={logout}>
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </Menu>
  );
};

export default BurgerMenu;

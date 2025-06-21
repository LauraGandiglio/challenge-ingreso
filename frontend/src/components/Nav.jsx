import { Link } from "react-router-dom";
import "../styles/Nav.css";

const Nav = () => {
  return (
    <div className="nav">
      <Link to="/form">Nueva tarea</Link>
      <Link to="/">Tareas</Link>
    </div>
  );
};

export default Nav;

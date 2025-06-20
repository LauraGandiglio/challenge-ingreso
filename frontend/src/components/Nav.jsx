import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <div>
      <Link to="/form">Agregar nueva tarea</Link>
      <Link to="/">Tareas</Link>
    </div>
  );
};

export default Nav;

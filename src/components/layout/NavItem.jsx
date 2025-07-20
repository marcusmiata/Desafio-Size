//Bibliotecas externas
import { Link } from "react-router-dom"

//Estilos
import styles from './NavItem.module.css'


function NavItem({ text, to, isOpen, onClick }) {
  return (
    <li className={styles.containerItem}>
      <Link className={isOpen ? styles.open : ''} to={to} onClick={onClick}>
        {text}
      </Link>
    </li>
  )
}

export default NavItem
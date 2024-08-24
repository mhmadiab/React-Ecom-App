import { Badge, Navbar, Container, Nav} from 'react-bootstrap'
import styles from  './styles.module.css'
import {HeaderBasket} from '../../ecommerce'
import { NavLink } from 'react-router-dom'

const {headerLogo, headerContainer, }=styles
const Header = () => {
  return (
    <header>
        <div className={headerContainer}>
          <h1 className={headerLogo}><span>our </span><Badge bg='info'>Ecom</Badge></h1>
          <HeaderBasket />
        </div>
        <Navbar expand="lg" className="bg-body-tertiary" bg='dark' data-bs-theme="dark">
            <Container>
                
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link as={NavLink} to="/">Home</Nav.Link>
                    <Nav.Link as={NavLink} to="categories">Categories</Nav.Link>
                    <Nav.Link as={NavLink} to="aboutus">About</Nav.Link>
                </Nav>
                <Nav >
                    <Nav.Link as={NavLink} to="login">Login</Nav.Link>
                    <Nav.Link as={NavLink} to="register">Register</Nav.Link>
                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </header>
  )
}

export default Header
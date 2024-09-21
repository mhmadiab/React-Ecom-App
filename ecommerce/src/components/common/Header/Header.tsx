import { Badge, Navbar, Container, Nav, NavDropdown} from 'react-bootstrap'
import styles from  './styles.module.css'
import { NavLink } from 'react-router-dom'
import HeaderLeftBar from './headerLeftBar/HeaderLeftBar'
import { useAppSelector, useAppDispatch } from '@store/hooks'
import { authLogout } from '@store/auth/authSlice'
import { useEffect } from 'react'
import { actGetWishlist } from '@store/whishlist/wishlistSlice'

import logo from '@assets/png/8eaaac3a2fe79ea70f852b5c332c7efb.png'

const {headerLogo, headerContainer, navlinkItems }=styles
const Header = () => {

  const dispatch = useAppDispatch()
  
  const { accessToken, user} =  useAppSelector(state => state.auths)

  const logoutHandler = ()=>{
    dispatch(authLogout())
  }

  useEffect(()=>{
    if(accessToken){
      dispatch(actGetWishlist("productsIds"))
    }
  }, [dispatch, accessToken])
  

  return (
    <header>
        <div className={headerContainer}>
          <h1 className={headerLogo}><span><img src={logo} style={{width: "45px", marginRight: 10}}></img></span><Badge bg='info'> eCom</Badge></h1>
          <HeaderLeftBar />
        </div>
        <Navbar expand="lg" className="bg-body-tertiary bg-black" bg="dark" data-bs-theme="dark" >
            <Container>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link as={NavLink} to="/" className={navlinkItems}>Home</Nav.Link>
                    <Nav.Link as={NavLink} to="categories" className={navlinkItems}>Categories</Nav.Link>
                    <Nav.Link as={NavLink} to="aboutus" className={navlinkItems}>About</Nav.Link>
                </Nav>
                {accessToken ?  <><NavDropdown title={`Welcome: ${user?.firstName} ${user?.lastName}`} id="basic-nav-dropdown" style={{color : "white"}}>
                                  <NavDropdown.Item as ={NavLink} to="/profile" end>Profile</NavDropdown.Item>
                                  <NavDropdown.Item as ={NavLink} to="profile/orders">Orders</NavDropdown.Item>
                                  <NavDropdown.Divider />
                                  <NavDropdown.Item as ={NavLink} to="/" onClick={logoutHandler}>Logout</NavDropdown.Item>
                                </NavDropdown>
                                </>
                : 
                <>
                <Nav >
                    <Nav.Link as={NavLink} to="login" className={navlinkItems}>Login</Nav.Link>
                    <Nav.Link as={NavLink} to="register" className={navlinkItems}>Register</Nav.Link>
                  </Nav>
                  </>
                }
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </header>
  )
}

export default Header
import React from 'react'
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/esm/Button';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import {logout} from '../features/userSlice'
import './NavigationBar.css'
const NavigationBar = () => {
  const dispatch = useDispatch()
  const handleLogout = () =>{
    dispatch(logout())
  }
  const user = useSelector(state=>state.user)
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <LinkContainer to="/">
        <Navbar.Brand>Funtabulous Shopping Mart</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
           {!user&& <LinkContainer to="/login">
            <Nav.Link>Login</Nav.Link>
            </LinkContainer>}

          {user&&!user.isAdmin&&
          <LinkContainer to="/cart">
            <Nav.Link>
            <i className="fa-solid fa-cart-shopping"></i>
            {user?.cart.count>0&&(
              <span className='badge badge-warning' id="cartcount">{user.cart.count}</span>
            )}
            </Nav.Link>
            </LinkContainer>
          }
            {user&&
            
            <NavDropdown title={user.email} id="basic-nav-dropdown">
              {user.isAdmin&&
              <>
              <LinkContainer to="/dashboard">
              <NavDropdown.Item >Dashboard</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/new-product">
              <NavDropdown.Item >Create Product</NavDropdown.Item>
              </LinkContainer>
              </>}
              {!user.isAdmin&&
              <>
              <LinkContainer to="/cart">
              <NavDropdown.Item >Cart</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/orders">
              <NavDropdown.Item >Create Orders</NavDropdown.Item>
              </LinkContainer>
              </>}
              <NavDropdown.Divider />
             <Button variant='danger' onClick={handleLogout} className="logout-button">Logout</Button>
            </NavDropdown>}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}


export default NavigationBar
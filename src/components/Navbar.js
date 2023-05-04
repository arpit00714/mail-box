import React, { useState, useContext } from 'react';
import { NavLink } from "react-router-dom"

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';


import { CartContext } from '../context/CartContext';
import Cart from './Cart';


function Navigation() {
  const [show, setShow] = useState(false);

  const { totalQty } = useContext(CartContext)

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let activeStyle = {
    color : '#0DCAF0'
  };


  return (
    <Navbar bg="dark" variant='dark'>
      <Container>

        <Nav className='nav'>
            <NavLink to="/" style={({ isActive }) =>
              isActive ? activeStyle : undefined
            }>Home</NavLink>
          <NavLink to="/store" style={({ isActive }) =>
              isActive ? activeStyle : undefined
            }>Store</NavLink>
            <NavLink to="/about"  style={({ isActive }) =>
              isActive ? activeStyle : undefined
            }>About</NavLink>
            <NavLink to="/contact"  style={({ isActive }) =>
              isActive ? activeStyle : undefined
            }>Contact Us</NavLink>
            <NavLink to="/login"  style={({ isActive }) =>
              isActive ? activeStyle : undefined
            }>Login</NavLink>
        </Nav>
      </Container>
      <Navbar.Brand>
        <Button variant="outline-info" onClick={handleShow}>
          Cart <Badge bg="info">{totalQty}</Badge>
        </Button>

      </Navbar.Brand>
      <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Cart</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Cart />
        </Offcanvas.Body>
      </Offcanvas>

    </Navbar>
  )
}

export default Navigation;
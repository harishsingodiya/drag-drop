import React from "react";
import { Container, Navbar } from "react-bootstrap";

const NavBar = () => {
  return (
    <Navbar bg="dark" variant="dark">
      <Container className="mx-2">
        <Navbar.Brand href="#home">Drag & Drop</Navbar.Brand>
        
      </Container>
    </Navbar>
  );
};

export default NavBar;

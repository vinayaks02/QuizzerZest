import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";

const AppNavbar = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="md" collapseOnSelect fixed="top">
      <Navbar.Brand as={Link} to="/">
        QuizzerZest
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav" className="ml-auto">
        <Nav className="justify-content-end">
          <Nav.Link as={Link} to="/" style={{ color: 'yellow' }}>
            Home
          </Nav.Link>
          <Nav.Link as={Link} to="/create" style={{ color: 'yellow' }}>
            Create Quiz 
          </Nav.Link>
          <Nav.Link as={Link} to="/edit" style={{ color: 'yellow' }}>
            Edit Quiz
          </Nav.Link>
          <Nav.Link as={Link} to="/leaderboard" style={{ color: 'yellow' }}>
            Leaderboard
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default AppNavbar;

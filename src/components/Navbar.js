import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";

const AppNavbar = () => {
  const [expanded, setExpanded] = useState(false);

  const closeNav = () => {
    setExpanded(false);
  };

  return (
    <Navbar
      bg="dark"
      variant="dark"
      expand="md"
      expanded={expanded}
      fixed="top"
      collapseOnSelect // Add this prop
    >
      <Navbar.Brand as={Link} to="/" onClick={closeNav}>
        QuizzerZest
      </Navbar.Brand>
      <Navbar.Toggle
        aria-controls="responsive-navbar-nav"
        onClick={() => setExpanded(!expanded)}
      />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="justify-content-end">
          <Nav.Link as={Link} to="/" onClick={closeNav} style={{ color: "yellow" }}>
            Home
          </Nav.Link>
          <Nav.Link as={Link} to="/create" onClick={closeNav} style={{ color: "yellow" }}>
            Create Quiz
          </Nav.Link>
          <Nav.Link as={Link} to="/edit" onClick={closeNav} style={{ color: "yellow" }}>
            Edit Quiz
          </Nav.Link>
          <Nav.Link as={Link} to="/leaderboard" onClick={closeNav} style={{ color: "yellow" }}>
            Leaderboard
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default AppNavbar;

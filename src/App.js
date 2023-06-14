import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Home from "./Component/Home";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Student from "./Component/Student";
import Teacher from "./Component/Teacher";

const App = () => {
  return (
    <>
      <Router>
        <Navbar bg="dark" variant="dark" expand="lg">
          <Container>
            <Navbar.Brand Link as={Link} to="/">
              Dashboard
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link as={Link} to="/">
                  Home
                </Nav.Link>
                <Nav.Link as={Link} to="/student">
                  Student
                </Nav.Link>
                <Nav.Link as={Link} to="/teacher">
                  Teacher
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/student" element={<Student />}></Route>
          <Route exact path="/teacher" element={<Teacher />}></Route>
        </Routes>
      </Router>
    </>
  );
};

export default App;

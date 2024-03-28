import React from "react";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import { LogInModal } from "./LogInModal.jsx";
import { useState } from 'react';
import { useContext } from "react";
import { Context } from "../store/appContext";
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


export const MyNavbar = () => {
  const [loginModalShow, setLoginModalShow] = useState(false);
  const navigate = useNavigate()
  const { store, actions } = useContext(Context)
  const { logged, currentUser } = store
  const { setLogged, setUser, getAvailableAccount } = actions

  const handleLogout = () => {
    setLogged(false);
    setUser([]);
  };

  const handleCreateClass = async () => {
    navigate(`trainers/${JSON.parse(currentUser.trainer.id)}/create/class`)
    await getAvailableAccount()
  }

  return (
    <Navbar expand="lg" className="bg-body-primary" data-bs-theme="dark">
      <Container fluid className=" justify-content-between p-2 mx-2">
        <Navbar.Brand href="#home">Training Date</Navbar.Brand>
        {logged
          ?
          (
            <Col xs="auto" className="d-flex gap-3">
              <Nav>
                <NavDropdown
                  id="nav-dropdown-cart-shopping"
                  title={<i className="fa-solid fa-cart-shopping"></i>}
                  menuVariant="dark"
                  align='end'
                >
                  <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                </NavDropdown>
              </Nav>
              <Nav>
                <NavDropdown
                  id="nav-dropdown-dumbbell"
                  title={<i className="fa-solid fa-dumbbell"></i>}
                  menuVariant="dark"
                  align='end'
                >
                  <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                </NavDropdown>
              </Nav>
              <Nav>
                <NavDropdown
                  id="nav-dropdown-dumbbell"
                  title={<i className="fa-solid fa-user"></i>}
                  menuVariant="dark"
                  align='end'
                  className="mw-100"
                >
                  <NavDropdown.Item className="d-flex justify-content-end align-items-center" href="#action/3.1">
                    <span>Mi Perfil</span>
                  </NavDropdown.Item>
                  <NavDropdown.Item className="d-flex justify-content-end align-items-center" href="#action/3.1">
                    <span>Mis Classes</span>
                  </NavDropdown.Item>
                  <NavDropdown.Item className="d-flex justify-content-end align-items-center" href="#action/3.1">
                    <span onClick={handleCreateClass}>Crear clase</span>
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={handleLogout} className="text-danger d-flex justify-content-end align-items-center gap-2" href="/">
                    <span>LogOut</span>
                    <i className="fa-solid fa-right-from-bracket"></i>
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Col>
          )
          :
          (
            <Col xs="auto d-flex align-items-center justify-content-center gap-3">
              <Nav>
                <NavDropdown
                  id="nav-dropdown-cart-shopping"
                  title={<i className="fa-solid fa-cart-shopping"></i>}
                  menuVariant="dark"
                  align='end'
                >
                  <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                </NavDropdown>
              </Nav>
              <Nav.Item onClick={() => setLoginModalShow(true)}>
                <i className="fa-solid fa-right-to-bracket text-success"></i>
              </Nav.Item>
            </Col>
          )}
        <LogInModal show={loginModalShow} onHide={() => setLoginModalShow(false)} />
      </Container>
    </Navbar>
  );
};

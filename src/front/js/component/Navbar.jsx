import React from "react";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Col from 'react-bootstrap/Col';
import { LogInModal } from "./LogInModal.jsx";
import { useState } from 'react';
import { useContext } from "react";
import { Context } from "../store/appContext";
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate, Link } from "react-router-dom";
import { faCartShopping, faDumbbell, faUser, faRightToBracket, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Button from 'react-bootstrap/Button';


export const MyNavbar = () => {
  const [loginModalShow, setLoginModalShow] = useState(false);
  const navigate = useNavigate()
  const { store, actions } = useContext(Context)
  const { logged, currentUser, cart } = store
  const { setLogged, setUser, removeCartItem } = actions

  const handleLogout = () => {
    setLogged(false);
    setUser([]);
  };

  const handleCreateClass = async () => {
    navigate(`trainers/${currentUser.trainer.id}/create/class`)
    actions.getTrainerClasses()
  }

  return (
    <Navbar key="md" expand="md" className="bg-primary" data-bs-theme="dark">
      <Container fluid className=" justify-content-between p-2 mx-2">
        <Navbar.Brand href="/">Training Date</Navbar.Brand>
        {logged && currentUser.role === "users" ? (
          <Col xs="auto" className="d-flex gap-3">
            <Nav className="d-flex flex-row gap-3">
              <NavDropdown
                id="nav-dropdown-cart-shopping"
                title={<FontAwesomeIcon icon={faCartShopping} />}
                menuVariant="dark"
                align='end'
              >
                {!cart || cart.length === 0 ? (
                  <NavDropdown.Item>El carrito está vacío</NavDropdown.Item>
                ) : (
                  <>
                    {cart.map((item, index) => (
                      <React.Fragment key={index}>
                        <NavDropdown.Item>{item}</NavDropdown.Item>
                        <Button onClick={() => removeCartItem(item, cart)} className="btn btn-outline-danger ms-2">
                          <i className="fa-solid fa-trash"></i>
                        </Button>
                      </React.Fragment>
                    ))}
                  </>
                )}
                <NavDropdown.Divider />
                <NavDropdown.Item>Abre todo el carrito</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown
                id="nav-dropdown-dumbbell"
                title={<FontAwesomeIcon icon={faDumbbell} />}
                menuVariant="dark"
                align='end'
                className="d-none d-sm-block"
              >
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown
                id="nav-dropdown-dumbbell"
                title={<FontAwesomeIcon icon={faUser} />}
                menuVariant="dark"
                align='end'
                className="d-none d-sm-block"
              >
                <NavDropdown.Item className="d-flex justify-content-end align-items-center" href="#action/3.1">
                  <Link to={`/user/${currentUser.user.id}/profile`}>Mi Perfil</Link>
                </NavDropdown.Item>
                <NavDropdown.Item className="d-flex justify-content-end align-items-center" href="#action/3.1">
                  <span>Mis Classes</span>
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout} className="text-danger d-flex justify-content-end align-items-center gap-2" href="/">
                  <span>LogOut</span>
                  <FontAwesomeIcon icon={faRightFromBracket} />
                </NavDropdown.Item>
              </NavDropdown>
              <Navbar.Toggle className="d-sm-none" aria-controls="offcanvasNavbar-expand-sm" />
              <Navbar.Offcanvas
                id="offcanvasNavbar-expand-sm"
                aria-labelledby="offcanvasNavbarLabel-expand-sm"
                placement="end"
                className="d-sm-none d-flex flex-columns justify-content-center align-items-center"
              >
                <Offcanvas.Header closeButton>
                  <Offcanvas.Title id="offcanvasNavbarLabel-expand-sm">
                    Training Date
                  </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                  <Nav className="justify-content-end flex-grow-1 pe-3">
                    <Nav.Link>
                      <Link to={`/`}>Homepage</Link>
                    </Nav.Link>
                    <Nav.Link>
                      <Link to={`user/${currentUser.user.id}/profile`}>Mi Perfil</Link>
                    </Nav.Link>
                    <Nav.Link href="#action2">Mis Classes</Nav.Link>
                    <Nav.Link onClick={handleLogout} className="text-danger d-flex justify-content-end align-items-center gap-2" href="/">
                      <span>LogOut</span>
                      <FontAwesomeIcon icon={faRightFromBracket} />
                    </Nav.Link>
                  </Nav>
                </Offcanvas.Body>
              </Navbar.Offcanvas>
            </Nav>
          </Col>
        ) : logged && currentUser.role === "trainers" ? (
          <Col xs="auto" className="d-flex gap-3">
            <Nav>
              <NavDropdown
                id="nav-dropdown-dumbbell"
                title={<FontAwesomeIcon icon={faDumbbell} />}
                menuVariant="dark"
                align='end'
              >
                <NavDropdown.Item>Action</NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav>
              <NavDropdown
                id="nav-dropdown-dumbbell"
                title={<FontAwesomeIcon icon={faUser} />}
                menuVariant="dark"
                align='end'
                className="mw-100"
              >
                <NavDropdown.Item className="d-flex justify-content-end align-items-center">
                  <Link to={`/trainer/${currentUser.trainer.id}/profile`}>Mi Perfil</Link>
                </NavDropdown.Item>
                <NavDropdown.Item className="d-flex justify-content-end align-items-center" >
                  <Link to={`/trainer/${currentUser.trainer.id}/classes`}>Mis Classes</Link>
                </NavDropdown.Item>
                <NavDropdown.Item className="d-flex justify-content-end align-items-center">
                  <span onClick={handleCreateClass}>Crear clase</span>
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout} className="text-danger d-flex justify-content-end align-items-center gap-2">
                  <Link to={"/"}>LogOut</Link>
                  <FontAwesomeIcon icon={faRightFromBracket} />
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Col>
        ) : (
          <Col xs="auto d-flex align-items-center justify-content-center gap-3">
            <Nav>
              <NavDropdown
                id="nav-dropdown-cart-shopping"
                title={<FontAwesomeIcon icon={faCartShopping} />}
                menuVariant="dark"
                align='end'
              >
                {!cart || cart.length === 0 ? (
                  <NavDropdown.Item>El carrito está vacío</NavDropdown.Item>
                ) : (
                  cart.map((item, index) => (
                    <React.Fragment key={index}>
                      <NavDropdown.Item>{item}</NavDropdown.Item>
                      <Button onClick={() => removeCartItem(item, cart)} className="btn btn-outline-danger ms-2">
                        <i className="fa-solid fa-trash"></i>
                      </Button>
                    </React.Fragment>
                  ))
                )}
              </NavDropdown>
            </Nav>
            <FontAwesomeIcon onClick={() => setLoginModalShow(true)} icon={faRightToBracket} className="text-success p-2" />
          </Col>
        )}
        <LogInModal show={loginModalShow} onHide={() => setLoginModalShow(false)} />
      </Container>
    </Navbar>
  );
};

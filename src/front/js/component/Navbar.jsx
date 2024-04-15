import React, { useState, useContext } from "react";
import { Dropdown, NavDropdown, Container, Row, Col, Tab, Tabs, Navbar, ListGroup, Card, Button, Nav, Offcanvas } from 'react-bootstrap';
import { LogInModal } from "./LogInModal.jsx";
import { Context } from "../store/appContext";
import { useNavigate, Link } from "react-router-dom";
import { faCartShopping, faDumbbell, faUser, faRightToBracket, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { BsFillPlusSquareFill, BsCalendarPlus } from "react-icons/bs";
import { AddTrainerSpecialization } from "/workspaces/sp54-final-project-g3/src/front/js/pages/AddTrainerSpecialization.jsx"


export const MyNavbar = () => {
  const [loginModalShow, setLoginModalShow] = useState(false);
  const navigate = useNavigate()
  const [modalShow, setModalShow] = useState(false);
  const { store, actions } = useContext(Context)
  const { logged, currentUser, cart, trainerClasses } = store
  const { setLogged, setUser, removeCartItem } = actions

  const handleLogout = () => {
    setLogged(false);
    setUser([]);
    navigate("/")
  };

  return (
    <Navbar key="md" bg='primary' expand="md" className="bg-body-primary" data-bs-theme="dark">
      <Container fluid className=" justify-content-evenly p-2 mx-2">
        <Col>
          <Navbar.Brand>
            <Link to={"/"}>Training Date</Link>
          </Navbar.Brand>
        </Col>
        {logged && currentUser.role === "users" ? (
          <>
            <Col xs="auto" className="d-flex gap-3">
              <Nav className="d-flex flex-row justify-content-center" style={{ gap: '1rem' }}>
                <Nav.Item>
                  <Nav.Link className="d-none d-md-block" as={Link} to={`/user/${currentUser.user.id}/profile`} style={{ textDecoration: 'none', transition: 'color 0.3s' }}>
                    Mi Perfil
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link className="d-none d-md-block" as={Link} to={`/user/${currentUser.user.id}/classes`} style={{ textDecoration: 'none', transition: 'color 0.3s' }}>
                    Mis Clases
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link className="d-none d-md-block" as={Link} to={"/allClasses"} style={{ textDecoration: 'none', transition: 'color 0.3s' }}>
                    Todas las clases
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col className="d-flex flex-row gap-2 justify-content-end align-items-center">
              <Nav className="d-flex flex-row justify-content-center align-items-center gap-2">
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
                        <div className="d-flex flex-row justify-content-between" key={index}>
                          <NavDropdown.Item key={index}>{item}</NavDropdown.Item>
                          <Button onClick={() => removeCartItem(item, cart)} className="btn btn-outline-danger ms-2">
                            <i className="fa-solid fa-trash"></i>
                          </Button>
                        </div>
                      ))}
                    </>
                  )}
                  <NavDropdown.Divider />
                  <NavDropdown.Item>Abre todo el carrito</NavDropdown.Item>
                </NavDropdown>
                <Nav.Item className="p-2 d-none d-md-block d-flex justify-content-center align-items-center" onClick={handleLogout}>
                  <FontAwesomeIcon icon={faRightFromBracket} style={{ color: "#ad0101", }} />
                </Nav.Item>
                <Navbar.Toggle className="d-md-none" aria-controls="offcanvasNavbar-expand-md" />
              </Nav>
            </Col>
            <Navbar.Offcanvas
              id="offcanvasNavbar-expand-md"
              aria-labelledby="offcanvasNavbarLabel-expand-md"
              placement="end"
              className="d-md-none w-auto p-2 d-flex flex-columns justify-content-center align-items-center"
            >
              <Offcanvas.Header className="border-bottom" closeButton>
                <Offcanvas.Title className="me-3" id="offcanvasNavbarLabel-expand-md">
                  Training Date
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end gap-5 flex-grow-1 pe-3">
                  <Nav.Link as={Link} to={`/`}>
                    Homepage
                  </Nav.Link>
                </Nav>
                <Nav>
                  <Nav.Link as={Link} to={`user/${currentUser.user.id}/profile`}>
                    Mi Perfil
                  </Nav.Link>
                </Nav>
                <Nav>
                  <Nav.Link as={Link} to={`user/${currentUser.user.id}/classes`}>
                    Mis Classes
                  </Nav.Link>
                </Nav>
                <Nav>
                  <Nav.Link>
                    Todas las clases
                  </Nav.Link>
                </Nav>
                <Nav>
                  <Nav.Link onClick={handleLogout} className="text-danger d-flex align-items-center gap-2" >
                    LogOut<FontAwesomeIcon icon={faRightFromBracket} />
                  </Nav.Link>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </>
        ) : logged && currentUser.role === "trainers" ? (
          <>
            <Col xs="auto" className="d-flex gap-3">
              <Nav className="d-flex flex-row justify-content-center" style={{ gap: '1rem' }}>
                <Nav.Item>
                  <Nav.Link className="d-none d-md-block" as={Link} to={`/trainer/${currentUser.trainer.id}/profile`} style={{ textDecoration: 'none', transition: 'color 0.3s' }}>
                    Mi Perfil
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link className="d-none d-md-block" as={Link} to={`/trainer/${currentUser.trainer.id}/classes`} style={{ textDecoration: 'none', transition: 'color 0.3s' }}>
                    Mis Clases
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link className="d-none d-md-block" as={Link} to={`/trainer/${currentUser.trainer.id}/specializations`} style={{ textDecoration: 'none', transition: 'color 0.3s' }}>
                    Mis Especializaciones
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item style={{ marginLeft: '10px' }}>
                  <Dropdown align="start" drop="down">
                    <Dropdown.Toggle className="d-none d-md-block" variant="link" id="dropdown-basic" style={{ border: 'none', boxShadow: 'none' }}>
                      <BsFillPlusSquareFill />
                    </Dropdown.Toggle>
                    <Dropdown.Menu align="end" style={{ boxShadow: 'none', border: 'none' }}>
                      <Dropdown.Item as={Link} to={`/trainers/${currentUser.trainer.id}/create/class`}>
                        Crear nueva clase
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => setModalShow(true)} >
                        Anadir nueva especialización
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Nav.Item>
                <AddTrainerSpecialization show={modalShow} onHide={() => setModalShow(false)} />
              </Nav>
            </Col>
            <Col className="d-flex flex-row gap-2 justify-content-end align-items-center">
              <Nav className="d-flex flex-row justify-content-center align-items-center gap-2">
                <Dropdown drop="down">
                  <Dropdown.Toggle className="d-flex justify-content-center align-items-center" variant="link" id="dropdown-basic" style={{ border: 'none', boxShadow: 'none' }}>
                    <BsCalendarPlus />
                  </Dropdown.Toggle>
                  <Dropdown.Menu align="end">
                    {trainerClasses.length > 0 ? (
                      trainerClasses.map(oneClass => (
                        <Dropdown.Item key={oneClass.id}>{oneClass.id}</Dropdown.Item>
                      ))
                    ) : (
                      <Dropdown.Item>No hay clases disponibles</Dropdown.Item>
                    )}
                  </Dropdown.Menu>
                </Dropdown>
                <Nav.Item className="p-2 d-none d-md-block d-flex justify-content-center align-items-center" onClick={handleLogout}>
                  <FontAwesomeIcon icon={faRightFromBracket} style={{ color: "#ad0101", }} />
                </Nav.Item>
                <Navbar.Toggle className="d-md-none" aria-controls="offcanvasNavbar-expand-sm" />
              </Nav>
            </Col>
            <Navbar.Offcanvas
              id="offcanvasNavbar-expand-md"
              aria-labelledby="offcanvasNavbarLabel-expand-md"
              placement="end"
              className="d-md-none w-auto p-2 d-flex flex-columns justify-content-center align-items-center"
            >
              <Offcanvas.Header className="border-bottom" closeButton>
                <Offcanvas.Title className="me-3" id="offcanvasNavbarLabel-expand-md">
                  Training Date
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end gap-3 flex-grow-1 pe-3">
                  <Nav.Link as={Link} to={`/`}>
                    Homepage
                  </Nav.Link>
                </Nav>
                <Nav>
                  <Nav.Link as={Link} to={`trainer/${currentUser.trainer.id}/profile`}>
                    Mi Perfil
                  </Nav.Link>
                </Nav>
                <Nav>
                  <Nav.Link as={Link} to={`trainer/${currentUser.trainer.id}/classes`}>
                    Mis Classes
                  </Nav.Link>
                </Nav>
                <Nav>
                  <Nav.Link as={Link} to={`trainer/${currentUser.trainer.id}/specializations`}>
                    Mis Esepcializaciones
                  </Nav.Link>
                </Nav>
                <Nav>
                  <Nav.Link as={Link} to={`/trainers/${currentUser.trainer.id}/create/class`}>
                    Crear nueva clase
                  </Nav.Link>
                </Nav>
                <Nav>
                  <Nav.Link as={Link} to={`/trainer/${currentUser.trainer.id}/add/specialization`}>
                    Crear nueva especializacion
                  </Nav.Link>
                </Nav>
                <Nav>
                  <Nav.Link onClick={handleLogout} className="text-danger d-flex align-items-center gap-2" >
                    LogOut<FontAwesomeIcon icon={faRightFromBracket} />
                  </Nav.Link>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </>
        ) : (
          <Col xs="auto d-flex align-items-center justify-content-center gap-3">
            <Nav>
              <NavDropdown
                id="nav-dropdown-cart-shopping"
                title={<FontAwesomeIcon icon={faCartShopping} />}
                menuVariant="dark"
                align='end'
              >
                {console.log(cart)}
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
    </Navbar >
  );
};
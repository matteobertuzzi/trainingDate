import React, { useState, useContext } from "react";
import { Dropdown, NavDropdown, Container, Row, Col, Tab, Tabs, Navbar, Button, Nav, Offcanvas, Badge } from 'react-bootstrap';
import { LogInModal } from "./LogInModal.jsx";
import { Context } from "../store/appContext";
import { useNavigate, Link } from "react-router-dom";
import { faDumbbell, faRightToBracket, faRightFromBracket, faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { BsFillPlusSquareFill, BsCalendarPlus } from "react-icons/bs";
import { AddTrainerSpecialization } from "/workspaces/sp54-final-project-g3/src/front/js/pages/AddTrainerSpecialization.jsx"


export const MyNavbar = () => {
  const [loginModalShow, setLoginModalShow] = useState(false);
  const navigate = useNavigate()
  const [modalShow, setModalShow] = useState(false);
  const { store, actions } = useContext(Context)
  const { logged, currentUser, userClasses, trainerClasses, favourites } = store
  const { setLogged, setUser, removeCartItem } = actions
  const [activeTab, setActiveTab] = useState(null);

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  const handleLogout = () => {
    setLogged(false);
    setUser([]);
    navigate("/")
  };

  const sortedClasses = store.allClasses.sort((a, b) => {
    const dateA = new Date(a.start_date);
    const dateB = new Date(b.start_date);
    return dateA - dateB;
  });

  return (
    <Navbar key="md" bg='primary' expand="md" className="bg-body-primary" data-bs-theme="dark">
      <Container fluid className=" justify-content-evenly mx-2">
        <Col>
          <Navbar.Brand className="text-dark">
            <Link onClick={() => handleTabClick('')} to={"/"} style={{ textDecoration: "none" }}>Training <FontAwesomeIcon icon={faDumbbell} />  Date</Link>
          </Navbar.Brand>
        </Col>
        {logged && currentUser.role === "users" ? (
          <>
            <Col xs="auto" className="d-flex gap-3">
              <Nav variant="tabs" className="d-flex flex-row border-0">
                <Nav.Item
                  className={`p-2 d-none d-md-block d-flex justify-content-center align-items-center`}
                  style={{
                    transition: 'box-shadow 1.25s cubic-bezier(0.19, 1, 0.22, 1), border-color 1.25s cubic-bezier(0.19, 1, 0.22, 1)',
                    boxShadow: activeTab === 'profile' ? 'inset 0 0 20px rgba(255, 255, 255, 0.5), 0 0 20px rgba(255, 255, 255, 0.2)' : '',
                    borderColor: activeTab === 'profile' ? 'rgba(255, 255, 255, 0)' : 'rgba(255, 255, 255, 0.5)',
                    outlineOffset: activeTab === 'profile' ? '15px' : '0px',
                  }}
                  onClick={() => handleTabClick('profile')}
                >
                  <Nav.Link
                    className="border-0"
                    as={Link}
                    to={`/user/${currentUser.user.id}/profile`}
                    style={{
                      color: activeTab === 'profile' ? '#ffffff' : '',
                      transition: 'color 0.2s',
                      textShadow: activeTab === 'profile' ? '1px 1px 2px #427388' : 'none',
                    }}
                  >
                    Mi Perfil
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item
                  className={`p-2 d-none d-md-block d-flex justify-content-center align-items-center`}
                  style={{
                    transition: 'box-shadow 1.25s cubic-bezier(0.19, 1, 0.22, 1), border-color 1.25s cubic-bezier(0.19, 1, 0.22, 1)',
                    boxShadow: activeTab === 'classes' ? 'inset 0 0 20px rgba(255, 255, 255, 0.5), 0 0 20px rgba(255, 255, 255, 0.2)' : '',
                    borderColor: activeTab === 'classes' ? 'rgba(255, 255, 255, 0)' : 'rgba(255, 255, 255, 0.5)',
                    outlineOffset: activeTab === 'classes' ? '15px' : '0px',
                  }}
                  onClick={() => handleTabClick('classes')}
                >
                  <Nav.Link
                    className="border-0"
                    as={Link}
                    to={`/user/${currentUser.user.id}/classes`}
                    style={{
                      color: activeTab === 'classes' ? '#ffffff' : '',
                      transition: 'color 0.2s',
                      textShadow: activeTab === 'profile' ? '1px 1px 2px #427388' : 'none',
                    }}
                  >                      Mis Clases
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item
                  className={`p-2 d-none d-md-block d-flex justify-content-center align-items-center`}
                  style={{
                    transition: 'box-shadow 1.25s cubic-bezier(0.19, 1, 0.22, 1), border-color 1.25s cubic-bezier(0.19, 1, 0.22, 1)',
                    boxShadow: activeTab === 'allClasses' ? 'inset 0 0 20px rgba(255, 255, 255, 0.5), 0 0 20px rgba(255, 255, 255, 0.2)' : '',
                    borderColor: activeTab === 'allClasses' ? 'rgba(255, 255, 255, 0)' : 'rgba(255, 255, 255, 0.5)',
                    outlineOffset: activeTab === 'allClasses' ? '15px' : '0px',
                  }}
                  onClick={() => handleTabClick('allClasses')}
                >
                  <Nav.Link
                    className="border-0"
                    as={Link}
                    to={`/allclassesdavide`}
                    style={{
                      color: activeTab === 'allClasses' ? '#ffffff' : '',
                      transition: 'color 0.2s',
                      textShadow: activeTab === 'allClasses' ? '1px 1px 2px #427388' : 'none',
                    }}
                  >
                    Todas las clases
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item
                  className={`p-2 d-none d-md-block d-flex justify-content-center align-items-center`}
                  style={{
                    transition: 'box-shadow 1.25s cubic-bezier(0.19, 1, 0.22, 1), border-color 1.25s cubic-bezier(0.19, 1, 0.22, 1)',
                    boxShadow: activeTab === 'favourites' ? 'inset 0 0 20px rgba(255, 255, 255, 0.5), 0 0 20px rgba(255, 255, 255, 0.2)' : '',
                    borderColor: activeTab === 'favourites' ? 'rgba(255, 255, 255, 0)' : 'rgba(255, 255, 255, 0.5)',
                    outlineOffset: activeTab === 'favourites' ? '15px' : '0px',
                  }}
                  onClick={() => handleTabClick('favourites')}
                >
                  <Nav.Link
                    className="border-0"
                    as={Link}
                    to={`user/${currentUser.user.id}/favourites`}
                    style={{
                      color: activeTab === 'favourites' ? '#ffffff' : '',
                      transition: 'color 0.2s',
                      textShadow: activeTab === 'favourites' ? '1px 1px 2px #427388' : 'none',
                    }}
                  >
                    Favoritos<Badge className={`position-absolute top-30 start-80 translate-middle badge rounded-pill  ${!favourites || favourites.length === 0 ? " bg-warning" : "bg-success"} text-dark`}>{favourites.length}</Badge>
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col className="d-flex flex-row gap-2 justify-content-end align-items-center">
              <Nav className="d-flex flex-row justify-content-center align-items-center gap-2">
                <Nav.Item className="p-2 d-none d-md-block d-flex justify-content-center align-items-center" onClick={handleLogout}>
                  <Button className="bg-danger d-flex flex-row align-items-center justify-content-center gap-2 border" onClick={handleLogout} >
                    <span>LogOut</span><FontAwesomeIcon icon={faRightFromBracket} style={{ color: "#ad0101", }} />
                  </Button>
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
                  <Link to={"/"} style={{ textDecoration: 'none' }}>Training <FontAwesomeIcon icon={faDumbbell} />  Date</Link>
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
                  <Nav.Link as={Link} to={"/allClasses"}>
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
                    <Dropdown.Toggle className="d-none d-md-block text-dark" variant="link" id="dropdown-basic" style={{ border: 'none', boxShadow: 'none' }}>
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
                      sortedClasses.map(oneClass => (
                        <Dropdown.Item key={oneClass.id}>{oneClass.start_date}</Dropdown.Item>
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
                  <Link to={"/"} style={{ textDecoration: 'none' }}>Training <FontAwesomeIcon icon={faDumbbell} />  Date</Link>
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
          <Col xs="auto d-flex flex-row align-items-center justify-content-center gap-3">
            <Button variant="success" onClick={() => setLoginModalShow(true)} className="d-flex flex-row gap-2 align-items-center justify-content-center">
              <span>Login</span><FontAwesomeIcon icon={faRightToBracket} />
            </Button>
          </Col>
        )}
        <LogInModal show={loginModalShow} onHide={() => setLoginModalShow(false)} />
      </Container>
    </Navbar >
  );
};
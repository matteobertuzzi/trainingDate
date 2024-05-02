import React, { useState, useContext } from "react";
import { Dropdown, DropdownButton, NavDropdown, Container, Row, Col, Tab, Tabs, Navbar, Button, Nav, Offcanvas, Badge } from 'react-bootstrap';
import { LogInModal } from "./LogInModal.jsx";
import { Context } from "../store/appContext";
import { useNavigate, Link } from "react-router-dom";
import { faDumbbell, faRightToBracket, faRightFromBracket, faHeart, faHouse } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { BsFillPlusSquareFill, BsCalendarPlus } from "react-icons/bs";
import { AddTrainerSpecialization } from "/workspaces/sp54-final-project-g3/src/front/js/pages/AddTrainerSpecialization.jsx"


export const MyNavbar = () => {
  const [loginModalShow, setLoginModalShow] = useState(false);
  const navigate = useNavigate()
  const [modalShow, setModalShow] = useState(false);
  const { store, actions } = useContext(Context)
  const { logged, currentUser, userClasses, trainerClasses, activeNavTab } = store
  const { setLogged, setUser, setActiveNavTab } = actions

  const handleTabClick = (tabName) => {
    setActiveNavTab(tabName);
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
      <Container fluid className="justify-content-evenly mx-2">
        <Col>
          <Navbar.Brand className="text-dark">
            <Link onClick={() => handleTabClick('home')} to={"/"} style={{ textDecoration: "none" }}>Training <FontAwesomeIcon icon={faDumbbell} />  Date</Link>
          </Navbar.Brand>
        </Col>
        {logged && currentUser.role === "users" ? (
          <>
            <Col xs="auto" className="d-flex gap-3">
              <Nav variant="tabs" className="d-flex flex-row border-0">
                <Nav.Item
                  className={`p-2 d-none d-md-block d-flex justify-content-center align-items-center rounded`}
                  style={{
                    transition: 'box-shadow 1.25s cubic-bezier(0.19, 1, 0.22, 1), border-color 1.25s cubic-bezier(0.19, 1, 0.22, 1)',
                    boxShadow: activeNavTab === 'home' ? 'inset 0 0 20px rgba(255, 255, 255, 0.5), 0 0 20px rgba(255, 255, 255, 0.2)' : '',
                    borderColor: activeNavTab === 'home' ? 'rgba(255, 255, 255, 0)' : 'rgba(255, 255, 255, 0.5)',
                    outlineOffset: activeNavTab === 'home' ? '15px' : '0px',
                  }}
                  onClick={() => handleTabClick('home')}
                >
                  <Nav.Link
                    className="border-0 d-flex flex-row justify-content-center align-items-center gap-1"
                    as={Link}
                    to={`/`}
                    style={{
                      color: activeNavTab === 'home' ? '#ffffff' : '',
                      transition: 'color 0.2s',
                      textShadow: activeNavTab === 'home' ? '1px 1px 2px #427388' : 'none',
                    }}
                  >
                    <FontAwesomeIcon icon={faHouse} /><span>Home</span>
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item
                  className={`p-2 d-none d-md-block d-flex justify-content-center align-items-center rounded`}
                  style={{
                    transition: 'box-shadow 1.25s cubic-bezier(0.19, 1, 0.22, 1), border-color 1.25s cubic-bezier(0.19, 1, 0.22, 1)',
                    boxShadow: activeNavTab === 'profile' ? 'inset 0 0 20px rgba(255, 255, 255, 0.5), 0 0 20px rgba(255, 255, 255, 0.2)' : '',
                    borderColor: activeNavTab === 'profile' ? 'rgba(255, 255, 255, 0)' : 'rgba(255, 255, 255, 0.5)',
                    outlineOffset: activeNavTab === 'profile' ? '15px' : '0px',
                  }}
                  onClick={() => handleTabClick('profile')}
                >
                  <Nav.Link
                    className="border-0"
                    as={Link}
                    to={`/user/${currentUser.user.id}/profile`}
                    style={{
                      color: activeNavTab === 'profile' ? '#ffffff' : '',
                      transition: 'color 0.2s',
                      textShadow: activeNavTab === 'profile' ? '1px 1px 2px #427388' : 'none',
                    }}
                  >
                    Mi Perfil
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item
                  className={`p-2 d-none d-md-block d-flex justify-content-center align-items-center rounded`}
                  style={{
                    transition: 'box-shadow 1.25s cubic-bezier(0.19, 1, 0.22, 1), border-color 1.25s cubic-bezier(0.19, 1, 0.22, 1)',
                    boxShadow: activeNavTab === 'classes' ? 'inset 0 0 20px rgba(255, 255, 255, 0.5), 0 0 20px rgba(255, 255, 255, 0.2)' : '',
                    borderColor: activeNavTab === 'classes' ? 'rgba(255, 255, 255, 0)' : 'rgba(255, 255, 255, 0.5)',
                    outlineOffset: activeNavTab === 'classes' ? '15px' : '0px',
                  }}
                  onClick={() => handleTabClick('classes')}
                >
                  <Nav.Link
                    className="border-0"
                    as={Link}
                    to={`/user/${currentUser.user.id}/classes`}
                    style={{
                      color: activeNavTab === 'classes' ? '#ffffff' : '',
                      transition: 'color 0.2s',
                      textShadow: activeNavTab === 'profile' ? '1px 1px 2px #427388' : 'none',
                    }}
                  >
                    Mis Clases
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item
                  className={`p-2 d-none d-md-block d-flex justify-content-center align-items-center rounded`}
                  style={{
                    transition: 'box-shadow 1.25s cubic-bezier(0.19, 1, 0.22, 1), border-color 1.25s cubic-bezier(0.19, 1, 0.22, 1)',
                    boxShadow: activeNavTab === 'allClasses' ? 'inset 0 0 20px rgba(255, 255, 255, 0.5), 0 0 20px rgba(255, 255, 255, 0.2)' : '',
                    borderColor: activeNavTab === 'allClasses' ? 'rgba(255, 255, 255, 0)' : 'rgba(255, 255, 255, 0.5)',
                    outlineOffset: activeNavTab === 'allClasses' ? '15px' : '0px',
                  }}
                  onClick={() => handleTabClick('allClasses')}
                >
                  <Nav.Link
                    className="border-0"
                    as={Link}
                    to={`/allClasses`}
                    style={{
                      color: activeNavTab === 'allClasses' ? '#ffffff' : '',
                      transition: 'color 0.2s',
                      textShadow: activeNavTab === 'allClasses' ? '1px 1px 2px #427388' : 'none',
                    }}
                  >
                    Todas las clases
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item
                  className={`p-2 d-none d-md-block d-flex justify-content-center align-items-center rounded`}
                  style={{
                    transition: 'box-shadow 1.25s cubic-bezier(0.19, 1, 0.22, 1), border-color 1.25s cubic-bezier(0.19, 1, 0.22, 1)',
                    boxShadow: activeNavTab === 'favourites' ? 'inset 0 0 20px rgba(255, 255, 255, 0.5), 0 0 20px rgba(255, 255, 255, 0.2)' : '',
                    borderColor: activeNavTab === 'favourites' ? 'rgba(255, 255, 255, 0)' : 'rgba(255, 255, 255, 0.5)',
                    outlineOffset: activeNavTab === 'favourites' ? '15px' : '0px',
                  }}
                  onClick={() => handleTabClick('favourites')}
                >
                  <Nav.Link
                    className="border-0"
                    as={Link}
                    to={`user/${currentUser.user.id}/favourites`}
                    style={{
                      color: activeNavTab === 'favourites' ? '#ffffff' : '',
                      transition: 'color 0.2s',
                      textShadow: activeNavTab === 'favourites' ? '1px 1px 2px #427388' : 'none',
                    }}
                  >
                    Favoritos
                    <Badge className={`position-absolute top-30 start-80 translate-middle badge rounded-pill ${!userClasses || userClasses.find(cls => cls.user_class.stripe_status !== 'Paid') ? "bg-success" : "bg-warning"} text-dark`}>
                      {userClasses ? userClasses.filter(cls => cls.user_class.stripe_status !== 'Paid').length : 0}
                    </Badge>
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col className="d-flex flex-row gap-2 justify-content-end align-items-center">
              <Nav variant="tabs" className="d-flex flex-row border-0 gap-2">
                <Nav.Item className="p-2 d-none d-md-block d-flex justify-content-center align-items-center" onClick={handleLogout}>
                  <Button className="bg-danger d-flex flex-row align-items-center justify-content-center gap-2 border" onClick={handleLogout} >
                    <span>LogOut</span><FontAwesomeIcon icon={faRightFromBracket} style={{ color: "#ad0101", }} />
                  </Button>
                </Nav.Item>
                <Nav.Item className="d-flex justify-content-center align-items-center" as={Link} to={`user/${currentUser.user.id}/favourites`}>
                  <div className="position-relative">
                    <FontAwesomeIcon size="2x" className="d-md-none text-warning" icon={faHeart} />
                    <Badge className={`position-absolute d-md-none top-30 start-90 translate-middle badge rounded-pill ${!userClasses || userClasses.find(cls => cls.user_class.stripe_status !== 'Paid') ? "bg-success" : "bg-warning"} text-dark`}>
                      {userClasses ? userClasses.filter(cls => cls.user_class.stripe_status !== 'Paid').length : 0}
                    </Badge>
                  </div>
                </Nav.Item>
                <Navbar.Toggle className="d-md-none" aria-controls="offcanvasNavbar-expand-sm" />
              </Nav>
            </Col>
            <Navbar.Offcanvas
              style={{ boxShadow: 'inset 0 0 50px rgba(255, 165, 0, 0.5)' }}
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
              <Offcanvas.Body className="d-flex flex-column justify-content-start align-items-center mt-2 gap-3 pe-3">
                <Nav>
                  <Nav.Link onClick={() => handleTabClick('home')} className="border-b" as={Link} to={`/`}>
                    Homepage
                  </Nav.Link>
                </Nav>
                <Nav>
                  <Nav.Link onClick={() => handleTabClick('profile')} as={Link} to={`user/${currentUser.user.id}/profile`}>
                    Mi Perfil
                  </Nav.Link>
                </Nav>
                <Nav>
                  <Nav.Link onClick={() => handleTabClick('classes')} as={Link} to={`user/${currentUser.user.id}/classes`}>
                    Mis Classes
                  </Nav.Link>
                </Nav>
                <Nav>
                  <Nav.Link as={Link} onClick={() => handleTabClick('allClasses')} to={"/allClasses"}>
                    Todas las clases
                  </Nav.Link>
                </Nav>
                <Nav>
                  <Nav.Link as={Link} to={"/allSpecializations"}>
                    Disciplinas
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
            <Col xs="auto" className="d-flex">
              <Nav className="d-flex flex-row border-0">
                <Nav.Item
                  className="p-2 d-none d-md-block d-flex justify-content-center align-items-center rounded"
                  style={{
                    transition: 'box-shadow 1.25s cubic-bezier(0.19, 1, 0.22, 1), border-color 1.25s cubic-bezier(0.19, 1, 0.22, 1)',
                    boxShadow: activeNavTab === 'home' ? 'inset 0 0 20px rgba(255, 255, 255, 0.5), 0 0 20px rgba(255, 255, 255, 0.2)' : '',
                    borderColor: activeNavTab === 'home' ? 'rgba(255, 255, 255, 0)' : 'rgba(255, 255, 255, 0.5)',
                    outlineOffset: activeNavTab === 'home' ? '15px' : '0px',
                  }}
                  onClick={() => handleTabClick('home')}
                >
                  <Nav.Link
                    className="border-0 d-flex flex-row justify-content-center align-items-center gap-1"
                    as={Link}
                    to={`/`}
                    style={{
                      color: activeNavTab === 'home' ? '#ffffff' : '',
                      transition: 'color 0.2s',
                      textShadow: activeNavTab === 'home' ? '1px 1px 2px #427388' : 'none',
                    }}
                  >
                    <FontAwesomeIcon icon={faHouse} /><span>Home</span>
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item
                  className={`p-2 d-none d-md-block d-flex justify-content-center align-items-center rounded`}
                  style={{
                    transition: 'box-shadow 1.25s cubic-bezier(0.19, 1, 0.22, 1), border-color 1.25s cubic-bezier(0.19, 1, 0.22, 1)',
                    boxShadow: activeNavTab === 'profile' ? 'inset 0 0 20px rgba(255, 255, 255, 0.5), 0 0 20px rgba(255, 255, 255, 0.2)' : '',
                    borderColor: activeNavTab === 'profile' ? 'rgba(255, 255, 255, 0)' : 'rgba(255, 255, 255, 0.5)',
                    outlineOffset: activeNavTab === 'profile' ? '15px' : '0px',
                  }}
                  onClick={() => handleTabClick('profile')}
                >
                  <Nav.Link
                    className="d-none d-md-block"
                    as={Link}
                    to={`/trainer/${currentUser.trainer.id}/profile`}
                    style={{
                      color: activeNavTab === 'profile' ? '#ffffff' : '',
                      transition: 'color 0.2s',
                      textShadow: activeNavTab === 'profile' ? '1px 1px 2px #427388' : 'none',
                    }}>
                    Mi Perfil
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item
                  className={`p-2 d-none d-md-block d-flex justify-content-center align-items-center rounded`}
                  style={{
                    transition: 'box-shadow 1.25s cubic-bezier(0.19, 1, 0.22, 1), border-color 1.25s cubic-bezier(0.19, 1, 0.22, 1)',
                    boxShadow: activeNavTab === 'classes' ? 'inset 0 0 20px rgba(255, 255, 255, 0.5), 0 0 20px rgba(255, 255, 255, 0.2)' : '',
                    borderColor: activeNavTab === 'classes' ? 'rgba(255, 255, 255, 0)' : 'rgba(255, 255, 255, 0.5)',
                    outlineOffset: activeNavTab === 'classes' ? '15px' : '0px',
                  }}
                  onClick={() => handleTabClick('classes')}
                >
                  <Nav.Link
                    className="d-none d-md-block"
                    as={Link} to={`/trainer/${currentUser.trainer.id}/classes`}
                    style={{
                      color: activeNavTab === 'classes' ? '#ffffff' : '',
                      transition: 'color 0.2s',
                      textShadow: activeNavTab === 'classes' ? '1px 1px 2px #427388' : 'none',
                    }}>
                    Mis Clases
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item
                  className={`p-2 d-none d-md-block d-flex justify-content-center align-items-center rounded`}
                  style={{
                    transition: 'box-shadow 1.25s cubic-bezier(0.19, 1, 0.22, 1), border-color 1.25s cubic-bezier(0.19, 1, 0.22, 1)',
                    boxShadow: activeNavTab === 'specializations' ? 'inset 0 0 20px rgba(255, 255, 255, 0.5), 0 0 20px rgba(255, 255, 255, 0.2)' : '',
                    borderColor: activeNavTab === 'specializations' ? 'rgba(255, 255, 255, 0)' : 'rgba(255, 255, 255, 0.5)',
                    outlineOffset: activeNavTab === 'specializations' ? '15px' : '0px',
                  }}
                  onClick={() => handleTabClick('specializations')}
                >
                  <Nav.Link
                    className="d-none d-md-block"
                    as={Link}
                    to={`/trainer/${currentUser.trainer.id}/specializations`}
                    style={{
                      color: activeNavTab === 'specializations' ? '#ffffff' : '',
                      transition: 'color 0.2s',
                      textShadow: activeNavTab === 'specializations' ? '1px 1px 2px #427388' : 'none',
                    }}>
                    Mis Especializaciones
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item className="d-flex justify-content-center align-items-center" style={{ marginLeft: '10px' }}>
                  <Dropdown align="start" drop="down">
                    <Dropdown.Toggle className="d-none d-md-block text-dark" variant="link" id="dropdown-basic" style={{ border: 'none', boxShadow: 'none' }}>
                      <BsFillPlusSquareFill />
                    </Dropdown.Toggle>
                    <Dropdown.Menu align="end" style={{ boxShadow: 'none', border: 'none' }}>
                      <Dropdown.Item as={Link} onClick={() => handleTabClick('')} to={`/trainers/${currentUser.trainer.id}/create/class`}>
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
              <Nav className="d-flex flex-row justify-content-center align-items-center">
                <Nav.Item className="p-2 d-none d-md-block d-flex justify-content-center align-items-center" onClick={handleLogout}>
                  <Button variant="danger" className="d-flex flex-row gap-2 border justify-content-center align-items-center"><span>LogOut</span><FontAwesomeIcon icon={faRightFromBracket} style={{ color: "#ad0101", }} /></Button>
                </Nav.Item>
                <Navbar.Toggle className="d-md-none" aria-controls="offcanvasNavbar-expand-sm" />
              </Nav>
            </Col>
            <Navbar.Offcanvas
              style={{ boxShadow: 'inset 0 0 50px rgba(255, 165, 0, 0.5)' }}
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
              <Offcanvas.Body className="d-flex flex-column justify-content-start align-items-center mt-2 gap-3 pe-3">
                <Nav>
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
          <>
            <Col xs="auto" className="d-flex">
              <Nav className="d-flex flex-row border-0">
                <Nav.Item
                  className="p-2 d-none d-md-block d-flex justify-content-center align-items-center rounded"
                  style={{
                    transition: 'box-shadow 1.25s cubic-bezier(0.19, 1, 0.22, 1), border-color 1.25s cubic-bezier(0.19, 1, 0.22, 1)',
                    boxShadow: activeNavTab === 'home' ? 'inset 0 0 20px rgba(255, 255, 255, 0.5), 0 0 20px rgba(255, 255, 255, 0.2)' : '',
                    borderColor: activeNavTab === 'home' ? 'rgba(255, 255, 255, 0)' : 'rgba(255, 255, 255, 0.5)',
                    outlineOffset: activeNavTab === 'home' ? '15px' : '0px',
                  }}
                  onClick={() => handleTabClick('home')}
                >
                  <Nav.Link
                    className="border-0 d-flex flex-row justify-content-center align-items-center gap-1"
                    as={Link}
                    to={`/`}
                    style={{
                      color: activeNavTab === 'home' ? '#ffffff' : '',
                      transition: 'color 0.2s',
                      textShadow: activeNavTab === 'home' ? '1px 1px 2px #427388' : 'none',
                    }}
                  >
                    <FontAwesomeIcon icon={faHouse} /><span>Home</span>
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item
                  className={`p-2 d-none d-md-block d-flex flex-row justify-content-center rounded w-100`}
                  style={{
                    transition: 'box-shadow 1.25s cubic-bezier(0.19, 1, 0.22, 1), border-color 1.25s cubic-bezier(0.19, 1, 0.22, 1)',
                    boxShadow: activeNavTab === 'aboutUs' ? 'inset 0 0 20px rgba(255, 255, 255, 0.5), 0 0 20px rgba(255, 255, 255, 0.2)' : '',
                    borderColor: activeNavTab === 'aboutUs' ? 'rgba(255, 255, 255, 0)' : 'rgba(255, 255, 255, 0.5)',
                    outlineOffset: activeNavTab === 'aboutUs' ? '15px' : '0px',
                  }}
                  onClick={() => handleTabClick('aboutUs')}
                >
                  <Nav.Link
                    className="border-0 d-flex flex-row w-100"
                    as={Link}
                    to={"/aboutUs"}
                    style={{
                      color: activeNavTab === 'aboutUs' ? '#ffffff' : '',
                      transition: 'color 0.2s',
                      textShadow: activeNavTab === 'aboutUs' ? '1px 1px 2px #427388' : 'none',
                    }}
                  >
                    Sobre nosotros
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item
                  className={`p-2 d-none d-md-block d-flex justify-content-center align-items-center rounded`}
                  style={{
                    transition: 'box-shadow 1.25s cubic-bezier(0.19, 1, 0.22, 1), border-color 1.25s cubic-bezier(0.19, 1, 0.22, 1)',
                    boxShadow: activeNavTab === 'user' ? 'inset 0 0 20px rgba(255, 255, 255, 0.5), 0 0 20px rgba(255, 255, 255, 0.2)' : '',
                    borderColor: activeNavTab === 'user' ? 'rgba(255, 255, 255, 0)' : 'rgba(255, 255, 255, 0.5)',
                    outlineOffset: activeNavTab === 'user' ? '15px' : '0px',
                  }}
                  onClick={() => handleTabClick('user')}
                >
                  <Nav.Link
                    className="border-0"
                    as={Link}
                    to={'/users/info'}
                    style={{
                      color: activeNavTab === 'user' ? '#ffffff' : '',
                      transition: 'color 0.2s',
                      textShadow: activeNavTab === 'user' ? '1px 1px 2px #427388' : 'none',
                    }}
                  >
                    Usuario
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item
                  className={`p-2 d-none d-md-block d-flex justify-content-center align-items-center rounded`}
                  style={{
                    transition: 'box-shadow 1.25s cubic-bezier(0.19, 1, 0.22, 1), border-color 1.25s cubic-bezier(0.19, 1, 0.22, 1)',
                    boxShadow: activeNavTab === 'trainer' ? 'inset 0 0 20px rgba(255, 255, 255, 0.5), 0 0 20px rgba(255, 255, 255, 0.2)' : '',
                    borderColor: activeNavTab === 'trainer' ? 'rgba(255, 255, 255, 0)' : 'rgba(255, 255, 255, 0.5)',
                    outlineOffset: activeNavTab === 'trainer' ? '15px' : '0px',
                  }}
                  onClick={() => handleTabClick('trainer')}
                >
                  <Nav.Link
                    className="border-0"
                    as={Link}
                    to={'/trainers/info'}
                    style={{
                      color: activeNavTab === 'trainer' ? '#ffffff' : '',
                      transition: 'color 0.2s',
                      textShadow: activeNavTab === 'trainer' ? '1px 1px 2px #427388' : 'none',
                    }}
                  >
                    Entrenador
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item
                  className={`p-2 d-none d-md-block d-flex justify-content-center align-items-center rounded`}
                  style={{
                    transition: 'box-shadow 1.25s cubic-bezier(0.19, 1, 0.22, 1), border-color 1.25s cubic-bezier(0.19, 1, 0.22, 1)',
                    boxShadow: activeNavTab === 'specialization' ? 'inset 0 0 20px rgba(255, 255, 255, 0.5), 0 0 20px rgba(255, 255, 255, 0.2)' : '',
                    borderColor: activeNavTab === 'specialization' ? 'rgba(255, 255, 255, 0)' : 'rgba(255, 255, 255, 0.5)',
                    outlineOffset: activeNavTab === 'specialization' ? '15px' : '0px',
                  }}
                  onClick={() => handleTabClick('specialization')}
                >
                  <Nav.Link
                    className="border-0"
                    as={Link}
                    to={"/allSpecializations"}
                    style={{
                      color: activeNavTab === 'specialization' ? '#ffffff' : '',
                      transition: 'color 0.2s',
                      textShadow: activeNavTab === 'specialization' ? '1px 1px 2px #427388' : 'none',
                    }}
                  >
                    Disciplinas
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col className="d-flex flex-row gap-2 justify-content-end align-items-center">
              <Button variant="success" onClick={() => setLoginModalShow(true)} className="d-flex flex-row gap-2 align-items-center justify-content-center">
                <span>Login</span><FontAwesomeIcon icon={faRightToBracket} />
              </Button>
              <Navbar.Toggle className="d-md-none" aria-controls="offcanvasNavbar-expand-sm" />
            </Col>
            <Navbar.Offcanvas
              style={{ boxShadow: 'inset 0 0 50px rgba(255, 165, 0, 0.5)' }}
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
              <Nav className="bg-black text-white p-1 rounded">
                <p className="mb-0">Todavia no te has registrado?</p>
                <Link className="d-flex flex-row justify-content-center align-items-center gap-1" to={"/signup"}><span>Hazlo ahora</span> <FontAwesomeIcon icon={faRightToBracket} /></Link>
              </Nav>
              <Offcanvas.Body className="d-flex flex-column justify-content-start align-items-center mt-2 gap-3 pe-3">
                <Nav>
                  <Nav.Link onClick={() => handleTabClick('home')} className="border-b" as={Link} to={`/`}>
                    Homepage
                  </Nav.Link>
                </Nav>
                <Nav>
                  <Nav.Link onClick={() => handleTabClick('profile')} as={Link} to={"/"}>
                    Sobre nosotros
                  </Nav.Link>
                </Nav>
                <Nav>
                  <Nav.Link onClick={() => handleTabClick('user')} as={Link} to={"/users/info"}>
                    Usuario
                  </Nav.Link>
                </Nav>
                <Nav>
                  <Nav.Link as={Link} onClick={() => handleTabClick('trainer')} to={"/trainers/info"}>
                    Entrenador
                  </Nav.Link>
                </Nav>
                <Nav>
                  <Nav.Link as={Link} to={"/allSpecializations"}>
                    Disciplinas
                  </Nav.Link>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </>
        )}
        <LogInModal show={loginModalShow} onHide={() => setLoginModalShow(false)} />
      </Container>
    </Navbar >
  );
};
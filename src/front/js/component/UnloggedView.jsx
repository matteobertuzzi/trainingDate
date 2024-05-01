import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Accordion, Container, Card, Row, Col, Carousel } from 'react-bootstrap';
import { FaDumbbell } from 'react-icons/fa';
import { LogInModal } from './LogInModal.jsx';
import ClassesCarousel from './ClassesCarousel.jsx';
import RegisterPopup from './RegisterPopup.jsx';
import img1 from "/workspaces/sp54-final-project-g3/src/front/img/unlogged-view-img.jpg"
import img2 from "/workspaces/sp54-final-project-g3/src/front/img/trainer-image-unlogged-view.png"
import img3 from "/workspaces/sp54-final-project-g3/src/front/img/ulogged-view-img-user.jpg"

const UnloggedView = () => {
    const [loginModalShow, setLoginModalShow] = useState(false);
    const [registerModal, setRegisterModal] = useState(false)

    return (
        <Container fluid >
            <Row className="justify-content-center">
                <Card className="text-white w-100" style={{ borderWidth: '0', height: '500px', padding: '0%' }}>
                    <Card.Img
                        className="img-fluid w-100 rounded-0"
                        src={img1}
                        alt="Training Date"
                        style={{ opacity: '0.8', objectFit: 'cover', height: '100%', width: '100%' }}
                    />
                    <Card.ImgOverlay className="d-flex align-items-center justify-content-center rounded">
                        <div className="text-center p-3 rounded" style={{ opacity: '0.9', backgroundColor: 'white', color: 'black' }}>
                            <h2 className='mt-3' style={{ fontWeight: 'normal', fontSize: '32px', color: '#333333', textTransform: 'uppercase', letterSpacing: '1px', textShadow: '0px 2px 2px rgba(0, 0, 0, 0.1)', lineHeight: '1' }}>¡Bienvenido a Training Date!</h2>
                            <h5 className='my-2' style={{ fontWeight: 'normal' }}>Conéctate con el fitness y reserva tus clases con un solo clic.</h5>
                            <h5>Conoce a entrenadores expertos y alcanza tus objetivos de bienestar!!</h5>
                            <Link to='/signup'>
                                <Button variant='primary' className='my-3' style={{ height: '40px', width: '160px', fontWeight: 'normal', fontSize: '16px', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', border: 'none', backgroundImage: 'linear-gradient(to right, #ff8a00, #da1b60)', color: '#ffffff', textShadow: '0px 2px 2px rgba(0, 0, 0, 0.2)', transition: 'transform 0.3s ease' }}
                                    onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
                                    onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                                >
                                    Regístrate Ahora
                                </Button>
                            </Link>
                        </div>
                    </Card.ImgOverlay>
                </Card>
            </Row>
            <Row className='bg-light pt-3'>
                <Col className="d-flex flex-row justify-content-center align-items-center p-3 w-auto">
                    <div className="border rounded p-4 d-flex flex-column flex-sm-row gap-3 justify-content-center w-auto align-items-center" style={{ boxShadow: '0 0 10px rgba(255, 165, 0, 0.5)' }}>
                        <h3>Descubre nuestras Clases</h3>
                        <Button onClick={() => setRegisterModal(true)}>Ver todas las clases...</Button>
                        <RegisterPopup show={registerModal} onHide={() => setRegisterModal(false)} />
                    </div>
                </Col>
                <Col>
                    <ClassesCarousel />
                </Col>
            </Row>
            <Row>
                <Carousel className='my-4'>
                    <Carousel.Item>
                        <Card style={{ width: '70vw', margin: '20px auto', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
                            <div className="row no-gutters">
                                <div className="col-md-6">
                                    <Card.Img variant="top" src={img3} style={{ height: '100%' }} />
                                </div>
                                <div className="col-md-6 d-flex align-items-center justify-content-center">
                                    <Card.Body>
                                        <Card.Title style={{ fontSize: '28px', fontWeight: 'bold', color: '#333', textAlign: 'center' }}>Encuentra tu clase ideal</Card.Title>
                                        <Card.Text style={{ fontSize: '18px', textAlign: 'center', marginBottom: '20px' }}>
                                            ¿Buscas clases personalizadas? Regístrate como usuario y encuentra entrenadores y clases que se adapten a tus necesidades.
                                        </Card.Text>
                                        <Link to='/signupUser' style={{ textAlign: 'center', display: 'block' }}>
                                            <Button variant='primary' className='my-3' style={{ height: '50px', width: '200px', fontWeight: 'bold', fontSize: '20px', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', border: 'none', backgroundImage: 'linear-gradient(to right, #ff8a00, #da1b60)', color: '#ffffff', textShadow: '0px 2px 2px rgba(0, 0, 0, 0.2)', transition: 'transform 0.3s ease' }}
                                                onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                                                onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                                            >
                                                Apúntate
                                            </Button>
                                        </Link>
                                    </Card.Body>
                                </div>
                            </div>
                        </Card>
                    </Carousel.Item>
                    <Carousel.Item>
                        <Card className="h-100" style={{ width: '70vw', borderRadius: '10px', margin: '20px auto', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
                            <div className="row no-gutters">
                                <div className="col-md-6">
                                    <Card.Img variant="top" src={img2} style={{ height: '100%' }} />
                                </div>
                                <div className="col-md-6 d-flex align-items-center justify-content-center">
                                    <Card.Body className="text-center">
                                        <Card.Title style={{ fontSize: '28px', fontWeight: 'bold', color: '#333', textAlign: 'center' }}>Conecta con usuarios</Card.Title>
                                        <Card.Text style={{ fontSize: '18px', textAlign: 'center', marginBottom: '20px' }}>
                                            ¿Eres entrenador? Únete a nuestra plataforma para compartir tus clases y entrenamientos con usuarios de toda España.
                                        </Card.Text>
                                        <div className='d-flex justify-content-center'>
                                            <Link to='/signupTrainer'>
                                                <Button variant='primary' className='my-3' style={{ height: '50px', width: '200px', fontWeight: 'bold', fontSize: '20px', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', border: 'none', backgroundImage: 'linear-gradient(to right, #ff8a00, #da1b60)', color: '#ffffff', textShadow: '0px 2px 2px rgba(0, 0, 0, 0.2)', transition: 'transform 0.3s ease' }}
                                                    onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                                                    onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                                                >
                                                    Apúntate
                                                </Button>
                                            </Link>
                                        </div>
                                    </Card.Body>
                                </div>
                            </div>
                        </Card>
                    </Carousel.Item>
                </Carousel>
            </Row>
        </Container >
    );
}

export default UnloggedView;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Accordion, Container, Card, Row, Col, Carousel } from 'react-bootstrap';
import { FaDumbbell } from 'react-icons/fa';
import { LogInModal } from './LogInModal.jsx';
import ClassesCarousel from './ClassesCarousel.jsx';
import img1 from "/workspaces/sp54-final-project-g3/src/front/img/unlogged-view-img.jpg"
import img2 from "/workspaces/sp54-final-project-g3/src/front/img/trainer-image-unlogged-view.png"
import img3 from "/workspaces/sp54-final-project-g3/src/front/img/ulogged-view-img-user.jpg"

const UnloggedView = () => {
    const [loginModalShow, setLoginModalShow] = useState(false);

    return (
        <Container fluid className="p-0">
            <Row>
                <Card className="text-white" style={{ borderWidth: '0', height: '40vh' }}>
                    <Card.Img
                        className="img-fluid rounded-0"
                        src={img1}
                        alt="Training Date"
                        style={{ opacity: '0.8', objectFit: 'cover', height: '100%' }}
                    />
                    <Card.ImgOverlay className="d-flex justify-content-start align-items-center">
                        <div className="d-flex flex-column justify-content-center align-items-center" style={{ opacity: '0.9', backgroundColor: 'white', color: 'black', padding: '10px', width: '30%', marginLeft: '5%' }}>
                            <h2 className='mt-3' style={{ fontWeight: 'bold', fontSize: '36px', color: '#333333', textTransform: 'uppercase', letterSpacing: '2px', textAlign: 'center', textShadow: '0px 2px 2px rgba(0, 0, 0, 0.1)', lineHeight: '1.5' }}>¡Bienvenido a Training Date!</h2>
                            <h5 className='text-center mx-3 my-2'>"¿Listo para conectar con entrenadores y compañeros fitness de toda España?"</h5>
                            <Link to='/signup'>
                                <Button variant='primary' className='my-3' style={{ height: '50px', width: '200px', fontWeight: 'bold', fontSize: '20px', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', border: 'none', backgroundImage: 'linear-gradient(to right, #ff8a00, #da1b60)', color: '#ffffff', textShadow: '0px 2px 2px rgba(0, 0, 0, 0.2)', transition: 'transform 0.3s ease' }}
                                    onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                                    onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                                >
                                    Regístrate Ahora
                                </Button>
                            </Link>
                        </div>
                    </Card.ImgOverlay>
                </Card >
            </Row>
            <Row className='bg-light'>
                <h2 className='text-center mt-3' style={{ fontWeight: 'bold', fontSize: '36px', color: '#333333', textTransform: 'uppercase', letterSpacing: '2px', textAlign: 'center', textShadow: '0px 2px 2px rgba(0, 0, 0, 0.1)' }}>Descubre nuestras Clases</h2>
                <ClassesCarousel />
            </Row>
            <Row>
                <Carousel>
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
                                <div className="col-md-6 d-flex align-items-center justify-content-center">
                                    <Card.Body className="text-center">
                                        <Card.Title style={{ fontSize: '28px', fontWeight: 'bold', color: '#333', textAlign: 'center' }}>¡Únete como Entrenador!</Card.Title>
                                        <Card.Text style={{ fontSize: '18px', textAlign: 'center', marginBottom: '20px' }}>
                                            ¿Eres entrenador? Únete a nuestra plataforma para compartir tus clases y entrenamientos con usuarios de toda España.
                                        </Card.Text>
                                        <div className='d-flex justify-content-center'>
                                            <Link to='/signupTrainer'>
                                                <Button variant='primary' className='my-3' style={{ height: '50px', width: '200px', fontWeight: 'bold', fontSize: '20px',  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', border: 'none', backgroundImage: 'linear-gradient(to right, #ff8a00, #da1b60)', color: '#ffffff', textShadow: '0px 2px 2px rgba(0, 0, 0, 0.2)', transition: 'transform 0.3s ease' }}
                                                    onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                                                    onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                                                >
                                                    Apúntate
                                                </Button>
                                            </Link>
                                        </div>
                                    </Card.Body>
                                </div>
                                <div className="col-md-6">
                                    <Card.Img variant="top" src={img2} />
                                </div>
                            </div>
                        </Card>
                    </Carousel.Item>
                </Carousel>
            </Row>
            <Row className='d-flex flex-column justify-content-center align-items-center p-3'>
                <Col className='pb-4'>
                    <h2 className="text-center">Preguntas frecuentes</h2>
                    <Accordion>
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>¿Cómo puedo registrarme como entrenador?</Accordion.Header>
                            <Accordion.Body>
                                Para registrarte como entrenador, simplemente haz clic en el botón "Regístrate como Entrenador" y sigue las instrucciones para completar el proceso de registro. O haz clic en el siguiente enlace <Link to='/signupTrainer'>"Regístrate como entrenador"</Link>.
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="1">
                            <Accordion.Header>¿Cómo puedo registrarme como usuario?</Accordion.Header>
                            <Accordion.Body>
                                Para registrarte como usuario, simplemente haz clic en el botón "Regístrate como Usuario" y sigue las instrucciones para completar el proceso de registro. O haz clic en el siguiente enlace <Link to='/signupUser'>"Regístrate como usuario"</Link>.
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="2">
                            <Accordion.Header>¿Puedo buscar clases específicas como usuario?</Accordion.Header>
                            <Accordion.Body>
                                Sí, como usuario registrado, tendrás acceso a una amplia variedad de clases ofrecidas por diferentes entrenadores. Puedes utilizar nuestros filtros de búsqueda para encontrar clases específicas que se adapten a tus necesidades. <Link to='/allClasses'>Aquí</Link> puedes ver una lista de todas las <Link to='/allClasses'>clases disponibles</Link>.
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="3">
                            <Accordion.Header>¿Cómo puedo reservar una clase como usuario?</Accordion.Header>
                            <Accordion.Body>
                                Una vez que hayas encontrado la clase que te interesa, simplemente haz clic en el botón de reserva y sigue las instrucciones para completar la reserva de tu clase.
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </Col>
            </Row>
        </Container >
    );
}

export default UnloggedView;

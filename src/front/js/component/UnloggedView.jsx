import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Accordion, Container, Card, Row, Col } from 'react-bootstrap';
import { FaDumbbell } from 'react-icons/fa';
import { LogInModal } from './LogInModal.jsx';

const UnloggedView = () => {
    const [loginModalShow, setLoginModalShow] = useState(false);

    return (
        <Container fluid className="p-0">
            <Row className="m-0">
                <Col className="p-0">
                    <Card className="text-white m-0">
                        <Card.Img className="img-fluid" src="https://www.shape.com/thmb/vMUCGBBuieN6Y5h0bgCqzt0Vf7o=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/fb-interval-training-workouts-c93316d5efe14dee93c6d33ccdb6cd31.jpg" alt="Training Date" />
                        <Card.ImgOverlay className="d-flex justify-content-center align-items-center p-0">
                            <Row className="w-100">
                                <Col md={8} className="text-center text-md-left">
                                    <h1 className="display-4 mb-4">¡Bienvenido a Training Date!</h1>
                                    <p className="lead">Conecta con entrenadores y usuarios de toda España</p>
                                </Col>
                                <Col md={4} className="text-center">
                                    <FaDumbbell size={150} />
                                </Col>
                            </Row>
                        </Card.ImgOverlay>
                    </Card>
                </Col>
            </Row>
            <Row className="bg-light py-5 px-3">
                <Col md={4} className="text-center mb-3">
                    <Card style={{ height: '100%' }}>
                        <Card.Body className="d-flex flex-column justify-content-between">
                            <div>
                                <Card.Title>Para Entrenadores</Card.Title>
                                <Card.Text>
                                    Ofrece tus propias clases y entrena a usuarios de toda España. Para descubrir más información, haz clic en el botón abajo.
                                </Card.Text>
                            </div>
                            <div className="my-3">
                                <Link to='trainers/info'>
                                    <Button variant="primary">Más Informaciones</Button>
                                </Link>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4} className="text-center mb-3">
                    <Card style={{ backgroundColor: '#ffe8e5', height: '100%' }}>
                        <Card.Body className="d-flex flex-column justify-content-between">
                            <div>
                                <Card.Title>¿Qué ofrecemos?</Card.Title>
                                <Card.Text>
                                    Acceso a una amplia variedad de clases, desde yoga hasta levantamiento de pesas. Interactúa con entrenadores expertos y encuentra la motivación que necesitas para alcanzar tu mejor versión.
                                </Card.Text>
                            </div>
                            <div className="my-3">
                                <Link to='/allClasses'>
                                    <Button variant="primary">Explora clases</Button>
                                </Link>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4} className="text-center mb-3">
                    <Card style={{ height: '100%' }}>
                        <Card.Body className="d-flex flex-column justify-content-between">
                            <div>
                                <Card.Title>Para Usuarios</Card.Title>
                                <Card.Text>
                                    Descubre clases y entrenamientos adaptados a tus necesidades. Encuentra el entrenador perfecto para alcanzar tus objetivos de fitness. Para descubrir más información, haz clic en el botón abajo.
                                </Card.Text>
                            </div>
                            <div className="my-3">
                                <Link to='users/info'>
                                    <Button variant="primary">Más Informaciones</Button>
                                </Link>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row className="d-flex py-5 justify-content-center align-items-center">
                <Card md={6} className="p-3 d-flex justify-content-center align-items-center" style={{ width: '80%' }}>
                    <h4 className='text-center'>¿Ya estás registrado?</h4>
                    <p className='text-center'>¡Bienvenido! Si ya estás registrado como entrenador o usuario, haz clic en el siguiente botón para iniciar tu sesión.</p>
                    <div className='d-flex justify-content-center'>
                        <Button onClick={() => setLoginModalShow(true)} style={{ marginTop: '10px', marginBottom: '10px' }}>Log in</Button>
                    </div>
                    <LogInModal show={loginModalShow} onHide={() => setLoginModalShow(false)} />
                </Card>
            </Row>
            <Row className="d-flex justify-content-evenly align-items-center bg-light py-5">
                <Col md={6} lg={4} className='d-flex justify-content-center align-items-center my-3'>
                    <Card className="h-100" style={{ width: '90%', borderRadius: '10px' }}>
                        <Card.Img variant="top" src="https://hips.hearstapps.com/hmg-prod/images/mh-trainer-2-1533576998.png" />
                        <Card.Body className="d-flex flex-column">
                            <Card.Title>Entrenador</Card.Title>
                            <Card.Text>
                                ¿Eres entrenador? Únete a nuestra plataforma para compartir tus clases y entrenamientos con usuarios de toda España.
                            </Card.Text>
                            <div className='d-flex justify-content-center mt-auto'>
                                <Link to='/signupTrainer'>
                                    <Button variant="primary">Regístrate</Button>
                                </Link>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={6} lg={4} className='d-flex justify-content-center align-items-center'>
                    <Card className="h-100" style={{ width: '90%', borderRadius: '10px' }}>
                        <Card.Img className="img-fluid" variant="top" src="https://cvlifestyles.co.uk/wp-content/uploads/2019/02/personal-training.jpg" />
                        <Card.Body className="d-flex flex-column">
                            <Card.Title>Usuario</Card.Title>
                            <Card.Text>
                                ¿Buscas clases personalizadas? Regístrate como usuario y encuentra entrenadores y clases que se adapten a tus necesidades.
                            </Card.Text>
                            <div className='d-flex justify-content-center mt-auto'>
                                <Link to='/signupUser'>
                                    <Button variant="primary">Regístrate</Button>
                                </Link>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
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
        </Container>
    );
}

export default UnloggedView;

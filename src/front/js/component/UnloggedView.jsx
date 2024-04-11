import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Accordion, Container, Card, Row, Col } from 'react-bootstrap';
import { FaDumbbell } from 'react-icons/fa';
import { LogInModal } from './LogInModal.jsx';

const UnloggedView = () => {
    const [loginModalShow, setLoginModalShow] = useState(false);

    return (
        <div className="landing-page mt-4">
            <header className="header">
                <Container>
                    <Row className="align-items-center my-5">
                        <Col md={8} className="text-center text-md-left">
                            <h1 className="display-4 mb-4">¡Bienvenido a Training Date!</h1>
                            <p className="lead">Conecta con entrenadores y usuarios de toda España</p>
                        </Col>
                        <Col md={4} className="text-center">
                            <FaDumbbell size={150} />
                        </Col>
                    </Row>
                </Container>
            </header>

            <section className="features my-5">
                <Container>
                    <Row>
                        <Col md={4} className="text-center">
                            <Card>
                                <Card.Body>
                                    <Card.Title>Para Entrenadores</Card.Title>
                                    <Card.Text>
                                        Ofrece tus propias clases y entrena a usuarios de toda España.
                                    </Card.Text>
                                    <Link to='/signupTrainer'>
                                        <Button variant="primary">Regístrate</Button>
                                    </Link>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={4} className="text-center">
                            <Card style={{ backgroundColor: '#ffe8e5' }}>
                                <Card.Body>
                                    <Card.Title>¿Qué ofrecemos?</Card.Title>
                                    <Card.Text>
                                        Acceso a una amplia variedad de clases, desde yoga hasta levantamiento de pesas. Interactúa con entrenadores expertos y encuentra la motivación que necesitas para alcanzar tu mejor versión.
                                    </Card.Text>
                                    <Link to='/allClasses'>
                                        <Button variant="primary">Explora clases</Button>
                                    </Link>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={4} className="text-center">
                            <Card>
                                <Card.Body>
                                    <Card.Title>Para Usuarios</Card.Title>
                                    <Card.Text>
                                        Descubre clases personalizadas y entrenamientos adaptados a tus necesidades. Encuentra el entrenador perfecto para alcanzar tus objetivos de fitness.
                                    </Card.Text>
                                    <Link to='/signupUser'>
                                        <Button variant="primary">Regístrate</Button>
                                    </Link>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                    <Row className='d-flex justify-content-center'>
                        <Card md={6} className="my-4 p-3" style={{ width: '80%', borderRadius: '10%' }}>
                            <h4 className='text-center'>¿Ya estás registrado?</h4>
                            <p className='text-center'>¡Bienvenido! Si ya estás registrado como entrenador o usuario, haz clic en el siguiente button para iniciar tu sesión.</p>
                            <div className='d-flex justify-content-center'>
                                <Button onClick={() => setLoginModalShow(true)} style={{ marginTop: '10px', marginBottom: '10px' }}>Log in</Button>
                            </div>
                            <LogInModal show={loginModalShow} onHide={() => setLoginModalShow(false)} />
                        </Card>
                    </Row>
                </Container>
            </section>
            <section className="faq">
                <Container>
                    <Row>
                        <Col>
                            <h2 className="text-center mb-4">Preguntas frecuentes</h2>
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
                    <Row className='mt-5 d-flex justify-content-center'>
                        <Col md={6} lg={6}>
                            <Card style={{ width: '90%', borderRadius: '10px' }}>
                                <Card.Img variant="top" src="https://hips.hearstapps.com/hmg-prod/images/mh-trainer-2-1533576998.png" />
                                <Card.Body>
                                    <Card.Title>Entrenador</Card.Title>
                                    <Card.Text>
                                        ¿Eres entrenador? Únete a nuestra plataforma para compartir tus clases y entrenamientos con usuarios de toda España.
                                    </Card.Text>
                                    <div className='d-flex justify-content-center'>
                                        <Link to='/signupTrainer'>
                                            <Button variant="primary">Regístrate</Button>
                                        </Link>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={6} lg={6}>
                            <Card style={{ width: '90%', borderRadius: '10px' }}>
                                <Card.Img variant="top" src="https://cvlifestyles.co.uk/wp-content/uploads/2019/02/personal-training.jpg" />
                                <Card.Body>
                                    <Card.Title>Usuario</Card.Title>
                                    <Card.Text>
                                        ¿Buscas clases personalizadas? Regístrate como usuario y encuentra entrenadores y clases que se adapten a tus necesidades.
                                    </Card.Text>
                                    <div className='d-flex justify-content-center'>
                                        <Link to='/signupUser'>
                                            <Button variant="primary">Regístrate</Button>
                                        </Link>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </section>
        </div>
    );
}

export default UnloggedView;

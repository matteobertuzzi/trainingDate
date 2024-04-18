import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Accordion, Container, Card, Row, Col } from 'react-bootstrap';
import { FaDumbbell } from 'react-icons/fa';
import { LogInModal } from './LogInModal.jsx';
import img1 from "/workspaces/sp54-final-project-g3/src/front/img/unlogged-view-img.jpg"
import img2 from "/workspaces/sp54-final-project-g3/src/front/img/trainer-image-unlogged-view.png"
import img3 from "/workspaces/sp54-final-project-g3/src/front/img/ulogged-view-img-user.jpg"

const UnloggedView = () => {
    const [loginModalShow, setLoginModalShow] = useState(false);

    return (
        <Container fluid className="p-0">
            <Card className="text-white" style={{ borderWidth: '0', height: '40vh' }}>
                <Card.Img
                    className="img-fluid rounded-0"
                    src={img1}
                    alt="Training Date"
                    style={{ opacity: '0.8', objectFit: 'cover', height: '100%' }}
                />
                <Card.ImgOverlay className="d-flex flex-column gap-2 justify-content-center align-items-center">
                    <div style={{ opacity: '0.8', backgroundColor: 'white', borderRadius: '10%', color: 'black', padding: '10px' }} className="d-flex justify-content-between">
                        <div className='d-flex justify-content-center align-items-center' style={{ width: '30%' }}>
                            <FaDumbbell size={100} />
                        </div>
                        <div className='d-flex flex-column my-2 justify-content-center align-items-center' style={{ width: '70%' }}>
                            <h2 style={{ fontWeight: 'bold' }}>¡Bienvenido a Training Date!</h2>
                            <h5 className='text-center'>"¿Listo para conectar con entrenadores y compañeros fitness de toda España?"</h5>
                            <Link to='/signup'>
                                <Button variant='primary' className='my-3' style={{ height: '50px', width: '200px', fontWeight: 'bold' }}>Regístrate Ahora</Button>
                            </Link>
                        </div>
                    </div>
                </Card.ImgOverlay>
            </Card >
            <Row className="bg-light py-5">
                <Col md={12} className="text-center my-2">
                    <h2>Descubre el Mundo del Fitness con Nosotros</h2>
                    <p className="lead px-3">¿Listo para dar el siguiente paso en tu viaje fitness? Encuentra la motivación y el apoyo que necesitas para alcanzar tus objetivos. Conéctate con entrenadores y compañeros de fitness de toda España y descubre nuevas oportunidades para crecer y mejorar.</p>
                </Col>
            </Row>
            <Row className="text-center mt-4">
                <h2 style={{ fontWeight: 'bold', marginBottom: '30px', marginTop: '30px' }}>Para el usuario</h2>
                <Col md={8} className='d-flex flex-column justify-content-center align-content-center'>
                    <div className='mx-5 my-2'>
                        <h4 style={{ fontWeight: 'bold' }}>Paso 1: Iniciar sesión y crear perfil</h4>
                        <p>El primer paso es iniciar sesión en la aplicación y crear tu perfil de usuario. Puedes proporcionar detalles como tu nombre, dirección de correo electrónico, y otros datos relevantes.</p>
                    </div>
                    <div className='mx-5 my-2'>
                        <h4 style={{ fontWeight: 'bold' }}>Paso 2: Explorar clases disponibles</h4>
                        <p>Una vez que hayas creado tu perfil, puedes explorar todas las clases disponibles en la aplicación. Desde yoga hasta entrenamiento de fuerza, hay una variedad de opciones para elegir.</p>
                    </div>
                    <div className='mx-5 my-2'>
                        <h4 style={{ fontWeight: 'bold' }}>Paso 3: Actualizar información y reservar clases</h4>
                        <p>Puedes actualizar tu información de perfil en cualquier momento y reservar clases que te interesen. Además, puedes ver las clases que has reservado y administrar tus reservas desde tu perfil.</p>
                    </div>
                </Col>
                <Col md={4} lg={4} className='d-flex justify-content-center align-items-center'>
                    <Card className="h-100" style={{ width: '90%', borderRadius: '10px' }}>
                        <Card.Img className="img-fluid" variant="top" src={img3} />
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
            <Row className="text-center bg-light mt-4">
                <h2 style={{ fontWeight: 'bold', marginBottom: '30px', marginTop: '30px' }}>Para el entrenador</h2>
                <Col md={6} lg={4} className='d-flex justify-content-center align-items-center my-3'>
                    <Card className="h-100" style={{ width: '90%', borderRadius: '10px' }}>
                        <Card.Img variant="top" src={img2} />
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
                <Col md={8} className='d-flex flex-column justify-content-center align-content-center'>
                    <div className='mx-5 my-2'>
                        <h4 style={{ fontWeight: 'bold' }}>Paso 1: Envía tu certificado o título de estudio</h4>
                        <p>EEl primer paso para convertirte en entrenador en nuestra plataforma es enviarnos tu certificado o título de estudio que demuestre tus habilidades y especializaciones relevantes. Este documento será revisado por nuestro equipo administrativo para verificar su autenticidad.</p>
                    </div>
                    <div className='mx-5 my-2'>
                        <h4 style={{ fontWeight: 'bold' }}>Paso 2: Revisión y aprobación</h4>
                        <p>Una vez que hayas enviado tu certificado, nuestro equipo administrativo lo revisará para asegurarse de que cumpla con nuestros requisitos. Si tu certificado es aprobado, recibirás una notificación por correo electrónico informándote sobre la aprobación.</p>
                    </div>
                    <div className='mx-5 my-2'>
                        <h4 style={{ fontWeight: 'bold' }}>Paso 3: Inicia sesión y comienza a crear clases</h4>
                        <p>Después de recibir la confirmación de que tu certificado ha sido aprobado, puedes iniciar sesión en nuestra plataforma como entrenador. Desde tu panel de control, tendrás la capacidad de crear clases y programas de entrenamiento personalizados para que los usuarios se inscriban.</p>
                    </div>
                    <div className='mx-5 my-2'>
                        <h4 style={{ fontWeight: 'bold' }}>Paso 4: Interactúa con tus clientes</h4>
                        <p>Una vez que hayas creado tus clases, podrás interactuar con tus clientes y gestionar sus inscripciones. Puedes comunicarte con ellos a través de mensajes directos, programar sesiones individuales o grupales y seguir su progreso.</p>
                    </div>
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

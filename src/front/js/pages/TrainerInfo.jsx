import React, { useContext } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Context } from '../store/appContext';
import { RiArrowGoBackLine } from "react-icons/ri";
import { Link } from 'react-router-dom'


const TrainerInfo = () => {
    const { store, actions } = useContext(Context)
    const { logged } = store


    return (
        <Container className="my-5">
            <Row className='m-3 d-flex flex-row gap-2'>
                <Link to={"/"}>
                    <RiArrowGoBackLine /> Volver atrás
                </Link>
            </Row>
            <Row>
                <Col>
                    <h1 className="mb-4">Bienvenido a la sección de Entrenadores</h1>
                    <p className="lead">
                        En esta sección, te proporcionaremos información detallada sobre cómo funciona nuestra aplicación para entrenadores. Aquí tienes una descripción detallada paso a paso:
                    </p>
                </Col>
            </Row>
            <Row className="my-4">
                <Col md={6}>
                    <h2>Paso 1: Envía tu certificado o título de estudio</h2>
                    <p>
                        El primer paso para convertirte en entrenador en nuestra plataforma es enviarnos tu certificado o título de estudio que demuestre tus habilidades y especializaciones relevantes. Este documento será revisado por nuestro equipo administrativo para verificar su autenticidad.
                    </p>
                </Col>
                <Col md={6}>
                    <h2>Paso 2: Revisión y aprobación</h2>
                    <p>
                        Una vez que hayas enviado tu certificado, nuestro equipo administrativo lo revisará para asegurarse de que cumpla con nuestros requisitos. Si tu certificado es aprobado, recibirás una notificación por correo electrónico informándote sobre la aprobación.
                    </p>
                </Col>
            </Row>
            <Row className="my-4">
                <Col md={6}>
                    <h2>Paso 3: Inicia sesión y comienza a crear clases</h2>
                    <p>
                        Después de recibir la confirmación de que tu certificado ha sido aprobado, puedes iniciar sesión en nuestra plataforma como entrenador. Desde tu panel de control, tendrás la capacidad de crear clases y programas de entrenamiento personalizados para que los usuarios se inscriban.
                    </p>
                </Col>
                <Col md={6}>
                    <h2>Paso 4: Interactúa con tus clientes</h2>
                    <p>
                        Una vez que hayas creado tus clases, podrás interactuar con tus clientes y gestionar sus inscripciones. Puedes comunicarte con ellos a través de mensajes directos, programar sesiones individuales o grupales y seguir su progreso.
                    </p>
                </Col>
            </Row>
            {logged ? "" : (
                <Row className="my-5">
                    <Col className='d-flex justify-content-center'>
                        <Link to='/signupTrainer'>
                            <Button variant="primary" size="lg">
                                Regístrate como entrenador
                            </Button>
                        </Link>
                    </Col>
                </Row>
            )}
        </Container>
    );
}

export default TrainerInfo;
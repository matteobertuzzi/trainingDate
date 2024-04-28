import React, { useContext } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Context } from '../store/appContext';
import { RiArrowGoBackLine } from "react-icons/ri";
import { Link } from 'react-router-dom'


const TrainerInfo = () => {
    const { store, actions } = useContext(Context)
    const { logged } = store


    return (
        <Container className="my-4">
            <Row>
                <Col>
                    <div className="border rounded p-4 d-flex flex-column justify-content-center align-items-center" style={{ boxShadow: 'inset 0 0 10px rgba(255, 165, 0, 0.5)' }}>
                        <h3 className="mb-4">Información del entrenador</h3>
                        <p>
                            En esta sección, te proporcionaremos información detallada sobre cómo funciona nuestra aplicación para entrenadores. Aquí tienes una descripción detallada paso a paso:
                        </p>
                    </div>
                </Col>
            </Row>
            <Row className="my-4 d-flex flex-row justify-content-center gap-2">
                <Col className='border rounded p-3'>
                    <h3>Paso 1: Crear perfil</h3>
                    <p>
                        El primer paso es registrarte en nuestra plataforma. Una vez completado el proceso de registro, recibirás un correo electrónico de confirmación. Deberás confirmar tu correo electrónico haciendo clic en el enlace de confirmación proporcionado en el correo electrónico para activar tu cuenta.
                    </p>
                </Col>
                <Col className='border rounded p-3'>
                    <h3>Paso 2: Envía tu certificado</h3>
                    <p>
                        El primer paso para convertirte en entrenador en nuestra plataforma es enviarnos tu certificado o título de estudio que demuestre tus habilidades y especializaciones relevantes. Este documento será revisado por nuestro equipo administrativo para verificar su autenticidad. Si tu certificado es aprobado, recibirás una notificación por correo electrónico informándote sobre la aprobación.
                    </p>
                </Col>
                <Col className='border rounded p-3'>
                    <h3>Paso 3: Comienza a crear clases</h3>
                    <p>
                        Una vez que hayas recibido la confirmación de que tu certificado ha sido aprobado, podrás empezar a crear clases y programas de entrenamiento personalizados. Estas clases estarán relacionadas con las especializaciones previamente confirmadas. Los usuarios podrán inscribirse en estas clases y programas para participar en tus sesiones de entrenamiento.
                    </p>
                </Col>
            </Row>
            {logged ? "" : (
                <Row className="my-5">
                    <Col className='d-flex justify-content-center'>
                        <Link to='/signupTrainer'>
                            <Button variant="primary" size="lg">
                                Listo para empezar? Regístrate como entrenador ahora!
                            </Button>
                        </Link>
                    </Col>
                </Row>
            )}
        </Container>
    );
}

export default TrainerInfo;
import React, { useContext } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Context } from '../store/appContext';
import { RiArrowGoBackLine } from "react-icons/ri";
import { Link } from 'react-router-dom';

const UserInfo = () => {
    const { store, actions } = useContext(Context);
    const { logged } = store;

    return (
        <Container className="my-4">
            <Row>
                <Col className='d-flex flex-column justify-content-center align-items-center'>
                    <div className="border rounded p-4 d-flex flex-column justify-content-center align-items-center" style={{ boxShadow: 'inset 0 0 10px rgba(255, 165, 0, 0.5)' }}>
                        <h3 className="mb-4">Información del usuario</h3>
                        <p>
                            En esta página, se explica cómo inscribirse como usuario y las funciones que puedes utilizar en nuestra aplicación. Desde la creación de tu cuenta hasta la gestión de tus preferencias, aquí encontrarás todo lo necesario para comenzar a disfrutar de nuestra plataforma al máximo.
                        </p>
                    </div>
                </Col>
            </Row>
            <Row className="my-4 d-flex flex-row justify-content-center align-items-start p-2 h-100 gap-2">
                <Col className='d-flex flex-column gap-2 justify-content-center align-items-center border rounded p-3' sm={10} md={10} lg={3}>
                    <h3>Paso 1: Crear perfil</h3>
                    <p>
                        El primer paso es registrarte en nuestra plataforma. Una vez completado el proceso de registro, recibirás un correo electrónico de confirmación. Deberás confirmar tu correo electrónico haciendo clic en el enlace de confirmación proporcionado en el correo electrónico para activar tu cuenta.
                    </p>
                </Col>
                <Col className='d-flex flex-column gap-2 justify-content-center align-items-center border rounded p-3' md={4}>
                    <h3>Paso 2: Explora las clases</h3>
                    <p>
                        Una vez confirmado tu registro, tendrás acceso completo para explorar todas las clases disponibles en nuestra aplicación. Cada clase estará detalladamente descrita, Además, si deseas obtener más detalles sobre las disciplinas específicas de las clases, puedes revisar la sección de disciplinas para conocer más sobre ellas y tomar decisiones informadas sobre tus opciones de entrenamiento.
                    </p>
                </Col>
                <Col className='d-flex flex-column gap-2 justify-content-center align-items-center border rounded p-3' md={4}>
                    <h3>Paso 3: Reserva tus clases</h3>
                    <p>
                        En el último paso, tendrás la oportunidad de elegir y marcar como favoritas las clases que te interesen. Además, podrás realizar el pago de estas clases directamente a través de nuestra aplicación, lo que hace que reservar y pagar por tus clases sea rápido y conveniente.
                    </p>
                </Col>
            </Row>
            <Row className='d-flex justify-content-center align-items-center'>
                {!logged && (
                    <Col md={10} className='d-flex justify-content-center align-items-center'>
                        <Link to='/signupUser'>
                            <Button variant="primary" size="lg">
                                Listo para empezar? Regístrate como usuario ahora!
                            </Button>
                        </Link>
                    </Col>
                )}
            </Row>
        </Container >
    );
}

export default UserInfo;

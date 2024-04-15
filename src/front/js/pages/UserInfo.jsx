import React, { useContext } from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { Context } from '../store/appContext';
import { RiArrowGoBackLine } from "react-icons/ri";
import { Link } from 'react-router-dom';

const UserInfo = () => {
    const { store, actions } = useContext(Context);
    const { logged } = store;

    return (
        <Container className="my-4">
            <Row className='m-3 d-flex flex-row gap-2'>
                <Link to={"/"}>
                    <RiArrowGoBackLine /> Volver atrás
                </Link>
            </Row>
            <Row>
                <Col>
                    <h1 className="mb-4">Bienvenido a tu perfil de usuario</h1>
                    <p className="lead">
                        Aquí puedes acceder a tu perfil de usuario y ver las clases disponibles para ti. También puedes actualizar tu información y ver las clases que has reservado.
                    </p>
                </Col>
            </Row>
            <Row className="my-4">
                <Col md={4} className="text-center">
                    <Card style={{ height: '100%' }}>
                        <Card.Body>
                            <h2>Paso 1: Iniciar sesión y crear perfil</h2>
                            <p>
                                El primer paso es iniciar sesión en la aplicación y crear tu perfil de usuario. Puedes proporcionar detalles como tu nombre, dirección de correo electrónico, y otros datos relevantes.
                            </p>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4} className="text-center">
                    <Card style={{ backgroundColor: '#ffe8e5', height: '100%' }}>
                        <Card.Body>
                            <h2>Paso 2: Explorar clases disponibles</h2>
                            <p>
                                Una vez que hayas creado tu perfil, puedes explorar todas las clases disponibles en la aplicación. Desde yoga hasta entrenamiento de fuerza, hay una variedad de opciones para elegir.
                            </p>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4} className="text-center">
                    <Card style={{ height: '100%' }}>
                        <Card.Body>
                            <h2>Paso 3: Actualizar información y reservar clases</h2>
                            <p>
                                Puedes actualizar tu información de perfil en cualquier momento y reservar clases que te interesen. Además, puedes ver las clases que has reservado y administrar tus reservas desde tu perfil.
                            </p>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row className="my-5">
                <Col>
                    {logged ? (
                        <Button variant="primary" size="lg">
                            Ver clases disponibles
                        </Button>
                    ) : (
                        <Button variant="primary" size="lg">
                            Iniciar sesión para continuar
                        </Button>
                    )}
                </Col>
            </Row>
        </Container>
    );
}

export default UserInfo;

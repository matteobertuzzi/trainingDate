import React, { useContext, useState } from 'react';
import { Container, Row, Col, Card, Button, Carousel } from 'react-bootstrap';
import { Context } from '../store/appContext';
import { Link } from 'react-router-dom'


const TrainerHomepage = () => {
    const currentUser = JSON.parse(localStorage.getItem('availableAccount'));
    const [activeTab, setActiveTab] = useState(null);

    return (

        <Container className='my-2' fluid>
            <Row>
                <Col>
                    <Carousel>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src="https://cdn.static.aptavs.com/imagenes/en-que-consiste-ser-entrenador-personal.jpg"
                                alt="First slide"
                                style={{ objectFit: 'cover', opacity: '0.7' }}
                            />
                            <Card.ImgOverlay className='d-flex flex-column align-items-center justify-content-center mx-3' style={{ textAlign: 'center', color: 'white' }}>
                                <h5><strong>¡Hola, {currentUser.trainer.name}!</strong></h5>
                                <h6>¡Qué emocionante tenerte de vuelta! ¿Estás listo para empezar a crear tus clases y ayudar a tus clientes a alcanzar sus objetivos?</h6>
                                <p >Necesitas ayuda para comenzar o tienes alguna pregunta sobre cómo funciona la aplicación? Aquí encontrarás todo lo que necesitas saber. 😊</p>
                                <Button as={Link} to="/trainers/info" >
                                    Obtener más información
                                </Button>
                            </Card.ImgOverlay>
                        </Carousel.Item>
                    </Carousel>
                </Col>
            </Row>
        </Container>
    );
}

export default TrainerHomepage;

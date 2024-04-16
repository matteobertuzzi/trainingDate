import React, { useContext, useState } from 'react';
import { Container, Row, Col, Card, Button, Carousel } from 'react-bootstrap';
import { Context } from '../store/appContext';
import { Link } from 'react-router-dom';
import img from "/workspaces/sp54-final-project-g3/src/front/img/hutterstock_77087711229557_lm.jpg"


const UserHomepage = () => {
    const currentUser = JSON.parse(localStorage.getItem('availableAccount'));

    return (
        <Container className='p-0 w-100' fluid>
            <Card className="text-white w-100" style={{ borderWidth: '0' }}>
                <Card.Img
                    className="d-block w-100 rounded-0"
                    src={img}
                    alt="First slide"
                    style={{ objectFit: 'cover', filter: 'brightness(70%)' }}
                />
                <Card.ImgOverlay className='d-flex w-auto  flex-column align-items-center justify-content-center mx-3' style={{ textAlign: 'center', color: 'white' }}>
                    <h3><strong>¡Hola, {currentUser.user.name}!</strong></h3>
                    <p>¿Listo para encontrar la clase perfecta para ti? 😊</p>
                    <Button as={Link} to="/users/info">
                        Obtener más información
                    </Button>
                </Card.ImgOverlay>
            </Card>
        </Container >
    );
}

export default UserHomepage;

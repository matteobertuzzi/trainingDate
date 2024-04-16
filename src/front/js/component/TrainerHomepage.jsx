import React, { useContext, useState } from 'react';
import { Container, Row, Col, Card, Button, Carousel } from 'react-bootstrap';
import { Context } from '../store/appContext';
import { Link } from 'react-router-dom';
import personalTrainer from "/workspaces/sp54-final-project-g3/src/front/img/personal-trainer.jpg"

const TrainerHomepage = () => {
    const currentUser = JSON.parse(localStorage.getItem('availableAccount'));
    const [activeTab, setActiveTab] = useState(null);

    // Define a function to calculate font sizes based on screen width
    const getFontSize = () => {
        const screenWidth = window.innerWidth;
        if (screenWidth <= 768) {
            return {
                fontSizeH5: '1.5rem',
                fontSizeH6: '1rem',
                fontSizeP: '0.8rem'
            };
        } else {
            return {
                fontSizeH5: '2rem',
                fontSizeH6: '1.5rem',
                fontSizeP: '1rem'
            };
        }
    };

    const { fontSizeH5, fontSizeH6, fontSizeP } = getFontSize();

    return (
        <Container className='p-0 mx-0' fluid>
            <Card className="text-white w-100" style={{ borderWidth: '0' }}>
                <Card.Img
                    className="rounded-0 img-fluid w-100"
                    src={personalTrainer}
                    alt="First slide"
                    style={{ filter: 'brightness(70%)' }}
                />
                <Card.ImgOverlay className="d-flex flex-column gap-2 justify-content-center align-items-center">
                    <h2><strong>¡Hola, {currentUser.trainer.name}!</strong></h2>
                    <h4>¿Estás listo para empezar a crear tus clases y ayudar a tus clientes a alcanzar sus objetivos?</h4>
                    <Button as={Link} to="/trainers/info">
                        Obtener más información
                    </Button>
                    <Button as={Link} to={`/trainers/${currentUser.trainer.id}/create/class`}>
                        Empezar ya!
                    </Button>
                </Card.ImgOverlay>
            </Card>
        </Container>
    );
}

export default TrainerHomepage;

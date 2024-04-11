import React, { useContext, useState } from 'react';
import { Context } from '../store/appContext';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import TrainerAlert from './TrainerAlert.jsx';
import AllSpecializations from './AllSpecializations.jsx';
import { CreateClass } from '../pages/CreateClass.jsx';
import AddSpecialization from './AddSpecialization.jsx';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom'


const TrainerHomepage = () => {
    const { store, actions } = useContext(Context);
    const currentUser = JSON.parse(localStorage.getItem('availableAccount'));
    const { trainerClasses } = store;
    const trainerSpecializations = currentUser.specializations;
    const [activeTab, setActiveTab] = useState(null);

    const handleTabSelect = (selectedTab) => {
        setActiveTab(selectedTab === activeTab ? null : selectedTab);
    }



    return (
        <Container className='d-flex flex-column justify-content-center align-items-center'>
            <Row className="d-flex flex-row justify-content-center align-items-center p-2">
                <Nav className="d-flex flex-row justify-content-center" style={{ gap: '1rem' }}>
                    <Nav.Item>
                        <Nav.Link as={Link} to={`/trainer/${currentUser.trainer.id}/profile`} style={{ color: '#007bff', textDecoration: 'none', transition: 'color 0.3s' }}>
                            Mi Perfil
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link as={Link} to={`/trainer/${currentUser.trainer.id}/classes`} style={{ color: '#007bff', textDecoration: 'none', transition: 'color 0.3s' }}>
                            Mis Clases
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link as={Link} to={`/trainer/${currentUser.trainer.id}/specializations`} style={{ color: '#007bff', textDecoration: 'none', transition: 'color 0.3s' }}>
                            Mis Especializaciones
                        </Nav.Link>
                    </Nav.Item>
                </Nav>
            </Row>
            <Row className='m-4'>
                <Col className='d-flex justify-content-center'>
                    <Card style={{ height: 'auto', width: '90%', position: 'relative', marginBottom: '20px' }}>
                        <Card.Img
                            src="https://cdn.static.aptavs.com/imagenes/en-que-consiste-ser-entrenador-personal.jpg"
                            style={{
                                width: '100%',
                                height: 'auto',
                                objectFit: 'cover',
                                opacity: 0.8,
                            }}
                            alt="Presentation"
                        />
                        <Card.ImgOverlay style={{ textAlign: 'center' }}>
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>¡Hola, {currentUser.trainer.name}!</h3>
                            <h4 style={{ fontSize: '1rem', lineHeight: '1.5' }}>¡Qué emocionante tenerlo de vuelta! ¿Listo para empezar a crear tus clases y ayudar a tus clientes a alcanzar sus objetivos? </h4>
                            <p> Necesitas ayuda para comenzar o tienes alguna pregunta sobre cómo funciona la aplicación, aqui tednra todo lo que necesitas saber!! 😊</p>
                            <Button as={Link} to="/trainers/info">
                                Info
                            </Button>
                        </Card.ImgOverlay>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Tabs
                        transition={false}
                        id="specialization-class"
                        className="mt-5 d-flex justify-content-center"
                        activeKey={activeTab}
                        onSelect={handleTabSelect}
                    >
                        <Tab eventKey="specialization" title="Añadir nueva especialización">
                            <AddSpecialization />
                        </Tab>
                        <Tab eventKey="class" title="Añadir nueva clase">
                            <CreateClass />
                        </Tab>
                    </Tabs>
                </Col>
            </Row>
        </Container >
    );
}

export default TrainerHomepage;
import React, { useContext } from 'react';
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

const TrainerHomepage = () => {
    const { store, actions } = useContext(Context);
    const currentUser = JSON.parse(localStorage.getItem('availableAccount'));
    console.log(currentUser);
    const { trainerClasses } = store;
    const trainerSpecializations = currentUser.specializations;



    return (
        <Container>
            <Row>
                <Col>
                    <h3 className='mt-3 text-center' style={{ textTransform: 'uppercase', fontWeight: 'bold' }}>Mis Especializaciones</h3>
                    <Card style={{ width: '90%' }}>
                        <Card.Img variant="top" src="https://ncan.us/wp-content/uploads/2020/04/personal-trainer-1024x653.jpg" />
                        <Card.Body>
                            <Card.Title>Mis especializaciones</Card.Title>
                            <Card.Text>
                                Aquí abajo puede ver tus especializaciones.
                            </Card.Text>
                        </Card.Body>
                        <ListGroup className="list-group-flush">
                            {
                                trainerSpecializations != '' ?
                                    trainerSpecializations.map((spec) => (
                                        <ListGroup.Item><b>{spec.specialization.name}</b></ListGroup.Item>
                                    ))
                                    :
                                    <TrainerAlert location='specializations' />
                            }
                        </ListGroup>
                    </Card>
                </Col>
                <Col>
                    <h3 className='mt-3 text-center' style={{ textTransform: 'uppercase', fontWeight: 'bold' }}>Mis Clases</h3>
                    <Card style={{ width: '90%' }}>
                        <Card.Img variant="top" src="https://www.ihrsa.org/uploads/Articles/Column-Width/personal-training_men-exercising-tai-chi_column.jpg" />
                        <Card.Body>
                            <Card.Title>Mis clases</Card.Title>
                            <Card.Text>
                                Aquí abajo puede ver tus clases.
                            </Card.Text>
                        </Card.Body>
                        <ListGroup className="list-group-flush">
                            {
                                trainerClasses != '' ?
                                    trainerClasses.map((classItem) => (
                                        <ListGroup.Item><b>{classItem.class_name} {classItem.id}</b><br /> <b>Dirección: </b>{classItem.city} ({classItem.postal_code}), {classItem.street_name}, {classItem.street_number}</ListGroup.Item>
                                    ))
                                    :
                                    <TrainerAlert location='classes' />
                            }
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
            <Tabs
                defaultActiveKey="home"
                transition={false}
                id="specialization-class"
                className="mt-5 d-flex justify-content-center"
            >
                <Tab eventKey="home" title="Todas las especialización">
                    <AllSpecializations />
                </Tab>
                <Tab eventKey="specialization" title="Añadir nueva especialización">
                    <AddSpecialization />
                </Tab>
                <Tab eventKey="class" title="Añadir nueva clase">
                    <CreateClass />
                </Tab>
            </Tabs>
        </Container >
    );
}

export default TrainerHomepage;
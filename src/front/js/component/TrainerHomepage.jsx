import React, { useState, useContext } from 'react';
import { Context } from '../store/appContext';
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { AddTrainerSpecialization } from '../pages/AddTrainerSpecialization.jsx';
import TrainerAlert from './TrainerAlert.jsx';

const TrainerHomepage = () => {
    const [modalShow, setModalShow] = useState(false);
    const navigate = useNavigate('');
    const { store, actions } = useContext(Context);
    const currentUser = JSON.parse(localStorage.getItem('availableAccount'));
    console.log(currentUser);
    const { trainerClasses } = store;
    const trainerSpecializations = currentUser.specializations;

    const handleCreateClass = async () => {
        navigate(`/trainers/${currentUser.trainer.id}/create/class`)
        actions.getTrainerClasses()
    }

    return (
        <Container>
            <Row>
                <Col>
                    <h3>My Specializations</h3>
                    {trainerSpecializations != '' ?
                        trainerSpecializations.map((spec) => (
                            < Card >
                                <Card.Header>Specialization Details</Card.Header>
                                <Card.Body>
                                    <Card.Title>{spec.specialization.name}</Card.Title>
                                    <Card.Text>
                                        {spec.specialization.description}
                                    </Card.Text>
                                </Card.Body>
                            </Card >
                        ))
                        :
                        <TrainerAlert location='specializations' />
                    }
                    <div style={{ marginTop: '20px', textAlign: 'center' }}>
                        <Button onClick={() => setModalShow(true)}>Add Specialization</Button>
                        <AddTrainerSpecialization show={modalShow} onHide={() => setModalShow(false)} />
                    </div>
                </Col>
                <Col>
                    <h3>My Classes</h3>
                    {trainerClasses != '' ?
                        trainerClasses.map((classItem) => (
                            < Card >
                                <Card.Header>Class Details</Card.Header>
                                <Card.Body>
                                    <Card.Title>{classItem.class_name} {classItem.id}</Card.Title>
                                    <Card.Text>
                                        <ListGroup>
                                            <ListGroup.Item><b>Start date: </b>{classItem.start_date}</ListGroup.Item>
                                            <ListGroup.Item><b>End date: </b>{classItem.end_date}</ListGroup.Item>
                                            <ListGroup.Item><b>City: </b>{classItem.city}, {classItem.postal_code}</ListGroup.Item>
                                            <ListGroup.Item><b>Street: </b>{classItem.street_name}, {classItem.street_number}</ListGroup.Item>
                                        </ListGroup>
                                    </Card.Text>
                                </Card.Body>
                            </Card >
                        ))
                        :
                        <TrainerAlert location='classes' />
                    }
                    <div style={{ marginTop: '20px', textAlign: 'center' }}>
                        <Button onClick={handleCreateClass}>Add class</Button>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default TrainerHomepage;
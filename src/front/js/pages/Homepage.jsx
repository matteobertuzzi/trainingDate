import React, { useState, useContext } from 'react';
import { Context } from '../store/appContext';
import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import HomeClassList from '../component/HomeClassList.jsx';
import HomeUserClasses from '../component/HomeUserClasses.jsx';
import HomeFilters from '../component/HomeFilters.jsx';
import TrainerHomepage from '../component/TrainerHomepage.jsx';


const Homepage = () => {
    const { store, actions } = useContext(Context);
    let isLogged = store.logged
    const currentUser = JSON.parse(localStorage.getItem('availableAccount'))
    const isUser = currentUser && currentUser.role == 'users' ? true : false;
    const isTrainer = currentUser && currentUser.role == 'trainers' ? true : false;
    const [filters, setFilters] = useState({
        trainingLevel: '',
        trainingType: ''
    })

    const handleFilterSubmit = (event, filters) => {
        setFilters(filters);
        console.log('Filters submitted:', filters);
    };


    return (
        <>
            {isLogged && isUser ?
                <div className='container'>
                    <div className='row'>
                        <HomeFilters filters={filters} onFilterSubmit={handleFilterSubmit} />
                    </div>
                    <div className='row'>
                        <HomeClassList filters={filters} />
                    </div>
                    <h3 className='text-center my-4' style={{ textTransform: 'uppercase', fontWeight: 'bold' }}>Mis próximas clases</h3>
                    <HomeUserClasses />
                </div>
                :
                (isLogged && isTrainer) ?
                    <div className='container'>
                        <TrainerHomepage />
                    </div>
                    :
                    <div className='container'>
                        <div className='row'>
                            <HomeFilters filters={filters} onFilterSubmit={handleFilterSubmit} />
                        </div>
                        <div className='row'>
                            <HomeClassList filters={filters} />
                        </div>
                        <Row className='mt-5 d-flex justify-content-center'>
                            <Col md={6} lg={6}>
                                <Card style={{ width: '90%' }}>
                                    <Card.Img variant="top" src="https://hips.hearstapps.com/hmg-prod/images/mh-trainer-2-1533576998.png" />
                                    <Card.Body>
                                        <Card.Title>Entrenador</Card.Title>
                                        <Card.Text>
                                            Darme de alta como entrenador
                                        </Card.Text>
                                        <Button variant="primary">Registrate</Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col md={6} lg={6}>
                                <Card style={{ width: '90%' }}>
                                    <Card.Img variant="top" src="https://cvlifestyles.co.uk/wp-content/uploads/2019/02/personal-training.jpg" />
                                    <Card.Body>
                                        <Card.Title>Usuario</Card.Title>
                                        <Card.Text>
                                            Darme de alta como usuario
                                        </Card.Text>
                                        <Button variant="primary">Registrate</Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </div >
            }
        </>
    );
}

export default Homepage;
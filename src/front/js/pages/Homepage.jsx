import React, { useState, useContext } from 'react';
import { Context } from '../store/appContext';
import { Form, DropdownButton, Dropdown, Button } from 'react-bootstrap';
import InputGroup from 'react-bootstrap/InputGroup';
import HomeClassList from '../component/HomeClassList.jsx';
import HomeUserClasses from '../component/HomeUserClasses.jsx';


const Homepage = () => {
    const { store, actions } = useContext(Context);
    const [trainingType, setTrainingtype] = useState('');
    const [trainingLevel, setTraininglevel] = useState('');

    const userClasses = store.userClasses;


    return (
        <>
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-lg-3 col-md-3 col-sm-10 d-flex-column justify-content-center' style={{ 'backgroundColor': '#D3D3D3', 'height': '100vh' }}>
                        <InputGroup className="my-5 px-3">
                            <Form.Control
                                placeholder="Search city"
                                aria-label="Search city"
                                aria-describedby="search-city"
                            />
                            <Button variant="outline-secondary" id="search-city">
                                <i className="fa-solid fa-magnifying-glass"></i>
                            </Button>
                        </InputGroup>
                        <Form>
                            <Form.Group controlId="trainingType" className='my-4'>
                                <Form.Label>Training Type</Form.Label>
                                <DropdownButton
                                    title={trainingType || 'Select training type'}
                                    onSelect={(eventKey) => setTrainingtype(eventKey)}
                                >
                                    <Dropdown.Item eventKey="hiit">HIIT</Dropdown.Item>
                                    <Dropdown.Item eventKey="spinning">Spinning</Dropdown.Item>
                                    <Dropdown.Item eventKey="aerobics">Aerobics</Dropdown.Item>
                                </DropdownButton>
                            </Form.Group>
                            <Form.Group controlId="priceRangeFilter" className='my-4'>
                                <Form.Label>Training Level</Form.Label>
                                <DropdownButton
                                    title={trainingLevel || 'Select training level'}
                                    onSelect={(eventKey) => setTraininglevel(eventKey)}
                                >
                                    <Dropdown.Item eventKey="beginner">Beginner</Dropdown.Item>
                                    <Dropdown.Item eventKey="intermediate">Intermediate</Dropdown.Item>
                                    <Dropdown.Item eventKey="advanced">Advanced</Dropdown.Item>
                                </DropdownButton>
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Search classes
                            </Button>
                        </Form>
                    </div>
                    <div className='col-lg-6 col-md-6 col-sm-10'>
                        <HomeClassList />
                    </div>
                    <div className='col-lg-3 col-md-3 col-sm-10' style={{ 'backgroundColor': '#D3D3D3', 'height': '100vh' }}>
                        <HomeUserClasses />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Homepage;
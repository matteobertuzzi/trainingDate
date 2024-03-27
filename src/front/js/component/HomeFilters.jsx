import React, { useState, useContext } from 'react';
import { Context } from '../store/appContext';
import { Form, DropdownButton, Dropdown, Button } from 'react-bootstrap';
import InputGroup from 'react-bootstrap/InputGroup';


const HomeFilters = () => {
    const { store, actions } = useContext(Context);
    const [trainingType, setTrainingtype] = useState('');
    const [trainingLevel, setTraininglevel] = useState('');

    const userClasses = store.userClasses;


    return (
        <>
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
        </>
    )
}

export default HomeFilters;
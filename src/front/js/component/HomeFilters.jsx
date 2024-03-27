import React, { useState } from 'react';
import { Form, DropdownButton, Dropdown, Button } from 'react-bootstrap';
import InputGroup from 'react-bootstrap/InputGroup';


const HomeFilters = ({ filters, onFilterChange, onFilterSubmit }) => {
    const [trainingType, setTrainingtype] = useState('');
    const [trainingLevel, setTraininglevel] = useState('');

    const handleFormSubmit = (event) => {
        console.log(event)
        event.preventDefault();
        onFilterSubmit(filters);
    };

    const handleFilters = (selectedValue, name) => {
        onFilterChange({
            ...filters,
            [name]: selectedValue,
        });
        console.log(filters)
    };


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
            <Form onSubmit={handleFormSubmit}>
                <Form.Group controlId="trainingType" className='my-4'>
                    <Form.Label>Training Type</Form.Label>
                    <DropdownButton
                        title={filters.trainingType || 'Select training type'}
                        name='trainingType'
                        value={filters.trainingType}
                        onSelect={(selectedValue) => handleFilters(selectedValue, 'trainingType')}
                    >
                        <Dropdown.Item eventKey="hiit">HIIT</Dropdown.Item>
                        <Dropdown.Item eventKey="spinning">Spinning</Dropdown.Item>
                        <Dropdown.Item eventKey="aerobics">Aerobics</Dropdown.Item>
                    </DropdownButton>
                </Form.Group>
                <Form.Group controlId="trainingLevel" className='my-4'>
                    <Form.Label>Training Level</Form.Label>
                    <DropdownButton
                        title={filters.trainingLevel || 'Select training level'}
                        name='trainingLevel'
                        value={filters.trainingLevel}
                        onSelect={(selectedValue) => handleFilters(selectedValue, 'trainingLevel')}
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
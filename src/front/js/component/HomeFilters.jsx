import React, { useState } from 'react';
import { Form, DropdownButton, Dropdown, Button } from 'react-bootstrap';
import InputGroup from 'react-bootstrap/InputGroup';


const HomeFilters = ({ filters, onFilterChange, onFilterSubmit }) => {
    const [trainingType, setTrainingtype] = useState('');
    const [trainingLevel, setTraininglevel] = useState('');

    const handleFormSubmit = (event) => {
        event.preventDefault();
        onFilterSubmit(filters);
    };

    const handleFilters = (event) => {
        const { name, value } = event.target;
        onFilterChange({
            ...filters,
            [name]: value,
        });
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
                        title={trainingType || 'Select training type'}
                        name='trainingType'
                        value={filters.trainingType}
                        onChange={handleFilters}
                    >
                        <Dropdown.Item value="hiit">HIIT</Dropdown.Item>
                        <Dropdown.Item value="spinning">Spinning</Dropdown.Item>
                        <Dropdown.Item value="aerobics">Aerobics</Dropdown.Item>
                    </DropdownButton>
                </Form.Group>
                <Form.Group controlId="trainingLevel" className='my-4'>
                    <Form.Label>Training Level</Form.Label>
                    <DropdownButton
                        title={trainingLevel || 'Select training level'}
                        name='trainingLevel'
                        value={filters.trainingLevel}
                        onChange={handleFilters}
                    >
                        <Dropdown.Item value="beginner">Beginner</Dropdown.Item>
                        <Dropdown.Item value="intermediate">Intermediate</Dropdown.Item>
                        <Dropdown.Item value="advanced">Advanced</Dropdown.Item>
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
import React, { useState, useContext } from 'react';
import { Context } from '../store/appContext';
import { Form, DropdownButton, Dropdown, Button } from 'react-bootstrap';
import InputGroup from 'react-bootstrap/InputGroup';


const HomeFilters = ({ filters, onFilterChange, onFilterSubmit }) => {
    const { store, actions } = useContext(Context);
    const specializations = store.specializations;

    const handleFormSubmit = (event) => {
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
                        {specializations.map((specialization) =>
                            <Dropdown.Item eventKey={specialization.id}>{specialization.name}</Dropdown.Item>
                        )}
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
                        <Dropdown.Item eventKey="Beginner">Beginner</Dropdown.Item>
                        <Dropdown.Item eventKey="Intermediate">Intermediate</Dropdown.Item>
                        <Dropdown.Item eventKey="Advanced">Advanced</Dropdown.Item>
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
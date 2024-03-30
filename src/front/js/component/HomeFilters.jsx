import React, { useState, useContext } from 'react';
import { Context } from '../store/appContext';
import { Form, Button } from 'react-bootstrap';
import InputGroup from 'react-bootstrap/InputGroup';

const HomeFilters = ({ filters, onFilterChange, onFilterSubmit }) => {
    const { store, actions } = useContext(Context);
    const specializations = store.specializations;

    const handleFormSubmit = (event) => {
        console.log("Form submitted");
        event.preventDefault();
        onFilterSubmit(filters);
        onFilterChange({
            trainingType: '',
            trainingLevel: ''
        });
    };

    const handleFilters = (selectedValue, name) => {
        onFilterChange({
            ...filters,
            [name]: selectedValue,
        });
        console.log(filters);
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
                    <Form.Select
                        aria-label="training-type"
                        value={filters.trainingType}
                        onChange={(e) => handleFilters(e.target.value, 'trainingType')}
                    >
                        <option>Select training type</option>
                        {specializations.map((specialization) =>
                            <option key={specialization.id} value={specialization.id}>{specialization.name}</option>
                        )}
                    </Form.Select>
                </Form.Group>
                <Form.Group controlId="trainingLevel" className='my-4'>
                    <Form.Label>Training Level</Form.Label>
                    <Form.Select
                        aria-label="training-level"
                        value={filters.trainingLevel}
                        onChange={(e) => handleFilters(e.target.value, 'trainingLevel')}
                    >
                        <option>Select training level</option>
                        <option value='Beginner'>Beginner</option>
                        <option value='Intermediate'>Intermediate</option>
                        <option value='Advanced'>Advanced</option>
                    </Form.Select>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Filter classes
                </Button>
            </Form>
        </>
    )
}

export default HomeFilters;


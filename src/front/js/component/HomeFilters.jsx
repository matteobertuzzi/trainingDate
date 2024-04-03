import React, { useState, useContext } from 'react';
import { Context } from '../store/appContext';
import { Form, Button } from 'react-bootstrap';
import InputGroup from 'react-bootstrap/InputGroup';

const HomeFilters = ({ filters, onFilterSubmit }) => {
    const { store, actions } = useContext(Context);
    const specializations = store.specializations;
    const [filter, setFilter] = useState({
        trainingType: '',
        trainingLevel: ''
    })

    const handleFormSubmit = (event) => {
        console.log("Form submitted. New filters: " + filter);
        event.preventDefault();
        onFilterSubmit(event, filter);
        setFilter({
            trainingType: '',
            trainingLevel: ''
        });
    };

    const handleFilters = (selectedValue, name) => {
        setFilter({
            ...filter,
            [name]: selectedValue,
        });
        console.log(filter);
    };

    const handleFilterReset = (event) => {
        event.preventDefault();
        onFilterSubmit(event, filter)
    }

    const searchGym = (event) => {
        event.preventDefault();
        actions.searchGym(event.target.value)
    }

    return (
        <>
            <InputGroup className="my-5 px-3">
                <Form.Control
                    placeholder="Search city"
                    aria-label="Search city"
                    aria-describedby="search-city"
                    onSubmit={searchGym}
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
                        value={filter.trainingType}
                        onChange={(e) => handleFilters(e.target.value, 'trainingType')}
                        required
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
                        value={filter.trainingLevel}
                        onChange={(e) => handleFilters(e.target.value, 'trainingLevel')}
                        required
                    >
                        <option>Select training level</option>
                        <option value='Beginner'>Beginner</option>
                        <option value='Intermediate'>Intermediate</option>
                        <option value='Advanced'>Advanced</option>
                    </Form.Select>
                </Form.Group>
                <div className='d-flex justify-content-center'>
                    <Button variant="primary" type="submit">
                        Filter classes
                    </Button>
                    <Button variant="danger" type="reset" onClick={handleFilterReset} className='mx-3'>
                        Reset filters
                    </Button>
                </div>
            </Form>
        </>
    )
}

export default HomeFilters;


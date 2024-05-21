import React, { useState, useEffect, useContext } from 'react';
import { Context } from '../store/appContext';
import { Form, Button, Navbar, Nav, Col, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

const HomeFilters = ({ onFilterSubmit }) => {
    const { store, actions } = useContext(Context);
    const specializations = store.specializations;
    const [activeButton, setActiveButton] = useState("filter")
    const [inputs, setInputs] = useState({
        trainingType: '',
        trainingLevel: '',
        startDate: '',
        searchCity: '',
        minPrice: 0,
        maxPrice: 100
    });

    const handleFormSubmit = (event) => {
        event.preventDefault();
        onFilterSubmit(event, inputs);
        setActiveButton('reset')
    };

    const handleChange = (event) => {
        event.persist();
        const { name, value } = event.target;
        setInputs(prevInputs => {
            const updatedInputs = { ...prevInputs, [name]: value };
            return updatedInputs;
        });
    };

    const handleFilterReset = (event) => {
        event.preventDefault();
        setInputs({
            trainingType: '',
            trainingLevel: '',
            startDate: '',
            searchCity: '',
            minPrice: 0,
            maxPrice: 100
        });
        const emptyFilters = {
            trainingType: '',
            trainingLevel: '',
            startDate: '',
            searchCity: '',
        };
        onFilterSubmit(event, emptyFilters);
        setActiveButton('filter')
    };

    const handleRangeChange = (value) => {
        setInputs(prevInputs => {
            const updatedInputs = { ...prevInputs, minPrice: value[0], maxPrice: value[1] };
            return updatedInputs;
        });
    };


    return (
        <Navbar expand="lg" className="py-2">
            <Nav className="d-flex flex-column gap-2 ">
                <h2 className='d-flex text-center justify-content-center align-items-center d-none d-md-block'>Filtros</h2>
                <Form onSubmit={handleFormSubmit} className="d-flex flex-column w-auto gap-3 align-items-between justify-content-center p-3">
                    <Form.Group controlId="searchCity">
                        <span>Busca por ciudad:</span>
                        <Form.Control
                            type="text"
                            placeholder="Search"
                            className=" mr-sm-2"
                            onChange={handleChange}
                            value={inputs.searchCity}
                            name="searchCity"
                        />
                    </Form.Group>
                    <Form.Group controlId="startDate">
                        <span>Fecha de inicio:</span>
                        <Form.Control
                            type="date"
                            value={inputs.startDate}
                            onChange={handleChange}
                            required
                            name="startDate"
                        />
                    </Form.Group>
                    <Form.Group controlId="trainingType">
                        <span>Tipo entrenamiento:</span>
                        <Form.Select
                            aria-label="training-type"
                            value={inputs.trainingType}
                            onChange={handleChange}
                            required
                            className="form-select-sm d-flex flex-column gap-2"
                            name="trainingType"
                        >
                            <option value="" disabled hidden>-------</option>
                            {specializations.map((specialization) =>
                                <option key={specialization.id} value={parseInt(specialization.id)}>{specialization.name}</option>
                            )}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group controlId="trainingLevel">
                        <span>Nivel entrenamiento:</span>
                        <Form.Select
                            aria-label="training-level"
                            value={inputs.trainingLevel}
                            onChange={handleChange}
                            required
                            className="form-select-sm"
                            name="trainingLevel"
                        >
                            <option value="" className='w-100' disabled hidden>-------</option>
                            <option value='Beginner'>Principiante</option>
                            <option value='Intermediate'>Intermedio</option>
                            <option value='Advanced'>Avanzado</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group>
                        <span>Rango de precio:</span>
                        <Slider
                            range
                            min={0}
                            max={100}
                            defaultValue={[0, 100]}
                            value={[inputs.minPrice, inputs.maxPrice]}
                            onChange={handleRangeChange}
                        />
                        <div className="d-flex justify-content-between">
                            <span>{inputs.minPrice}€</span>
                            <span>{inputs.maxPrice}€</span>
                        </div>
                    </Form.Group>
                    <div className="d-flex flex-column flex-sm-row align-items-center justify-content-center">
                        {activeButton === 'filter' && (
                            <Button onClick={handleFormSubmit} variant="success" type="submit" className="btn-sm">
                                Filtrar clases
                            </Button>
                        )}
                        {activeButton === 'reset' && (
                            <Button variant="danger" type="reset" onClick={handleFilterReset} className='btn-sm'>
                                Restablecer filtros
                            </Button>
                        )}
                    </div>
                </Form>
            </Nav>
        </Navbar >
    );
};

export default HomeFilters;
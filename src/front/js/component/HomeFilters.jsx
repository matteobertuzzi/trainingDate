import React, { useState, useEffect, useContext } from 'react';
import { Context } from '../store/appContext';
import { Form, Button, Navbar, Nav, Col, Row } from 'react-bootstrap';

const HomeFilters = ({ filters, onFilterSubmit }) => {
    const { store, actions } = useContext(Context);
    const specializations = store.specializations;
    const [input, setInput] = useState("");
    const [isValid, setIsValid] = useState(null);
    const [filter, setFilter] = useState({
        trainingType: '',
        trainingLevel: '',
        startDate: '',
        searchCity: ''
    });

    const handleFormSubmit = (event) => {
        event.preventDefault();
        onFilterSubmit(event, filter);
        setFilter({
            trainingType: '',
            trainingLevel: '',
            startDate: '',
            searchCity: ''
        });
    };

    const handleFilters = (selectedValue, name) => {
        setFilter({
            ...filter,
            [name]: selectedValue,
        });
    };

    const handleFilterReset = (event) => {
        event.preventDefault();
        setFilter({
            trainingType: '',
            trainingLevel: '',
            startDate: '',
            searchCity: ''
        });
        onFilterSubmit(event, filter);
    };

    return (
        <Navbar expand="lg" className="py-2">
            <Nav className="d-flex flex-column gap-2 ">
                <Form onSubmit={handleFormSubmit} className="d-flex flex-column gap-3 align-items-between justify-content-center p-3">
                    <Form.Group controlId="startDate">
                        <span>Busca por ciudad:</span>
                        <Form.Control
                            type="text"
                            placeholder="Search"
                            className=" mr-sm-2"
                            onChange={(e) => handleFilters(e.target.value, 'searchCity')}
                        />
                    </Form.Group>
                    <Form.Group controlId="startDate">
                        <span>Fecha de inicio:</span>
                        <Form.Control
                            type="date"
                            value={filter.startDate}
                            onChange={(e) => handleFilters(e.target.value, 'startDate')}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="trainingType">
                        <span>Tipo entrenamiento:</span>
                        <Form.Select
                            aria-label="training-type"
                            value={filter.trainingType}
                            onChange={(e) => handleFilters(e.target.value, 'trainingType')}
                            required
                            className="form-select-sm d-flex flex-column gap-2"
                        >
                            <option value="" disabled hidden>-------</option>
                            {specializations.map((specialization) =>
                                <option key={specialization.id} value={specialization.id}>{specialization.name}</option>
                            )}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group controlId="trainingLevel">
                        <span>Nivel entrenamiento:</span>
                        <Form.Select
                            aria-label="training-level"
                            value={filter.trainingLevel}
                            onChange={(e) => handleFilters(e.target.value, 'trainingLevel')}
                            required
                            className="form-select-sm"
                        >
                            <option value="" className='w-100' disabled hidden>-------</option>
                            <option value='Beginner'>Principiante</option>
                            <option value='Intermediate'>Intermedio</option>
                            <option value='Advanced'>Avanzado</option>
                        </Form.Select>
                    </Form.Group>
                    <div className="d-flex flex-column flex-sm-row align-items-center gap-3">
                        <Button variant="primary" type="submit" className="btn-sm">
                            Filtrar clases
                        </Button>
                        <Button variant="danger" type="reset" onClick={handleFilterReset} className='btn-sm'>
                            Restablecer filtros
                        </Button>
                    </div>
                </Form>
            </Nav>
        </Navbar >
    );
};

export default HomeFilters;
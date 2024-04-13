import React, { useState, useEffect, useContext } from 'react';
import { Context } from '../store/appContext';
import { Form, Button, Navbar, Nav, Col, Row } from 'react-bootstrap';

const HomeFilters = ({ filters, onFilterSubmit }) => {
    const { store, actions } = useContext(Context);
    const specializations = store.specializations;
    const [filter, setFilter] = useState({
        trainingType: '',
        trainingLevel: ''
    });

    const handleFormSubmit = (event) => {
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
    };

    const handleFilterReset = (event) => {
        event.preventDefault();
        onFilterSubmit(event, filter);
    };

    return (
        <div className="d-flex justify-content-center" style={{ alignItems: 'end !important' }}>
            <Navbar expand="lg" className="py-2">
                <Row>
                    <Nav className="align-items-center ">
                        <Form onSubmit={handleFormSubmit} className="d-flex flex-column flex-sm-row align-items-center justify-content-center">
                            <Col className='d-flex flex-row align-items-center justify-content-center flex-wrap gap-2 my-1 mx-2'>
                                <Form.Group controlId="trainingType">
                                    <Form.Select
                                        aria-label="training-type"
                                        value={filter.trainingType}
                                        onChange={(e) => handleFilters(e.target.value, 'trainingType')}
                                        required
                                        className="form-select-sm"
                                    >
                                        <option>Selecciona tipo de entrenamiento</option>
                                        {specializations.map((specialization) =>
                                            <option key={specialization.id} value={specialization.id}>{specialization.name}</option>
                                        )}
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group controlId="trainingLevel">
                                    <Form.Select
                                        aria-label="training-level"
                                        value={filter.trainingLevel}
                                        onChange={(e) => handleFilters(e.target.value, 'trainingLevel')}
                                        required
                                        className="form-select-sm"
                                    >
                                        <option>Selecciona nivel de entrenamiento</option>
                                        <option value='Beginner'>Principiante</option>
                                        <option value='Intermediate'>Intermedio</option>
                                        <option value='Advanced'>Avanzado</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col >
                            <Col className="my-1 mx-2 d-flex flex-row gap-2">
                                <div className="d-flex flex-column flex-sm-row align-items-center gap-3">
                                    <Button variant="primary" type="submit" className="btn-sm">
                                        Filtrar clases
                                    </Button>
                                    <Button variant="danger" type="reset" onClick={handleFilterReset} className='btn-sm'>
                                        Restablecer filtros
                                    </Button>
                                </div>
                            </Col>
                        </Form>
                    </Nav>
                </Row>
            </Navbar >
        </div>
    );
};

export default HomeFilters;

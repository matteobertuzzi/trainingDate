import React, { useState, useEffect, useContext } from 'react';
import { Context } from '../store/appContext';
import { Form, Button, Navbar, Nav } from 'react-bootstrap';

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
                <Nav className="align-items-center ">
                    <Form onSubmit={handleFormSubmit} className="d-flex justify-content-center">
                        <Form.Group controlId="trainingType" className='my-1 mx-2'>
                            <Form.Label className="me-2 mb-0">Tipo de Entrenamiento</Form.Label>
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
                        <Form.Group controlId="trainingLevel" className='my-1 mx-2'>
                            <Form.Label className="me-2 mb-0">Nivel de Entrenamiento</Form.Label>
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
                        <div className="d-flex align-items-center"> {/* Added align-items-center for vertical centering */}
                            <Button variant="primary" type="submit" className="btn-sm mx-2">
                                Filtrar clases
                            </Button>
                            <Button variant="danger" type="reset" onClick={handleFilterReset} className='btn-sm mx-2'>
                                Restablecer filtros
                            </Button>
                        </div>
                    </Form>
                </Nav>
            </Navbar >
        </div>
    );
};

export default HomeFilters;

import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { useParams } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";


const AddSpecialization = () => {
    const { store, actions } = useContext(Context);
    const { specializations } = store;
    const { postTrainerSpecialization } = actions;
    const params = useParams();
    const [validated, setValidated] = useState(false);
    const [error, setError] = useState(null);
    const [inputs, setInputs] = useState({
        certification: "",
        specialization_id: ""
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
        }
        setValidated(true);
        const postSpecialization = await postTrainerSpecialization(inputs);
        if (!postSpecialization) {
            setError(
                "El entrenador ya tiene esta especialidad confirmada o pendiente de confirmar."
            );
        } else {
            alert(
                "Los datos han sido enviados, después de las verificaciones recibirá la confirmación de su nueva especialidad."
            );
            setInputs({
                certification: "",
                specialization_id: ""
            });
            setError(null);
        }
    };

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "specialization_id") {
            setInputs((prevState) => ({
                ...prevState,
                [name]: value
            }));
        } else if (name === "certification") {
            setInputs((prevState) => ({
                ...prevState,
                certification: files[0]
            }));
        }
    };

    return (
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group controlId="validationSpecialization">
                <Form.Label>Especialización</Form.Label>
                <Form.Control
                    required
                    type="file"
                    onChange={handleChange}
                    name="certification"
                    aria-describedby="inputGroupFileAddon"
                />
                <Form.Control.Feedback type="invalid">
                    Por favor, selecciona un archivo de certificación.
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="specialization">
                <Form.Label>Tipo de entrenamiento:</Form.Label>
                <Form.Select
                    onChange={handleChange}
                    name="specialization_id"
                    value={inputs.specialization_id}
                    required
                >
                    <option value="">Selecciona una especialización</option>
                    {specializations.map((specialization) => (
                        <option key={specialization.id} value={specialization.id}>
                            {specialization.name.charAt(0).toUpperCase() +
                                specialization.name.slice(1)}
                        </option>
                    ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                    Por favor, elige un tipo de especialización.
                </Form.Control.Feedback>
            </Form.Group>
            {error && <div className="text-danger mt-2">{error}</div>}
            <Button type="submit" variant="success">
                Crear
            </Button>
        </Form>
    );
};

export default AddSpecialization;

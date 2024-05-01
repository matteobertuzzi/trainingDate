import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Context } from '../store/appContext';
import { Container, Row, Col, Card, Image, Button, ListGroup } from 'react-bootstrap';
import Loading from '../component/Loading.jsx';
import EditTrainerProfile from '../component/EditTrainerProfile.jsx';
import { AddTrainerSpecialization } from './AddTrainerSpecialization.jsx';
import { RiArrowGoBackLine } from "react-icons/ri";


const TrainerProfile = () => {
    const [modalShow, setModalShow] = useState(false);
    const { id } = useParams();
    const { store, actions } = useContext(Context);
    const { currentUser } = store
    const trainer = currentUser && currentUser.trainer;
    let profilePictureMan = 'https://st3.depositphotos.com/9998432/13335/v/450/depositphotos_133351928-stock-illustration-default-placeholder-man-and-woman.jpg';
    let profilePictureWoman = 'https://png.pngtree.com/png-vector/20220607/ourmid/pngtree-person-gray-photo-placeholder-woman-in-t-shirt-on-white-background-png-image_4853921.png';

    async function fetchTrainer() {
        const trainerId = id;
        const token = localStorage.getItem("accessToken");
        if (!token) {
            console.error("¡No se proporcionó el token de acceso!");
            return null;
        }
        const options = {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const url = process.env.BACKEND_URL + `trainers/${trainerId}`;
        const response = await fetch(url, options);
        if (!response.ok) {
            console.error(`Error al obtener los datos del entrenador. Estado HTTP ${response.status}`);
            return null;
        }
        const data = await response.json();
        const trainerData = data.trainer;
        return trainerData;
    }

    useEffect(() => {
        fetchTrainer();
    }, []);

    if (!currentUser) {
        return <Loading />;
    }

    return (
        <Container className="my-4">
            <Row className='d-flex flex-row justify-content-center align-items-center'>
                <Col className='d-flex flex-row justify-content-center align-items-center'>
                    <div className="border rounded p-4 d-flex flex-column justify-content-center align-items-center" style={{ boxShadow: '0 0 10px rgba(255, 165, 0, 0.5)' }}>
                        <h4 className="text-center mb-2">Perfil</h4>
                        <h5 className="text-center">Aquí puedes visualizar los datos de tu perfil y modificarlos.</h5>
                        <EditTrainerProfile trainer={trainer} onChangeSubmit={fetchTrainer} />
                    </div>
                </Col>
            </Row>
            <Row className="p-3">
                <Col className='d-flex flex-column w-100 justify-content-center align-items-center gap-3'>
                    <Image
                        src={trainer.gender === 'Male' ? profilePictureMan : profilePictureWoman}
                        roundedCircle
                        fluid
                        style={{ maxHeight: '250px' }}
                    />
                    <div className="d-flex flex-row gap-5 align-items-center mt-3">
                        <Link to={trainer.facebook_url}>
                            <i className="fab fa-facebook-f fa-lg"></i>
                        </Link>
                        <Link to={trainer.x_url}>
                            <i className="fab fa-twitter fa-lg"></i>
                        </Link>
                        <Link to={trainer.instagram_url}>
                            <i className="fab fa-instagram fa-lg"></i>
                        </Link>
                    </div>
                    <ListGroup className="d-flex flex-column justify-content-center align-items-center mt-3 p-2">
                        <ListGroup.Item className='d-flex flex-row align-items-center justify-content-center' action variant="secondary">
                            <h2 className='d-flex flex-row align-items-center justify-content-center mb-0'>{trainer.name} {trainer.last_name}</h2>
                        </ListGroup.Item>
                        <ListGroup.Item className='d-flex flex-row align-items-center justify-content-center' action variant="secondary">
                            <p className='mb-0'><strong>Correo electrónico:</strong> {trainer.email}</p>
                        </ListGroup.Item>
                        <ListGroup.Item className='d-flex flex-row align-items-center justify-content-center' action variant="secondary">
                            <p className='mb-0'><strong>Teléfono:</strong> {trainer.phone_number}</p>
                        </ListGroup.Item>
                        <ListGroup.Item className='d-flex flex-row align-items-center justify-content-center' action variant="secondary">
                            <p className='mb-0'><strong>Género:</strong> {trainer.gender === "Male" ? "Masculino" : trainer.gender === "Female" ? "Femenino" : "No especificado"}</p>
                        </ListGroup.Item>
                        <ListGroup.Item className='d-flex flex-row align-items-center justify-content-center' action variant="secondary">
                            <p className='mb-0'><strong>IBAN:</strong> {trainer.iban}</p>
                        </ListGroup.Item>
                        <ListGroup.Item className='d-flex flex-row align-items-center justify-content-center' action variant="secondary">
                            <p className='mb-0'><strong>Ciudad:</strong> {trainer.city}</p>
                        </ListGroup.Item>
                        <ListGroup.Item className='d-flex flex-row align-items-center justify-content-center' action variant="secondary">
                            <p className='mb-0'><strong>Código Postal:</strong> {trainer.postal_code}</p>
                        </ListGroup.Item>
                        <ListGroup.Item className='d-flex flex-row align-items-center justify-content-center' action variant="secondary">
                            <p className='mb-0'><strong>URL del sitio web:</strong> {trainer.website_url}</p>
                        </ListGroup.Item>
                    </ListGroup>

                </Col>
            </Row>
        </Container>
    );
}

export default TrainerProfile;
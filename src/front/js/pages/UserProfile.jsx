import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Context } from '../store/appContext';
import { Container, Row, Col, ListGroup, Image, Button } from 'react-bootstrap';
import Loading from '../component/Loading.jsx';
import EditUserProfile from '../component/EditUserProfile.jsx';
import { DeleteUserModal } from '../component/DeleteUserModal.jsx'
import { RiArrowGoBackLine } from "react-icons/ri";


const UserProfile = () => {
    const { id } = useParams();
    const { store, actions } = useContext(Context);
    const { currentUser } = store
    const [modalShow, setModalShow] = useState(false);
    const user = currentUser && currentUser.user;
    let profilePictureMan = 'https://st3.depositphotos.com/9998432/13335/v/450/depositphotos_133351928-stock-illustration-default-placeholder-man-and-woman.jpg';
    let profilePictureWoman = 'https://png.pngtree.com/png-vector/20220607/ourmid/pngtree-person-gray-photo-placeholder-woman-in-t-shirt-on-white-background-png-image_4853921.png';

    async function fetchUser() {
        const userId = id;
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
        const url = process.env.BACKEND_URL + `users/${userId}`;
        const response = await fetch(url, options);
        if (!response.ok) {
            console.error(`Error al obtener los datos del usuario. Estado HTTP ${response.status}`);
            return null;
        }
        const data = await response.json();
        const userData = data.user;
        return userData;
    };

    useEffect(() => {
        fetchUser();
    }, []);

    if (!currentUser) {
        return <Loading />;
    }

    return (
        <Container className="mb-5 mt-4">
            <Row className="d-flex justify-content-center align-items-center">
                <Col className='d-flex flex-row justify-content-center align-items-center gap-2 mb-2 p-3'>
                    <div className="border rounded p-4 d-flex flex-column justify-content-center align-items-center" style={{ boxShadow: '0 0 10px rgba(255, 165, 0, 0.5)' }}>
                        <h4 className="text-center mb-2">Perfil</h4>
                        <h5 className="text-center">Aquí puedes visualizar los datos de tu perfil y modificarlos.</h5>
                        <div className='d-flex flex-row justify-content-center align-items-center gap-2 mt-1'>
                            <EditUserProfile user={user} onChangeSubmit={fetchUser} />
                            <Button variant="danger" onClick={() => setModalShow(true)} >Cancelar perfil</Button>
                            <DeleteUserModal show={modalShow} onHide={() => setModalShow(false)} />
                        </div>
                    </div>
                </Col>
            </Row>
            <Row className="p-3">
                <Col className='d-flex flex-column w-100 justify-content-center align-items-center gap-3'>
                    <Image
                        src={currentUser.user.gender !== 'Male' ? profilePictureWoman : profilePictureMan}
                        roundedCircle
                        fluid
                        style={{ maxHeight: '250px' }}
                    />
                    <ListGroup className="d-flex flex-column justify-content-center align-items-center mt-3 p-2">
                        <ListGroup.Item className='d-flex flex-row align-items-center justify-content-center' action variant="secondary">
                            <h2 className='d-flex flex-row align-items-center justify-content-center'>{user.name} {user.last_name}</h2>
                        </ListGroup.Item>
                        <ListGroup.Item className='d-flex flex-row align-items-center justify-content-center' action variant="secondary">
                            <span className='d-flex flex-row align-items-center justify-content-center gap-1'><strong>Correo electrónico:</strong> {user.email}</span>
                        </ListGroup.Item>
                        <ListGroup.Item className='d-flex flex-row align-items-center justify-content-center' action variant="secondary">
                            <span className='d-flex flex-row align-items-center justify-content-center gap-1'><strong>Teléfono:</strong> {user.phone_number}</span>
                        </ListGroup.Item>
                        <ListGroup.Item className='d-flex flex-row align-items-center justify-content-center' action variant="secondary">
                            <span className='d-flex flex-row align-items-center justify-content-center gap-1'><strong>Ciudad:</strong> {user.city}</span>
                        </ListGroup.Item>
                        <ListGroup.Item className='d-flex flex-row align-items-center justify-content-center' action variant="secondary">
                            <span className='d-flex flex-row align-items-center justify-content-center gap-1'><strong>Código Postal:</strong> {user.postal_code}</span>
                        </ListGroup.Item>
                        <ListGroup.Item className='d-flex flex-row align-items-center justify-content-center' action variant="secondary">
                            <span className='d-flex flex-row align-items-center justify-content-center gap-1'><strong>Género:</strong> {user.gender === "Male" ? "Masculino" : user.gender === "Female" ? "Femenino" : "No especificado"}</span>
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
            </Row>
        </Container>
    );
};

export default UserProfile;
import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Context } from '../store/appContext';
import { Container, Row, Col, Card, Image, Button } from 'react-bootstrap';
import Loading from '../component/Loading.jsx';
import EditUserProfile from '../component/EditUserProfile.jsx';
import DeleteUserModal from '../component/DeleteUserModal.jsx'
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
        <Container className="min-vh-100 mb-3 mt-4 flex-column">
            <Row className='m-3 d-flex flex-row gap-2'>
                <Link to={"/"}>
                    <RiArrowGoBackLine /> Volver atrás
                </Link>
            </Row>
            <Row className="d-flex justify-content-center mt-6">
                <Col xs={12} md={8}>
                    <Card className="shadow p-3 w-auto">
                        <Card.Body>
                            <Row>
                                <Col xs={12} sm={6} className="mb-3 mb-sm-0 d-flex flex-column gap-3 justify-content-center align-items-center">
                                    <Image
                                        src={currentUser.user.gender !== 'Male' ? profilePictureWoman : profilePictureMan}
                                        roundedCircle
                                        fluid
                                        style={{ maxHeight: '250px' }}
                                    />
                                    <div className="d-flex flex-row gap-5 align-items-center mt-3">
                                        <i className="fab fa-facebook-f fa-lg"></i>
                                        <i className="fab fa-twitter fa-lg"></i>
                                        <i className="fab fa-instagram fa-lg"></i>
                                    </div>
                                </Col>
                                <Col xs={12} sm={6}>
                                    <h2 className="mb-4">{user.name} {user.last_name}</h2>
                                    <p><strong>Correo electrónico:</strong> {user.email}</p>
                                    <p><strong>Teléfono:</strong> {user.phone_number}</p>
                                    <p><strong>Ciudad:</strong> {user.city}</p>
                                    <p><strong>Código Postal:</strong> {user.postal_code}</p>
                                    <p><strong>Género:</strong> {user.gender === "Male" ? "Masculino" : user.gender === "Female" ? "Femenino" : "No especificado"}</p>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row className='d-flex flex-row justify-content-center align-items-center gap-3'>
                <Col className="mt-4 d-flex flex-row gap-2 align-items-center justify-content-center">
                    <EditUserProfile user={user} onChangeSubmit={fetchUser} />
                    <Button variant="danger" onClick={() => setModalShow(true)} >Cancelar perfil</Button>
                </Col>
            </Row>
            <DeleteUserModal show={modalShow} onHide={() => setModalShow(false)} />
        </Container>
    );
};

export default UserProfile;
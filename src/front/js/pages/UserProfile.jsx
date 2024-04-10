import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Context } from '../store/appContext';
import { Container, Row, Col, Card, Image, Button } from 'react-bootstrap';
import Loading from '../component/Loading.jsx';
import EditUserProfile from '../component/EditUserProfile.jsx';

const UserProfile = () => {
    const { id } = useParams();
    const { store, actions } = useContext(Context);
    const { currentUser } = store;
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
        const url = process.env.BACKEND_URL + `/api/users/${userId}`;
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
        <Container>
            <Row className="justify-content-center mt-4">
                <Col xs={12} md={8}>
                    <Card className="shadow">
                        <Card.Body>
                            <Row>
                                <Col xs={12} sm={4} className="text-center mb-3 mb-sm-0">
                                    <Image src={user.gender !== 'Male' ? profilePictureWoman : profilePictureMan} roundedCircle fluid style={{ maxHeight: '250px' }} />
                                </Col>
                                <Col xs={12} sm={8}>
                                    <h2 className="mb-4">{user.name} {user.last_name}</h2>
                                    <p><strong>Correo electrónico:</strong> {user.email}</p>
                                    <p><strong>Teléfono:</strong> {user.phone_number}</p>
                                    <p><strong>Ciudad:</strong> {user.city}</p>
                                    <p><strong>Código Postal:</strong> {user.postal_code}</p>
                                    <div className="mt-4">
                                        <EditUserProfile user={user} onChangeSubmit={fetchUser} />
                                    </div>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default UserProfile;
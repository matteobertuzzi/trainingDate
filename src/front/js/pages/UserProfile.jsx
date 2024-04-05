import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Context } from '../store/appContext';
import { Container, Row, Col, Card, Image } from 'react-bootstrap';
import Loading from '../component/Loading.jsx';
import EditUserProfile from '../component/EditUserProfile.jsx';



const UserProfile = () => {
    const { id } = useParams();
    const { store, actions } = useContext(Context);
    const currentUser = JSON.parse(localStorage.getItem('availableAccount'));
    const user = currentUser.user;
    let profilePictureMan = 'https://st3.depositphotos.com/9998432/13335/v/450/depositphotos_133351928-stock-illustration-default-placeholder-man-and-woman.jpg'
    let profilePictureWoman = 'https://png.pngtree.com/png-vector/20220607/ourmid/pngtree-person-gray-photo-placeholder-woman-in-t-shirt-on-white-background-png-image_4853921.png'

    async function fetchUser() {
        const userId = id
        const token = localStorage.getItem("accessToken");
        if (!token) {
            console.error("No access token provided!");
            return null;
        }
        const options = {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const url = process.env.BACKEND_URL + `/api/users/${userId}`
        const response = await fetch(url, options)
        if (!response.ok) {
            console.error(`Error fetching user data. HTTP Status ${response.status}`)
            return null
        }
        const data = await response.json();
        const userData = data.user;
        console.log(userData);
        return userData;
    };

    useEffect(() => {
        fetchUser();
    }, [])

    if (!currentUser || !currentUser.users) {
        return <Loading />;
    }

    return (
        <Container>
            <Row className="justify-content-md-center mt-4">
                {user ?
                    <>
                        <Col xs={3}>
                            <Image src={user.gender != 'Male' ? profilePictureWoman : profilePictureMan} roundedCircle fluid />
                        </Col>
                        <Col md={9}>
                            <Card>
                                <Card.Body>
                                    <Card.Title>User Information</Card.Title>
                                    <Card.Text>
                                        <strong>Name:</strong> {user.name}<br />
                                        <strong>Last Name:</strong> {user.last_name}<br />
                                        <strong>Email:</strong> {user.email}<br />
                                        <strong>Phone:</strong> {user.phone_number}<br />
                                        <strong>City:</strong> {user.city}<br />
                                        <strong>Postal Code:</strong> {user.postal_code}<br />
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                            <div style={{ marginTop: '20px', textAlign: 'center' }}>
                                <EditUserProfile user={user} onChangeSubmit={fetchUser} />
                            </div>
                        </Col>
                    </>
                    :
                    <Loading />
                }
            </Row>
        </Container>
    );
};

export default UserProfile;

import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Context } from '../store/appContext';
import { Container, Row, Col, Card, Image } from 'react-bootstrap';
import Loading from '../component/Loading.jsx';
import EditTrainerProfile from '../component/EditTrainerProfile.jsx';


const TrainerProfile = () => {
    const { id } = useParams();
    const { store, actions } = useContext(Context);
    const [trainer, setTrainer] = useState(null)
    let profilePictureMan = 'https://st3.depositphotos.com/9998432/13335/v/450/depositphotos_133351928-stock-illustration-default-placeholder-man-and-woman.jpg'
    let profilePictureWoman = 'https://png.pngtree.com/png-vector/20220607/ourmid/pngtree-person-gray-photo-placeholder-woman-in-t-shirt-on-white-background-png-image_4853921.png'

    async function fetchTrainer() {
        const trainerId = id
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
        const url = process.env.BACKEND_URL + `/api/trainers/${trainerId}`
        const response = await fetch(url, options)
        if (!response.ok) {
            console.error(`Error fetching trainer data. HTTP Status ${response.status}`)
            return null
        }
        const data = await response.json();
        const trainerData = data.trainer;
        setTrainer(trainerData);
        console.log(trainer);
        return trainer
    };

    useEffect(() => {
        fetchTrainer();
    }, [])

    return (
        <Container>
            <Row className="justify-content-md-center mt-4">
                {trainer ?
                    <>
                        <Col xs={3}>
                            <Image src={trainer.gender != 'Male' ? profilePictureWoman : profilePictureMan} roundedCircle fluid />
                        </Col>
                        <Col md={9}>
                            <Card>
                                <Card.Body>
                                    <Card.Title>Trainer Information</Card.Title>
                                    <Card.Text>
                                        <strong>Name:</strong> {trainer.name}<br />
                                        <st            <Row className="justify-content-md-center mt-4">                {trainer ?                    <>                        <Col xs={3}>                            <Image src={trainer.gender != 'Male' ? profilePictureWoman : profilePictureMan} roundedCircle fluid />                        </Col>                        <Col md={9}>    const { id } = useParams();const TrainerProfile = () => {rong>Last Name:</strong> {trainer.last_name}<br />
                                        <strong>Email:</strong> {trainer.email}<br />
                                        <strong>Phone:</strong> {trainer.phone_number}<br />
                                        <strong>IBAN:</strong> {trainer.bank_iban}<br />
                                        <strong>City:</strong> {trainer.city}<br />
                                        <strong>Postal Code:</strong> {trainer.postal_code}<br />
                                        <strong>Website URL:</strong> {trainer.website_url}<br />
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                            <div style={{ marginTop: '20px', textAlign: 'center' }}>
                                <EditTrainerProfile trainer={trainer} onChangeSubmit={fetchTrainer}/>
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

export default TrainerProfile;

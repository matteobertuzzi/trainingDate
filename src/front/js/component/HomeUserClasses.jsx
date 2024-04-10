import React, { useState, useContext, useEffect } from 'react';
import { Context } from '../store/appContext';
import Carousel from 'react-bootstrap/Carousel';
import { BsChevronCompactRight, BsChevronCompactLeft } from "react-icons/bs";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Loading from './Loading.jsx';
import FilterAlert from './FilterAlert.jsx';

const HomeUserClasses = () => {
    const { store, actions } = useContext(Context);
    const { currentUser } = store
    const [showAlert, setShowAlert] = useState(false);
    const userClasses = store.userClasses.trainer_classes;

    if (!currentUser || !currentUser.user) {
        return <Loading />;
    }

    if (!userClasses) {
        return <Loading />;
    }

    const chunkSize = 3;
    const chunkedClasses = [];
    for (let i = 0; i < userClasses.length; i += chunkSize) {
        chunkedClasses.push(userClasses.slice(i, i + chunkSize));
    }

    return (
        <>
            {chunkedClasses.length > 1 ? (
                <Carousel prevIcon={<BsChevronCompactLeft />} nextIcon={<BsChevronCompactRight />}>
                    {chunkedClasses.map((chunk, index) => (
                        <Carousel.Item key={index}>
                            <div className="row">
                                {chunk.map(oneClass => (
                                    <div className='col-4' key={oneClass.id}>
                                        <Card className='my-3'>
                                            <Card.Header>Class Details</Card.Header>
                                            <Card.Body>
                                                <Card.Title>{oneClass.class_name ? oneClass.class_name : 'Training class'}</Card.Title>
                                                <Card.Text>
                                                    {oneClass.class_details ? oneClass.class_details : 'Training class'}
                                                </Card.Text>
                                                <Button variant="primary">View class</Button>
                                            </Card.Body>
                                        </Card>
                                    </div>
                                ))}
                            </div>
                        </Carousel.Item>
                    ))}
                </Carousel>
            ) : (
                <div className="row">
                    {userClasses.map(oneClass => (
                        <div className='col-4' key={oneClass.id}>
                            <Card className='my-3'>
                                <Card.Header>Class Details</Card.Header>
                                <Card.Body>
                                    <Card.Title>{oneClass.class_name ? oneClass.class_name : 'Training class'}</Card.Title>
                                    <Card.Text>
                                        {oneClass.class_details ? oneClass.class_details : 'Training class'}
                                    </Card.Text>
                                    <Button variant="primary">View class</Button>
                                </Card.Body>
                            </Card>
                        </div>
                    ))}
                </div>
            )}
            {userClasses.length === 0 && (
                <FilterAlert location='userClasses' showAlert={setShowAlert} />
            )}
        </>
    )
}

export default HomeUserClasses;

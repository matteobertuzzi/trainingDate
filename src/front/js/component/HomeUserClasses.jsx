import React, { useState, useContext, useEffect } from 'react';
import { Context } from '../store/appContext';
import { BsChevronCompactRight, BsChevronCompactLeft } from "react-icons/bs";
import { Button, Card, Carousel } from 'react-bootstrap';
import Loading from './Loading.jsx';
import FilterAlert from './FilterAlert.jsx';
import ClassModal from './ClassModal.jsx';

const HomeUserClasses = () => {
    const { store, actions } = useContext(Context);
    const { currentUser, allClasses, userClasses } = store
    const { postUserClass, deleteUserClass, removeItem, addToCart, removeCartItem } = actions
    const [showAlert, setShowAlert] = useState(false);
    const [interested, setInterested] = useState(false);

    useEffect(() => {
        checkClasses();
    }, []);

    const checkClasses = () => {
        if (userClasses) {
            userClasses.map((userClass) => {
                for (let i = 0; i < allClasses.length; i++) {
                    if (allClasses[i].id === userClass.class) {
                        allClasses[i]["isInterested"] = false;
                        setInterested(false);
                        console.log(allClasses[i]);

                    } else {
                        allClasses[i]["isInterested"] = true;
                        setInterested(true);
                        console.log(allClasses[i]);
                    }
                }
            })
        } else {
            return
        }
    };

    const chunkSize = 3;
    const chunkedClasses = [];
    for (let i = 0; i < allClasses.length; i += chunkSize) {
        chunkedClasses.push(allClasses.slice(i, i + chunkSize));
    }

    if (!currentUser || !currentUser.user) {
        return <Loading />;
    }

    if (!allClasses) {
        return <Loading />;
    }

    const handleInterested = async (value, classId, price) => {
        if (!value) {
            await deleteUserClass(currentUser.user.id, classId);
            setInterested(true);
            for (let i = 0; i < allClasses.length; i++) {
                if (allClasses[i][id] === classId) {
                    allClasses[i]["isInterested"] = true;
                }
                else {
                    console.error("No class found!");
                };
            }
        } else {
            await postUserClass(price, classId);
            setInterested(false);
            for (let i = 0; i < allClasses.length; i++) {
                if (allClasses[i][id] === classId) {
                    allClasses[i]["isInterested"] = false;
                }
                else {
                    console.error("No class found!");
                };
            }
        };
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
                                            <Card.Header>Detalles de la Clase</Card.Header>
                                            <Card.Body>
                                                <Card.Title>{oneClass.class_name ? oneClass.class_name : 'Clase de entrenamiento'}</Card.Title>
                                                <Card.Text>
                                                    {oneClass.class_details ? oneClass.class_details : 'Clase de entrenamiento'}
                                                </Card.Text>
                                                <div className='d-flex justify-content-center'>
                                                    <ClassModal userClass={oneClass} />
                                                </div>
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
                    {allClasses.map(oneClass => (
                        <div className='col-4' key={oneClass.id}>
                            <Card className='my-3'>
                                <Card.Header>Detalles de la Clase</Card.Header>
                                <Card.Body>
                                    <Card.Title>{oneClass.class_name ? oneClass.class_name : 'Clase de entrenamiento'}</Card.Title>
                                    <Card.Text>
                                        {oneClass.class_details ? oneClass.class_details : 'Clase de entrenamiento'}
                                    </Card.Text>
                                    <div className='d-flex justify-content-center gap-2'>
                                        <ClassModal userClass={oneClass} />
                                        <Button variant={oneClass.isInterested ? "primary" : "danger"} onClick={() => handleInterested(oneClass.isInterested, oneClass.id, oneClass.price)}>
                                            {oneClass.isInterested ? "Estoy interesado" : "No estoy interesado"}
                                        </Button>
                                    </div>
                                </Card.Body>
                            </Card>
                        </div>
                    ))}
                </div >
            )}
            {
                allClasses.length === 0 && (
                    <FilterAlert location='userClasses' showAlert={setShowAlert} />
                )
            }
        </>
    )
}

export default HomeUserClasses;

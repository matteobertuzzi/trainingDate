import React, { useState, useContext, useEffect } from 'react';
import { Context } from '../store/appContext';
import Carousel from 'react-bootstrap/Carousel';
import { BsChevronCompactRight, BsChevronCompactLeft } from "react-icons/bs";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Loading from './Loading.jsx';
import FilterAlert from './FilterAlert.jsx';
import ClassModal from './ClassModal.jsx';
import MapModal from './MapModal.jsx';

const placeholderImageUrl = ''; // Add your placeholder image URL here

const HomeUserClasses = ({ filters }) => {
    const { store, actions } = useContext(Context);
    const { createCheckoutSession } = actions;
    const { currentUser, allClasses, userClasses } = store;
    const { postUserClass, deleteUserClass } = actions;
    const [showAlert, setShowAlert] = useState(false);
    const [merge, setMerge] = useState([]);
    const [interested, setInterested] = useState(false);
    const placeholderImageUrl = 'https://www.shape.com/thmb/vMUCGBBuieN6Y5h0bgCqzt0Vf7o=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/fb-interval-training-workouts-c93316d5efe14dee93c6d33ccdb6cd31.jpg'

    useEffect(() => {
        checkClasses();
        mergeClasses();
    }, []);

    const checkClasses = () => {
        if (userClasses.length !== 0) {
            userClasses.map((userClass) => {
                for (let i = 0; i < allClasses.length; i++) {
                    if (allClasses[i].id === userClass.class) {
                        allClasses[i]["isInterested"] = false;
                        console.log('No interest', allClasses[i]);
                    } else {
                        allClasses[i]["isInterested"] = true;
                        console.log('Interest', allClasses[i]);
                    }
                }
            })
        } else {
            for (let i = 0; i < allClasses.length; i++) {
                allClasses[i]["isInterested"] = true;
                console.log(allClasses[i]);
                setInterested(true);
                console.log('hey!')
            }
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

    const handleCheckout = async (productId, customerId) => {
        await createCheckoutSession(productId, customerId);
    };

    const handleInterested = async (value, classId, price) => {
        try {
            if (!value) {
                await deleteUserClass(currentUser.user.id, classId);
                setInterested(value);
            } else {
                await postUserClass(price, classId);
                setInterested(!value);
            }
            allClasses.map(oneClass => {
                if (oneClass.id === classId) {
                    oneClass["isInterested"] = !value;
                    return;
                }
                return;
            });
        } catch (error) {
            console.error("Error:", error);
        }
    };

    let filteredClasses = allClasses.filter((cls) => {
        return cls.training_type === parseInt(filters.trainingType) && cls.training_level === filters.trainingLevel;
    });

    const chunkedFilteredClasses = [];
    for (let i = 0; i < filteredClasses.length; i += chunkSize) {
        chunkedFilteredClasses.push(filteredClasses.slice(i, i + chunkSize));
    }

    const mergeClasses = () => {
        const merged = [];

        for (let i = 0; i < userClasses.length; i++) {
            const userClass = userClasses[i];
            const foundClass = allClasses.find(oneClass => oneClass.id === userClass.class);
            if (foundClass) {
                const mergedClass = { ...foundClass, ...userClass };
                merged.push(mergedClass);
                setMerge(merged)
                console.log(merged)
            }
        }
    };

    return (
        <>
            {(filteredClasses.length === 0 && filters.trainingType !== '' && filters.trainingLevel !== '') ? <FilterAlert location='classList' showAlert={setShowAlert} /> : <></>}
            {filteredClasses.length > 0 ? (
                chunkedFilteredClasses.length > 1 ? (
                    <Carousel prevIcon={<BsChevronCompactLeft />} nextIcon={<BsChevronCompactRight />}>
                        {chunkedFilteredClasses.map((chunk, index) => (
                            <Carousel.Item key={index}>
                                <div className="row d-flex flex-row align-items-center justify-content-center">
                                    {chunk.map(oneClass => (
                                        <div className='col-auto d-flex flex-row justify-content-center align-items-center gap-2' key={oneClass.id}>
                                            <Card className='my-3'>
                                                <Card.Img variant="top" src={placeholderImageUrl} />
                                                <Card.Header>Detalles de la Clase</Card.Header>
                                                <Card.Body>
                                                    <Card.Title>{oneClass.class_name ? oneClass.class_name : 'Clase de entrenamiento'}</Card.Title>
                                                    <Card.Text>
                                                        {oneClass.class_details ? oneClass.class_details : 'Clase de entrenamiento'}
                                                    </Card.Text>
                                                </Card.Body>
                                                <Card.Footer className='p-3'>
                                                    {oneClass.capacity < 1 ? (
                                                        <div className='d-flex justify-content-center align-items-center'>
                                                            <Button variant='danger' disabled>Clase completa!</Button>
                                                        </div>
                                                    ) : (
                                                        <div className='d-flex flex-column gap-2'>
                                                            <ClassModal userClass={oneClass} />
                                                            {merge.find(mergedItem => mergedItem.class === oneClass.id && mergedItem.stripe_status === 'Paid') ? (
                                                                <Button variant="success" className="btn-responsive" disabled>Clase pagada</Button>
                                                            ) : (
                                                                <>
                                                                    <Button variant={oneClass.isInterested ? "primary" : "danger"} className="btn-responsive" onClick={() => {
                                                                        handleInterested(oneClass.isInterested, oneClass.id, oneClass.price);
                                                                        oneClass.isInterested = !oneClass.isInterested;
                                                                    }}>
                                                                        {oneClass.isInterested ? "Estoy interesado" : "No estoy interesado"}
                                                                    </Button>
                                                                    {oneClass.isInterested === false ? (
                                                                        <Button className="btn-responsive" onClick={() => { handleCheckout(oneClass.stripe_product_id, currentUser.user.stripe_customer_id) }}>Checkout!</Button>
                                                                    ) : null}
                                                                </>
                                                            )}
                                                            <MapModal className='mx-3' addressData={[oneClass.city, oneClass.postal_code, oneClass.street_name, oneClass.street_number]} />
                                                        </div>
                                                    )}
                                                </Card.Footer>
                                            </Card>
                                        </div>
                                    ))}
                                </div>
                            </Carousel.Item>
                        ))}
                    </Carousel>
                ) : (
                    <div className="row d-flex flex-row align-items-center justify-content-center">
                        {filteredClasses.map(oneClass => (
                            <div className='col-xl-4 col-lg-6 col-sm-8 col-sm-10 d-flex flex-row justify-content-center align-items-center h-100' key={oneClass.id}>
                                <Card className='my-3'>
                                    <Card.Img variant="top" src={placeholderImageUrl} />
                                    <Card.Header>Detalles de la Clase</Card.Header>
                                    <Card.Body>
                                        <Card.Title>{oneClass.class_name ? oneClass.class_name : 'Clase de entrenamiento'}</Card.Title>
                                        <Card.Text>
                                            {oneClass.class_details ? oneClass.class_details : 'Clase de entrenamiento'}
                                        </Card.Text>
                                    </Card.Body>
                                    <Card.Footer className='p-3'>
                                        {oneClass.capacity < 1 ? (
                                            <div className='d-flex justify-content-center align-items-center'>
                                                <Button variant='danger' disabled>Clase completa!</Button>
                                            </div>
                                        ) : (
                                            <div className='d-flex flex-column gap-2'>
                                                <ClassModal userClass={oneClass} />
                                                {merge.find(mergedItem => mergedItem.class === oneClass.id && mergedItem.stripe_status === 'Paid') ? (
                                                    <Button variant="success" className="btn-responsive" disabled>Clase pagada</Button>
                                                ) : (
                                                    <>
                                                        <Button variant={oneClass.isInterested ? "primary" : "danger"} className="btn-responsive  w-auto" onClick={() => {
                                                            handleInterested(oneClass.isInterested, oneClass.id, oneClass.price);
                                                            oneClass.isInterested = !oneClass.isInterested;
                                                        }}>
                                                            {oneClass.isInterested ? "Estoy interesado" : "No estoy interesado"}
                                                        </Button>
                                                        {oneClass.isInterested === false ? (
                                                            <Button className="btn-responsive  w-auto" onClick={() => { handleCheckout(oneClass.stripe_product_id, currentUser.user.stripe_customer_id) }}>Checkout!</Button>
                                                        ) : null}
                                                    </>
                                                )}
                                                <MapModal className='mx-3' addressData={[oneClass.city, oneClass.postal_code, oneClass.street_name, oneClass.street_number]} />
                                            </div>
                                        )}
                                    </Card.Footer>
                                </Card>
                            </div>
                        ))}
                    </div>
                )
            ) : (
                chunkedClasses.length > 1 ? (
                    <Carousel prevIcon={<BsChevronCompactLeft />} nextIcon={<BsChevronCompactRight />}>
                        {chunkedClasses.map((chunk, index) => (
                            <Carousel.Item key={index}>
                                <div className="row d-flex flex-row align-items-center justify-content-center">
                                    {chunk.map(oneClass => (
                                        <div className='col-xl-3 col-lg-6 col-sm-7 col-sm-10 d-flex flex-row justify-content-center align-items-center h-100' key={oneClass.id}>
                                            <Card className='my-3'>
                                                <Card.Img variant="top" src={placeholderImageUrl} />
                                                <Card.Header>Detalles de la Clase</Card.Header>
                                                <Card.Body>
                                                    <Card.Title>{oneClass.class_name ? oneClass.class_name : 'Clase de entrenamiento'}</Card.Title>
                                                    <Card.Text>
                                                        {oneClass.class_details ? oneClass.class_details : 'Clase de entrenamiento'}
                                                    </Card.Text>
                                                </Card.Body>
                                                <Card.Footer className='p-3 w-auto'>
                                                    {oneClass.capacity < 1 ? (
                                                        <div className='d-flex justify-content-center align-items-center'>
                                                            <Button variant='danger' className='w-auto' disabled>Clase completa!</Button>
                                                        </div>
                                                    ) : (
                                                        <div className='d-flex flex-column gap-2'>
                                                            <ClassModal userClass={oneClass} />
                                                            {merge.find(mergedItem => mergedItem.class === oneClass.id && mergedItem.stripe_status === 'Paid') ? (
                                                                <Button variant="success" className="btn-responsive w-auto" disabled>Clase pagada</Button>
                                                            ) : (
                                                                <>
                                                                    <Button variant={oneClass.isInterested ? "primary" : "danger"} className="btn-responsive w-auto" onClick={() => {
                                                                        handleInterested(oneClass.isInterested, oneClass.id, oneClass.price);
                                                                        oneClass.isInterested = !oneClass.isInterested;
                                                                    }}>
                                                                        {oneClass.isInterested ? "Estoy interesado" : "No estoy interesado"}
                                                                    </Button>
                                                                    {oneClass.isInterested === false ? (
                                                                        <Button className="btn-responsive w-auto" onClick={() => { handleCheckout(oneClass.stripe_product_id, currentUser.user.stripe_customer_id) }}>Checkout!</Button>
                                                                    ) : null}
                                                                </>
                                                            )}
                                                            <MapModal className='mx-3' addressData={[oneClass.city, oneClass.postal_code, oneClass.street_name, oneClass.street_number]} />
                                                        </div>
                                                    )}
                                                </Card.Footer>
                                            </Card>
                                        </div>
                                    ))}
                                </div>
                            </Carousel.Item>
                        ))}
                    </Carousel>
                ) : (
                    <div className="row d-flex flex-row align-items-center justify-content-center">
                        {allClasses.map(oneClass => (
                            <div className='col-xl-3 col-md-6 col-sm-12 d-flex flex-row justify-content-center align-items-center h-100' key={oneClass.id}>
                                <Card className='my-3 w-auto'>
                                    <Card.Img variant="top" src={placeholderImageUrl} />
                                    <Card.Header>Detalles de la Clase</Card.Header>
                                    <Card.Body>
                                        <Card.Title>{oneClass.class_name ? oneClass.class_name : 'Clase de entrenamiento'}</Card.Title>
                                        <Card.Text>
                                            {oneClass.class_details ? oneClass.class_details : 'Clase de entrenamiento'}
                                        </Card.Text>
                                    </Card.Body>
                                    <Card.Footer className='p-3 w-auto'>
                                        {oneClass.capacity < 1 ? (
                                            <div className='d-flex justify-content-center align-items-center'>
                                                <Button variant='danger' disabled>Clase completa!</Button>
                                            </div>
                                        ) : (
                                            <div className='d-flex flex-column gap-2'>
                                                <ClassModal userClass={oneClass} />
                                                {merge.find(mergedItem => mergedItem.class === oneClass.id && mergedItem.stripe_status === 'Paid') ? (
                                                    <Button variant="success" className="btn-responsive" disabled>Clase pagada</Button>
                                                ) : (
                                                    <>
                                                        <Button variant={oneClass.isInterested ? "primary" : "danger"} className="btn-responsive" onClick={() => {
                                                            handleInterested(oneClass.isInterested, oneClass.id, oneClass.price);
                                                            oneClass.isInterested = !oneClass.isInterested;
                                                        }}>
                                                            {oneClass.isInterested ? "Estoy interesado" : "No estoy interesado"}
                                                        </Button>
                                                        {oneClass.isInterested === false ? (
                                                            <Button className="btn-responsive" onClick={() => { handleCheckout(oneClass.stripe_product_id, currentUser.user.stripe_customer_id) }}>Checkout!</Button>
                                                        ) : null}
                                                    </>
                                                )}
                                                <MapModal className='mx-3' addressData={[oneClass.city, oneClass.postal_code, oneClass.street_name, oneClass.street_number]} />
                                            </div>
                                        )}
                                    </Card.Footer>
                                </Card>
                            </div>
                        ))}
                    </div>
                )
            )}
            {
                allClasses.length === 0 && (
                    <FilterAlert location='userClasses' show={setShowAlert} />
                )
            }
        </>
    );
};

export default HomeUserClasses;
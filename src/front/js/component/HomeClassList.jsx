import React, { useState, useContext, useEffect } from 'react';
import { Context } from '../store/appContext';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import FilterAlert from './FilterAlert.jsx';
import MapModal from './MapModal.jsx';

const HomeClassList = ({ filters }) => {
    const { store, actions } = useContext(Context);
    const { createCheckoutSession, getUserClasses, postUserClass, deleteUserClass } = actions
    const { currentUser, userClasses, logged, cart } = store
    const allClasses = store.allClasses;
    const [showAlert, setShowAlert] = useState(false)


    let filteredClasses = allClasses.filter((cls) => {
        return cls.training_type === parseInt(filters.trainingType) && cls.training_level === filters.trainingLevel;
    });

    const handleCheckout = async (productId, customerId) => {
        await createCheckoutSession(productId, customerId)
        await getUserClasses()

    }

    const handleAddCart = async (price, id) => {
        await postUserClass(price, id)
    }

    const handleRemoveCart = async (user_id, class_id) => {
        await deleteUserClass(user_id, class_id)
    }

    return (
        <>
            {filteredClasses.length === 0 && filters.trainingType !== '' && filters.trainingLevel !== '' ? (
                <FilterAlert location='classList' showAlert={setShowAlert} />
            ) : null}
            {filteredClasses.length > 0 ? (
                filteredClasses.map(oneClass => (
                    <Card key={oneClass.id} className='my-3'>
                        <Card.Header>Class Details</Card.Header>
                        <Card.Body>
                            <Card.Title>{oneClass.class_name ? oneClass.class_name : 'Training class'}</Card.Title>
                            <Card.Text>
                                {oneClass.class_details ? oneClass.class_details : 'Training class'}
                            </Card.Text>
                            {store.logged && (
                                <Button variant="primary" onClick={() => postUserClass(oneClass.price, oneClass.id)}>Signup for Class</Button>
                            )}
                            <MapModal addressData={[oneClass.city, oneClass.postal_code, oneClass.street_name, oneClass.street_number]} />
                        </Card.Body>
                    </Card>
                ))
            ) : (
                <>
                    {allClasses.map(oneClass => (
                        <Card key={oneClass.id} className='my-3'>
                            <Card.Header>Class Details</Card.Header>
                            <Card.Body className='d-flex flex-row justify-content-between align-items-center'>
                                <section className='d-flex flex-column'>
                                    <Card.Title>{oneClass.class_name ? oneClass.class_name : 'Training class'}</Card.Title>
                                    <Card.Text>
                                        {oneClass.class_details ? oneClass.class_details : 'Training class'}
                                    </Card.Text>
                                </section>
                                <section>
                                    {store.logged ? (
                                        <section key={oneClass.id} className='d-flex flex-column gap-2'>
                                            {userClasses && userClasses.some(item => item.class_id === oneClass.id) ? (
                                                userClasses.map(item => {
                                                    if (item.class === oneClass.id && item.stripe_status === "Paid") {
                                                        return (
                                                            <div key={item.id} className='d-flex flex-column gap-2'>
                                                                <span key={item.id} style={{ backgroundColor: '#4caf50', color: 'white', padding: '5px 10px', borderRadius: '4px' }}>
                                                                    Clase ya reservada
                                                                </span>
                                                            </div>
                                                        );
                                                    } else if (item.class === oneClass.id && (item.stripe_status === "Pending" || item.stripe_status === "Rejected")) {
                                                        return (
                                                            <div key={item.id} className='d-flex flex-column gap-2'>
                                                                <Button variant="primary" onClick={() => handleCheckout(oneClass.stripe_product_id, currentUser.user.id)}>Checkout</Button>
                                                            </div>
                                                        );
                                                    } else if (item.class !== oneClass.id) {
                                                        return (
                                                            <div key={item.id}>
                                                                <Button variant="primary" onClick={() => handleAddCart(oneClass.price, oneClass.id)}>Estoy interesado</Button>
                                                            </div>
                                                        );
                                                    }
                                                })
                                            ) : (
                                                <>
                                                    <Button variant="danger" onClick={() => handleRemoveCart(currentUser.user.id, oneClass.id,)}>No estoy interesado</Button>
                                                    <Button variant="primary" onClick={() => handleAddCart(oneClass.price, oneClass.id)}>Estoy interesado</Button>
                                                </>
                                            )}
                                            <MapModal addressData={[oneClass.city, oneClass.postal_code, oneClass.street_name, oneClass.street_number]} />
                                        </section>
                                    ) : (
                                        <p>Loggeate para reservar tus clases</p>
                                    )}
                                </section>
                            </Card.Body>
                        </Card>
                    ))}
                </>
            )}
        </>
    );
}

export default HomeClassList;

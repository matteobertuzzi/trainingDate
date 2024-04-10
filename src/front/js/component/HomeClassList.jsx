import React, { useState, useContext, useEffect } from 'react';
import { Context } from '../store/appContext';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import FilterAlert from './FilterAlert.jsx';
import MapModal from './MapModal.jsx';
import Carousel from 'react-bootstrap/Carousel';

const HomeClassList = ({ filters }) => {
    const { store, actions } = useContext(Context);
    const { createCheckoutSession, getUserClasses, postUserClass, deleteUserClass } = actions
    const { currentUser, userClasses, logged, cart } = store
    const allClasses = store.allClasses;

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
            {(filteredClasses.length === 0 && filters.trainingType !== '' && filters.trainingLevel !== '') ? <FilterAlert location='classList' showAlert={setShowAlert} /> : <></>}
            {filteredClasses.length > 0 ?
                filteredClasses.map(oneClass => (
                    <Card key={oneClass.id} className='my-3'>
                        <Card.Header>Class Details</Card.Header>
                        <Card.Body>
                            <Card.Title>{oneClass.class_name ? oneClass.class_name : 'Training class'}</Card.Title>
                            <Card.Text>
                                {oneClass.class_details ? oneClass.class_details : 'Training class'}
                            </Card.Text>
                            {store.logged &&
                                <Button variant="primary" onClick={() => postUserClass(oneClass.price, oneClass.id)}>Signup for Class</Button>
                            }
                            <MapModal addressData={[oneClass.city, oneClass.postal_code, oneClass.street_name, oneClass.street_number]} />
                        </Card.Body>
                    </Card>
                )) :
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
                                    <Card.Text>
                                        {oneClass.price}
                                    </Card.Text>
                                </section>
                                {store.logged && (
                                    <section key={oneClass.id} className='d-flex flex-column gap-2'>
                                        {store.cart.includes(oneClass.id) ? (
                                            <div className='d-flex flex-column gap-2'>
                                                <Button variant="danger" onClick={() => removeCartItem(oneClass.id, store.cart)}>No estoy interesado</Button>
                                                <Button variant="primary" onClick={() => createCheckoutSession(oneClass.stripe_product_id, oneClass.price)}>Checkout</Button>
                                            </div>
                                        ) : (
                                            <div>
                                                <Button variant="primary" onClick={() => addCartItem(oneClass.id)}>Estoy interesado</Button>
                                            </div>
                                        )}
                                        <MapModal addressData={[oneClass.city, oneClass.postal_code, oneClass.street_name, oneClass.street_number]} />
                                    </section>
                                )}
                            </Card.Body>
                        </Card>
                    ))}
                </>
            }
        </>
    );
}

export default HomeClassList;

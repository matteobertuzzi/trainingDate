import React, { useState, useContext } from 'react';
import { Context } from '../store/appContext';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Loading from './Loading.jsx';


const HomeClassList = () => {
    const { store, actions } = useContext(Context);

    const allClasses = store.allClasses;

    return (
        <>
            {allClasses != '' ?
                allClasses.map(oneClass => (
                    <Card key={oneClass.id} className='my-3'>
                        <Card.Header>Class Details</Card.Header>
                        <Card.Body>
                            <Card.Title>{oneClass.class_name ? oneClass.class_name : 'Training class'}</Card.Title>
                            <Card.Text>
                                {oneClass.class_details ? oneClass.class_details : 'Training class'}
                            </Card.Text>
                            <Button variant="primary">Signup for Class</Button>
                        </Card.Body>
                    </Card>
                )) :
                <Loading />
            }
        </>
    )
}

export default HomeClassList;
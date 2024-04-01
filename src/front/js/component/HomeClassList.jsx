import React, { useState, useContext, useEffect } from 'react';
import { Context } from '../store/appContext';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import FilterAlert from './FilterAlert.jsx';

const HomeClassList = ({ filters }) => {
    const { store, actions } = useContext(Context);
    const allClasses = store.allClasses;
    const [showAlert, setShowAlert] = useState(false);

    let filteredClasses = allClasses.filter((cls) => {
        return cls.training_type === parseInt(filters.trainingType) && cls.training_level === filters.trainingLevel;
    });

    const updateCart = (newClass) => {
        actions.updateCart(newClass);
    }

    return (
        <>
            {(filteredClasses.length == 0 && filters.trainingType != '' && filters.trainingLevel != '') ? <FilterAlert showAlert={setShowAlert} /> : <></>}
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
                                <Button variant="primary" onClick={() => updateCart(oneClass.id)}>Signup for Class</Button>
                            }
                        </Card.Body>
                    </Card>
                )) :
                <>
                    {allClasses.map(oneClass => (
                        <Card key={oneClass.id} className='my-3'>
                            <Card.Header>Class Details</Card.Header>
                            <Card.Body>
                                <Card.Title>{oneClass.class_name ? oneClass.class_name : 'Training class'}</Card.Title>
                                <Card.Text>
                                    {oneClass.class_details ? oneClass.class_details : 'Training class'}
                                </Card.Text>
                                {store.logged &&
                                    <Button variant="primary" onClick={() => updateCart(oneClass.id)}>Signup for Class</Button>
                                }
                            </Card.Body>
                        </Card>
                    ))}
                </>
            }
        </>
    )
}

export default HomeClassList;

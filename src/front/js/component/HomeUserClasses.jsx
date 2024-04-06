import React, { useState, useContext, useEffect } from 'react';
import { Context } from '../store/appContext';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Loading from './Loading.jsx';
import FilterAlert from './FilterAlert.jsx';


const HomeUserClasses = () => {
    const { store, actions } = useContext(Context);
    const { getUserClasses } = actions
    const { currentUser } = store
    const [showAlert, setShowAlert] = useState(false);
    const userClasses = store.userClasses.trainer_classes;

    if (!currentUser || !currentUser.user) {
        return <Loading />;
    }

    if (!userClasses) {
        return <Loading />;
    }

    return (
        <>
            {userClasses != '' ?
                userClasses.map(oneClass => (
                    <Card key={oneClass.id} className='my-3'>
                        <Card.Header>Class Details</Card.Header>
                        <Card.Body>
                            <Card.Title>{oneClass.class_name ? oneClass.class_name : 'Training class'}</Card.Title>
                            <Card.Text>
                                {oneClass.class_details ? oneClass.class_details : 'Training class'}
                            </Card.Text>
                            <Button variant="primary">View class</Button>
                        </Card.Body>
                    </Card>
                )) :
                <FilterAlert location='userClasses' showAlert={setShowAlert} />
            }
        </>
    )
}

export default HomeUserClasses;
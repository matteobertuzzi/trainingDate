import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../store/appContext';
import { Button, Accordion, Container, Card, Row, Col } from 'react-bootstrap';
import { FaDumbbell } from 'react-icons/fa';
import HomeClassList from '../component/HomeClassList.jsx';
import HomeUserClasses from '../component/HomeUserClasses.jsx';
import HomeFilters from '../component/HomeFilters.jsx';
import TrainerHomepage from '../component/TrainerHomepage.jsx';
import UnloggedView from '../component/UnloggedView.jsx';
import UserHomepage from '../component/UserHomepage.jsx';

const Homepage = () => {
    const { store, actions } = useContext(Context);
    let isLogged = store.logged;
    const currentUser = JSON.parse(localStorage.getItem('availableAccount'));
    const isUser = currentUser && currentUser.role === 'users' ? true : false;
    const isTrainer = currentUser && currentUser.role === 'trainers' ? true : false;
    const [filters, setFilters] = useState({
        trainingLevel: '',
        trainingType: ''
    });

    const handleFilterSubmit = (event, filters) => {
        setFilters(filters);
        console.log('Filters submitted:', filters);
    };

    return (
        <>
            {isLogged && isUser ?
                <div className='container'>
                    <div className='row'>
                        <UserHomepage />
                    </div>
                    <h3 className='text-center my-4' style={{ textTransform: 'uppercase', fontWeight: 'bold' }}>Clases disponibles</h3>
                    <div className='row'>
                        <HomeFilters filters={filters} onFilterSubmit={handleFilterSubmit} />
                    </div>
                    <HomeUserClasses filters={filters} />
                </div>
                :
                (isLogged && isTrainer) ?
                    <div className='container'>
                        <TrainerHomepage />
                    </div>
                    :
                    <UnloggedView />
            }
        </>
    );
}

export default Homepage;

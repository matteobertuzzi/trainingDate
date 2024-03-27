import React, { useState, useContext } from 'react';
import { Context } from '../store/appContext';
import { Form, DropdownButton, Dropdown, Button } from 'react-bootstrap';
import InputGroup from 'react-bootstrap/InputGroup';
import HomeClassList from '../component/HomeClassList.jsx';
import HomeUserClasses from '../component/HomeUserClasses.jsx';
import HomeFilters from '../component/HomeFilters.jsx';


const Homepage = () => {
    const { store, actions } = useContext(Context);
    const [filters, setFilters] = useState({
        trainingLevel: '',
        trainingType: ''
    })

    const handleFilters = (newFilters) => {
        setFilters(newFilters);
    };

    const handleFilterSubmit = (event) => {
        // event.preventDefault(); 
        console.log('Filters submitted:', filters);
    };


    return (
        <>
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-lg-3 col-md-3 col-sm-10 d-flex-column justify-content-center' style={{ 'backgroundColor': '#D3D3D3', 'height': '100vh' }}>
                        <HomeFilters filters={filters} onFilterChange={handleFilters} onFilterSubmit={handleFilterSubmit}/>
                    </div>
                    <div className='col-lg-6 col-md-6 col-sm-10'>
                        <HomeClassList filters={filters} />
                    </div>
                    <div className='col-lg-3 col-md-3 col-sm-10' style={{ 'backgroundColor': '#D3D3D3', 'height': '100vh' }}>
                        <HomeUserClasses />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Homepage;
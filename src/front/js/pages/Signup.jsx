import React from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import SignupTrainer from '../component/SignupTrainer.jsx';
import SignupUser from '../component/SignupUser.jsx';

const Signup = () => {

    return (
        <Tabs
            defaultActiveKey="users"
            id="signup"
            className="mb-3"
            fill
        >
            <Tab eventKey="users" title="Users">
                <SignupUser />
            </Tab>
            <Tab eventKey="trainers" title="Trainers">
                <SignupTrainer />
            </Tab>
        </Tabs>
    )
}

export default Signup;
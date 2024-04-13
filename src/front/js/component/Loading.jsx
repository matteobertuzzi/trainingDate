import React from 'react';
import { Container } from 'react-bootstrap';
import { faDumbbell } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Loading() {
    return (
        <Container className="d-flex justify-content-center align-items-center vh-100">
            <FontAwesomeIcon icon={faDumbbell} spin style={{ fontSize: '3em' }} />
        </Container>
    );
}

export default Loading;
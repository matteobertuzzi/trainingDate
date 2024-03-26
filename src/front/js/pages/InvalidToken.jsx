import React from "react";
import { Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaUserPlus } from "react-icons/fa";

export const InvalidToken = () => {

    return (
        <Container className="vh-100 d-flex justify-content-center align-items-center flex-column">
            <h3 className="text-center">¡El token de tu usuario ha expirado!</h3>
            <p className="text-center">Por favor, regístrate de nuevo.</p>
            <Link to="/">
                <Button className="bg-success" style={{ borderRadius: '20px', padding: '10px 20px' }}>
                    <FaUserPlus style={{ marginRight: '5px' }} />
                    Sign Up
                </Button>
            </Link>
        </Container >
    )
}
import React from "react";
import { Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaUserPlus } from "react-icons/fa";


export const InvalidToken = () => {

    return (
        <Container className="vh-100 d-flex justify-content-center align-items-center flex-column">
            <div className="border rounded p-4 d-flex flex-column justify-content-center align-items-center" style={{ boxShadow: '0 0 10px rgba(255, 165, 0, 0.5)' }}>
                <h3 className="text-center">¡El token de tu usuario ha expirado!</h3>
                <p className="text-center">Por favor, regístrate de nuevo.</p>
                <Link to="/signup">
                    <Button variant="success">
                        <FaUserPlus style={{ marginRight: '5px' }} />
                        Sign Up
                    </Button>
                </Link>
            </div>
        </Container >
    )
}
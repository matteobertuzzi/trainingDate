import React, { useState } from "react";
import { Button, Container } from "react-bootstrap";
import { LogInModal } from "/workspaces/sp54-final-project-g3/src/front/js/component/LogInModal";


export const SessionEnd = () => {
    const [loginModalShow, setLoginModalShow] = useState(false);
    return (
        <Container className="vh-100 d-flex justify-content-center align-items-center flex-column">
            <h3 className="text-center">¡La session ha caducado!</h3>
            <p className="text-center">Por favor, inicia una nueva session.</p>
            <Button onClick={() => setLoginModalShow(true)}>
                Log In
            </Button>
            <LogInModal show={loginModalShow} onHide={() => setLoginModalShow(false)} />
        </Container >
    )
}
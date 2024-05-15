import React from "react";
import { Dropdown, DropdownButton, NavDropdown, Container, Row, Col, Tab, Tabs, Navbar, Button, Nav, Offcanvas, Badge } from 'react-bootstrap';
import { faDumbbell, faRightToBracket, faRightFromBracket, faHeart, faHouse } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const AboutUs = () => {
    return (
        <Container className="mt-4 mb-5 min-vh-100">
            <Row>
                <Col className="d-flex flex-row justify-content-center align-items-center">
                    <h1 className="display-4">Training <FontAwesomeIcon icon={faDumbbell} />  Date</h1>
                </Col>
            </Row>
            <div className="border w-auto rounded mt-3 px-2" style={{ boxShadow: '0 4px 6px rgba(0,0,0,0.1), 0 1px 3px rgba(0,0,0,0.08)' }}>
                <Row className="justify-content-center mt-4">
                    <Col xs={12} md={8}>
                        <div className="text-center">
                            <h2 className="mb-4">Nuestra Misión</h2>
                            <p className="text-muted">En [Nombre de la Aplicación], nuestra misión es promover un estilo de vida saludable y activo al facilitar la conexión entre entrenadores cualificados y usuarios interesados en mejorar su bienestar físico y mental. Nos esforzamos por crear una comunidad inclusiva y motivadora que inspire a nuestros usuarios a alcanzar sus objetivos de fitness y bienestar.</p>
                        </div>
                    </Col>
                </Row>
                <hr className="my-4" style={{ borderColor: 'rgba(0,0,0,0.1)' }} />
                <Row className="justify-content-center">
                    <Col xs={12} md={8}>
                        <div className="text-center">
                            <h2 className="mb-4">¿Quiénes Somos?</h2>
                            <p className="text-muted">Somos un equipo apasionado de desarrolladores, entrenadores personales y entusiastas del fitness que creemos en el poder transformador del ejercicio físico y la nutrición adecuada. Nos hemos unido para crear [Nombre de la Aplicación] con el objetivo de proporcionar una plataforma intuitiva y accesible donde los usuarios puedan encontrar entrenadores de confianza y clases adaptadas a sus necesidades y preferencias individuales.</p>
                        </div>
                    </Col>
                </Row>
                <hr className="my-4" style={{ borderColor: 'rgba(0,0,0,0.1)' }} />
                <Row className="justify-content-center">
                    <Col xs={12} md={8}>
                        <div className="text-center">
                            <h2 className="mb-4">Nuestro Compromiso</h2>
                            <p className="text-muted">En [Nombre de la Aplicación], nos comprometemos a brindar a nuestros usuarios una experiencia excepcional al proporcionar una amplia variedad de servicios y recursos útiles. Nos esforzamos por fomentar relaciones sólidas entre entrenadores y usuarios, facilitando la comunicación efectiva y el intercambio de conocimientos.</p>
                        </div>
                    </Col>
                </Row>
                <hr className="my-4" style={{ borderColor: 'rgba(0,0,0,0.1)' }} />
                <Row className="justify-content-center">
                    <Col xs={12} md={8}>
                        <div className="text-center">
                            <h2 className="mb-4">¿Por Qué Nació el Proyecto?</h2>
                            <p className="text-muted">El proyecto [Nombre de la Aplicación] nació de la necesidad de crear una plataforma que simplificara el proceso de búsqueda y contratación de entrenadores personales, al tiempo que ofreciera a los usuarios una gama diversa de opciones para mejorar su salud y estado físico. Nos dimos cuenta de que existía una brecha en el mercado y estábamos decididos a llenar ese vacío al proporcionar una solución integral y fácil de usar.</p>
                        </div>
                    </Col>
                </Row>
                <hr className="my-4" style={{ borderColor: 'rgba(0,0,0,0.1)' }} />
                <Row className="justify-content-center">
                    <Col xs={12} md={8}>
                        <div className="text-center">
                            <h2 className="mb-4">Únete a Nosotros</h2>
                            <p className="text-muted">Te invitamos a unirte a nuestra comunidad en [Nombre de la Aplicación] y embarcarte en un viaje hacia una vida más saludable y activa. Ya sea que estés buscando mejorar tu fuerza, perder peso o simplemente mantenerte en forma, estamos aquí para ayudarte a alcanzar tus metas de fitness. ¡Únete a nosotros hoy y comienza tu viaje hacia una mejor versión de ti mismo!</p>
                        </div>
                    </Col>
                </Row>
            </div>

        </Container>
    )
}
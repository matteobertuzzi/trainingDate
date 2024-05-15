import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-light text-black py-5">
      <Container>
        <Row className='pb-4'>
          <Col xs={12} md={4} className="mb-3 mb-md-0">
            <h5 style={{ fontWeight: "bold" }}>Contacto</h5>
            <p>Correo electrónico: info@training-date.es</p>
            <p>Teléfono: +34 123456900 </p>
          </Col>
          <Col xs={12} md={4} className="mb-3 mb-md-0">
            <h5 style={{ fontWeight: "bold" }}>Enlaces útiles</h5>
            <ul className="list-unstyled footer-links">
              <li><Link to="/" style={{ color: "#e95420", textDecoration: 'none' }}>Home</Link></li>
              <li><Link to="users/info" style={{ color: "#e95420", textDecoration: 'none' }}>Recursos para el usuario</Link></li>
              <li><Link to="trainers/info" style={{ color: "#e95420", textDecoration: 'none' }}>Recursos para el entrenador</Link></li>
            </ul>
          </Col>
          <Col xs={12} md={4} className='d-flex flex-column align-items-center justify-content-center'>
            <h5 style={{ fontWeight: "bold" }}>Síguenos</h5>
            <p>Síguenos en nuestras redes sociales para estar al tanto de las últimas novedades y eventos.</p>
            <div className="d-flex justify-content-center">
              <ul className="list-unstyled d-flex gap-3">
                <li>
                  <div style={{ backgroundColor: "#e95420", borderRadius: "50%", width: "40px", height: "40px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <i className="fab fa-facebook-f text-light"></i>
                  </div>
                </li>
                <li>
                  <div style={{ backgroundColor: "#e95420", borderRadius: "50%", width: "40px", height: "40px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <i className="fab fa-twitter text-light"></i>
                  </div>
                </li>
                <li>
                  <div style={{ backgroundColor: "#e95420", borderRadius: "50%", width: "40px", height: "40px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <i className="fab fa-instagram text-light"></i>
                  </div>
                </li>
              </ul>
            </div>
          </Col>
        </Row>
        <hr style={{ borderColor: "#e95420" }} />
        <Row>
          <Col className="text-center">
            <h5>&copy; 2024 Training Date</h5>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;

import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';


const Footer = () => {
  return (
    <footer className="bg-light text-dark py-5">
      <Container>
        <Row className='pb-4'>
          <Col xs={12} md={4} className="mb-3 mb-md-0">
            <h5>Contacto</h5>
            <p>Correo electrónico: info@training-date.es</p>
            <p>Teléfono: +34 123456900 </p>
          </Col>
          <Col xs={12} md={4} className="mb-3 mb-md-0">
            <h5>Enlaces útiles</h5>
            <ul className="list-unstyled">
              <li><Link to="/">Home</Link></li>
              <li><Link to="users/info">Recursos para el usuario</Link></li>
              <li><Link to="trainers/info">Recursos para el entrenador</Link></li>
            </ul>
          </Col>
          <Col xs={12} md={4} className='d-flex flex-column align-items-center justify-content-center'>
            <h5>Síguenos</h5>
            <p>Síguenos en nuestras redes sociales para estar al tanto de las últimas novedades y eventos.</p>
            <div className="d-flex justify-content-center">
              <ul className="list-unstyled d-flex gap-3">
                <li>
                  <i className="fab fa-facebook-f"></i>
                </li>
                <li>
                  <i className="fab fa-twitter"></i>
                </li>
                <li>
                  <i className="fab fa-instagram"></i>
                </li>
              </ul>
            </div>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col className="text-center">
            <p>&copy; 2024 Training Date</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;

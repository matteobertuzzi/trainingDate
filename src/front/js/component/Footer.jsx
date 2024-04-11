import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';


const Footer = () => {
  return (
    <footer className="bg-light text-dark mt-3 py-2 fixed">
      <Container>
        <Row >
          <Col xs={12} md={4} className="mb-3 mb-md-0 ">
            <h5>Contacto</h5>
            <p>Correo electrónico: info@training-date.es</p>
            <p>Teléfono: +34 123456900 </p>
          </Col>
          <Col xs={12} md={4} className="mb-3 mb-md-0">
            <h5>Enlaces útiles</h5>
            <ul className="list-unstyled">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/signupUser">Regístrate como usuario</Link></li>
              <li><Link to="/signupTrainer">Regístrate como entrenador</Link></li>
            </ul>
          </Col>
          <Col xs={12} md={4} className='d-flex flex-row'>
            <div>
              <h5>Síguenos</h5>
              <p>Síguenos en nuestras redes sociales para estar al tanto de las últimas novedades y eventos.</p>
            </div>
            <div className="d-flex flex-column align-items-center justify-content-center">
              <ul>
                <li>
                  <i className="fa-brands fa-facebook-f"></i>
                </li>
                <li>
                  <i className="fa-brands fa-twitter"></i>
                </li>
                <li>
                  <i className="fa-brands fa-instagram"></i>
                </li>
              </ul>
            </div>
          </Col>
        </Row>
        <hr className="mt-2" />
        <Row>
          <Col className="text-center">
            <p>&copyright; 2024 Training Date</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;

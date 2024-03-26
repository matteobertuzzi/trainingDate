import React from "react";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import { LogInModal } from "./LogInModal.jsx";
import { useState } from 'react';
import { useContext } from "react";
import { Context } from "../store/appContext";
import { FaUserAlt } from "react-icons/fa";
import { CgGym } from "react-icons/cg";
import { FaShoppingCart } from "react-icons/fa";


export const MyNavbar = () => {
  const [loginModalShow, setLoginModalShow] = useState(false);
  const { store, actions } = useContext(Context)
  const { logged } = store
  const { setLogged, setUser } = actions

  return (
    <Navbar fixed="top" expand="lg" className="bg-body-primary" data-bs-theme="dark">
      <Container fluid className=" justify-content-between p-2 mx-2">
        <Navbar.Brand href="#home">Training Date</Navbar.Brand>
        {logged
          ?
          (
            <Col xs="auto" className="d-flex gap-3">
              <Button variant="danger" onClick={() => { setLogged(false); setUser([]) }}>
                <FaUserAlt onClick={() => { setLogged(false); setUser([]) }} />
              </Button>
              <CgGym />
              <FaShoppingCart />
            </Col>
          )
          :
          (
            <Col xs="auto">
              <Button onClick={() => setLoginModalShow(true)} className="btn btn-primary">
                Log In
              </Button>
            </Col>
          )}
        <LogInModal show={loginModalShow} onHide={() => setLoginModalShow(false)} />
      </Container>
    </Navbar>
  );
};

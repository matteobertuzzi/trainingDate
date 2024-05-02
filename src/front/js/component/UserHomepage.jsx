import React, { useRef, useContext, useState } from 'react';
import { Container, Row, Col, Card, Button, Carousel } from 'react-bootstrap';
import { Context } from '../store/appContext';
import { Link } from 'react-router-dom';
import img from "/workspaces/sp54-final-project-g3/src/front/img/hutterstock_77087711229557_lm.jpg"
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination } from 'swiper/modules';


const UserHomepage = () => {
    const currentUser = JSON.parse(localStorage.getItem('availableAccount'));
    const { store, actions } = useContext(Context)
    const { specializations } = store
    const { setActiveNavTab } = actions
    const limitedSpecializations = specializations.slice(0, 3);

    return (
        <Container className='p-0 mb-3 w-100 d-flex flex-column gap-3' fluid>
            <Card className="text-white w-100" style={{ borderWidth: '0' }}>
                <Card.Img
                    className="d-block w-100 rounded-0"
                    src={img}
                    alt="First slide"
                    style={{ objectFit: 'cover', filter: 'brightness(80%)', height: '500px' }}
                />
                <Card.ImgOverlay className='d-flex w-auto  flex-column align-items-center justify-content-center mx-3' style={{ textAlign: 'center', color: 'white' }}>
                    <div className="text-center p-3 rounded" style={{ opacity: '0.9', backgroundColor: 'white', color: 'black' }}>
                        <h2 className="mb-4">¡Bienvenido, {currentUser.user.name}!</h2>
                        <p>Explora nuestras clases y encuentra la perfecta para ti.</p>
                        <Button onClick={() => setActiveNavTab("allClasses")} as={Link} to={`/allClasses`} variant="primary" className="mt-3">Ver clases disponibles</Button>
                    </div>
                </Card.ImgOverlay>
            </Card>
            <Row className="d-flex justify-content-center align-items-center">
                <Col lg={8} md={10} sm={10} xs={10} className="d-flex flex-column p-3 w-auto">
                    <div className="border rounded w-auto gap-3 p-4 d-flex justify-content-center align-items-center" style={{ boxShadow: '0 0 10px rgba(255, 165, 0, 0.5)' }}>
                        <h5 className='d-flex justify-content-center align-items-center mb-0'>Descubre todas las disciplinas disponibles</h5><Link onClick={() => setActiveNavTab("")} to={"/allSpecializations"}>Ver mas...</Link>
                    </div>
                </Col>
            </Row>
            <div id="app" style={{ height: '100%' }}>
                <Swiper
                    effect={'coverflow'}
                    grabCursor={true}
                    centeredSlides={true}
                    slidesPerView={'auto'}
                    coverflowEffect={{
                        rotate: 50,
                        stretch: 0,
                        depth: 100,
                        modifier: 1,
                        slideShadows: true,
                    }}
                    pagination={true}
                    modules={[EffectCoverflow, Pagination]}
                    className="swiper"
                    style={{ width: '100%', paddingTop: '20px', paddingBottom: '50px' }}
                >
                    {limitedSpecializations.map((specialization) => (
                        <SwiperSlide key={specialization.id} className="swiper-slide rounded" style={{ backgroundPosition: 'center', backgroundSize: 'cover', width: '300px', height: '300px' }}>
                            <Card.Img className="img-fluid w-100 h-100 rounded" variant="top" src={specialization.logo} />
                            <Card.ImgOverlay className='h-100 d-flex justify-content-center align-items-center'>
                                <div className='bg-white rounded p-1'>
                                    <span className="text-success"> {specialization.name.charAt(0).toUpperCase() + specialization.name.slice(1)}</span>
                                </div>
                            </Card.ImgOverlay>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </Container>
    );
}

export default UserHomepage;

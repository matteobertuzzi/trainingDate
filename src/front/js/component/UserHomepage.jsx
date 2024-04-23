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

    return (
        <Container className='p-0 w-100 d-flex flex-column gap-3' fluid>
            <Card className="text-white w-100" style={{ borderWidth: '0' }}>
                <Card.Img
                    className="d-block w-100 rounded-0"
                    src={img}
                    alt="First slide"
                    style={{ objectFit: 'cover', filter: 'brightness(70%)', height: '500px' }}
                />
                <Card.ImgOverlay className='d-flex w-auto  flex-column align-items-center justify-content-center mx-3' style={{ textAlign: 'center', color: 'white' }}>
                    <h3><strong>¡Hola, {currentUser.user.name}!</strong></h3>
                    <p>¿Listo para encontrar la clase perfecta para ti? 😊</p>
                    <Button as={Link} to="/users/info">
                        Obtener más información
                    </Button>
                </Card.ImgOverlay>
            </Card>
            <h2>Mira los tipo de entrenamientos disponibles en nuestra pagina</h2>
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
                    style={{ width: '100%', paddingTop: '50px', paddingBottom: '50px' }}
                >
                    {specializations.map((specialization) => (
                        <SwiperSlide className="swiper-slide" style={{ backgroundPosition: 'center', backgroundSize: 'cover', width: '300px', height: '300px' }}>
                            <img className='w-100 d-block' src={specialization.logo} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </Container>
    );
}

export default UserHomepage;

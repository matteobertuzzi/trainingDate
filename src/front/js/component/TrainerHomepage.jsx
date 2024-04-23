import React, { useContext, useState } from 'react';
import { Container, Row, Col, Card, Button, Carousel } from 'react-bootstrap';
import { Context } from '../store/appContext';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination } from 'swiper/modules';
import { AddTrainerSpecialization } from '../pages/AddTrainerSpecialization.jsx';
import personalTrainer from "/workspaces/sp54-final-project-g3/src/front/img/personal-trainer.jpg"
import newClass from "/workspaces/sp54-final-project-g3/src/front/img/new-class.jpeg"
import newSpecialization from "/workspaces/sp54-final-project-g3/src/front/img/new-specialization.jpeg"
import editProfile from "/workspaces/sp54-final-project-g3/src/front/img/edit-profile.jpg"

const TrainerHomepage = () => {
    const currentUser = JSON.parse(localStorage.getItem('availableAccount'));
    const [modalShow, setModalShow] = useState(false);
    const [activeTab, setActiveTab] = useState(null);

    // Define a function to calculate font sizes based on screen width
    const getFontSize = () => {
        const screenWidth = window.innerWidth;
        if (screenWidth <= 768) {
            return {
                fontSizeH5: '1.5rem',
                fontSizeH6: '1rem',
                fontSizeP: '0.8rem'
            };
        } else {
            return {
                fontSizeH5: '2rem',
                fontSizeH6: '1.5rem',
                fontSizeP: '1rem'
            };
        }
    };

    const { fontSizeH5, fontSizeH6, fontSizeP } = getFontSize();

    return (
        <Container className='p-0 w-100 d-flex flex-column gap-3' fluid>
            <Card className="text-white w-100" style={{ borderWidth: '0' }}>
                <Card.Img
                    className="d-block w-100 rounded-0"
                    src={personalTrainer}
                    alt="First slide"
                    style={{ objectFit: 'cover', filter: 'brightness(70%)', height: '500px' }}
                />
                <Card.ImgOverlay className='d-flex w-auto  flex-column align-items-center justify-content-center mx-3' style={{ textAlign: 'center', color: 'white' }}>
                    <h3><strong>¡Hola, {currentUser.trainer.name}!</strong></h3>
                    <p>¿Estás listo para empezar a crear tus clases y ayudar a tus clientes a alcanzar sus objetivos?</p>
                    <Button as={Link} to="/trainers/info">
                        Obtener más información
                    </Button>
                    <Button as={Link} to={`/trainers/${currentUser.trainer.id}/create/class`} className='my-3'>
                        Empezar ya!
                    </Button>
                </Card.ImgOverlay>
            </Card>
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
                    style={{ width: '100%', paddingTop: '50px', paddingBottom: '50px', marginBottom: '50px' }}
                >
                    <SwiperSlide className="swiper-slide" style={{ width: '300px', height: '300px' }}>
                        <img className='w-100 h-100 object-fit-cover' src={editProfile} alt="Informaciones" />
                        <Button as={Link} to={'trainers/info'} className='mt-2'>Descubrir app</Button>
                    </SwiperSlide>
                    <SwiperSlide className="swiper-slide" style={{ width: '300px', height: '300px' }}>
                        <img className='w-100 h-100 object-fit-cover' src={newClass} alt="New Class" />
                        <Button as={Link} to={`/trainers/${currentUser.trainer.id}/create/class`} className='mt-2'>Añadir clase</Button>
                    </SwiperSlide>
                    <SwiperSlide className="swiper-slide" style={{ width: '300px', height: '300px' }}>
                        <img className='w-100 h-100 object-fit-cover' src={newSpecialization} alt="New Specialization" />
                        <Button onClick={() => setModalShow(true)} className='mt-2'>Añadir especialización</Button>
                        <AddTrainerSpecialization show={modalShow} onHide={() => setModalShow(false)} />
                    </SwiperSlide>
                </Swiper>
            </div>
        </Container>
    );
}

export default TrainerHomepage;

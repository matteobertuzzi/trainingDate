import React, { useContext, useState } from 'react';
import { Context } from '../store/appContext';
import SwiperCore from 'swiper/core';
import { Navigation, Pagination, EffectCoverflow } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Button, Card } from 'react-bootstrap';
import 'swiper/swiper-bundle.css';
import MapModal from './MapModal.jsx';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import RegisterPopup from './RegisterPopup.jsx';

// Install Swiper modules
SwiperCore.use([Navigation, Pagination, EffectCoverflow]);

const ClassesCarousel = () => {
    const { store, actions } = useContext(Context);
    const { allClasses } = store;
    const viewClasses = allClasses.slice(0, 5)
    const [modalShow, setModalShow] = useState(false);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    return (
        <div className="carousel-container">
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
                className="swiper "
                style={{ width: '100%', paddingTop: '50px', paddingBottom: '50px' }}
            >
                {viewClasses.map((oneClass) => (
                    <SwiperSlide key={oneClass.class_details.id} className="swiper-slide d-flex flex-column align-items-start rounded" style={{ backgroundPosition: 'center', backgroundSize: 'cover', width: '300px', height: '400px' }}>
                        <img className='w-100 d-block rounded' src={oneClass.specialization.logo} style={{ borderTopLeftRadius: '2%', borderTopRightRadius: '2%' }} />
                        <div className="footer-details p-3">
                            <span className="d-flex flex-row gap-1"><strong>Ciudad: </strong><p className="mb-0">{oneClass.class_details.city}</p></span>
                            <span className="d-flex flex-row gap-1"><strong>Fecha: </strong><p className="mb-0">{formatDate(oneClass.class_details.start_date)}</p></span>
                            <span className="d-flex flex-row align-items-center justify-content-center gap-1"><strong>Difficultad: </strong>
                                {oneClass.class_details.training_level === "Advanced" ? <span className="bg-danger p-1 rounded text-white">Avanzado</span> :
                                    oneClass.class_details.training_level === "Intermediate" ? <span className="bg-warning p-1 rounded text-white">Intermedio</span> :
                                        oneClass.class_details.training_level === "Beginner" ? <span className="bg-success p-1 rounded text-white">Principiante</span> :
                                            ""}
                            </span>
                        </div>
                    </SwiperSlide>
                ))}
                <SwiperSlide onClick={() => setModalShow(true)} className="swiper-slide rounded d-flex flex-column justify-content-center align-items-center" style={{ backgroundColor: '#F06B27', backgroundPosition: 'center', backgroundSize: 'cover', width: '300px', height: '400px', cursor: 'pointer' }}>
                    <h2 className="mb-3">Ver Más</h2>
                    <FontAwesomeIcon icon={faPlus} size="3x" />
                </SwiperSlide>
                <RegisterPopup show={modalShow} onHide={() => setModalShow(false)} />
            </Swiper>
        </div >
    );
};

export default ClassesCarousel;



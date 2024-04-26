import React, { useContext } from 'react';
import { Context } from '../store/appContext';
import SwiperCore from 'swiper/core';
import { Navigation, Pagination, EffectCoverflow } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Button, Card } from 'react-bootstrap';
import 'swiper/swiper-bundle.css';
import MapModal from './MapModal.jsx';

// Install Swiper modules
SwiperCore.use([Navigation, Pagination, EffectCoverflow]);

const ClassesCarousel = () => {
    const { store, actions } = useContext(Context);
    const { allClasses } = store;

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
                className="swiper"
                style={{ width: '100%', paddingTop: '50px', paddingBottom: '50px' }}
            >
                {allClasses.map((oneClass) => (
                    <SwiperSlide className="swiper-slide d-flex flex-column align-items-center" style={{ backgroundPosition: 'center', backgroundSize: 'cover', width: '300px', height: '400px', paddingBottom: '10px', paddingTop: '10px' }}>
                        <h4><strong>{oneClass.class_details.class_name}</strong></h4>
                        <img className='w-100 d-block' src='https://www.regymenfitness.com/wp-content/uploads/2021/12/Sportive-serious-people-liftin-1080x675.jpg' />
                        <div className="footer-details mt-2">
                            <p><strong>Fecha: </strong>{formatDate(oneClass.class_details.start_date)}</p>
                            <MapModal addressData={[oneClass.class_details.city, oneClass.class_details.postal_code, oneClass.class_details.street_name, oneClass.class_details.street_number]} />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default ClassesCarousel;



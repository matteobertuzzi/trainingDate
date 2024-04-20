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
                    <SwiperSlide className="swiper-slide d-flex flex-column align-items-center" style={{ backgroundPosition: 'center', backgroundSize: 'cover', width: '300px', height: '300px' }}>
                        <h2>{oneClass.class_name}</h2>
                        <img className='w-100 d-block' src='https://www.regymenfitness.com/wp-content/uploads/2021/12/Sportive-serious-people-liftin-1080x675.jpg' />
                        <div className='my-3'>
                            <MapModal addressData={[oneClass.city, oneClass.postal_code, oneClass.street_name, oneClass.street_number]} />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default ClassesCarousel;



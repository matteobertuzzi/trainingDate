import React, { useContext } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Context } from '../store/appContext';
import { RiArrowGoBackLine } from "react-icons/ri";
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, EffectCreative } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


const TrainerInfo = () => {
    const { store, actions } = useContext(Context)
    const { logged } = store
    const { setActiveNavTab } = actions

    return (
        <Container className="my-4">
            <Row className="d-flex justify-content-center align-items-center">
                <Col lg={8} md={10} sm={10} xs={10} className="d-flex flex-column p-3 w-auto">
                    <div className="border rounded p-4 d-flex flex-column justify-content-center align-items-center" style={{ boxShadow: '0 0 10px rgba(255, 165, 0, 0.5)' }}>
                        <h3 className="mb-4">Información del entrenador</h3>
                        <p>
                            En esta sección, te proporcionaremos información detallada sobre cómo funciona nuestra aplicación para entrenadores.
                        </p>
                        <p>Aquí tienes una descripción detallada paso a paso:</p>
                    </div>
                </Col>
            </Row>
            <Swiper
                pagination={{
                    type: 'progressbar',
                }}
                navigation={true}
                modules={[Pagination, Navigation]}
                className="mySwiper d-none d-md-block mt-4 rounded w-75 d-flex flex-row justify-content-center align-items-center"
            >
                <SwiperSlide className='px-5 py-3 d-sm-px-0 d-flex flex-column justify-content-center align-items-center'>
                    <h3>Paso 1: Crear perfil</h3>
                    <p>
                        El primer paso es registrarte en nuestra plataforma. Una vez completado el proceso de registro, recibirás un correo electrónico de confirmación. Deberás confirmar tu correo electrónico haciendo clic en el enlace de confirmación proporcionado en el correo electrónico para activar tu cuenta.
                    </p>
                </SwiperSlide>
                <SwiperSlide className='px-5 py-3 d-flex flex-column justify-content-center align-items-center d-md-w-75'>
                    <h3>Paso 2: Envía tu certificado</h3>
                    <p>
                        El primer paso para convertirte en entrenador en nuestra plataforma es enviarnos tu certificado o título de estudio que demuestre tus habilidades y especializaciones relevantes. Este documento será revisado por nuestro equipo administrativo para verificar su autenticidad. Si tu certificado es aprobado, recibirás una notificación por correo electrónico informándote sobre la aprobación.
                    </p>
                </SwiperSlide>
                <SwiperSlide className='px-5 py-3 d-flex flex-column justify-content-center align-items-center d-md-w-75'>
                    <h3>Paso 3: Comienza a crear clases</h3>
                    <p>
                        Una vez que hayas recibido la confirmación de que tu certificado ha sido aprobado, podrás empezar a crear clases y programas de entrenamiento personalizados. Estas clases estarán relacionadas con las especializaciones previamente confirmadas. Los usuarios podrán inscribirse en estas clases y programas para participar en tus sesiones de entrenamiento.
                    </p>
                </SwiperSlide>
            </Swiper>
            <Swiper
                pagination={{
                    type: 'progressbar',
                }}
                grabCursor={true}
                effect={'creative'}
                creativeEffect={{
                    prev: {
                        shadow: true,
                        translate: ['-125%', 0, -800],
                        rotate: [0, 0, -90],
                    },
                    next: {
                        shadow: true,
                        translate: ['125%', 0, -800],
                        rotate: [0, 0, 90],
                    },
                }}
                modules={[EffectCreative]}
                className="mySwiper5 d-md-none rounded mb-2"
            >
                <SwiperSlide className='p-3 d-sm-px-0 d-flex flex-column justify-content-center align-items-center'>
                    <h3>Paso 1: Crear perfil</h3>
                    <p>
                        El primer paso es registrarte en nuestra plataforma. Una vez completado el proceso de registro, recibirás un correo electrónico de confirmación. Deberás confirmar tu correo electrónico haciendo clic en el enlace de confirmación proporcionado en el correo electrónico para activar tu cuenta.
                    </p>
                </SwiperSlide>
                <SwiperSlide className='p-3 d-flex flex-column justify-content-center align-items-center'>
                    <h3>Paso 2: Envía tu certificado</h3>
                    <p>
                        El primer paso para convertirte en entrenador en nuestra plataforma es enviarnos tu certificado o título de estudio que demuestre tus habilidades y especializaciones relevantes. Este documento será revisado por nuestro equipo administrativo para verificar su autenticidad. Si tu certificado es aprobado, recibirás una notificación por correo electrónico informándote sobre la aprobación.
                    </p>
                </SwiperSlide>
                <SwiperSlide className='p-3 d-flex flex-column justify-content-center align-items-center '>
                    <h3>Paso 3: Comienza a crear clases</h3>
                    <p>
                        Una vez que hayas recibido la confirmación de que tu certificado ha sido aprobado, podrás empezar a crear clases y programas de entrenamiento personalizados. Estas clases estarán relacionadas con las especializaciones previamente confirmadas. Los usuarios podrán inscribirse en estas clases y programas para participar en tus sesiones de entrenamiento.
                    </p>
                </SwiperSlide>
            </Swiper>
            {
                logged ? "" : (
                    <Row className="mb-4 mt-2">
                        <Col className='d-flex justify-content-center'>
                            <Link to='/signupTrainer'>
                                <Button onClick={() => setActiveNavTab("")} variant="primary" size="lg">
                                    Listo para empezar? Regístrate como entrenador ahora!
                                </Button>
                            </Link>
                        </Col>
                    </Row>
                )
            }
        </Container >
    );
}

export default TrainerInfo;
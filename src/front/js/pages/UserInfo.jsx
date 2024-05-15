import React, { useContext } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Context } from '../store/appContext';
import { RiArrowGoBackLine } from "react-icons/ri";
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, EffectCreative } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const UserInfo = () => {
    const { store, actions } = useContext(Context);
    const { logged } = store;
    const { setActiveNavTab } = actions

    return (
        <Container className="mt-4 mb-5">
            <Row className="d-flex justify-content-center align-items-center">
                <Col lg={8} md={10} sm={10} xs={10} className="d-flex flex-column p-3 w-auto">
                    <div className="border rounded p-4 d-flex flex-column justify-content-center align-items-center" style={{ boxShadow: '0 0 10px rgba(255, 165, 0, 0.5)' }}>
                        <h3 className="mb-4">Información del usuario</h3>
                        <p className='m-0'>
                            En esta página, se explica cómo inscribirse como usuario y las funciones que puedes utilizar en nuestra aplicación.
                        </p>
                        <p  className='m-0'>
                            Encontrarás todo lo necesario para comenzar a disfrutar de nuestra plataforma al máximo.
                        </p>
                    </div>
                </Col>
            </Row>
            <Swiper
                pagination={{
                    type: 'progressbar',
                }}
                navigation={true}
                modules={[Pagination, Navigation]}
                className="mySwiper d-none d-md-block mb-2 mt-4 rounded w-75 d-flex flex-row justify-content-center align-items-center"
            >
                <SwiperSlide className='px-5 py-3 d-sm-px-0 d-flex flex-column justify-content-center align-items-center'>
                    <h3>Paso 1: Crear perfil</h3>
                    <p>
                        El primer paso es registrarte en nuestra plataforma. Una vez completado el proceso de registro, recibirás un correo electrónico de confirmación. Deberás confirmar tu correo electrónico haciendo clic en el enlace de confirmación proporcionado en el correo electrónico para activar tu cuenta.
                    </p>
                </SwiperSlide>
                <SwiperSlide className='px-5 py-3 d-flex flex-column justify-content-center align-items-center d-md-w-75'>
                    <h3>Paso 2: Explora las clases</h3>
                    <p>
                        Una vez confirmado tu registro, tendrás acceso completo para explorar todas las clases disponibles en nuestra aplicación. Cada clase estará detalladamente descrita, Además, si deseas obtener más detalles sobre las disciplinas específicas de las clases, puedes revisar la sección de disciplinas para conocer más sobre ellas y tomar decisiones informadas sobre tus opciones de entrenamiento.
                    </p>
                </SwiperSlide>
                <SwiperSlide className='px-5 py-3 d-flex flex-column justify-content-center align-items-center d-md-w-75'>
                    <h3>Paso 3: Reserva tus clases</h3>
                    <p>
                        En el último paso, tendrás la oportunidad de elegir y marcar como favoritas las clases que te interesen. Además, podrás realizar el pago de estas clases directamente a través de nuestra aplicación, lo que hace que reservar y pagar por tus clases sea rápido y conveniente.
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
                className="mySwiper5 d-md-none rounded"
            >
                <SwiperSlide className='p-3 d-sm-px-0 d-flex flex-column justify-content-center align-items-center'>
                    <h3>Paso 1: Crear perfil</h3>
                    <p>
                        El primer paso es registrarte en nuestra plataforma. Una vez completado el proceso de registro, recibirás un correo electrónico de confirmación. Deberás confirmar tu correo electrónico haciendo clic en el enlace de confirmación proporcionado en el correo electrónico para activar tu cuenta.
                    </p>
                </SwiperSlide>
                <SwiperSlide className='p-3 d-flex flex-column justify-content-center align-items-center d-md-w-75'>
                    <h3>Paso 2: Explora las clases</h3>
                    <p>
                        Una vez confirmado tu registro, tendrás acceso completo para explorar todas las clases disponibles en nuestra aplicación. Cada clase estará detalladamente descrita, Además, si deseas obtener más detalles sobre las disciplinas específicas de las clases, puedes revisar la sección de disciplinas para conocer más sobre ellas y tomar decisiones informadas sobre tus opciones de entrenamiento.
                    </p>
                </SwiperSlide>
                <SwiperSlide className='p-3 d-flex flex-column justify-content-center align-items-center d-md-w-75'>
                    <h3>Paso 3: Reserva tus clases</h3>
                    <p>
                        En el último paso, tendrás la oportunidad de elegir y marcar como favoritas las clases que te interesen. Además, podrás realizar el pago de estas clases directamente a través de nuestra aplicación, lo que hace que reservar y pagar por tus clases sea rápido y conveniente.
                    </p>
                </SwiperSlide>
            </Swiper>
            <Row className='d-flex justify-content-center align-items-center'>
                {!logged && (
                    <Col md={10} className='d-flex justify-content-center align-items-center'>
                        <Link to='/signupUser'>
                            <Button onClick={() => setActiveNavTab("")} variant="primary" size="lg">
                                Listo para empezar? Regístrate como usuario ahora!
                            </Button>
                        </Link>
                    </Col>
                )}
            </Row>
        </Container >
    );
}

export default UserInfo;

import React, { useContext, useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Carousel, Alert } from 'react-bootstrap';
import { Context } from '../store/appContext';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination } from 'swiper/modules';
import personalTrainer from "/workspaces/sp54-final-project-g3/src/front/img/personal-trainer.jpg"


const TrainerHomepage = () => {
    const { store, actions } = useContext(Context)
    const { trainerClasses } = store
    const { setActiveNavTab } = actions
    const currentUser = JSON.parse(localStorage.getItem('availableAccount'));
    const [modalShow, setModalShow] = useState(false);
    const [todayClasses, setTodayClasses] = useState([]);
    const todayDate = new Date();

    const handleDetails = async (classId) => {
        await actions.getTrainerClassDetails(classId)
    }

    useEffect(() => {
        const filteredClasses = trainerClasses.filter(clase => {
            const dateClass = new Date(clase.start_date);
            return dateClass.getDate() === todayDate.getDate() &&
                dateClass.getMonth() === todayDate.getMonth() &&
                dateClass.getFullYear() === todayDate.getFullYear();
        });
        setTodayClasses(filteredClasses);
    }, [trainerClasses]);

    return (
        <Container className='p-0 w-100 min-vh-100 mb-4 d-flex flex-column gap-3' fluid>
            <Card className="text-white w-100" style={{ borderWidth: '0' }}>
                <Card.Img
                    className="d-block w-100 rounded-0"
                    src={personalTrainer}
                    alt="First slide"
                    style={{ objectFit: 'cover', filter: 'brightness(70%)', height: '500px' }}
                />
                <Card.ImgOverlay className='d-flex w-auto  flex-column align-items-center justify-content-center mx-3' style={{ textAlign: 'center', color: 'white' }}>
                    <div className="text-center p-3 rounded" style={{ opacity: '0.9', backgroundColor: 'white', color: 'black' }}>
                        <h3><strong>¡Hola, {currentUser.trainer.name}!</strong></h3>
                        <p>¿Estás listo para empezar a crear tus clases y ayudar a tus clientes a alcanzar sus objetivos?</p>
                        <Button variant="info" onClick={() => setActiveNavTab("")} as={Link} to="/trainers/info" className='w-auto me-2'>
                            Obtener más información
                        </Button>
                        <Button onClick={() => setActiveNavTab("")} as={Link} to={`/trainers/${currentUser.trainer.id}/create/class`} className='my-3'>
                            Empezar ya!
                        </Button>
                    </div>
                </Card.ImgOverlay>
            </Card>
            <Row className='d-flex justify-content-center align-items-center my-2 mx-0'>
                <Col lg={8} md={10} sm={8} xs={8} className="w-auto">
                    <div className="border rounded p-4 d-flex flex-column justify-content-center align-items-center" style={{ boxShadow: '0 0 10px rgba(255, 165, 0, 0.5)' }}>
                        <h3 className='m-0'>¡Tu agenda de entrenamiento diaria!</h3>
                    </div>
                </Col>
            </Row>
            {todayClasses.length > 0 ? (
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
                    {todayClasses.map((todayClass) => (
                        <SwiperSlide key={todayClass.id} className="swiper-slide rounded d-flex flex-column align-items-start" style={{ backgroundPosition: 'center', backgroundSize: 'cover', width: '300px', height: '400px' }}>
                            <img className='w-100 d-block' style={{ borderTopLeftRadius: '2%', borderTopRightRadius: '2%' }} src={todayClass.specialization.logo} />
                            <div className="footer-details p-3">
                                <span className="d-flex flex-row gap-1"><strong>Ciudad: </strong><p className="mb-0">{todayClass.city}</p></span>
                                <span className="d-flex flex-row align-items-center justify-content-center gap-1"><strong>Difficultad: </strong>
                                    {todayClass.training_level === "Advanced" ? <span className="bg-danger p-1 rounded text-white">Avanzado</span> :
                                        todayClass.training_level === "Intermediate" ? <span className="bg-warning p-1 rounded text-white">Intermedio</span> :
                                            todayClass.training_level === "Beginner" ? <span className="bg-success p-1 rounded text-white">Principiante</span> :
                                                ""}
                                </span>
                                <span className="d-flex flex-row gap-1"><strong>Capacidad: </strong>{todayClass.capacity === 0 ? <span className="bg-danger p-1 rounded text-white">Clase completa</span> : `${todayClass.capacity} personas`}</span>
                            </div>
                            <div className='d-flex justify-content-center align-items-center w-100 border-top p-3'>
                                <Button as={Link} to={`/trainer/${currentUser.trainer.id}/class/${todayClass.id}`} onClick={() => handleDetails(todayClass.id)}>Detalles</Button>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            ) : (
                <Row className='d-flex justify-content-center align-items-center m-0'>
                    <Col className='d-flex justify-content-center'>
                        <Alert className='d-flex flex-column justify-content-center align-items-center mx-2' variant="danger">
                            <Alert.Heading className='mb-3'>¡Atención!</Alert.Heading>
                            <p className="text-center">No hay clases programadas para este día. ¿Por qué no creas una nueva clase ahora mismo?</p>
                            <Button onClick={() => setActiveNavTab("")} as={Link} to={`/trainers/${currentUser.trainer.id}/create/class`} variant="success" className="mt-3">Crear nueva clase</Button>
                        </Alert>
                    </Col>
                </Row>
            )}
        </Container>
    );
}

export default TrainerHomepage;

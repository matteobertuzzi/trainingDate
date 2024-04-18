import React, { useContext } from 'react';
import { Context } from '../store/appContext';
import Carousel from 'react-bootstrap/Carousel';
import { BsChevronCompactRight, BsChevronCompactLeft } from "react-icons/bs";
import Card from 'react-bootstrap/Card';
import { Button } from 'react-bootstrap';
import Loading from './Loading.jsx';
import ClassModal from './ClassModal.jsx';
import MapModal from './MapModal.jsx';

const placeholderImageUrl = 'https://www.tiege.com/cdn/shop/articles/couple-working-out-at-gym.jpg';

const ClassesCarousel = () => {
    const { store, actions } = useContext(Context);
    const { allClasses } = store;

    // Helper function to chunk the array into groups of three
    const chunkArray = (arr, chunkSize) => {
        const chunkedArr = [];
        for (let i = 0; i < arr.length; i += chunkSize) {
            chunkedArr.push(arr.slice(i, i + chunkSize));
        }
        return chunkedArr;
    };

    // Splitting allClasses into groups of three
    const classGroups = chunkArray(allClasses, 3);

    return (
        <>
            {allClasses.length !== 0 ?
                (<Carousel prevIcon={<BsChevronCompactLeft />} nextIcon={<BsChevronCompactRight />}>
                    {classGroups.map((group, index) => (
                        <Carousel.Item key={index}>
                            <div className="row d-flex flex-row align-items-center justify-content-center">
                                {group.map((oneClass, innerIndex) => (
                                    <div className='col-xl-3 col-lg-6 col-sm-7 col-sm-10 d-flex flex-row justify-content-center align-items-center h-100' key={innerIndex}>
                                        <Card className='my-3'>
                                            <Card.Img variant="top" src={placeholderImageUrl} />
                                            <Card.Body>
                                                <Card.Title>{oneClass.class_name ? oneClass.class_name : 'Clase de entrenamiento'}</Card.Title>
                                                <Card.Text>
                                                    {oneClass.class_details ? oneClass.class_details : 'Clase de entrenamiento'}
                                                </Card.Text>
                                                <div className="d-flex justify-content-around">
                                                    <ClassModal userClass={oneClass} className='mx-3' />
                                                    <MapModal addressData={[oneClass.city, oneClass.postal_code, oneClass.street_name, oneClass.street_number]} className='mx-3' />
                                                </div>
                                            </Card.Body>
                                        </Card>
                                    </div>
                                ))}
                            </div>
                        </Carousel.Item>
                    ))}
                </Carousel>)
                :
                <Loading />
            }
        </>
    )
}

export default ClassesCarousel;
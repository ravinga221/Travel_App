import React, { useEffect, useRef, useState, useContext } from 'react';
import '../shared/tour-details.css';
import { Container, Row, Col, Form, ListGroup } from 'reactstrap';
import { useParams } from 'react-router-dom';
import calculateAvgRating from '../utils/avgRating';
import avatar from '../assets/images/avatar.jpg';
import Booking from '../components/Booking/Booking';
import Newsletter from './../shared/Newsletter';
import useFetch from './../hooks/useFetch';
import { AuthContext } from './../context/AuthContex';

const BASE_URL = 'http://localhost:4000/api/v1';

const TourDetails = () => {
    const { id } = useParams();
    const reviewMsgRef = useRef('');
    const [tourRating, setTourRating] = useState(null);
    const [reviews, setReviews] = useState([]);

    const { user } = useContext(AuthContext);    
    const { data: tour, loading, error } = useFetch(`${BASE_URL}/tours/${id}`);

    const { 
        photo, 
        title, 
        desc, 
        price, 
        reviews: initialReviews = [], 
        address, 
        city, 
        distance, 
        maxGroupSize 
    } = tour || {};

    // Use local reviews state, fallback to initial reviews from API
    const currentReviews = reviews.length > 0 ? reviews : initialReviews;
    const { totalRating, avgRating } = calculateAvgRating(currentReviews);

    // Update local reviews when tour data changes
    useEffect(() => {
        if (tour && tour.reviews) {
            setReviews(tour.reviews);
        }
    }, [tour]);

    // Format date
    const options = { day: 'numeric', month: 'long', year: 'numeric' };

    // Submit request to the server
    const submitHandler = async e => {
        e.preventDefault();
        const reviewText = reviewMsgRef.current.value;
        
        try {
            // Fix the user check and add return statement
            if (!user || user === undefined || user === null) {
                alert('Please sign in');
                return; // Important: return early to prevent form submission
            }

            // Check if rating is selected
            if (!tourRating) {
                alert('Please select a rating');
                return;
            }

            const reviwObj = {
                username: user?.username,
                reviewText,
                rating: tourRating
            }

            const res = await fetch(`${BASE_URL}/review/${id}`, {
                method: 'post',
                headers: {
                    'content-type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(reviwObj)
            });

            const result = await res.json();
            
            if (!res.ok) {
                alert(result.message);
                return;
            }
            
            alert(result.message);
            
            // Add the new review to local state immediately
            const newReview = {
                username: user.username,
                reviewText,
                rating: tourRating,
                createdAt: new Date().toISOString()
            };
            
            setReviews(prevReviews => [newReview, ...prevReviews]);
            
            // Clear the form after successful submission
            reviewMsgRef.current.value = '';
            setTourRating(null);

        } catch (err) {
            alert(err.message);
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [tour]);

    return (
        <>
            <section>
                <Container>
                    {
                        loading && <h4 className="text-center pt-5">Loading..............</h4>
                    }
                    {
                        error && <h4 className="text-center pt-5">{error}</h4>
                    }
                    {!loading && !error && (
                        <Row>
                            <Col lg='8'>
                                <div className="tour_content">
                                    <img src={photo} alt='' />

                                    <div className="tour_info">
                                        <h2>{title}</h2>

                                        <div className='d-flex align-items-center gap-5'>
                                            <span className='tour_rating d-flex align-items-center gap-1'>
                                                <i className="ri-star-fill" style={{ color: 'var(--secondary-color)' }}></i>
                                                {avgRating === 0 ? null : avgRating}
                                                {totalRating === 0 ? (' Not Rated') : 
                                                    (<span>({currentReviews?.length})</span>)}
                                            </span>

                                            <span>
                                                <i className="ri-map-pin-user-fill"></i>{address}
                                            </span>
                                        </div>

                                        <div className="tour_extra-details">
                                            <span><i className="ri-map-pin-2-line"></i>{city}</span>
                                            <span><i className="ri-money-dollar-circle-line"></i>${price} /per person</span>
                                            <span><i className="ri-map-pin-time-line"></i>{distance} k/m</span>
                                            <span><i className="ri-group-line"></i>{maxGroupSize} people</span>
                                        </div>
                                        <h5>Description</h5>
                                        <p>{desc}</p>
                                    </div>

                                    {/* ======== tour reviews section ======== */}
                                    <div className="tour_reviews mt-4">
                                        <h4>Reviews({currentReviews?.length} reviews)</h4>
                                        <Form onSubmit={submitHandler}>
                                            <div className='d-flex align-items-center gap-3 mb-4 rating_group'>
                                                <span 
                                                    onClick={() => setTourRating(1)}
                                                    className={tourRating === 1 ? 'selected' : ''}
                                                    style={{ cursor: 'pointer' }}
                                                >
                                                    1<i className="ri-star-s-fill"></i>
                                                </span>
                                                <span 
                                                    onClick={() => setTourRating(2)}
                                                    className={tourRating === 2 ? 'selected' : ''}
                                                    style={{ cursor: 'pointer' }}
                                                >
                                                    2<i className="ri-star-s-fill"></i>
                                                </span>
                                                <span 
                                                    onClick={() => setTourRating(3)}
                                                    className={tourRating === 3 ? 'selected' : ''}
                                                    style={{ cursor: 'pointer' }}
                                                >
                                                    3<i className="ri-star-s-fill"></i>
                                                </span>
                                                <span 
                                                    onClick={() => setTourRating(4)}
                                                    className={tourRating === 4 ? 'selected' : ''}
                                                    style={{ cursor: 'pointer' }}
                                                >
                                                    4<i className="ri-star-s-fill"></i>
                                                </span>
                                                <span 
                                                    onClick={() => setTourRating(5)}
                                                    className={tourRating === 5 ? 'selected' : ''}
                                                    style={{ cursor: 'pointer' }}
                                                >
                                                    5<i className="ri-star-s-fill"></i>
                                                </span>
                                            </div>

                                            <div className="review_input">
                                                <input 
                                                    type="text" 
                                                    ref={reviewMsgRef} 
                                                    placeholder='Write a review'
                                                    required 
                                                />
                                                <button className='btn primary__btn text-white' type='submit'>
                                                    Submit
                                                </button>
                                            </div>
                                        </Form>

                                        <ListGroup className='user_reviews'>
                                            {currentReviews?.map((review, index) => (
                                                <div className="review_item" key={index}>
                                                    <img src={avatar} alt='' />

                                                    <div className="w-100">
                                                        <div className="d-flex align-items-center justify-content-between">
                                                            <div>
                                                                <h5>{review.username}</h5>
                                                                <p>{new Date(review.createdAt).toLocaleDateString("en-US", options)}</p>

                                                                <div>
                                                                    <span className='d-flex align-items-center'>
                                                                        {review.rating}<i className="ri-star-s-fill"></i>
                                                                    </span>
                                                                </div>
                                                                <h6>{review.reviewText}</h6>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </ListGroup>
                                    </div>
                                    {/* ======== tour reviews section end======== */}
                                </div>
                            </Col>

                            <Col lg='4'>
                                <Booking tour={tour} avgRating={avgRating} />
                            </Col>
                        </Row>
                    )}
                </Container>
            </section>
            <Newsletter />
        </>
    );
};

export default TourDetails;
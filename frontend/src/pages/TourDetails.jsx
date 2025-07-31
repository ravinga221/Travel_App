import React,{useEffect, useRef, useState} from 'react';
import '../shared/tour-details.css';
import { Container, Row, Col, Form, ListGroup } from 'reactstrap';
import { useFetcher, useParams } from 'react-router-dom';

import calculateAvgRating from '../utils/avgRating';
import avatar from '../assets/images/avatar.jpg';
import Booking from '../components/Booking/Booking';
import Newsletter from './../shared/Newsletter';
import useFetch from './../hooks/useFetch';

const TourDetails = () => {

    const { id } = useParams();
    const reviewMsgRef = useRef('');
    const [tourRating, setTourRating] = useState(null);

    //fetch data from database
    const {data:tour} = useFetch(`${BASE_URL}/tours/${id}`);

    //destruction properties from tour object
    const { photo, title, desc, price, reviews, address, city, distance, maxGroupSize } = tour;

    const { totalRating, avgRating } = calculateAvgRating(reviews);

    //format date
    const options = {day:'numeric', month:'long', year:'numeric'};

    //submit request to the server
    const submitHandler = (e) => {
      e.preventDefault();

      const reviewText = reviewMsgRef.current.value;

      alert(`${reviewText}, ${tourRating}`);
    }

    useEffect(()=>{
      window.scrollTo(0, 0);
    },[])

  return (
    <>
    <section>
      <Container>
      {
        !loarding && !error &&   <Row>
          <Col lg='8'>
          <div className="tour_content">
            <img src={photo} alt='' />

            <div className="tour_info">
              <h2>{title}</h2>

              <div className='d-flex align-items-center gap-5'>
                 <span className='tour_rating d-flex align-items-center gap-1'>
                  <i className="ri-star-fill" style={{color: 'var(--secondary-color)'}}></i>
                   {avgRating === 0 ? null : avgRating}
                    {totalRating === 0 ? (' Not Rated') : 
                    (<span>({reviews?.length})</span>)}
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
              <h4>Reviews({reviews?.length} reviews)</h4>
              <Form onSubmit={submitHandler}>
                <div className='d-flex align-items-center gap-3 mb-4 rating_group'>
                  <span onClick={() => setTourRating(1)} >
                    1<i className="ri-star-s-fill"></i></span>
                  <span onClick={() => setTourRating(2)} >
                    2<i className="ri-star-s-fill"></i></span>
                  <span onClick={() => setTourRating(3)} >
                    3<i className="ri-star-s-fill"></i></span>
                  <span onClick={() => setTourRating(4)} >
                    4<i className="ri-star-s-fill"></i></span>
                  <span onClick={() => setTourRating(5)} >
                    5<i className="ri-star-s-fill"></i></span>
                </div>

                <div className="review_input">
                  <input type="text" ref={reviewMsgRef} 
                  placeholder='Write a review'
                  required />
                  <button className='btn primary_btn text-white' type='submit'>Submit</button>
                </div>
              </Form>

              <ListGroup className='user_reviews'>
                {
                  reviews?.map(review=>(
                    <div className="review_item">
                      <img src={avatar} alt='' />

                      <div className="w-100">
                        <div className="d-flex align-items-center justify-content-between">
                          <div>
                            <h5>ravi</h5>
                            <p>{new Date('07-11-2025').toLocaleDateString("en-US", options)}</p>

                            <div>
                            <span className='d-flex align-items-center'>
                              5<i className="ri-star-s-fill"></i>
                              {review.rating} ({review.rating === 1 ? '1 review' : `${review.rating} reviews`})
                            </span>
                            </div>
                            <h6>Amazing tour!</h6>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                }
              </ListGroup>
            </div>
            {/* ======== tour reviews section end======== */}
          </div>
          </Col>

          <Col lg='4'>
            <Booking tour={tour} avgRating={avgRating} />
          </Col>
        </Row>);
      }
      </Container>
    </section>
    <Newsletter/>
    </>
  );
};

export default TourDetails;
import React from 'react'
import Slider from 'react-slick'
import './Testimonials .css' // Import the custom CSS file
import ava01 from '../../assets/images/ava-1.jpeg'
import ava02 from '../../assets/images/ava-2.jpeg'
import ava03 from '../../assets/images/ava-3.jpeg'

const Testimonials = () => {

    const settings = {
        dots: true,
        infinite: true,
        autoplay: true,
        speed: 1000,
        swipeToSlide: true,
        autoplaySpeed: 2000,
        slidesToShow: 3,
        
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                },
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ]
    }

  return (
    <div className="testimonials-slider">
        <Slider {...settings}>
            <div className="testimonial py-4 px-3 testimonial-custom">
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
                    Voluptas rerum odio dolores veniam odit quia! Quibusdam, magnam, 
                    aliquam doloribus dolores accusantium animi laboriosam quae totam 
                    facilis quas deserunt temporibus quidem?</p>

                    <div className="d-flex align-items-center gap-4 mt-3 customer-info">
                        <img src={ava01} alt='' className='w-25 h-25 rounded-2' />
                        <div>
                            <h6 className='mb-0 mt-3 customer-name'>John Doe</h6>
                            <p className='customer-role'>Customer</p>
                        </div>
                    </div>
            </div>

            <div className="testimonial py-4 px-3 testimonial-custom">
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
                    Voluptas rerum odio dolores veniam odit quia! Quibusdam, magnam, 
                    aliquam doloribus dolores accusantium animi laboriosam quae totam 
                    facilis quas deserunt temporibus quidem?</p>

                    <div className="d-flex align-items-center gap-4 mt-3 customer-info">
                        <img src={ava02} alt='' className='w-25 h-25 rounded-2' />
                        <div>
                            <h6 className='mb-0 mt-3 customer-name'>Lia Franklin</h6>
                            <p className='customer-role'>Customer</p>
                        </div>
                    </div>
            </div>

            <div className="testimonial py-4 px-3 testimonial-custom">
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
                    Voluptas rerum odio dolores veniam odit quia! Quibusdam, magnam, 
                    aliquam doloribus dolores accusantium animi laboriosam quae totam 
                    facilis quas deserunt temporibus quidem?</p>

                    <div className="d-flex align-items-center gap-4 mt-3 customer-info">
                        <img src={ava03} alt='' className='w-25 h-25 rounded-2' />
                        <div>
                            <h6 className='mb-0 mt-3 customer-name'>shana Doe</h6>
                            <p className='customer-role'>Customer</p>
                        </div>
                    </div>
            </div>

            <div className="testimonial py-4 px-3 testimonial-custom">
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
                    Voluptas rerum odio dolores veniam odit quia! Quibusdam, magnam, 
                    aliquam doloribus dolores accusantium animi laboriosam quae totam 
                    facilis quas deserunt temporibus quidem?</p>

                    <div className="d-flex align-items-center gap-4 mt-3 customer-info">
                        <img src={ava02} alt='' className='w-25 h-25 rounded-2' />
                        <div>
                            <h6 className='mb-0 mt-3 customer-name'>Lia Franklin</h6>
                            <p className='customer-role'>Customer</p>
                        </div>
                    </div>
            </div>
        </Slider>
    </div>
  )
}

export default Testimonials
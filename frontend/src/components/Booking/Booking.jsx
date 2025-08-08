import React, { useState, useContext } from 'react'
import './booking.css';
import { Form, FormGroup, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContex';
import { BASE_URL } from "../../utils/config";

const Booking = ({ tour, avgRating }) => {
    const { price, reviews, title } = tour;
    const navigate = useNavigate()
    const { user } = useContext(AuthContext)

    const [booking, setBooking] = useState({
        userId: user && user._id,
        userEmail: user && user.email,
        tourName: title,
        fullName: '',
        phone: '',
        guestSize: 1,
        bookAt: ''
    });

    const handleChange = (e) => {
        setBooking(prev => ({ ...prev, [e.target.id]: e.target.value }))
    };

    const serviceFee = 10;
    const totalAmount = Number(price) * Number(booking.guestSize) + Number(serviceFee);

    // Send data to the server
    const handleClick = async (e) => {
        e.preventDefault();

        console.log('Booking data:', booking);

        try {
            // Fixed user validation logic
            if (!user || user === null) {
                return alert("Please sign in")
            }

            // Validate required fields
            if (!booking.fullName || !booking.phone || !booking.bookAt) {
                return alert("Please fill in all required fields")
            }

            // Create booking payload with updated user info
            const bookingPayload = {
                ...booking,
                userId: user._id, // Ensure current user ID
                userEmail: user.email, // Ensure current user email
                phone: booking.phone || booking.phoneNumber // Handle phone field name mismatch
            };

            console.log('Sending booking payload:', bookingPayload);

            const res = await fetch(`${BASE_URL}/booking`, {
                method: 'POST', // Capitalized method
                headers: {
                    'Content-Type': 'application/json' // Capitalized headers
                },
                credentials: 'include',
                body: JSON.stringify(bookingPayload)
            });

            const result = await res.json();
            
            console.log('Server response:', result);

            if (!res.ok) {
                console.error('Server error:', result);
                return alert(result.message || `Server error: ${res.status}`)
            }

            // Success - navigate to thank you page
            navigate("/thank-you");
            
        } catch (err) {
            console.error('Booking error:', err);
            alert(`Error: ${err.message}`);
        }
    };

    return (
        <div className="booking">
            <div className="booking_top d-flex align-items-center justify-content-between">
                <h3>${price} 
                    <span> / per person</span>
                </h3>
                <span className='tour_rating d-flex align-items-center'>
                    <i className="ri-star-fill"></i>
                    {avgRating === 0 ? null : avgRating}
                    ({reviews?.length})
                </span>
            </div>

            {/* ======== booking form ======== */}
            <div className="booking_form">
                <h5>Information</h5>
                <Form className='booking_info-form' onSubmit={handleClick}>
                    <FormGroup>
                        <input 
                            type="text" 
                            placeholder='Full Name' 
                            id='fullName' 
                            value={booking.fullName}
                            required 
                            onChange={handleChange} 
                        />
                    </FormGroup>

                    <FormGroup>
                        <input 
                            type="tel" 
                            placeholder='Phone Number' 
                            id='phone' 
                            value={booking.phone}
                            required 
                            onChange={handleChange} 
                        />
                    </FormGroup>

                    <FormGroup className="d-flex align-items-center gap-3">
                        <input 
                            type="date" 
                            placeholder='' 
                            id='bookAt'
                            value={booking.bookAt}
                            required 
                            onChange={handleChange} 
                        />

                        <input 
                            type="number" 
                            placeholder='Guests' 
                            id='guestSize'
                            value={booking.guestSize}
                            min="1"
                            required 
                            onChange={handleChange} 
                        />
                    </FormGroup>
                </Form>
            </div>
            {/* ======== booking form end======== */}

            {/* ======== booking bottom======== */}
            <div className="booking_bottom">
                <ListGroup>
                    <ListGroupItem className='border-0 px-0'>
                        <h5 className='d-flex align-items-center gap-1'>
                            ${price}<i className="ri-close-line"></i> {booking.guestSize} person(s)</h5>
                        <span>${Number(price) * Number(booking.guestSize)}</span>
                    </ListGroupItem>

                    <ListGroupItem className='border-0 px-0'>
                        <h5>Service charge</h5>
                        <span>${serviceFee}</span>
                    </ListGroupItem>

                    <ListGroupItem className='border-0 px-0 total'>
                        <h5>Total</h5>
                        <span>${totalAmount}</span>
                    </ListGroupItem>
                </ListGroup>

                <Button className='btn primary__btn w-100 mt-4' onClick={handleClick}>
                    Book Now
                </Button>
            </div>
        </div>
    )
};

export default Booking;
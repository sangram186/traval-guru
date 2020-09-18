import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Booking.css';

const Booking = () => {

    const bookingData = localStorage.getItem('data')
    const data = JSON.parse(bookingData)
    // }
    const [tourOrigin, setTourOrigin] = useState('');
    const [tourDestination, setTourDestination] = useState('');
    const [tourFrom, setTourFrom] = useState('');
    const [tourTo, setTourTo] = useState('');
    

    const handleSubmit = e => {
        console.log(tourFrom, tourTo, tourOrigin, tourDestination)
        e.preventDefault();
    }

    return (
        <div className='booking-page container'>
            <div className="booking-content">
                <h1>{data.title}</h1>
                <p>{data.longDescription}</p>
            </div>
            <div className="booking-date">
                <form onSubmit={handleSubmit}>
                    <label htmlFor="">Origin</label>
                    <br />
                    <input onBlur={e => setTourOrigin(e.target.value)} type="text" placeholder='Your Origin' required/>
                    <br />
                    <label htmlFor="">Your Destination</label>
                    <br />
                    <select onBlur={e => setTourDestination(e.target.value)} name="destination">
                        <option value="Cox's Bazar">Cox's Bazar</option>
                        <option value="Sundarban">Sundarban</option>
                        <option value="Srimangal">Srimangal</option>
                    </select>
                    <br />
                    <div className="date-from-to">
                            <label htmlFor="">From</label>
                            <input onBlur={e => setTourFrom(e.target.value)} type="date" name="dateFrom" id="" required/>
                            <label htmlFor="">To</label>
                            <input onBlur={e => setTourTo(e.target.value)} type="date" name="dateTo" id="" required/>

                    </div>
                    <Link to='/hotel'><input type="submit" value="Start Booking"/></Link>
                </form>
            </div>
        </div>
    );
};

export default Booking;
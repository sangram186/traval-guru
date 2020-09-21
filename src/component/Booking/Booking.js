import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { useContent } from '../../App';
import './Booking.css';

const Booking = () => {
    const [user, setUser] = useContext(useContent);

    const bookingData = localStorage.getItem('data')
    const data = JSON.parse(bookingData)
    // }
    const [tourOrigin, setTourOrigin] = useState('');
    const [tourDestination, setTourDestination] = useState(`${data.title}`);
    const [tourFrom, setTourFrom] = useState('2020-05-05');
    const [tourTo, setTourTo] = useState('2020-05-15');


    const handleSubmit = e => {
        const userInfo = {...user};
        userInfo.tourFrom = tourFrom;
        userInfo.tourTo = tourTo;
        userInfo.tourOrigin= tourOrigin;
        userInfo.tourDestination = tourDestination;
        setUser(userInfo);
    }

    return (
        <div className='booking-page container'>
            <div className="booking-content">
                <h1>{data.title}</h1>
                <p>{data.longDescription}</p>
            </div>
            <div className="booking-date">
                <form>
                    <label htmlFor="">Origin</label>
                    <br />
                    <input onChange={e => setTourOrigin(e.target.value)} type="text" placeholder='Your Origin' required />
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
                        <input className='mr-2' onBlur={e => setTourFrom(e.target.value)} type="date" name="dateFrom" defaultValue = "2020-09-09" id="" required/>
                        <label htmlFor="">To</label>
                        <input onBlur={e => setTourTo(e.target.value)} type="date" name="dateTo" defaultValue = "2020-09-29" id="" required/>
                    </div>
                    <Link to={tourOrigin ? '/hotel' : '/booking'}><button className='login-button' onClick={handleSubmit} type='submit'>Start Booking</button></Link>
                </form>
            </div>
        </div>
    );
};

export default Booking;
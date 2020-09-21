import React, { useContext } from 'react';
import { useContent } from '../../App';
import hotelData from '../fakeHotelData';
import GoogleMap from '../GoogleMap/GoogleMap';
import Header from '../Header/Header';
import './Hotel.css';

const Hotel = () => {
    const [user, setUser] = useContext(useContent);
    const data = localStorage.getItem('data');
    const getData = JSON.parse(data);
    const filterHotel = hotelData.filter(hotel => hotel.id.toString() === getData.id);

    return (
        
        <div style={{background: 'white',     height: '92.8vh' }}>
            <div className='main-hotel-page container'> 
                <div className="hotel-details">
                    {
                        filterHotel.map(hotel => {
                            const { name, badeRooms, condition, others, rating, price, photo } = hotel;

                            return (
                                <div className="single-hotel">
                                    <div className="photo">
                                        <img src={photo} alt="" />
                                    </div>
                                    <div className="content">
                                        <h4>{name}</h4>
                                        <p>{badeRooms}</p>
                                        <p>{condition}</p>
                                        <p>{others}</p>
                                        <p><span>⭐</span> {rating}</p>
                                        <p>{price}</p>
                                    </div>

                                </div>
                            )
                        })
                    }
                </div>
                <div className="map">
                    <GoogleMap></GoogleMap>
                </div>
            </div>
        </div>
    );
};

export default Hotel;
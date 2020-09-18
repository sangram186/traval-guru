import React, { useContext } from 'react';
import { useContent } from '../../App';
import hotelData from '../fakeHotelData';
import GoogleMap from '../GoogleMap/GoogleMap';
import './Hotel.css';

const Hotel = () => {
    const [user, setUser] = useContext(useContent);
    console.log(user.name);
    const data = localStorage.getItem('data');
    const getData = JSON.parse(data);
    const filterHotel = hotelData.filter(hotel => hotel.id.toString() === getData.id);
    console.log(filterHotel)

    console.log(getData);
    return (
        
        <div style={{background: 'white'}}>
            <div className='main-hotel-page container'> 
                <div className="hotel-details">
                    {
                        filterHotel.map(hotel => {
                            const { name, badeRooms, condition, others, rating, price, photo } = hotel;
                            console.log(hotel)
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
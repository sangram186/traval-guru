import React, { useContext, useState } from 'react';
import './Home.css';
import destinationImage1 from '../../Image/Sajek.png'
import destinationImage2 from '../../Image/Sreemongol.png'
import destinationImage3 from '../../Image/sundorbon.png'
import { Link } from 'react-router-dom';
import { useContent } from '../../App';
import travelContents from '../fakeData';

const Home = () => {
    
    
    const [content, setContent] = useContext(useContent);
    const handleClick = (e) => {
        const displayContent = travelContents.find(content => content.id === e.target.id);
        setContent(displayContent);
    }
    const handleLoad = (e) => {
        const displayContent = travelContents.find(content => content.id === e.target.id);
        setContent(displayContent);
    }

    const handleClickBooking = (data) => {
        localStorage.setItem('data', JSON.stringify(data))
    }

    return (
        <div className="travel-details">
            <div className="travel-content">
                <h1>{content.title}</h1>
                <p>{content.description}</p>
                <Link to='/booking'><button onClick={() => handleClickBooking(content)}>Booking ➡</button></Link>
            </div>
            <div className="travel-destination-image">
                <img id='1' onLoad={handleLoad}  onClick={handleClick} src={destinationImage1} alt="" />
                <img id='2' onClick={handleClick} src={destinationImage2} alt="" />
                <img id='3' onClick={handleClick} src={destinationImage3} alt="" />
            </div>
        </div>
    );
};

export default Home;
import React, { useContext, useState } from 'react';
import './Home.css';
import destinationImage1 from '../../Image/Sajek.png'
import destinationImage2 from '../../Image/Sreemongol.png'
import destinationImage3 from '../../Image/sundorbon.png'
import { Link } from 'react-router-dom';
import { useContent } from '../../App';
import travelContents from '../fakeData';
import Header from '../Header/Header';

const Home = () => {


    const [content, setContent] = useContext(useContent);
    const handleClick = (e) => {
        const displayContent = travelContents.find(content => content.id === e.target.id);
        setContent(displayContent);
    }
    
    const handleClickBooking = (data) => {
        localStorage.setItem('data', JSON.stringify(data))
    }
    
    
    const handleLoad = (e) => {
        const displayContent = travelContents.find(content => content.id === e.target.id);
        setContent(displayContent);
        
    }
    return (
        <div className="home">
            <div className='container'>
                <div className="travel-details">

                    <div className="travel-content">
                        <h1>{content.title}</h1>
                        <p>{content.description}</p>
                        <Link to='/booking'><button className='login-button' onClick={() => handleClickBooking(content)}>Booking ➡</button></Link>
                    </div>
                    <div className="travel-destination-image">
                        <div className='image-div'>
                            <img id='1' onClick={handleClick} className={content.id === '1' ? 'image-border' : ''}  onLoad={handleLoad}  src={destinationImage1} alt="" />
                            <h4>Cox's Bazar</h4>
                        </div>
                        <div className='image-div'>
                            <img id='2' onClick={handleClick} className={content.id === '2' ? 'image-border' : ''} src={destinationImage2} alt="" />
                            <h4>Sreemangal</h4>
                        </div>
                        <div className='image-div'>
                            <img id='3' onClick={handleClick} className={content.id === '3' ? 'image-border' : ''} src={destinationImage3} alt="" />
                            <h4>Sundarban</h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
import React from 'react'
import './Home.css'
import hand_icon from '../Assets/hand_icon.png'
import arrow_icon from '../Assets/arrow.png'
import home_img from '../Assets/hero_image.png'

export const Home = () => {
  return (
    <div>
        <div className="home">
            <div className="home_left">
                <h2>New ARRIVALS ONLY</h2>
                <div>
                    <div className="home_hand_icon">
                        <p>new</p>
                        <img src={hand_icon} alt="" />
                    </div>
                    <p>collections</p>
                    <p>for everyone</p>
                </div>
                <div className="home_latest_btn">
                    <div>Latest Collections</div>
                    <img src={arrow_icon} alt="" />
                </div>
            </div>
            <div className="home_right">
                <img src={home_img} alt="" />
            </div>
        </div>
    </div>
  )
}

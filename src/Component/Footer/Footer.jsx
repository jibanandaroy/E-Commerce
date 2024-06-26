import React from 'react'
import './Footer.css'
import footer_logo from '../Assets/logo_big.png'
import instagram_icon from '../Assets/instagram_icon.png'
import linkedin_icon from '../Assets/linkedin_icon.png'
import whatsapp_icon from '../Assets/whatsapp_icon.png'
import facebook from '../Assets/facebook_icon.png'

export const Footer = () => {
    return (
        <>
        <div className='footer'>
            <div className="left">
                <div className="footer_logo">
                    <img src={footer_logo} alt="" />
                    <p>DRESSIFY</p>
                </div>

            </div>
            <div className="middle">
                <h2>Social media Link</h2>
                <div className="footer_social_icon">
                    <div className="footer_icon_container">
                        <a href="https://www.instagram.com/"><img src={instagram_icon} alt="" /></a>
                    </div>
                    <div className="footer_icon_container">
                        <a href="https://www.facebook.com/"><img className='icon' src={facebook} alt="" /></a>
                    
                    </div>
                    <div className="footer_icon_container">
                        <a href="https://www.linkedin.com/feed/"><img className='icon' src={linkedin_icon} alt="" /></a>
                    
                    </div>
                    <div className="footer_icon_container">
                        <a href="https://www.whatsapp.com/"><img src={whatsapp_icon} alt="" /></a>
                    </div>
                </div>

            </div>
            <div className="right">
                <h2>Contact</h2>
                <p>Address:Nirala, Khulna, Bangladesh</p>
                <p>Email: <a href="https://mail.google.com/mail/u/0/?tab=rm&ogbl#inbox?compose=DmwnWsvCflsKKXZfTxpLHdWmvbWJFDDsSsMhlgJbwsqRTDrbplJNtCrPrSCDPXbHLXtRlRxmrmMg">jibonroy282@gmail.com</a></p>
                <p>Phone: 01782851242</p>
            </div>


            {/* <div className="footer_copyright">
                <hr />
                <p>Copyright @ 2024 - All Right Reserved.</p>
            </div> */}
        </div>
        <div className='footer_copyright'>
        <p>Copyright @ 2024 - All Right Reserved.</p>
        </div>
        </>

    )
}

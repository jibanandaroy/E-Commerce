import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../../Context/ShopContext'
import { createPaymentIntent } from './StripeMethod'


const Modal = ({ toggleModal}) => {
    const { getTotalCartAmount, user } = useContext(ShopContext)
    const pk = 'pk_test_51NGbtWL6EDqw6EU4OxgKxZLfiULcOpePVkQ5Zg2giMNCTMzKTAA2jNQKa6HMcRKHwsGxMFvVgudR5YQElTp1o7m400zHjaVAMP'
    const [stripeElement, setStripeElement] = useState("");
    const [stripe, setStripe] = useState("");

    useEffect(() => {
        let stripe = window.Stripe(pk)
        let elements = stripe.elements({ locale: "eg" });
        const cardElement = elements.create('card');
        setStripeElement(cardElement);
        setStripe(stripe);
        cardElement.mount('#cardElement');
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            const { paymentMethod, error } = await stripe.createPaymentMethod({
                type: 'card',
                card: stripeElement,
                billing_details: {
                    name: user.name,
                    email: user.email,
                },
            });

            await createPaymentIntent(getTotalCartAmount(),paymentMethod);
        } catch (error) {
            console.log(error.message);
        }

    };
    return (
        <div >

            <div className="modal">
                <div onClick={toggleModal} className="overlay"></div>
                <div className="modal-content">
                    <form action="" onSubmit={handleSubmit}>
                        <h1>Payment</h1>
                        <p>{user.email}</p>
                        <p className='tk'>${getTotalCartAmount()}</p>
                        <br />
                        <div id='cardElement'></div>
                        <button className='pay_btn' >pay</button>
                    </form>

                    <button className="close-modal" onClick={toggleModal}>
                        x
                    </button>
                </div>
            </div>

        </div>
    )
}

export default Modal
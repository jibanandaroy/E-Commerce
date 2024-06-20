import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../../Context/ShopContext'
import { createPaymentIntent } from './StripeMethod'
import axios from 'axios'


const Modal = ({ toggleModal }) => {
    const { getTotalCartAmount, user, all_product, cartItems,token } = useContext(ShopContext)
    const pk = 'pk_test_51NGbtWL6EDqw6EU4OxgKxZLfiULcOpePVkQ5Zg2giMNCTMzKTAA2jNQKa6HMcRKHwsGxMFvVgudR5YQElTp1o7m400zHjaVAMP'
    const [stripeElement, setStripeElement] = useState("");
    const [stripe, setStripe] = useState("");
    const [data, setData] = useState({
        address: ''
    });
    const changeHandler = (e) => {

        setData({ ...data, address: e.target.value })

    }

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
            let orderItems = [];
            all_product.map((item) => {
                if (cartItems[item.id] > 0) {
                    let itemInfo = item;
                    itemInfo["quantity"] = cartItems[item.id]
                    orderItems.push(itemInfo)
                }
            })
            

            const { paymentMethod, error } = await stripe.createPaymentMethod({
                type: 'card',
                card: stripeElement,
                billing_details: {
                    name: user.name,
                    email: user.email,
                },
            });

            await createPaymentIntent(getTotalCartAmount(), paymentMethod);

            const response = await axios.post('/api/order/place',{
                userId:user.id,
                address:data.address,
                items:orderItems,
                amount:getTotalCartAmount()
            },{headers:{token}})

            if(response.data.error){
                console.log(response.data.error);
                return;
            }
            if(response.data.success){
                alert(response.data.message)
            }
            

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
                        <input type="text" required placeholder='Address' onChange={changeHandler} />
                        <br />
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
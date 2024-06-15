
import axios from "axios";
const sk = 'sk_test_51NGbtWL6EDqw6EU4m8BgCYZhlpcUKh5UAX3z1IXsmXpOSKpWKHq8pLIC7vienCdL7wOZNQcE3UtKvSKtOUL2LRjA00Plcu9GXl'
export const axiosClient = axios.create();

axiosClient.defaults.baseURL = 'https://api.stripe.com/v1';
axiosClient.defaults.headers = {
  Authorization:
    "Bearer " +
    sk,
  "Content-Type": "application/x-www-form-urlencoded",
};
// axios
const confirmPaymentIntent = async (response) => {

  await axiosClient.post('/payment_intents/' + response.data.id + '/confirm', { return_url: "http://localhost:5173" })
  alert('Payment Successful');

}


export const createPaymentIntent = async (price, paymentMethod) => {
  await axiosClient
    .post(
      "/payment_intents",
      {
        amount: price,
        currency: "USD",
        payment_method: paymentMethod.id,

        automatic_payment_methods: {
          enabled: true
        },

      }
    )
    .then(function (response) {
      confirmPaymentIntent(response, paymentMethod);
    })
    .catch(function (error) {
      console.log(error);
    });


}
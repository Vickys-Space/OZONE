import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useStateValue } from "../../StateProvider";
import CheckoutProduct from "../CheckoutProducts/CheckoutProduct";
import "./Payment.css";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import CurrencyFormat from "react-currency-format";
import { getBagTotal } from "../../reducer";
import axios from "../../axios";
import { db } from "../../firebase";

function Payment() {
  const stripe = useStripe();
  const elements = useElements();
  const history = useHistory();

  const [{ bag, user }, dispatch] = useStateValue();

  const [error, setError] = useState(null);
  const [disable, setDisable] = useState(true);
  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState("");
  const [clientSecret, setClientSecret] = useState(true);

  useEffect(() => {
    // generate the special stipe secret which allows us to charge to customer
    const getClientSecret = async () => {
      const response = await axios({
        method: "post",
        // Stripe expects the total in a currency subunits
        url: `/payments/create?total=${getBagTotal(bag) * 100} `,
      });
      setClientSecret(response.data.clientSecret);
    };
    getClientSecret();
  }, [bag]);
  console.log("THE SECRET IS >>>", clientSecret);
  console.log("bag items >>>", bag);
  console.log("user >>>", user);

  const handleSubmit = async (e) => {
    // Stripe functions

    e.preventDefault();
    setProcessing(true);

    const payload = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then(({ paymentIntent }) => {
        // payment intent = payment confirmation

        db.collection("users")
          .doc(user?.uid)
          .collection("orders")
          .doc(paymentIntent.id)
          .set({
            bag: bag,
            amount: paymentIntent.amount,
            created: paymentIntent.created,
          });

        setSucceeded(true);
        setError(null);
        setProcessing(false);

        dispatch({
          type: "EMPTY_BAG",
        });

        history.replace("/orders");
      });
  };

  const handleChange = (e) => {
    // Listens for changes in the cardElement and display any errors as the customer types
    // their card details
    // (e) is for (event)

    setDisable(e.empty);
    setError(e.error ? e.error.message : "");
  };

  return (
    <div className="payment">
      <div className="payment__container">
        <h1>
          Checkout (<Link to="/checkout">{bag?.length} Items</Link>){" "}
        </h1>
        <div className="payment__section">
          <div className="payment__title">
            <h3>Delivery Address</h3>
            <div className="payment__address">
              <p>{user?.email}</p>
              <p>House no</p>
              <p>Street Lane</p>
              <p>Area</p>
              <p>ZIP CODE</p>
            </div>
          </div>
        </div>

        <div className="payment__section">
          <div className="payment__title">
            <h3>Review items and delivery</h3>
          </div>
          <div className="payment__items">
            {bag.map((item) => (
              <CheckoutProduct
                id={item.id}
                title={item.title}
                image={item.image}
                displayPrice={item.displayPrice}
                rating={item.rating}
              />
            ))}
          </div>
        </div>

        <div className="payment__section">
          <div className="payment__title">
            <h3>Payment Method</h3>
          </div>
          <div className="payment__details">
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />
              <div className="payment__priceContainer">
                <div className="payment__priceContainer">
                  <CurrencyFormat
                    renderText={(value) => <h3>Order Total: {value}</h3>}
                    decimalScale={2}
                    value={getBagTotal(bag)}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"₹ "}
                  />
                  <button
                    className="payment__buyNowButton"
                    disabled={processing || disable || succeeded}
                  >
                    <span>{processing ? <p> Processing </p> : "Buy Now"}</span>
                  </button>
                </div>
                {error && <div>{error}</div>}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;

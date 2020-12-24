import React, { useEffect } from "react";
import "./App.css";
import Header from "./Components/Header/Header";
import Home from "./Components/Home/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Checkout from "./Components/Checkout/Checkout";
import Login from "../src/Components/Login/Login";
import { auth } from "./firebase";
import { useStateValue } from "./StateProvider";
import Payment from "./Components/Payment/Payment";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Orders from "./Components/Orders/Orders";


const promise = loadStripe(
  "pk_test_51Hhcb8JMCjUWPShM3V8eOY7BeGF2pSvje39E9SBfU0539FHAV01cjct5mtNOSQP8v7UbkiQycR9OP861bySeZdhX004b5QFnwt"
);

function App() {
  const [{}, dispatch] = useStateValue();

  useEffect(() => {
    // This is only run once when the app component loads
    auth.onAuthStateChanged((authUser) => {
      console.log(" THE USER IS >>>", authUser);

      if (authUser) {
        // The user is logged in / The user was logged out
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        // The user is logged out

        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, []);

  return (
    // BEM
    <Router>
      <div className="App">
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/orders">
            <Header />
            <Orders />
          </Route>
          <Route path="/checkout">
            <Header />
            <Checkout />
          </Route>
          <Route path="/payment">
            <Header />
            <Elements stripe={promise}>
              <Payment />
            </Elements>
          </Route>
          <Route path="/">
            <Header />
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;

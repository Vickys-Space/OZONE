import React from "react";
import "./Subtotal.css";
import RedeemTwoToneIcon from "@material-ui/icons/RedeemTwoTone";
import CurrencyFormat from "react-currency-format";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { useStateValue } from "../../StateProvider";
import { getBagTotal } from "../../reducer";
import { useHistory } from "react-router-dom";

function Subtotal() {
  const history = useHistory();
  const [{ bag }, dispatch] = useStateValue();


  return (
    <div className="subtotal">
      <CurrencyFormat
        renderText={(value) => (
          <>
            <p className="total">
              Subtotal ({bag.length} items) : <span>{value}</span>
            </p>
            <small className="subtotal__gift">
              <input type="checkbox" />
              This order contains gift
              <RedeemTwoToneIcon className="subtotal__giftIcon" />
            </small>
          </>
        )}
        decimalScale={2}
        value={getBagTotal(bag)}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"₹ "}
      />

      <button onClick={(e) => history.push("/payment")}>
        Proceed to Checkout
        <ShoppingCartIcon className="checkout__buttonIcon" />
      </button>
    </div>
  );
}
// ₹

export default Subtotal;

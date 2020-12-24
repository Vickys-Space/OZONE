import React from "react";
import "./CheckoutProduct.css";
import WhatshotIcon from "@material-ui/icons/WhatshotTwoTone";
import { useStateValue } from "../../StateProvider";

function CheckoutProducts({
  image,
  id,
  price,
  rating,
  title,
  displayPrice,
  hideButton,
}) {
  const [{ bag }, dispatch] = useStateValue();

  const removeFromBag = () => {
    // Removing from tha bag
    dispatch({
      type: "REMOVE_FROM_BAG",
      id: id,
    }); 
  };

  return (
    <div className="checkoutProduct">
      <img src={image} className="checkoutProduct__img" />
      <div className="checkoutProduct__info">
        <p className="checkoutProduct__title"> {title}</p>
        <span>{displayPrice}</span>
        <div>
          {" "}
          {Array(rating)
            .fill()
            .map((_, i) => (
              <WhatshotIcon fontSize="small" />
            ))}
        </div>
        {!hideButton && (
          <button onClick={removeFromBag}>Remove from Bag</button>
        )}
      </div>
    </div>
  );
}

export default CheckoutProducts;

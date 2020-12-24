import React from "react";
import "./Product.css";
import WhatshotIcon from "@material-ui/icons/WhatshotTwoTone";
import LocalMallSharpIcon from "@material-ui/icons/LocalMallSharp";
import { useStateValue } from "../../StateProvider"

function Product({ id, title, image, price, rating, displayPrice}) {
  const [{bag}, dispatch] = useStateValue();
  // console.log("Added to bag >>> " , bag)
  const addToBag = () => {
    // dispatch the item to the data layer
    dispatch({
      type: "ADD_TO_BAG",
      item: {
        id: id,
        title: title,
        image: image,
        price: price,
        rating: rating, 
        displayPrice: displayPrice,
      },
    });
  };

  return (
    <div className="product">
      <div className="product__info">
        <p>{title}</p>
        <p className="product__price">
          <strong>{displayPrice}</strong>
        </p>
        <div className="product__rating">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <WhatshotIcon fontSize="small" />
            ))}
        </div>
      </div>
      <img src={image} alt="" />
      <button onClick={addToBag}>
        <LocalMallSharpIcon fontSize="small" className="bag_button" />
        Add to Bag
      </button>
    </div>
  );
}

export default Product;

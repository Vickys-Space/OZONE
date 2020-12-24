import React from "react";
import Product from "../Product/Product";
import "./Home.css";

function Home() {
  return (
    <div className="home">
      <div className="home__container">
        <img className="desktopLayout" src="/img/mobile.png" alt="" />
        {/* <img className="mobileLayout" src="/img/mobile.png" alt="" /> */}

        <div className="home__row">
          <Product
            id="1"
            title="Apple iPhone 12 Pro (256GB) - Graphite"
            price="102999.00"
            displayPrice="&#x20B9; 1,02,999.00" 
            image="https://images-na.ssl-images-amazon.com/images/I/71YlH-4MUQL._SX466_.jpg"
            rating={5}
          />

          <Product
            id="2"
            title="OnePlus 8 (Glacial Green GB Ram+128GB Storage)"
            price="39999.00"
            displayPrice="&#x20B9; 39,999.00"
            image="data:image/webp;base64,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"
            rating={4} 
          />
        </div>

        <div className="home__row">
          <Product
            id="3"
            title="Realme X50 Pro (Rust Red, 12GB RAM, 256GB Storage)"
            price="48999.00"
            displayPrice="&#x20B9; 48,999.00"
            image="https://images-na.ssl-images-amazon.com/images/I/61D2%2BbCzY0L._SL1500_.jpg"
            rating={3}
          />

          <Product
            id="4"
            title="Mi 10 (Coral Green, 8GB RAM, 128GB Storage) "
            price="49999.00"
            displayPrice="&#x20B9; 49,999.00"
            image="https://images-na.ssl-images-amazon.com/images/I/71f8Mcyy44L._AC_UY700_FMwebp_.jpg"
            rating={4}
          />

          <Product
            id="5"
            title="Motorola Edge+ (Thunder Grey, 256 GB) (12 GB RAM)"
            price="84999.00"
            displayPrice="&#x20B9; 84,999.00"
            image="https://images-na.ssl-images-amazon.com/images/I/312uzH0HoML.jpg"
            rating={2}
          />
        </div>

        <div className="home__row">
          <Product
            id="6"
            title="Samsung Galaxy Note 20 Ultra 5G (Mystic Bronze, 12GB RAM, 256GB Storage)"
            price="104999.00"
            displayPrice="&#x20B9; 1,04,999.00"
            image="https://images-na.ssl-images-amazon.com/images/I/81afQk-7AjL._SL1500_.jpg"
            rating={4}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;

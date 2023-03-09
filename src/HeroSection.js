import React from "react";
import "./App.css";
import { Button } from "./Button";
import "./HeroSection.css";
import { Link } from "react-router-dom";

function HeroSection() {
  return (
    <div className="hero-container">
      <h1>INNOVATIVE</h1>
      <p>Unveil Your Ideas</p>

      <div className="hero-btns">
        <Link to="/home">
          <Button
            className="btns"
            buttonStyle="btn--outline"
            buttonSize="btn--large"
          >
            POST
          </Button>
        </Link>
        <Link to="/domain">
          <Button
            className="btns"
            buttonStyle="btn--primary"
            buttonSize="btn--large"
            onClick={console.log("hey")}
          >
            DOMAIN
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default HeroSection;

// import React from 'react';
// import {
//   MDBCarousel,
//   MDBCarouselItem,
// } from 'mdb-react-ui-kit';

// export default function HeroSection() {
//   return (
//     <MDBCarousel>
//       <MDBCarouselItem
//         className='w-100 d-block'
//         itemId={1}
//         src='https://mdbootstrap.com/img/new/slides/041.jpg'
//         alt='...'
//       />
//       <MDBCarouselItem
//         className='w-100 d-block'
//         itemId={2}
//         src='https://mdbootstrap.com/img/new/slides/042.jpg'
//         alt='...'
//       />
//       <MDBCarouselItem
//         className='w-100 d-block'
//         itemId={3}
//         src='https://mdbootstrap.com/img/new/slides/043.jpg'
//         alt='...'
//       />
//     </MDBCarousel>
//   );
// }

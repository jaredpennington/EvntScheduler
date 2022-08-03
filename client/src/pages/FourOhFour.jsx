import React from "react";
import Header from "../components/Header/index";


const FourOhFour = () => {
  return (
    <div>
      <Header />
      <div className="my-auto uk-card uk-card-body card-centering thankyou">
        <h1 className="">404 alert omg</h1>
        <p className="uk-card-title uk-text-center">This is not a page that exists. Please go back or click the title in the top left.</p>
      </div>
    </div>
  );
};

export default FourOhFour;

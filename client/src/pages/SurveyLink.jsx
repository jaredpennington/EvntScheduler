import React from "react";
import { useParams } from "react-router-dom";
import NavBar from "../components/NavBar";
import Header from "../components/Header";

// 404 Page Not Found
const SurveyLink = () => {
  let event_id = useParams().id;
  let url = window.location.href.split("/").slice(0, -1).join("/") + "/survey";

  return (
    <div>
      <Header />
      <NavBar event_id={event_id} />
      <div className="my-auto">
        <div className="uk-card uk-card-body card-centering thankyou">
          <button className="button-border">
          <i
            className="fa-regular fa-copy cursor-copy"
            onClick={() => {
              navigator.clipboard.writeText(url);
            }}
          ></i>
          </button>
          <div className="margin-bottom">
          <p className=" uk-card-title uk-text-center ">Copy to send out survey</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SurveyLink;

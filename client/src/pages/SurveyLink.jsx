import React from "react";
import { useParams } from "react-router-dom";
import NavBar from "../components/NavBar";

// 404 Page Not Found
const SurveyLink = () => {
  let event_id = useParams().id;
  let url = window.location.href.split('/').slice(0,-1).join('/')+'/survey'
  console.log(url);

  return (
    <div>
      <NavBar event_id={event_id} />
      <div>
        <p
        className="cursor-copy"
          onClick={() => {
            navigator.clipboard.writeText(url);
          }}
        >{url}</p>
      </div>
    </div>
  );
};

export default SurveyLink;

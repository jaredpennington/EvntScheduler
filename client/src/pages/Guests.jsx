import React from 'react';
import { useQuery } from "@apollo/client";
import { QUERY_GUESTS } from "../utils/queries";
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';

// Will display all guests for a single event
const Guests = () => {
  const { loading, error, data } = useQuery(QUERY_GUESTS, {
    variables: { event_id: useParams().id }
  });
  console.log(error);

  return (
    <div>
    </div>
  )
}

export default Guests


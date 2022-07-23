import React from 'react';
import { useQuery } from "@apollo/client";
import { QUERY_PASSWORDS } from "../utils/queries";
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';

// all passwords for a single event
const Passwords = () => {
  const { loading, data } = useQuery(QUERY_PASSWORDS, {
    variables: { event_id: useParams().id }
  });
  console.log(data);

  return (
    <>
    </>
  )
}

export default Passwords


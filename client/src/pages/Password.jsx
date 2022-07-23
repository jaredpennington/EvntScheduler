import React from 'react';
import { useQuery } from "@apollo/client";
import { QUERY_PASSWORD } from "../utils/queries";
import { useParams } from 'react-router-dom';

// single password
const Password = () => {
  const { loading, data } = useQuery(QUERY_PASSWORD, {
    variables: { event_id: useParams().id }
  });
  console.log(data);
  
  return (
    <div>
    </div>
  )
}

export default Password


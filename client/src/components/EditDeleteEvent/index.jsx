import React from "react";

const EditDeleteSelectors = () => {
    const handleMouseOver = (event) => {

    }

    const handleRemove = (event) => {
        
    }

  return (
    <div className="dropdown ">
      <button
        onMouseOver={() => handleMouseOver()}
        className="dropbtn"
      >
        ...
      </button>
      <ul className="dropdown-content">
        <li className="">
          Update
        </li>
        <li
          className=""
          onClick={handleRemove}
        >
          Delete
        </li>
      </ul>
    </div>
  );
};

export default EditDeleteSelectors;

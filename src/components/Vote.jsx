import { GrLike } from "react-icons/gr";
import { GrDislike } from "react-icons/gr";
import React, { useState, useEffect } from "react";
import Article from "./Article";

const Vote = () => {
  return (
    <div>
      <button>
        <GrDislike />
      </button>{" "}
      <button>
        <GrLike />
      </button>
    </div>
  );
};

export default Vote;

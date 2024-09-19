import { GrLike } from "react-icons/gr";
import { GrDislike } from "react-icons/gr";
import React, { useState, useEffect } from "react";

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

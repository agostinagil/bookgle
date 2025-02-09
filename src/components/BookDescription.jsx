import { useState } from "react";

// eslint-disable-next-line react/prop-types
const BookDescription = ({ description }) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <>
      <p className="text-sm">
        <span
          className={`${
            expanded ? "" : "line-clamp-6"
          } transition-all duration-300`}
        >
          {description}
        </span>
      </p>
      <button
        onClick={() => setExpanded(!expanded)}
        className="text-main-color border-second-color my-3 min-w-28 p-1 transition-all duration-300 hover:border-fourth-color hover:font-semibold focus:outline-none"
      >
        {expanded ? "hide" : "read more"}
      </button>
    </>
  );
};

export default BookDescription;

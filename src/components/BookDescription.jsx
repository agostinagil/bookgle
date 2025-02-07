import { useState } from "react";

const BookDescription = ({ description }) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <p className="text-sm">
      <span
        className={`${
          expanded ? "" : "line-clamp-6"
        } transition-all duration-300`}
      >
        {description}
      </span>

      <button
        onClick={() => setExpanded(!expanded)}
        className="text-blue-500 ml-1"
      >
        {expanded ? "hide" : "read more"}
      </button>
    </p>
  );
};

export default BookDescription;

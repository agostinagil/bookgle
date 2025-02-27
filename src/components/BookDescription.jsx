/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";

const BookDescription = ({ description }) => {
  const [expanded, setExpanded] = useState(false);
  const [showBtn, setShowBtn] = useState(false);
  const descriptionRef = useRef(null);

  useEffect(() => {
    if (descriptionRef.current) {
      const element = descriptionRef.current;
      const lineHeight = parseFloat(getComputedStyle(element).lineHeight);
      const totalLines = Math.round(element.scrollHeight / lineHeight);

      if (totalLines > 6) {
        setShowBtn(true);
      }
    }
  }, [description]);

  return (
    <>
      <div
        className={`${
          expanded ? "" : "line-clamp-6"
        } transition-all duration-300 text-sm`}
        ref={descriptionRef}
      >
        {description}
      </div>

      {showBtn && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-main-color border-second-color my-3 min-w-28 p-1 transition-all duration-300 hover:border-fourth-color hover:font-semibold focus:outline-none"
        >
          {expanded ? "hide" : "read more"}
        </button>
      )}
    </>
  );
};

export default BookDescription;

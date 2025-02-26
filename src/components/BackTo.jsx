import { useNavigate } from "react-router-dom";

/* eslint-disable react/prop-types */
const BackTo = ({ text, url }) => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate(`${url}`);
  };
  return (
    <p
      onClick={handleNavigation}
      className="flex pl-5 h-8 items-center ml-1 cursor-pointer text-link-color hover:text-main-color "
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        className="size-5 cursor-pointer"
      >
        <path
          fillRule="evenodd"
          d="M17 10a.75.75 0 0 1-.75.75H5.612l4.158 3.96a.75.75 0 1 1-1.04 1.08l-5.5-5.25a.75.75 0 0 1 0-1.08l5.5-5.25a.75.75 0 1 1 1.04 1.08L5.612 9.25H16.25A.75.75 0 0 1 17 10Z"
          clipRule="evenodd"
        />
      </svg>
      <span>{text}</span>
    </p>
  );
};

export default BackTo;

/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import noImg from "../assets/no-img.png";

const Card = ({ book }) => {
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate(`/book/${book.id}`);
  };

  return (
    <div
      id="card"
      className="bg-card-bg w-11/12 mx-auto mt-10 flex flex-col justify-between min-h-card max-h-card rounded-xl shadow-card sm:w-11/12  sm:min-h-cardsm sm:max-h-cardsm"
    >
      <div className="h-[130px] mt-2 sm:h-[150px] sm:mt-3">
        <img
          src={book.volumeInfo.imageLinks?.thumbnail || noImg}
          alt="Book cover"
          className="mx-auto rounded-md h-full shadow-book"
        />
      </div>

      <div id="card-content" className="px-1 mt-2 sm:mt-3">
        <p
          id="titulo"
          className="text-base text-title-black font-semibold text-center px-1 line-clamp-2 cursor-default sm:text-lg sm:px-2"
        >
          {book.volumeInfo.title}
        </p>
        <p
          id="author"
          className="text-center text-xs  text-subtitle-black mt-2 mb-2 line-clamp-1 cursor-default sm:text-sm sm:mt-1"
        >
          {book.volumeInfo.authors
            ? `by ${book.volumeInfo.authors}`
            : "authors not found"}
        </p>
      </div>
      <a
        className="rounded-2xl font-semibold text-sm text-center py-1 bg-btn-color w-3/4 mx-auto mb-4 cursor-pointer  text-slate-100 border-none focus:border-none ocus:outline-none  hover:bg-btn-color-darke hover:text-white sm:mb-3"
        onClick={handleSearch}
      >
        See more
      </a>
    </div>
  );
};

export default Card;

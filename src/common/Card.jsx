/* eslint-disable react/prop-types */
import noImg from "../assets/no-img.png";
const Card = ({ res }) => {
  console.log(res.volumeInfo.imageLinks?.thumbnail);
  return (
    <div
      id="card"
      className="bg-card-bg w-11/12 mx-auto mt-10 flex flex-col justify-between min-h-card max-h-card rounded-xl shadow-card sm:w-11/12  sm:min-h-cardsm sm:max-h-cardsm"
    >
      <div className="h-[130px] mt-2 sm:h-[150px] sm:mt-3">
        <img
          src={res.volumeInfo.imageLinks?.thumbnail || noImg}
          alt="Book cover"
          className="mx-auto rounded-md h-full shadow-book"
        />
      </div>

      <div id="card-content" className="px-1 mt-2 sm:mt-3">
        <p
          id="titulo"
          className="text-base text-title-black font-semibold text-center px-1 line-clamp-2 sm:text-lg sm:px-2"
        >
          {res.volumeInfo.title}
        </p>
        <p
          id="author"
          className="text-center  text-subtitle-black text-sm mt-2 mb-2 sm:text-sm sm:mt-1"
        >
          {res.volumeInfo.authors
            ? `by ${res.volumeInfo.authors}`
            : "authors not found"}
        </p>
      </div>
      <button className="rounded-2xl font-semibold text-sm bg-btn-color w-3/4 mx-auto mb-4 text-slate-100 border-none focus:border-none hover:bg-btn-color-darker focus:outline-none sm:mb-3">
        See more
      </button>
    </div>
  );
};

export default Card;

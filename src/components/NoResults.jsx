import book from "../assets/closed-book.png";

const NoResults = () => {
  return (
    <div className="h-[calc(100vh-12rem)] flex flex-col justify-center">
      <img src={book} className="w-[180px] mx-auto" />
      <h3 className="text-center mt-4 text-second-color text-2xl font-bold">
        No matched results
      </h3>
    </div>
  );
};

export default NoResults;

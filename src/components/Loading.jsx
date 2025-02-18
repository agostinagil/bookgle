import book from "../assets/book.gif";

const Loading = () => {
  return (
    <>
      <div
        className="flex flex-col justify-center items-center w-screen"
        style={{ height: "calc(100vh - 6rem)" }}
      >
        <img src={book} className="rounded-full w-[200px] h-[200px]"></img>
        <p className="mt-4 text-second-color text-2xl font-bold italic">
          Finding stories...
        </p>
      </div>
    </>
  );
};

export default Loading;

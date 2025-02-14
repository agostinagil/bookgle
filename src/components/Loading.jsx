import { useEffect, useState } from "react";

const Loading = () => {
  const [page, setPage] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setPage((prev) => !prev);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="flex flex-col justify-center items-center h-screen w-screen">
        <div className="relative w-44 h-40 flex bg-gray-300 rounded-md overflow-hidden border-gray-300">
          <div className="w-1/2 h-full bg-white border border-gray-500"></div>
          <div
            className="w-1/2 h-full bg-white border border-gray-500 transition-transform duration-700 ease-in-out"
            style={{
              transform: page ? "rotateY(180deg) ba" : "rotateY(0deg)",
              transformOrigin: "left",
              backfaceVisibility: "hidden",
              backgroundColor: page ? "#e5e7eb" : "#fffff",
            }}
          ></div>
        </div>
        <p className="mt-4 text-gray-700">Loading...</p>
      </div>
    </>
  );
};

export default Loading;

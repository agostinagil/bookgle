import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";

const SingleBook = () => {
  const { data, setError, error, fetchData } = useFetch();
  const { id } = useParams();

  useEffect(() => {
    if (!id) {
      setError("No book ID provided");
      return;
    }
    const url = `https://www.googleapis.com/books/v1/volumes/${id}`;

    fetchData(url);
  }, [id]);

  return (
    <>
      <div className="min-h-screen w-screen bg-bg-color bg-no-repeat bg-cover bg-center">
        {error && <p>{error}</p>}
        {data.length > 0 && data[0].volumeInfo ? (
          <main className="pt-20">
            <div className="h-[375px] w-11/12 mx-auto rounded-lg bg-white self-center flex items-center justify-center">
              <img
                src={data[0].volumeInfo?.imageLinks.small}
                alt="Book tape photo"
                className="h-[90%] shadow-card"
              />
            </div>
            <div className="p-5">
              <p className="text-[15px] underline decoration-solid cursor-default">
                {data[0].volumeInfo.authors}
              </p>
              <h1 className="text-[22px] text-title-black font-bold my-2 cursor-default">
                {data[0].volumeInfo.title}
              </h1>
              <p className="text-sm">{data[0].volumeInfo.description}</p>
            </div>
          </main>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </>
  );
};

export default SingleBook;

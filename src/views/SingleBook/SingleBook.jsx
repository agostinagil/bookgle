import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import BookDescription from "../../components/BookDescription";

const SingleBook = () => {
  const { data, setError, error, fetchData } = useFetch();
  const { id } = useParams();
  const plainText = data[0]?.volumeInfo?.description.replace(/<[^>]*>?/gm, "");

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
      <div className="min-h-screen w-screen bg-no-repeat bg-cover bg-center">
        {error && <p>{error}</p>}
        {data.length > 0 && data[0]?.volumeInfo ? (
          <main className="pt-20">
            <div className="h-[375px] w-11/12 mx-auto rounded-lg bg-white self-center flex items-center justify-center">
              <img
                src={data[0].volumeInfo?.imageLinks.smallThumbnail}
                alt="Book tape photo"
                className="h-[90%] shadow-card"
              />
            </div>
            <div className="p-5">
              {data.length && data[0]?.volumeInfo?.authors ? (
                <p className="text-[15px] underline decoration-solid cursor-default">
                  {Array.isArray(data[0].volumeInfo.authors)
                    ? data[0].volumeInfo.authors.join(", ")
                    : data[0].volumeInfo.authors}
                </p>
              ) : (
                <p>Unknown author</p>
              )}

              <h1 className="text-[22px] text-title-black font-bold my-5 cursor-default">
                {data[0].volumeInfo.title}
              </h1>
              <div>{<BookDescription description={plainText} />}</div>
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

import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import BookDescription from "../../components/BookDescription";
import Divisor from "../../components/Divisor";

const SingleBook = () => {
  const { data, setError, error, fetchData } = useFetch();
  const { id } = useParams();
  const plainText = data[0]?.volumeInfo?.description.replace(/<[^>]*>?/gm, "");
  const info = data[0]?.volumeInfo;

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
        {data.length > 0 && info ? (
          <main className="pt-24">
            <div className="h-[375px] w-11/12 mx-auto rounded-lg bg-white self-center flex items-center justify-center">
              <img
                src={info.imageLinks.smallThumbnail}
                alt="Book tape photo"
                className="h-[90%] shadow-card"
              />
            </div>
            <div className="p-5">
              {data.length && info.authors ? (
                <p className="text-[15px] text-fourth-color underline decoration-solid decoration-fourth-color cursor-default">
                  {Array.isArray(info.authors)
                    ? info.authors.join(", ")
                    : info.authors}
                </p>
              ) : (
                <p>Unknown author</p>
              )}

              <h1 className="text-[24px] text-title-black font-bold mt-5 mb-2 cursor-default">
                {info.title}
              </h1>
              <span className="text-base">{info.subtitle}</span>

              <Divisor />
              <div>
                <h2 className="text-2xl font-semibold mb-4 text-subtitle-black">
                  Description
                </h2>
                {<BookDescription description={plainText} />}
              </div>

              <Divisor />
              <div className="text-sm">
                <h3 className="text-xl font-semibold mb-4 text-title-black">
                  Details
                </h3>
                <div className="flex ">
                  <p className="block mr-5">
                    <b>Publisher</b>
                  </p>

                  <p className="block">
                    {info.publisher ? info.publisher : "Unknown publisher"}
                  </p>
                </div>
                <div className="flex">
                  <p className="block mr-5">
                    <b>Publish date</b>
                  </p>
                  <p className="block">
                    {info.publishedDate
                      ? info.publishedDate
                      : "Unkwnown publish date"}
                  </p>
                </div>
                <div className="flex">
                  <p className="block mr-5">
                    <b>Categories</b>
                  </p>

                  <p className="block">
                    {info.categories
                      ? info.categories.join(", ")
                      : "Unknwon categories"}
                  </p>
                </div>
              </div>
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

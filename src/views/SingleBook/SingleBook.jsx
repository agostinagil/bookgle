import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import BookDescription from "../../components/BookDescription";
import Divisor from "../../components/Divisor";

const SingleBook = () => {
  const { id } = useParams();
  const { data, setError, error } = useFetch(
    id ? `https://www.googleapis.com/books/v1/volumes/${id}` : ""
  );
  const plainText = data[0]?.volumeInfo?.description?.replace(/<[^>]*>?/gm, "");
  const info = data[0]?.volumeInfo;
  const price = data[0]?.saleInfo?.listPrice?.amount;
  const currency = data[0]?.saleInfo?.listPrice?.currencyCode;
  const buyLink = data[0]?.saleInfo?.buyLink;
  const previewLink = data[0]?.accessInfo?.webReaderLink;

  if (!id) setError("No book ID provided");

  return (
    <>
      <div className="min-h-screen w-screen bg-no-repeat bg-cover bg-center">
        <main className="pt-24">
          <p
            onClick={() => window.history.back()}
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
            <span>Back to books</span>
          </p>

          {error && <p>{error}</p>}
          {data.length > 0 && info ? (
            <>
              {/* Book Cover */}
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

                {/* Book's title and subtitle */}

                <h1 className="text-[24px] text-title-black font-bold mt-5 mb-2 cursor-default">
                  {info.title}
                </h1>
                <span className="text-base">{info.subtitle}</span>

                {/* Description*/}
                <Divisor />

                <div>
                  {info.description ? (
                    <>
                      <h2 className="text-2xl font-semibold mb-4 text-subtitle-black">
                        Description
                      </h2>
                      {<BookDescription description={plainText} />}
                    </>
                  ) : (
                    <p className="text-sm">No description provided</p>
                  )}
                </div>

                {/* Book's sale info */}

                <Divisor />
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-subtitle-black">
                    Do you want to read it?
                  </h3>
                  <div className="flex text-sm mb-1">
                    <p className="block mr-3">
                      <b>Price:</b>
                    </p>
                    <p className="block">
                      {price && currency
                        ? `${price} ${currency}`
                        : "Unknown price"}
                    </p>
                  </div>
                  <div className="flex text-sm mb-1">
                    <p className="block mr-3">
                      <b>Availability:</b>
                    </p>
                    <p className="block">
                      {buyLink ? (
                        <a
                          href={buyLink}
                          rel="noopener noreferrer"
                          target="_blank"
                          className="transition-all duration-300 hover:text-main-color"
                        >
                          Buy here
                        </a>
                      ) : (
                        "Not available"
                      )}
                    </p>
                  </div>
                  <div className="flex text-sm">
                    <p className="block mr-3">
                      <b>Preview:</b>
                    </p>
                    <p className="block">
                      {previewLink ? (
                        <a
                          href={previewLink}
                          rel="noopener noreferrer"
                          target="_blank"
                          className="transition-all duration-300 hover:text-main-color"
                        >
                          Preview Link
                        </a>
                      ) : (
                        "Link not available"
                      )}
                    </p>
                  </div>
                </div>

                {/* Book's details */}
                <Divisor />

                <div className="text-sm">
                  <h3 className="text-xl font-semibold mb-4 text-title-black">
                    Details
                  </h3>
                  <div className="flex mb-1">
                    <p className="block mr-3">
                      <b>Publisher:</b>
                    </p>

                    <p className="block">
                      {info.publisher ? info.publisher : "Unknown publisher"}
                    </p>
                  </div>
                  <div className="flex mb-1">
                    <p className="block mr-3">
                      <b>Publish date:</b>
                    </p>
                    <p className="block">
                      {info.publishedDate
                        ? info.publishedDate
                        : "Unkwnown publish date"}
                    </p>
                  </div>
                  <div className="flex mb-1">
                    <p className="block mr-3">
                      <b>Categories:</b>
                    </p>

                    <p className="block">
                      {info.categories
                        ? info.categories.join(", ")
                        : "Unknwon categories"}
                    </p>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <p>Loading...</p>
          )}
        </main>
      </div>
    </>
  );
};

export default SingleBook;

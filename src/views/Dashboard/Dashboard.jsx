import useFetch from "../../hooks/useFetch";
import { useBooks } from "../../contexts/BookContext";
import NextPrevBtn from "../../components/NextPrevBtn";
import Loading from "../../components/Loading";
import Error from "../../utils/FetchError";
import SearchBook from "../../components/SearchBook";
import BookCard from "../../components/BookCard";

const Dashboard = () => {
  const {
    books,
    startIndex,
    setStartIndex,
    totalItems,
    page,
    query,
    setPage,
    language,
  } = useBooks();

  const { error, loading } = useFetch();

  const normalizeText = (text) => {
    return text
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  };

  const filteredBooksByQuery = books.filter((book) => {
    const normalizedTitle = normalizeText(book.volumeInfo?.title || "");
    const normalizedQuery = normalizeText(query);
    return normalizedTitle === normalizedQuery;
  });

  const filteredBooksByLanguage = filteredBooksByQuery.filter(
    (book) => book.volumeInfo?.language === language
  );

  let booksToRender = [];

  if (language) {
    booksToRender =
      filteredBooksByLanguage.length > 0 ? filteredBooksByLanguage : null;
  } else {
    booksToRender = books.length > 0 ? books : null;
  }

  const handleNext = () => {
    if (startIndex + 10 < totalItems) {
      setStartIndex(startIndex + 10);
      setPage(page + 1);
    }
  };

  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 10);
      setPage(page - 1);
    }
  };

  return (
    <>
      <div className="min-h-screen w-screen bg-bg-color">
        {/* Error */}
        {error && <Error error={error} page={"home"} url={"/"} />}

        {/* Search book  */}
        <SearchBook />

        {/* Loading and Cards content */}
        <div>
          {loading ? (
            <Loading />
          ) : (
            <div className="p-2 grid grid-cols-2 sm:grid sm:grid-cols-3">
              {booksToRender ? (
                booksToRender.map((book) => (
                  <BookCard key={book.id} book={book} />
                ))
              ) : (
                <p>no res</p>
              )}
              {/* {language && filteredBooksByLanguage.length > 0 ? (
                books.map((book) => <BookCard key={book.id} book={book} />)
              ) : (
                <p>no results</p>
              )} */}
            </div>
          )}
        </div>

        {/* Prev and Next buttons */}
        {books.length > 0 && !loading && (
          <div className="flex justify-center mt-6 ">
            <NextPrevBtn
              content={"Prev"}
              action={handlePrev}
              dis={startIndex === 0}
            />
            {page > 1 && (
              <p className="font-bold text-fourth-color transition-all duration-200">
                {page}
              </p>
            )}
            <NextPrevBtn
              content={"Next"}
              action={handleNext}
              dis={startIndex + 10 >= totalItems}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default Dashboard;

import useFetch from "../../hooks/useFetch";
import { useBooks } from "../../contexts/BookContext";
import NextPrevBtn from "../../components/NextPrevBtn";
import Loading from "../../components/Loading";
import Error from "../../utils/FetchError";
import SearchBook from "../../components/SearchBook";
import BookCard from "../../components/BookCard";
import NoResults from "../../components/NoResults";

const Dashboard = () => {
  const {
    query,
    startIndex,
    setStartIndex,
    totalItems,
    page,
    setPage,
    booksToRender,
  } = useBooks();

  const { error, loading } = useFetch();

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
            <>
              {query && booksToRender.length === 0 ? (
                <NoResults />
              ) : (
                <div>
                  {booksToRender.map((book) => (
                    <BookCard key={book.id} book={book} />
                  ))}
                </div>
              )}
            </>
          )}
        </div>

        {/* Prev and Next buttons */}
        {booksToRender.length > 0 && !loading && (
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

import useFetch from "../../hooks/useFetch";
import { useBooksContext } from "../../contexts/BookContext";
import NextPrevBtn from "../../components/NextPrevBtn";
import Loading from "../../components/Loading";
import Error from "../../components/FetchError";
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
  } = useBooksContext();

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
    <main className="min-h-screen w-screen bg-bg-color">
      {/* Search book  */}
      <SearchBook />

      {/* Loading and Cards content */}
      <section>
        {loading ? (
          <Loading />
        ) : (
          <>
            {query && booksToRender.length === 0 ? (
              <NoResults />
            ) : (
              <div className="p-2 grid grid-cols-2 sm:grid sm:grid-cols-3">
                {booksToRender.map((book) => (
                  <BookCard key={book.id} book={book} />
                ))}
              </div>
            )}
          </>
        )}
      </section>

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
      {error && <Error error={error} page={"home"} url={"/"} />}
    </main>
  );
};

export default Dashboard;

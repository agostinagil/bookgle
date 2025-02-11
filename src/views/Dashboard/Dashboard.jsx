import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";

import Card from "../../components/Card";
import { useBooks } from "../../contexts/BookContext";
import NextPrevBtn from "../../components/NextPrevBtn";

const api_key = import.meta.env.VITE_BOOKS_KEY;

const Dashboard = () => {
  const {
    books,
    setBooks,
    query,
    setQuery,
    startIndex,
    setStartIndex,
    totalItems,
    setTotalItems,
  } = useBooks();

  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);

  // if 'query' exists create the url
  const url = query
    ? `https://www.googleapis.com/books/v1/volumes?q=${query}&startIndex=${startIndex}&maxResults=10&key=${api_key}`
    : null;

  const { data, error, loading, setError } = useFetch(url);

  useEffect(() => {
    if (data.items) {
      setBooks(data.items);
      setTotalItems(data.totalItems || 0);
    }
  }, [data, setBooks, setTotalItems]);

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

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      setError("What do you want to search?");
    }
    setQuery(searchQuery);
    setStartIndex(0);
  };

  return (
    <>
      <div className="min-h-screen w-screen bg-bg-color">
        <div className="flex align-center justify-evenly pt-24 ">
          <input
            type="text"
            placeholder="Search"
            className="rounded-md p-1 cursor-pointer ring-1 ring-main-color focus:ring-1 focus:outline-second-color"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
          />
          <button
            onClick={handleSearch}
            className="bg-btn-color text-slate-50 focus:outline-0 hover:border-third-color"
          >
            Search
          </button>
        </div>
        <div>
          {loading && <p>Cargando...</p>}
          {error && <p>{error}</p>}
          <div className="p-2 grid grid-cols-2 sm:grid sm:grid-cols-3">
            {books.map((book) => (
              <Card key={book.id} book={book} />
            ))}
          </div>
        </div>
        {data.items && (
          <div className="flex justify-center mt-6">
            <NextPrevBtn
              content={"Prev"}
              action={handlePrev}
              dis={startIndex === 0}
            />
            {page > 1 && (
              <p className="mx-6 font-bold text-fourth-color">{page}</p>
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

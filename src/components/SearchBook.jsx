import { useEffect, useState } from "react";
import { useBooks } from "../contexts/BookContext";
import useFetch from "../hooks/useFetch";
import SelectLanguage from "../views/Dashboard/SelectLanguage";

const api_key = import.meta.env.VITE_BOOKS_KEY;

const SearchBook = () => {
  const {
    setBooks,
    query,
    setQuery,
    startIndex,
    setStartIndex,
    setTotalItems,
    page,
    setPage,
  } = useBooks();

  const [searchQuery, setSearchQuery] = useState("");
  const [language, setLanguage] = useState("");

  // if 'query' exists create the url
  const url = query
    ? `https://www.googleapis.com/books/v1/volumes?q=${query}${
        language ? `&langRestrict=${language}` : ""
      }&startIndex=${startIndex}&maxResults=10&key=${api_key}`
    : null;

  const { data, setLoading } = useFetch(url);

  useEffect(() => {
    if (data.items) {
      setBooks(data.items);
      setTotalItems(data.totalItems || 0);
      setPage(page);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, setBooks, setTotalItems, setPage]);

  const handleSearch = () => {
    console.log(searchQuery);
    if (!searchQuery.trim()) {
      return;
    }
    if (searchQuery !== query) {
      setLoading(true);
      setQuery(searchQuery);
      setStartIndex(0);
    }
  };
  return (
    <>
      <div className="flex align-center justify-evenly pt-24 mb-4">
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

      <SelectLanguage setLanguage={setLanguage} />
    </>
  );
};

export default SearchBook;

import { useEffect, useState } from "react";
import { useBooksContext } from "../contexts/BookContext";
import useFetch from "../hooks/useFetch";
import SelectLanguage from "./SelectLanguage";
import { filterBooks } from "../utils/filterBooks";

const api_key = import.meta.env.VITE_BOOKS_KEY;

const SearchBook = () => {
  const {
    setBooks,
    query,
    setQuery,
    startIndex,
    setStartIndex,
    language,
    setLanguage,
    setBooksToRender,
    setLoading,
  } = useBooksContext();

  const [searchQuery, setSearchQuery] = useState("");
  const [queryType, setQueryType] = useState("intitle");

  // if 'query' exists create the url
  const url = query
    ? `https://www.googleapis.com/books/v1/volumes?q=${queryType}:${encodeURIComponent(
        query
      )}${
        language ? `&langRestrict=${language}` : ""
      }&startIndex=${startIndex}&maxResults=10&printType=books&key=${api_key}`
    : null;
  const { data } = useFetch(url);

  useEffect(() => {
    console.log(url);

    if (data?.items?.length) {
      const filteredBooks = filterBooks(
        data,
        queryType,
        query,
        language,
        setQueryType
      );
      setBooks(data.items);
      setBooksToRender(filteredBooks);
      setLanguage(language);

      if (filteredBooks.length === 0 && queryType === "intitle") {
        setQueryType("inauthor"); // Si después de filtrar no hay resultados, cambia a autor
      }
    } else if (queryType === "intitle" && searchQuery) {
      setQueryType("inauthor");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, queryType]);

  const handleSearch = () => {
    if (!searchQuery.trim()) return;

    if (searchQuery !== query) {
      setQueryType("intitle");
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
          placeholder="Title or Author"
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

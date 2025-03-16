import { useEffect, useState } from "react";
import { useBooks } from "../contexts/BookContext";
import useFetch from "../hooks/useFetch";
import SelectLanguage from "./SelectLanguage";

const api_key = import.meta.env.VITE_BOOKS_KEY;

const SearchBook = () => {
  const {
    setBooks,
    query,
    setQuery,
    startIndex,
    setStartIndex,
    setTotalItems,
    setPage,
    language,
    setLanguage,
    setBooksToRender,
  } = useBooks();

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
  const { data, setLoading } = useFetch(url);

  const normalizeText = (input) => {
    if (Array.isArray(input)) {
      return input.map((text) =>
        text
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .toLowerCase()
      );
    }
    return input
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  };

  useEffect(() => {
    if (data.items) {
      console.log(data.items);
      setBooks(data.items);
      // setTotalItems(data.totalItems || 0);
      setLanguage(language);
      console.log(url);

      const normalizedQuery = normalizeText(query);

      const filteredBooksByQuery = data.items.filter((book) => {
        const normalizedTitle = normalizeText(book.volumeInfo?.title || "");
        return normalizedTitle === normalizedQuery;
      });
      const filteredByAuthor = data.items.filter((book) => {
        const authors = book.volumeInfo?.authors || [];
        const normalizedAuthors = authors.map((author) =>
          normalizeText(author)
        );
        return normalizedAuthors.some((author) => author === normalizedQuery);
      });

      if (language && queryType === "intitle") {
        const filteredBooksLangTitle = filteredBooksByQuery.filter(
          (book) => book.volumeInfo?.language === language
        );
        setBooksToRender(filteredBooksLangTitle);
        setTotalItems(filteredBooksLangTitle.length);
      } else if (language && queryType === "inauthor") {
        const filteredBooksLangAuthor = filteredByAuthor.filter(
          (book) => book.volumeInfo?.language === language
        );
        setBooksToRender(filteredBooksLangAuthor);
        setTotalItems(filteredBooksLangAuthor.length);
      } else if (queryType === "inauthor" && !language) {
        console.log(filteredByAuthor);
        setBooksToRender(filteredByAuthor);
        setTotalItems(filteredByAuthor.length);
      } else {
        setBooksToRender(filteredBooksByQuery);
        setTotalItems(filteredBooksByQuery.length);
      }
    } else if (queryType === "intitle" && searchQuery) {
      setQueryType("inauthor");
      console.log(url);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, setBooks, setTotalItems, setPage, setLanguage, setBooksToRender]);

  useEffect(() => {});

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      return;
    }
    if (searchQuery !== query) {
      setLoading(true);
      setQuery(searchQuery);
      setStartIndex(0);
      setQueryType("intitle");
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

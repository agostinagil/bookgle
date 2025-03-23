/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";

export const BooksContext = createContext();

const { Provider } = BooksContext;

export const BooksProvider = ({ children }) => {
  //    save and set the books obtained from the api
  const [books, setBooks] = useState([]);
  //   save and set the actual search
  const [query, setQuery] = useState("");
  //   index from where you can start obtaining the books
  const [startIndex, setStartIndex] = useState(0);
  //   total number of books available according to the api
  const [totalItems, setTotalItems] = useState(0);

  const [language, setLanguage] = useState("");

  const [page, setPage] = useState(1);

  const [booksToRender, setBooksToRender] = useState([]);

  const [loading, setLoading] = useState(false);

  return (
    <Provider
      value={{
        books,
        setBooks,
        query,
        setQuery,
        startIndex,
        setStartIndex,
        totalItems,
        setTotalItems,
        page,
        setPage,
        language,
        setLanguage,
        booksToRender,
        setBooksToRender,
        loading,
        setLoading,
      }}
    >
      {children}
    </Provider>
  );
};

export const useBooksContext = () => {
  const context = useContext(BooksContext);
  if (!context)
    throw new Error("useBooks must be initialized within BooksProvider");
  return context;
};

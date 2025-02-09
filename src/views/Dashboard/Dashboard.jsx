import { useState } from "react";
import useFetch from "../../hooks/useFetch";

import Card from "../../components/Card";

const Dashboard = () => {
  const [query, setQuery] = useState("");
  const { data: results, error, loading, setError, fetchData } = useFetch();

  const api_key = import.meta.env.VITE_BOOKS_KEY;

  const handleSearch = async () => {
    if (!query.trim()) {
      setError("Please, write an author or book");
      return;
    }
    const url = `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${api_key}`;
    fetchData(url);
    setQuery("");
  };

  return (
    <>
      <div className="min-h-screen w-screen bg-bg-color">
        <div className="flex align-center justify-evenly pt-24 ">
          <input
            type="text"
            placeholder="Search"
            className="rounded-md p-1 cursor-pointer ring-1 ring-main-color focus:ring-1 focus:outline-second-color"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
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
            {results.map((res) => (
              <Card key={res.id} res={res} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;

import axios from "axios";
import { useState } from "react";
import Card from "../../common/Card";

const Dashboard = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const api_key = import.meta.env.VITE_BOOKS_KEY;

  const handleSearch = async () => {
    if (!query.trim()) {
      setError("Please, write an author or book");
      return;
    }

    setError("");
    setLoading(true);
    setResults([]);

    try {
      const titleResponse = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${api_key}`,
        { headers: { Accept: "application/json" } }
      );

      if (!titleResponse.ok) {
        setError("Ocurrio un error");
      }
      console.log(titleResponse);

      if (titleResponse.data.items) {
        const titles = Array.isArray(titleResponse.data.items)
          ? titleResponse.data.items
          : [titleResponse.data.items];
        setLoading(false);
        setError("");
        console.log("hola");
        setResults(titles);
      } else {
        setLoading(false);
        setError("no se encontro nada");
        setResults([]);
      }
    } catch (error) {
      setError("There was a problem searching. Please try again");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen w-screen bg-main-gradient bg-no-repeat bg-cover bg-center ">
        <div className="flex align-center justify-center pt-12">
          <input
            type="text"
            placeholder="search"
            className="rounded-md p-1"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button onClick={handleSearch}>search</button>
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

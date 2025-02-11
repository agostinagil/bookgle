import { useEffect, useState } from "react";
import axios from "axios";

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError("");
      // setData([]);

      try {
        const response = await axios.get(url, {
          headers: { Accept: "application/json" },
        });

        if (response.data.items) {
          setData(response.data);
        } else if (response.data) {
          setData([response.data]);
        } else {
          setError("No results found");
        }
      } catch (error) {
        setError("There was a problem performing the search. Please try again");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (url) fetchData();
  }, [url]);

  return { data, error, loading, setError };
};

export default useFetch;

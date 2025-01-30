import { useState } from "react";
import axios from "axios";

const useFetch = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchData = async (url) => {
    setLoading(true);
    setError("");
    // setData([]);

    try {
      const response = await axios.get(url, {
        headers: { Accept: "application/json" },
      });

      if (response.data.items) {
        setData(response.data.items);
        console.log(response.data.items);
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

  return { data, error, loading, setError, fetchData };
};

export default useFetch;

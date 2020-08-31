import { useState, useEffect } from "react";

const useFetch = (url, body) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState();
  const [req, setReq] = useState();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const req = body ? await fetch(url, body) : await fetch(url);
      const res = await req.json();
      setData(res);
      setReq(req);
    } catch (err) {
      setErrorMessage(err.message);
    }

    setIsLoading(false);
  };

  return { data, setData, isLoading, setIsLoading, errorMessage, req };
};

export default useFetch;

import { useState, useEffect } from "react";

const useFetch = (url, body) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState();
  const [req, setReq] = useState();

  useEffect(() => {
    let fetchEnabled = true;
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

    fetchEnabled && fetchData();

    // Prevent fetching to the server if the component is unmounted
    return () => {
      fetchEnabled = false;
    };
  }, [body, url]);

  return {
    data,
    setData,
    isLoading,
    setIsLoading,
    errorMessage,
    setErrorMessage,
    req,
  };
};

export default useFetch;

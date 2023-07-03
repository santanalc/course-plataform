import React, { useState, useEffect } from "react";

export default function useFetch(url: string, options = {}) {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(url, options)
      .then(async (response) => {
        const json = await response.json();
        setData(json);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [url]);

  return { isLoading, data, error };
}

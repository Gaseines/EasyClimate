import { useState, useEffect } from "react";

export const useFetch = (cidade) => {
  const [data, setData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  let myKey = "81d18ae74ffe49fdbe403439252901";

  useEffect(() => {
    async function fetchData() {
      setLoading(true);

      try {
        const response = await fetch(
          `https://api.weatherapi.com/v1/forecast.json?key=${myKey}&q=${cidade}&aqi=no&alerts=no&days=5&lang=pt`
        );
        console.log("Fetch feito")
        if (!response.ok) {
            throw new Error("Erro ao buscar os dados da API");
          }

        const result = await response.json();
        console.log("Dados recebidos: ", result)

        setData(result);
        console.log(data)

        setError(null)
        setLoading(false)
      } catch (err) {
        setError({ message: `O erro que ocorreu foi: ${err}` });
        console.log(err);
        setLoading(false)
      }
    }

    fetchData();
  }, [cidade, myKey]);

  useEffect(() => {
    console.log("Dados do data: ", data)
  }, [data])

  return [data, loading, error];
};

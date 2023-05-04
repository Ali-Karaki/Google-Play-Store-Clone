import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import fIXER_IO_API_KEY from "./fixerioAPIConfig"

const useExchangeRate = () => {
  const [rate, setRate] = useState(15000);
  let currency = useSelector((state: any) => state.currency);

    if (currency === undefined) currency = {value: "LBP"};

  useEffect(() => {
    const myHeaders = new Headers();
    myHeaders.append("apikey", fIXER_IO_API_KEY!);

    const requestOptions: RequestInit = {
      method: "GET",
      redirect: "follow",
      headers: myHeaders,
    };

    fetch(`https://api.apilayer.com/fixer/latest?symbols=${currency.value}&base=USD`, requestOptions)
      .then((response) => response.json())
      .then((result) => setRate(result.rates[currency]))
      .catch((error) => console.log("error", error));
  }, [currency]);

  return rate;
};

export default useExchangeRate;
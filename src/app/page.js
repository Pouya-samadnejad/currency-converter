// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`
"use client";
import { useState } from "react";
import { useEffect } from "react";

export default function App() {
  const [amount, setAmount] = useState(1);
  const [fromCur, setFromCur] = useState("EUR");
  const [toCur, setToCur] = useState("USD");
  const [converted, setConverted] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  useEffect(
    function () {
      async function fetchData() {
        setIsLoading(true);
        const res = await fetch(
          `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCur}&to=${toCur}`
        );
        const data = await res.json();
        setConverted(data.rates[toCur]);
        setIsLoading(false);
      }
      if (fromCur === toCur) return;
      setConverted(amount);

      fetchData();
    },
    [amount, fromCur, toCur]
  );
  return (
    <div className="border-2 border-black mx-56 my-56 rounded-xl p-7 bg-[#FFD6C3]">
      <h2 className="text-4xl font-bold text-center pb-3">
        Currency converter
      </h2>
      <input
        type="text"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        disabled={isLoading}
        className="border-2 rounded m-2 pl-2"
      />
      <select
        value={fromCur}
        onChange={(e) => setFromCur(e.target.value)}
        disabled={isLoading}
        className="border-2 rounded m-2 pl-2"
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select
        value={toCur}
        onChange={(e) => setToCur(e.target.value)}
        disabled={isLoading}
        className="border-2 rounded m-2 pl-2"
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <p className="text-2xl font-bold p-2">
        {converted} {toCur}
      </p>
    </div>
  );
}

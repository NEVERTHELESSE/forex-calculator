import { useState } from "react";

export default function Pairs() {
  const pairs = ["AUDUSD", "GBPJPY", "EURUSD", "GBPUSD"];

  const [selected, setSelected] = useState("AUDUSD");
  function activePair(pair: string) {
    setSelected(pair);
  }

  return (
    <main>
      <h1>pairs {selected}</h1>
      {pairs.map((pair) => (
        <button
          className={pair == selected ? "active-button" : ""}
          onClick={() => activePair(pair)}
          key={pair}
        >
          {pair}
        </button>
      ))}
    </main>
  );
}

import { useState, type FormEvent } from "react";

export default function App() {
  const pairs = ["AUDUSD", "GBPJPY", "EURUSD", "GBPUSD"];

  const [selected, setSelected] = useState("AUDUSD");
  function activePair(pair: string) {
    setSelected(pair);
  }
  const [profit, setProfit] = useState(0);
  const [loss, setLoss] = useState(0);
  // const [options, setOptions] = useState([{ lot: 0.02, price: 0, sl: 0, tp: 0 }]);
  const [lot, setLot] = useState(0.05);
  const [price, setPrice] = useState(0);
  const [tp, setTp] = useState(0);
  const [pipLoss, setPipLoss] = useState(0);
  const [commission, setCommission] = useState(0);
  const [pipProfit, setPipProfit] = useState(0);
  const [sl, setSl] = useState(0);

  function calculate(e: FormEvent) {
    e.preventDefault();
    switch (selected) {
      case "GBPJPY":
        const gbpPrice = 155.7;
        const lossPip = (price - sl) * 100;
        const forwardPip = (tp - price) * 100;
        const runningPrice = (forwardPip * 10) / gbpPrice;
        setLoss(Number(((lossPip * 10) / gbpPrice).toFixed(2)) * lot * 100);
        setProfit(Number(runningPrice.toFixed(2)) * lot * 100);
        setPipLoss(Number(lossPip.toFixed(1)));
        setPipProfit(Number(forwardPip.toFixed(1)));
        break;

      default:
        break;
    }
    setCommission(lot * 10 * 0.6);
  }

  return (
    <section>
      {/* <Pairs /> */}
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
      <div className="cover">
        <form onSubmit={calculate}>
          <h2>Lot size </h2>
          <input
            name="lot"
            id="lot"
            placeholder="0.01"
            onChange={(e) => setLot(Number(e.target.value))}
          />
          <h2>Price </h2>
          <input
            type="price"
            name="price"
            id="price"
            placeholder="212.765"
            onChange={(e) => setPrice(Number(e.target.value))}
          />
          <h2>Take Profit</h2>
          <input
            name="tp"
            id="tp"
            placeholder="212.765"
            onChange={(e) => setTp(Number(e.target.value))}
          />
          <h2>Stop Loss </h2>
          <input
            name="sl"
            id="sl"
            onChange={(e) => setSl(Number(e.target.value))}
            placeholder="212.765"
          />
          <button>Calculate</button>
        </form>
        <div className="container">
          <h3>Loss</h3>
          <h1>$-{loss.toLocaleString()}</h1>
          <h3>Profit</h3>
          <h1>${profit.toLocaleString()}</h1>
          <h3>Pip Loss</h3>

          <h1>{pipLoss}</h1>
          <h3>Pip Profit</h3>
          <h1>{pipProfit}</h1>
          <h3>Commission</h3>
          <h1>{commission}</h1>
        </div>
      </div>
    </section>
  );
}

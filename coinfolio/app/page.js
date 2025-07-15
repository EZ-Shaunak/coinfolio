"use client";
import { useState } from 'react';
import Overview from './components/Overview';
import marketsSnapshot from './snapshots/markets.json';

export default function Home() {
  const [account, setAccount] = useState(null);
  const [markets, setMarkets] = useState(marketsSnapshot);
  const [trackedTokens, setTrackedTokens] = useState([]);

  return (
    <main>
      <h2>Portfolio Overview</h2>

      <Overview account={account} setAccount={setAccount}
        markets={markets}
        trackedTokens={trackedTokens} setTrackedTokens={setTrackedTokens}
      />

      <div className="details">
        <div className="divider"></div>
      </div>
    </main>
  );
}

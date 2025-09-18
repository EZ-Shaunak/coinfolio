"use client";
import { useState, useEffect } from 'react';

// Components
import Overview from './components/Overview';
import Values from './components/Values';
import Holdings from './components/Holdings';
import Assets from './components/Assets';

//Data Snapshots
import marketsSnapshot from './snapshots/markets.json';
import tokensSnapshot from './snapshots/tokens.json';
import pricesSnapshot from './snapshots/prices.json';

export default function Home() {
  const [account, setAccount] = useState(null);
  const [markets, setMarkets] = useState(null);
  const [trackedTokens, setTrackedTokens] = useState([]);
  const [tokens, setTokens] = useState([]);

  const getMarkets = async () => {
    setMarkets(marketsSnapshot);
  }

  const getToken = async () => {
    const id = trackedTokens[trackedTokens.length - 1];

    //Token market details
    const tokenMarketDetails = markets.find(market => market.id === id);

    //Token address and object
    const tokenAddressDetails = tokensSnapshot.find(token => token.id === id);
    const tokenAddress = tokenAddressDetails.detail_platforms.ethereum;

    //Token Prices
    const tokenPrices = pricesSnapshot[id]
    //User Token Balance
    const balanceSnapshot = {
      'ethereum': 14.9595959595959595,
      'usd-coin': 41.566528,
    }

    const balance = balanceSnapshot[id];

    const token = {
      id: id,
      tokenMarketDetails: tokenMarketDetails,
      address: tokenAddress ? tokenAddress : null,
      prices: tokenPrices,
      balance: balance,
      value: balance * tokenMarketDetails.current_price,
    }

    setTokens([...tokens, token]);

  }

  useEffect(() => {
    if (!markets) {
      getMarkets();
    }

    if (trackedTokens.length > 0) {
      getToken();
    }
  }, [trackedTokens]); // Re-run when trackedTokens change


  return (
    <main>
      <h2>Portfolio Overview</h2>

      <Overview account={account} setAccount={setAccount}
        markets={markets}
        trackedTokens={trackedTokens} setTrackedTokens={setTrackedTokens}
        tokens={tokens}
      />


      <div className="details">
        <div className="divider"></div>



        <Holdings tokens={tokens} />
        <Values tokens={tokens}/>
        <Assets />

      </div>
    </main>
  );
}

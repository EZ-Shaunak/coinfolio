"use client";
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

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
    const ROOT_URL = `https://api.coingecko.com/api/v3`
    const ENDPOINT = `/coins/markets`
    const AMOUNT = 25
    const ARGUMENTS = `?vs_currency=usd&category=ethereum-ecosystem&order=market_cap_desc&per_page=${AMOUNT}&page=1&sparkline=false&locale=en`

    const response = await fetch(ROOT_URL + ENDPOINT + ARGUMENTS)

    setMarkets(await response.json())
  }

  const getToken = async () => {
    // Fetch token info and sew it together
    const id = trackedTokens[trackedTokens.length - 1]

    // Market data
    const market = markets.find((market) => market.id === id)

    // Fetch token details via API request (we just need the contract address)
    const ROOT_URL = `https://api.coingecko.com/api/v3`
    const TOKEN_ENDPOINT = `/coins/${id}`
    const TOKEN_ARGUMENTS = `?tickers=false&market_data=false&community_data=false&developer_data=false&sparkline=false`

    const tokenResponse = await fetch(ROOT_URL + TOKEN_ENDPOINT + TOKEN_ARGUMENTS)
    const tokenSnapshot = await tokenResponse.json()

    const details = tokenSnapshot.detail_platforms.ethereum

    // Fetch token 7 day average prices via API request
    const PRICES_ENDPOINT = `/coins/${id}/market_chart/`
    const PRICES_ARGUMENTS = `?vs_currency=usd&days=7&interval=daily`

    const pricesResponse = await fetch(ROOT_URL + PRICES_ENDPOINT + PRICES_ARGUMENTS)
    const prices = (await pricesResponse.json()).prices

    // Fetch balance
    const ETH_RPC_URL = "https://rpc.ankr.com/eth/ddbcc193a8fa262599b9d1e915d6352bf32c868b337fb08d2cd237b9cc637b45"
    const PROVIDER = new ethers.JsonRpcProvider(ETH_RPC_URL)
    const ABI = ["function balanceOf(address) view returns (uint)"]

    let balance

    if (details) {
      const contract = new ethers.Contract(details.contract_address, ABI, PROVIDER)
      balance = Number(ethers.formatUnits(await contract.balanceOf(account), details.decimal_place))
    } else {
      balance = Number(ethers.formatUnits(await PROVIDER.getBalance(account), 18))
    }

    const token = {
      id: id,
      tokenMarketDetails: market,
      address: details ? details.contract_address : null,
      prices: prices,
      balance: balance,
      value: balance * market.current_price,
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
        <Values tokens={tokens} />
        <Assets tokens={tokens} setTokens={setTokens} />

      </div>
    </main>
  );
}

import { useState, useEffect } from 'react';
import Image from "next/image";

//Components
import Account from './Account';
import AddToken from './AddToken';

//Images
import up from '../assets/up.svg';
import down from '../assets/down.svg';
import add from '../assets/add.svg';
import minus from '../assets/minus.svg';
import close from '../assets/close.svg';

const Overview = ({ account, setAccount, markets, trackedTokens, setTrackedTokens, tokens }) => {

    const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
    const [isAddTokenModalOpen, setIsAddTokenModalOpen] = useState(false);
    const [value, setValue] = useState(0);
    const [percentageChange, setPercentageChange] = useState(0);

    const accountModalHandler = () => {
        setIsAccountModalOpen(true);
    }

    const addTokenModalHandler = () => {
        if (account) {
            setIsAddTokenModalOpen(true);
        } else {
            setIsAccountModalOpen(true);
        }
    }

    const calculateTotalValue = () => {
        const totalValue = tokens.reduce((acc, token) => {
            return acc + token.value;
        }, 0);

        setValue(totalValue);
    }

    const calculatePercentageChange = () => {
        const percentageChange = tokens.reduce((acc, token) => {

            const pastValue = (token.tokenMarketDetails.current_price - token.tokenMarketDetails.price_change_24h) * token.balance;
            const currentValue = token.tokenMarketDetails.current_price;
            const change = ((currentValue - pastValue) / pastValue) * 100;
            return acc + change;

        }, 0);

        setPercentageChange(percentageChange);
    }

    useEffect(() => {
        if (tokens.length > 0) {
            calculateTotalValue();
            calculatePercentageChange();
        } else {
            setValue(0);
            setPercentageChange(0);
        }
    }, [tokens])

    return (

        < div className="overview" >
            {console.log(tokens)}
            <div className="overview__account">
                <h3>Account</h3>

                {
                    account ?
                        (<p>{account.slice(0, 4) + "..." + account.slice(-4)}</p>)
                        :
                        (
                            <button onClick={accountModalHandler}>
                                <Image
                                    src={add}
                                    width={20}
                                    height={20}
                                    alt="Set Account"
                                />
                            </button>)
                }


            </div>
            <div className="overview__tracked">
                <h3>Assets Tracked</h3>
                <p>{trackedTokens.length}</p>
                <button onClick={addTokenModalHandler}>
                    <Image
                        src={add}
                        width={20}
                        height={20}
                        alt="Add Token"
                    />
                </button>
            </div>
            <div className="overview__total">
                <h3>Total Value</h3>
                <p>{value.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</p>
            </div>
            <div className="overview__change">
                <h3>% Change</h3>
                <p>
                    <Image
                        src={percentageChange < 0 ? down : up}
                        width={20}
                        height={20}
                        alt="Change Direction"
                    />
                    <span className={percentageChange < 0 ? 'red' : 'green'}>{percentageChange.toFixed(2)}%</span>
                </p>
            </div>

            {
                isAccountModalOpen &&
                <Account
                    setIsAccountModalOpen={setIsAccountModalOpen}
                    setAccount={setAccount}
                />
            }

            {
                isAddTokenModalOpen &&
                <AddToken
                    setIsAddTokenModalOpen={setIsAddTokenModalOpen}
                    markets={markets}
                    trackedTokens={trackedTokens}
                    setTrackedTokens={setTrackedTokens}
                />
            }
        </div >
    );
}

export default Overview;
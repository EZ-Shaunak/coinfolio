import { useState } from 'react';
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

const Overview = ({ account, setAccount, markets, trackedTokens, setTrackedTokens }) => {

    const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
    const [isAddTokenModalOpen, setIsAddTokenModalOpen] = useState(false);

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

    return (
        <div className="overview" >
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
                <p>$0.00</p>
            </div>
            <div className="overview__change">
                <h3>% Change</h3>
                <p>
                    <Image
                        src={up}
                        width={20}
                        height={20}
                        alt="Change Direction"
                    />
                    <span className="green">0.00%</span>
                </p>
            </div>

            {isAccountModalOpen &&
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
        </div>
    );
}

export default Overview;
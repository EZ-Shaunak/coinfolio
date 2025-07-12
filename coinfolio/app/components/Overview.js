import Image from "next/image";
import up from '../assets/up.svg';
import down from '../assets/down.svg';
import add from '../assets/add.svg';
import minus from '../assets/minus.svg';
import close from '../assets/close.svg';

const Overview = () => {
    return (
        <div className="overview" >
            <div className="overview__account">
                <h3>Account</h3>
                <button>
                    <Image
                        src={add}
                        width={20}
                        height={20}
                        alt="Set Account"
                    />
                </button>
            </div>
            <div className="overview__tracked">
                <h3>Assets Tracked</h3>
                <p></p>
                <button>
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

        </div>
    );
}

export default Overview;
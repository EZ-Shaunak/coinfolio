import Image from "next/image";
import close from '../assets/close.svg';

const AddToken = ({ setIsAddTokenModalOpen, markets, trackedTokens, setTrackedTokens }) => {

    const closeAddTokenModalHandler = () => {
        setIsAddTokenModalOpen(false);
    }
    const addTokenHandler = (e) => {
        e.preventDefault();
        setTrackedTokens([...trackedTokens, e.target.tokens.value]);
        setIsAddTokenModalOpen(false);
    }


    return (
        <div className="popup">
            <div className="popup__content add">
                <h3>Track a new Token</h3>

                <button onClick={closeAddTokenModalHandler}>
                    <Image
                        src={close}
                        width={15}
                        height={15}
                        alt="Close Popup"
                    />
                </button>

                <form onSubmit={addTokenHandler}>
                    <label htmlFor="tokens">
                        Select a Token
                    </label>
                    <select name="tokens" id="tokens">
                        {
                            markets &&
                            markets.map(
                                (market, i) => (
                                    <option key={i} value={market.id}>
                                        {market.symbol.toUpperCase()}
                                    </option>
                                )
                            )
                        }
                    </select>
                    <input type="submit" value="Add Token" />
                </form>

            </div>
        </div>
    );
}

export default AddToken;
import { useEffect, useState, useMemo } from "react";
import dynamic from 'next/dynamic';


const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });


const Holdings = ({ tokens }) => {
    const defaultSymbols = ["---", "---", "---", "---", "---"];
    const defaultBalances = [15.5, 70.1, 35.89, 25, 100.9];

    const [symbols, setSymbols] = useState(null);
    const [balances, setBalances] = useState(null);

    const calculateValue = () => {

        const syms = tokens.map(t => t.tokenMarketDetails.symbol.toUpperCase());
        const bals = tokens.map(t => t.balance);

        setSymbols(syms);
        setBalances(bals);
    };

    useEffect(() => {
        if (!tokens || tokens.length === 0) {
            setSymbols(null);
            setBalances(null);
        } else {
            calculateValue();
        }
    }, [tokens]);

    const chartOptions = useMemo(() => ({
        labels: symbols || defaultSymbols,
        legend: {
            position: 'left',
            horizontalAlign: 'center',
            labels: {
                fontSize: '14px',
                fontWeight: 'bold',
                colors: '#FFFFFF'
            }
        }
    }), [symbols]);

    const chartSeries = useMemo(() => balances || defaultBalances, [balances]);

    return (
        <div className="holdings">
            <h3 className="holdings__title">Asset Holdings</h3>
            <div className="holdings__chart">
                <Chart
                    key={symbols ? symbols.join(",") : "default"}  // re-render when symbols change

                    options={chartOptions}
                    series={chartSeries}
                    type="pie"
                    height={300}
                />
            </div>
        </div>
    );
};

export default Holdings;

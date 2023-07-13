import React, { useState, useEffect } from 'react';
import { Line, Bar } from 'react-chartjs-2';

import { fetchScanData } from '../../api'

const Chart = ({ data: Scan }) => {

    const [scanData, setDailyData] = useState({});

    useEffect(() => {
        const fetchMyAPI = async () => {
            const initialScanData = await fetchScanData();

            setDailyData(initialScanData);
        };

        fetchMyAPI();
    }, []);
    return (
        <div className='scan-grah'>
            const lineChart = (
            scanData[0] ? (
            <Line
                data={{
                    labels: scanData.map(({ date }) => new Date(date).toLocaleDateString()),
                    datasets: [{
                        data: scanData.map((data) => data.confirmed),
                        label: 'Infected',
                        borderColor: '#3333ff',
                        fill: true,
                    }],
                }}
            />
            ) : null
            );
        </div>
    )
}
export default Chart;
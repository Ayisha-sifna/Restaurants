import React from 'react';
import { Line } from 'react-chartjs-2';

const MonthlyScanGraph = () => {
    // Generate random scan data for each month (replace with your own data)
    const scanData = Array.from({ length: 12 }, () => Math.floor(Math.random() * 100));

    // Chart data and options
    const chartData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
            {
                label: 'Monthly QR Scans',
                data: scanData,
                fill: false,
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Number of Scans',
                },
            },
        },
    };

    return (
        <div>
            <h2>Monthly QR Scans</h2>
            <Line data={chartData} options={chartOptions} />
        </div>
    );
};

export default MonthlyScanGraph;

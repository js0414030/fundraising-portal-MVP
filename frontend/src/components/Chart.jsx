import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function DonationChart({ donations }) {
    const labels = donations.map(d => d.month);
    const values = donations.map(d => d.amount);

    const data = {
        labels,
        datasets: [
            {
                label: "Donations (₹)",
                data: values,
                fill: true,
                borderColor: "#4f46e5",
                backgroundColor: "rgba(79, 70, 229, 0.2)",
                tension: 0.3,
                pointBackgroundColor: "#4f46e5",
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
            },
        },
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow mt-4">
            <h2 className="font-bold mb-2">📈 Donation Progress</h2>
            <Line data={data} options={options} />
        </div>
    );
}

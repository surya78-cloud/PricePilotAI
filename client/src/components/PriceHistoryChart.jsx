import {
    Line
} from "react-chartjs-2";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend
);

function PriceHistoryChart({ history }) {

    const data = {

        labels: history.map(item =>
            new Date(item.createdAt).toLocaleDateString()
        ),

        datasets: [

            {

                label: "Price",

                data: history.map(item => item.price),

                borderColor: "#2563eb",

                backgroundColor: "#93c5fd",

                tension: 0.4

            }

        ]

    };

    return (

        <div className="bg-white rounded-xl shadow-lg p-5">

            <Line data={data} />

        </div>

    );

}

export default PriceHistoryChart;
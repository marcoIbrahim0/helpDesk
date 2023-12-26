import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';

const Analysis = () => {
  const [chartData, setChartData] = useState([]);
  const chartCanvasRef = useRef(null);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/v1/tickets/ticketsAnalysis`, {
          withCredentials: true,
        });
        if (!response.data) {
          throw new Error("No data received from the server");
        }

        setChartData(response.data);
      } catch (error) {
        console.error("Error fetching chart data:", error.message);
      }
    };

    fetchChartData();
  }, []);

  useEffect(() => {
    const renderChart = () => {
      try {
        const categories = chartData.map((entry) => `${entry._id.category} - ${entry._id.subCategory}`);
        const totalCounts = chartData.map((entry) => entry.totalCount);

        const chartConfig = {
          type: 'bar',
          data: {
            labels: categories,
            datasets: [
              {
                label: "Ticket Counts",
                data: totalCounts,
                backgroundColor: "rgba(75,192,192,0.6)",
              },
            ],
          },
          options: {
            scales: {
              y: {
                beginAtZero: true,
                maxTicksLimit: 10,
              },
              x: {},
            },
          },
        };

        if (chartCanvasRef.current) {
          const existingChartInstance = Chart.getChart(chartCanvasRef.current);
          if (existingChartInstance) {
            existingChartInstance.destroy();
          }
        }

        const newChartInstance = new Chart(chartCanvasRef.current, chartConfig);

        return () => {
          if (newChartInstance) {
            newChartInstance.destroy();
          }
        };
      } catch (error) {
        console.error("Error rendering chart:", error.message);
      }
    };

    renderChart();
  }, [chartData]);

  return (
    <div>
      <h1 style={{ marginTop: 0 }}>Tickets Analysis</h1>
      <div style={{ width: "130%", margin: "auto" }}>
        <canvas ref={chartCanvasRef}></canvas>
      </div>
    </div>
  );
};

export default Analysis;

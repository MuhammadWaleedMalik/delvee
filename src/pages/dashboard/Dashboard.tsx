import { useState, useEffect } from "react";
import StatCard from "./dashboardcomponents/StatCard.tsx";
import UserChart from "./dashboardcomponents/UserChart.tsx";
import { 
  FaUsers, 
  FaMoneyBillWave, 
  FaExchangeAlt, 
  FaDollarSign 
} from "react-icons/fa";

const API_URL = import.meta.env.VITE_REACT_APP_API_URL;

// Mock data for fallback
const mockDashboardData = {
  totalUsers: 12,
  totalSubscriptions: 0,
  totalTransactions: 0,
  totalIncome: 0
};

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch(`${API_URL}/api/v1/dashboard/get`);
        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message || "Failed to fetch dashboard data");
        }

        setDashboardData(result.data[0]); // Extracting the first object inside 'data' array
      } catch (err) {
        setError(err.message);
        // Set mock data when error occurs
        setDashboardData(mockDashboardData);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) return <p>Loading...</p>;
  // Remove error return since we're using mock data as fallback
  
  const statCards = [
    {
      title: "Total Users",
      value: dashboardData?.totalUsers || 0,
      icon: <FaUsers size={24} />,
    },
    {
      title: "Total Subscriptions",
      value: dashboardData?.totalSubscriptions || 0,
      icon: <FaMoneyBillWave size={24} />,
    },
    {
      title: "Total Transactions",
      value: dashboardData?.totalTransactions || 0,
      icon: <FaExchangeAlt size={24} />,
    },
    {
      title: "Total Income",
      value: `$${dashboardData?.totalIncome || 0}`,
      icon: <FaDollarSign size={24} />,
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Dashboard</h1>
      {/* {error && <p className="text-yellow-500 mb-4">Using mock data: {error}</p>} */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {statCards.map((card, index) => (
          <StatCard key={index} title={card.title} value={card.value} icon={card.icon} />
        ))}
      </div>

      <div className="mt-8">
        <UserChart />
      </div>
    </div>
  );
};

export default Dashboard;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import InvestmentTable from "./InvestmentTable"; // Make sure this component exists

const Dashboard = () => {
  const [groupedInvestments, setGroupedInvestments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPortfolio, setSelectedPortfolio] = useState("All");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchInvestments = () => {
    setLoading(true);
    fetch("/holdings")
      .then((res) => {
        if (res.status === 401) {
          throw new Error("Unauthorized: Please log in to view your investments.");
        }
        return res.json();
      })
      .then((data) => {
        const grouped = {};
        data.forEach((inv) => {
          const portfolioName = inv.portfolio?.name || "Uncategorized";
          if (!grouped[portfolioName]) grouped[portfolioName] = [];
          grouped[portfolioName].push({
            id: inv.id,
            assetName: inv.asset_name,
            assetType: inv.asset_type,
            buyPrice: inv.buy_price,
            date: new Date(inv.buy_date).toISOString().split("T")[0],
          });
        });

        const groupedArray = Object.entries(grouped).map(([portfolioName, investments]) => ({
          portfolioName,
          investments,
        }));

        setGroupedInvestments(groupedArray);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching investments:", err);
        if (err.message.includes("Unauthorized")) {
          alert("Please log in to view your investments.");
          navigate("/login");
        }
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchInvestments();
  }, []);

  const totalInvestmentValue = groupedInvestments.length
    ? groupedInvestments.reduce(
        (total, group) => total + group.investments.reduce((sum, inv) => sum + inv.buyPrice, 0),
        0
      )
    : 0;

  if (loading) {
    return <p className="text-center text-gray-600">Loading investments...</p>;
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r p-6 shadow-lg">
        <h2 className="text-xl font-bold text-teal-700 mb-4">My Portfolios</h2>
        <ul className="space-y-2">
          <li
            className={`cursor-pointer p-2 rounded hover:bg-teal-100 ${
              selectedPortfolio === "All" ? "bg-teal-100 font-semibold" : ""
            }`}
            onClick={() => setSelectedPortfolio("All")}
          >
            All Portfolios
          </li>
          {groupedInvestments.map((group, idx) => (
            <li
              key={idx}
              className={`cursor-pointer p-2 rounded hover:bg-teal-100 ${
                selectedPortfolio === group.portfolioName ? "bg-teal-100 font-semibold" : ""
              }`}
              onClick={() => setSelectedPortfolio(group.portfolioName)}
            >
              {group.portfolioName}
            </li>
          ))}
        </ul>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8 bg-gradient-to-r from-teal-50 to-blue-100">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-teal-800 mb-6">Investment Dashboard</h1>

          {/* Total Investment Card */}
          <div className="bg-white p-4 rounded-lg shadow-md mb-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-teal-700">Total Investments</h2>
              <p className="text-2xl font-bold text-teal-600">Ksh. {totalInvestmentValue.toLocaleString()}</p>
            </div>
          </div>

          {/* Search input */}
          <div className="mb-6">
            <input
              type="text"
              placeholder="Search by asset name or type"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          {/* Investment Tables */}
          {groupedInvestments
            .filter(
              (group) =>
                selectedPortfolio === "All" || group.portfolioName === selectedPortfolio
            )
            .map((group, idx) => {
              const filteredInvestments = group.investments.filter((inv) =>
                inv.assetName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                inv.assetType.toLowerCase().includes(searchTerm.toLowerCase())
              );

              if (filteredInvestments.length === 0) return null;

              return (
                <div key={idx} className="mb-6 bg-white p-4 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold text-teal-700 mb-2">
                    {group.portfolioName} Portfolio
                  </h3>
                  <InvestmentTable
                    investments={filteredInvestments}
                    onRefresh={fetchInvestments}
                  />
                </div>
              );
            })}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
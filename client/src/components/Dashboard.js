import React , {useEffect, useState} from 'react';
import InvestmentTable from './InvestmentTable'; // Import the InvestmentTable component


const Dashboard = () => {
    const [groupedInvestments, setGroupedInvestments] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedPortfolio, setSelectedPortfolio] = useState('All');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/holdings") // adjust the endpoint if needed
            .then((res) => res.json())
            .then((data) => {
                const grouped = {};
            
                data.forEach((inv) => {
                    const portfolioName = inv.portfolio?.name || "Uncategorized";
                    if (!grouped[portfolioName]) {
                        grouped[portfolioName] = [];
                    }
            
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
                setLoading(false);
            });
    }, []);
    
    // Calculate the total investment value
    const totalInvestmentValue = groupedInvestments.length
    ? groupedInvestments.reduce((total, group) =>
        total + group.investments.reduce((sum, inv) => sum + inv.buyPrice, 0), 0)
    : 0;

    const handleEdit = (investment) => {
        console.log("Edit clicked for:", investment);
        // Open edit form/modal
    };
    
    const handleDelete = (investment) => {
        console.log("Delete clicked for:", investment);
        // Trigger delete confirmation or API call
    };

    
    if (loading) {
        return <p className="text-center text-gray-600">Loading investments...</p>;
    }

    return (
        <div className="bg-gradient-to-r from-teal-100 to-blue-100 min-h-screen p-8">
            <div className="max-w-7xl mx-auto">
                {/* Dashboard Header */}
                <h1 className="text-3xl font-bold text-teal-800 text-center mb-8">Investment Dashboard</h1>
                
                {/* Total Investments Card */}
                <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                    <h2 className="text-2xl font-semibold text-teal-800 mb-4">Total Investments</h2>
                    <p className="text-3xl font-bold text-teal-600">
                        Ksh. {totalInvestmentValue.toLocaleString()}
                    </p>
                </div>
                
                {/* Investments List by Portfolio */}
                <div className="bg-white p-6 rounded-lg shadow-md mb-8 flex flex-col md:flex-row gap-4">
                    <input
                        type="text"
                        placeholder="Search by asset name or type"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="flex-1 px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                    <select
                        value={selectedPortfolio}
                        onChange={(e) => setSelectedPortfolio(e.target.value)}
                        className="px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                    >
                        <option value="All">All Portfolios</option>
                        {groupedInvestments.map((group, idx) => (
                            <option key={idx} value={group.portfolioName}>
                                {group.portfolioName}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    {groupedInvestments
                        .filter(group =>
                            selectedPortfolio === 'All' || group.portfolioName === selectedPortfolio
                        )
                        .map((group, idx) => {
                            const filteredInvestments = group.investments.filter(inv =>
                                inv.assetName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                inv.assetType.toLowerCase().includes(searchTerm.toLowerCase())
                            );

                            if (filteredInvestments.length === 0) return null;

                            return (
                                <div key={idx} className="mb-10">
                                    <h3 className="text-xl font-semibold text-teal-700 mb-4">
                                        {group.portfolioName}
                                    </h3>
                                    <InvestmentTable
                                        investments={filteredInvestments}
                                        onEdit={handleEdit}
                                        onDelete={handleDelete}
                                    />
                                </div>
                            );
                        })}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
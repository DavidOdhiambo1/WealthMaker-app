import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";



const InvestmentForm = () => {
    const [assetName, setAssetName] = useState("");
    const [assetType, setAssetType] = useState("");
    const [buyPrice, setBuyPrice] = useState("");
    const [date, setDate] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const investmentData = {
            assetName,
            assetType,
            buyPrice,
            date,
        };

        fetch("/holdings", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(investmentData),
        })
            .then((res) => {
                if (res.ok) {
                    navigate("/investments");
                } else {
                    alert("Failed to add investment. Please try again.");
                }
            })
            .catch((error) => console.error("Error:", error));
    }
    

    return (
        <>
        <Navbar />
        <div className="bg-gradient-to-r from-teal-100 to-blue-100 min-h-screen flex flex-col items-center justify-center">
            <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8 mt-8">
                <h2 className="text-2xl font-semibold text-teal-800 mb-6 text-center">Add New Investment</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Asset Name/Description */}
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="assetName">
                            Asset Name/Description
                        </label>
                        <input
                            type="text"
                            id="assetName"
                            placeholder="e.g., 2 acres of land in Narok, 100 shares of XYZ Corp"
                            value={assetName}
                            onChange={(e) => setAssetName(e.target.value)}
                            className="shadow-md appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-teal-300"
                        />
                    </div>

                    {/* Asset Type Dropdown */}
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="assetType">
                            Asset Type
                        </label>
                        <select
                            id="assetType"
                            value={assetType}
                            onChange={(e) => setAssetType(e.target.value)}
                            className="shadow-md appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-teal-300"
                        >
                            <option value="">Select Asset Type</option>
                            <option value="stocks">"Stocks (e.g., Safaricom shares, Equity Bank shares)"</option>
                            <option value="real_estate">"Real Estate (e.g., Property, Land)"</option>
                            <option value="fixed_income">"Fixed Income (e.g., Bonds, Treasury Bills)"</option>
                            <option value="crypto">"Crypto (e.g., Bitcoin, Ethereum)"</option>
                            <option value="cash">"Cash (e.g., Savings, Checking Accounts)"</option>
                            <option value="tangible_assets">"Tangible Assets (e.g., Motor vehicle, Artwork)"</option>
                            <option value="private_equity">"Private Equity (e.g., VC Investments, Private Stocks)"</option>
                            <option value="collectibles">"Collectibles (e.g., Rare Coins, Antiques)"</option>
                        </select>
                    </div>

                    {/* Buy Price */}
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="buyPrice">
                            Buy price
                        </label>
                        <input
                            type="number"
                            id="buyPrice"
                            placeholder="Ksh. 0.00"
                            value={buyPrice}
                            onChange={(e) => setBuyPrice(e.target.value)}
                            className="shadow-md appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-teal-300"
                        />
                    </div>

                    {/* Date of Investment */}
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date">
                            Date of Investment
                        </label>
                        <input
                            type="date"
                            id="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="shadow-md appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-teal-300"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="bg-teal-600 text-white font-semibold py-3 px-6 rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-300 w-full"
                    >
                        Add Investment
                    </button>
                </form>
            </div>
        </div>
        </>
    );
};

export default InvestmentForm;
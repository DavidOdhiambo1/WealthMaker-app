import React, { useState } from 'react';
import EditInvestment from './EditInvestment';
import { useNavigate } from 'react-router-dom';

const InvestmentTable = ({ investments, onRefresh }) => {
    
    const [selectedInvestment, setSelectedInvestment] = useState(null);
    const navigate = useNavigate();
    const [showForm, setShowForm] = useState(false)
    const [formData, setFormData] = useState(null);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        })
    }

    const toggleForm = () => {
        setShowForm(!showForm)
    }

    const handleUpdate = () => {
        fetch(`/holdings/${formData.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(res => {
            if (res.ok) {
                alert("Edit successful!");
                toggleForm();
                onRefresh();
            } else {
                throw new Error("Update failed");
            }
        })
        .catch(error => console.error("Error Data: ", error));
    }

    const handleDelete = (investment) => {
        if (!investment || !investment.id) return alert("Invalid investment data.");
    
        fetch(`/holdings/${investment.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            if (res.ok) {
                alert("Investment deleted successfully!");
                onRefresh(); // Trigger data refresh
            } else {
                alert("Failed to delete investment. Please try again.");
            }
        })
        .catch(error => console.error("Error Data: ", error));
    };
        
    
    const handleRowClick = (investment) => {
        setSelectedInvestment(prev => (prev === investment ? null : investment));

    };

    

    return (
        <>
        <div className="bg-white shadow-md rounded-lg p-2">
            {investments.length === 0 ? (
                <p className="text-gray-600 italic">No investments available.</p>
            ) : (
                <div className="space-y-4">
                    {investments.map((investment, index) => (
                        <div
                            key={index}
                            className="border border-gray-300 rounded-lg p-2 shadow-sm hover:shadow-lg transition duration-300"
                        >
                            <div className="flex justify-between items-center">
                                <div 
                                    onClick={() => handleRowClick(investment)} 
                                    className="cursor-pointer flex gap-4 items-center"
                                >
                                    <div className="font-semibold text-gray-800">{investment.assetName}</div>
                                    <div className="text-gray-600">
                                        <strong>Value:</strong> {investment.buyPrice.toLocaleString()}
                                    </div>
                                </div>
                            </div>

                            {selectedInvestment === investment && (
                                <div className="mt-4 text-gray-700">
                                    <p><strong>Asset Type:</strong> {investment.assetType}</p>
                                    <p><strong>Date of Investment:</strong> {investment.date}</p>
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={()=> {
                                                setFormData({
                                                    id: investment.id,
                                                    assetName: investment.assetName,
                                                    assetType: investment.assetType,
                                                    buyPrice: investment.buyPrice,
                                                    date: investment.date,
                                                })
                                                toggleForm()

                                                }}
                                            className="text-blue-600 hover:text-blue-800 text-sm px-2 py-1 rounded transition"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(investment)}
                                            className="text-red-500 hover:text-red-700 text-sm px-2 py-1 rounded transition"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
        {
            showForm && formData ? (<EditInvestment  onsubmit={handleUpdate} onchange={handleChange} formdata={formData} />) : null
        }
        </>
    );
};

export default InvestmentTable;
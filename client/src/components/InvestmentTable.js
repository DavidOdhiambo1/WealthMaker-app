import React, { useState } from 'react';
import EditInvestment from './EditInvestment';

const InvestmentTable = ({ investments, onEdit, onDelete }) => {
    
    const [selectedInvestment, setSelectedInvestment] = useState(null);
    
    const [showForm, setShowForm] = useState(false)
    const { assetName, assetType, buyPrice, date } = investments[0] || {};

    const [formData, setFormData ] = useState({
        assetName,
        assetType,
        buyPrice,
        date,
       
    })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        })
    }

    const handleUpdate = () => {
        
        console.log(formData)
        toggleForm()
    }

    

    const handleRowClick = (investment) => {
        setSelectedInvestment(prev => (prev === investment ? null : investment));

    };

    const toggleForm = () => {
        setShowForm(!showForm)
    }

    return (
        <div className="bg-white shadow-md rounded-lg p-6">
    {investments.length === 0 ? (
        <p className="text-gray-600 italic">No investments available.</p>
    ) : (
        <div className="space-y-4">
            {investments.map((investment, index) => (
                <div
                    key={index}
                    className="border border-gray-300 rounded-lg p-4 shadow-sm hover:shadow-lg transition duration-300"
                >
                    <div className="flex justify-between items-center">
                        <div onClick={() => handleRowClick(investment)} className="cursor-pointer">
                            <div className="font-semibold text-gray-800">{investment.assetName}</div>
                            <div className="text-gray-600">{investment.buyPrice}</div>
                        </div>
                    </div>

                    {selectedInvestment === investment && (
                        <div className="mt-4 text-gray-700">
                            <p><strong>Asset Type:</strong> {investment.assetType}</p>
                            <p><strong>Date of Investment:</strong> {investment.date}</p>
                            <div className="flex space-x-2">
                                <button
                                    onClick={() => onEdit(investment, toggleForm)}
                                    className="text-blue-600 hover:text-blue-800 text-sm px-2 py-1 rounded transition"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => onDelete(investment)}
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
    );
};

export default InvestmentTable;
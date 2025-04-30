import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';

const InvestmentInformation = () => {
  const [info, setInfo] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('/info')
      .then(response => setInfo(response.data))
      .catch(() => setError('Could not fetch investment information'));
  }, []);

  // Group by asset_type
  const groupedInfo = info.reduce((acc, item) => {
    acc[item.asset_type] = acc[item.asset_type] || [];
    acc[item.asset_type].push(item);
    return acc;
  }, {});

  return (
    <>
      <Navbar />
      <div className="bg-gradient-to-r from-teal-100 to-blue-100 min-h-screen p-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-teal-800 text-center mb-8">
            Investment Information
          </h2>

          {error ? (
            <div className="bg-white p-6 rounded-lg shadow-md text-center text-red-600">{error}</div>
          ) : info.length === 0 ? (
            <div className="bg-white p-6 rounded-lg shadow-md text-center text-gray-600">
              No investment data available.
            </div>
          ) : (
            <div className="bg-white p-4 rounded-lg shadow-md overflow-x-auto">
              <table className="w-full table-auto text-sm">
                <thead className="bg-teal-500 text-white">
                  <tr>
                    <th className="px-4 py-2 text-left">Asset Type</th>
                    <th className="px-4 py-2 text-left">Details</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(groupedInfo).map(([type, entries]) => (
                    <tr key={type} className="border-b hover:bg-teal-50">
                      <td className="px-4 py-2 font-semibold text-teal-700">
                        {type.replace('_', ' ').toUpperCase()}
                      </td>
                      <td className="px-4 py-2 space-y-2">
                        {entries.map((item) => (
                          <div key={item.id}>
                            <p className="text-gray-700">
                              <strong>{item.title}</strong> by {item.author}
                            </p>
                            <a
                              href={item.link}
                              className="text-blue-600 hover:text-blue-800 underline text-sm"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {item.link}
                            </a>
                          </div>
                        ))}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default InvestmentInformation;
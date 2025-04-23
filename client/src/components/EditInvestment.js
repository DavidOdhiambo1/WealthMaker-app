
const EditInvestment = ({onsubmit, onchange, formdata}) => {
    
  return (
    <div>
      <h1>Edit Investment</h1>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form onSubmit={(e) => {
                e.preventDefault(); 
                onsubmit();}
            } 
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
            >
                   
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="assetName">
                            Asset Name/Description
                        </label>
                        <input
                            type="text"
                            id="assetName"
                            placeholder="e.g., 2 acres of land in Narok, 100 shares of XYZ Corp"
                            value={formdata.assetName}
                            onChange={onchange}
                            required
                            className="shadow-md appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-teal-300"
                        />
                    </div>

                    
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="assetType">
                            Asset Type
                        </label>
                        <select
                            id="assetType"
                            value={formdata.assetType}
                            onChange={onchange}
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

                   
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="buyPrice">
                            Buy price
                        </label>
                        <input
                            type="number"
                            id="buyPrice"
                            placeholder="Ksh. 0.00"
                            value ={formdata.buyPrice}
                            onChange={onchange}
                            className="shadow-md appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-teal-300"
                        />
                    </div>

                    
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date">
                            Date of Investment
                        </label>
                        <input
                            type="date"
                            id="date"
                            value={formdata.date}
                            onChange={onchange}
                            className="shadow-md appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-teal-300"
                        />
                    </div>

                    
                    <button
                        type="submit"
                        className="bg-teal-600 text-white font-semibold py-3 px-6 rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-300 w-full"
                    >
                        Update Investment
                    </button>
                </form>
        </div>   
    </div>
  );
};

export default EditInvestment;